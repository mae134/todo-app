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
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Todo App</h1>

      {/* ローディング中表示 */}
      {loading && <p>Loading...</p>}

      {/* エラー表示 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAdd()
        }}
      />

      <button onClick={handleAdd} disabled={adding}>
        {adding ? 'Adding...' : 'Add'}
      </button>

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
  )
}

export default App
