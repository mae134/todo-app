import { useState } from 'react'
import type { Todo } from '../types/todo'

type Props = {
  todo: Todo
  onToggleDone: (id: number) => void
  onDelete: (id: number) => void
  onUpdateTodoText: (id: number, newText: string) => void
  deletingId: number | null
  togglingId: number | null
}

export function TodoItem({
  todo,
  onToggleDone,
  onDelete,
  onUpdateTodoText,
  deletingId,
  togglingId,
}: Props) {
  // 編集モードかどうか、編集判定を変更する関数
  const [isEditing, setIsEditing] = useState(false)
  // 今の編集内容状態、編集内容を変更する関数
  const [editText, setEditText] = useState(todo.text)

  // 編集モードにする
  const handleStartEdit = () => {
    setIsEditing(true)
    // 今のTodo文字列をinputに入れる
    setEditText(todo.text)
  }

  // 編集モード終了
  const handleSave = () => {
    // 空文字なら保存せずに終了
    const trimmed = editText.trim()
    if (!trimmed) return

    // 親から渡らされた、onUpdateTodoTextを呼ぶ
    onUpdateTodoText(todo.id, editText)
    setIsEditing(false)
  }

  // 編集キャンセル
  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    // 横並び / 縦方向の位置を中央に揃える / 左右の端に分ける / 角丸 / 薄い枠線を付ける / 風刺背景色 / 内側の余白(padding) / ホバーで背景色を変える
    <li className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100">
      {/* checkboxとtextを横並びにする / checkboxとtextの高さを中央揃えにする / checkboxと文字の間のすき間を作る。 */}
      <label className="flex items-center gap-3">
        {/* タスク完了切り替えボックス */}
        <input
          type="checkbox"
          checked={todo.done}
          disabled={togglingId === todo.id || isEditing}
          onChange={() => onToggleDone(todo.id)}
        />

        {/* 編集中ならinput、通常時ならspanに変える */}
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
            }}
            className="rounded-md border border-slate-300 px-2 py-1 text-slate-800 outline-none focus:ring focus:border"
          />
        ) : (
          <span
            className={
              todo.done ? 'text-slate-400 line-through' : 'text-slate-800'
            }
          >
            {todo.text}
          </span>
        )}
      </label>

      <div className="flex gap-2">
        {isEditing ? (
          // 一つの要素しか返せないので、React.Fragmentをかえす
          <>
            <button
              onClick={handleSave}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white transition hover:bg-slate-700"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleStartEdit}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              disabled={deletingId === todo.id}
              // 角丸 / 薄い枠線を付ける / 風刺背景色 / 内側の余白(padding) / 小さい文字 / 薄い文字色 / ホバーで背景色を変える / 削除中はカーソルを変えてクリックできないようにする / 削除中は半透明にする
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingId === todo.id ? 'Deleting...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    </li>
  )
}
