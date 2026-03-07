import type { Todo } from '../types/todo'

type Props = {
  todo: Todo
  onToggleDone: (id: number) => void
  onDelete: (id: number) => void
  deletingId: number | null
  togglingId: number | null
}

export function TodoItem({
  todo,
  onToggleDone,
  onDelete,
  deletingId,
  togglingId,
}: Props) {
  return (
    // 横並び / 縦方向の位置を中央に揃える / 左右の端に分ける / 角丸 / 薄い枠線を付ける / 風刺背景色 / 内側の余白(padding) / ホバーで背景色を変える
    <li className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100">
      {/* checkboxとtextを横並びにする / checkboxとtextの高さを中央揃えにする / checkboxと文字の間のすき間を作る。 */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.done}
          disabled={togglingId === todo.id}
          onChange={() => onToggleDone(todo.id)}
        />

        <span
          className={
            todo.done ? 'text-slate-400 line-through' : 'text-slate-800'
          }
        >
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => onDelete(todo.id)}
        disabled={deletingId === todo.id}
        // 角丸 / 薄い枠線を付ける / 風刺背景色 / 内側の余白(padding) / 小さい文字 / 薄い文字色 / ホバーで背景色を変える / 削除中はカーソルを変えてクリックできないようにする / 削除中は半透明にする
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 translation hover:bg-slate-100 disabled:cursor-not -allowed disabled:opacity-50"
      >
        {deletingId === todo.id ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  )
}
