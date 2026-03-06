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

  // aがtrueならb(未完了)を前にbがtrueならa(未完了)を前にする
  const sortedTodos = [...todos].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    // 画面の高さを最低限確保する 薄いグレー背景　白いカードを目立たせる　左右の余白　スマホで端にくっつかないようにする　上下の余白　詰まって見えないようにする
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Todo App</h1>
          <p className="text-sm text-slate-500">Simple task manager</p>
        </div>

        {/* ローディング中表示 */}
        {loading && <p>Loading...</p>}

        {/* エラー表示 */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="mb-6 flex gap-3">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
            placeholder="Add a new task"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none"
          />

          <button
            onClick={handleAdd}
            disabled={adding}
            className="rounded-xl bg-slate-800 px-5 py-3 text-white translation hover:bg-slate-700"
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
        </div>

        <p>inputText: {inputText}</p>
        <ul>
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
      </div>
    </div>
  )
}

export default App
