import { useState, useEffect} from 'react'
import { TodoItem } from './components/TodoItem'
import type { Todo } from './types/todo'
import { useTodos } from './hooks/useTodos'

function App() {

  // localStorageに保存するときの「名前札」を固定する
  const STORAGE_KEY = 'todos-v1'

  // 配列の分割代入で、useStateの返り値をinputTextとsetInputTextに代入する
  // 今の状態、状態を変更する関数
  const [inputText, setInputText] = useState('')

  const {todos, addTodo, deleteTodo, toggleTodo} = useTodos()

  // 副作用を管理するためのフック。第2引数に渡した配列の中身が変わるたびに、第1引数で渡した関数が実行される。
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])// この中に書いた値が変わったときだけ、useEffectを実行する

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
      <h1>Todo App</h1>
      <input 
      value={inputText} 
      onChange={(e) => setInputText(e.target.value)} 
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleAdd()
      }}
      />

      <button onClick={handleAdd}>Add</button>

      <p>inputText: {inputText}</p>
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
