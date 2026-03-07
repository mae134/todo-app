import { useState } from 'react'
import { TodoItem } from './components/TodoItem'
import { useTodos } from './hooks/useTodos'

function App() {
  // 今の状態、状態を変更する関数
  const [inputText, setInputText] = useState('')

  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    loading,
    adding,
    deletingId,
    togglingId,
    error,
  } = useTodos()

  // ボタンが押されたときに実行する関数
  const handleAdd = () => {
    addTodo(inputText)
    // 入力欄を空にする
    setInputText('')
  }

  const totalCount = todos.length
  const completedCount = todos.filter((todo) => todo.done).length
  const activeCount = totalCount - completedCount

  // aがtrueならb(未完了)を前にbがtrueならa(未完了)を前にする
  const sortedTodos = [...todos].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    // 画面の高さを最低限確保する / 薄いグレー背景 / 左右の余白 / スマホで端にくっつかないようにする / 上下の余白 / 詰まって見えないようにする
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Todo App</h1>
          <p className="text-sm text-slate-500">Simple task manager</p>
        </div>

        {/* ローディング中表示 */}
        {loading && (
          <p className="mb-4 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
            Loading...
          </p>
        )}

        {/* エラー表示 */}
        {error && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mb-6 flex gap-3">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
            placeholder="Add a new task"
            // 入力欄のフォーカスuiを整える
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:ring focus:border"
          />

          <button
            onClick={handleAdd}
            disabled={adding}
            className="rounded-xl bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            Total: {totalCount}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-green-600">
            Completed: {completedCount}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            Active: {activeCount}
          </span>
        </div>

        {/* タスクリストがないなら空状態UI表示 */}
        {sortedTodos.length === 0 ? (
          // 大き目角丸 / 枠線をつける / 点線っぽい枠(空の状態をやわらかく見せやすい) / 薄いグレー枠 / 内側の余白 / テキストを中央揃え
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center">
            {/* 大き目の文字 / 太字 / 落ち着いた色 */}
            <p className="text-lg font-medium text-slate-600">No tasks yet</p>
            {/* 上に少し余白 / 小さめ文字 / 薄い文字色 */}
            <p className="mt-2 text-sm text-slate-400">Add your first task</p>
          </div>
        ) : (
          // タスクリスト表示
          <ul className="space-y-3">
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleDone={toggleTodo}
                onDelete={deleteTodo}
                deletingId={deletingId}
                togglingId={togglingId}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
