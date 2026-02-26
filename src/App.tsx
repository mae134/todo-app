import { useState, useEffect} from 'react'
import { TodoItem } from './components/TodoItem'
import type { Todo } from './types/todo'

function App() {

  // localStorageに保存するときの「名前札」を固定する
  const STORAGE_KEY = 'todos-v1'

  // 配列の分割代入で、useStateの返り値をinputTextとsetInputTextに代入する
  // 今の状態、状態を変更する関数
  const [inputText, setInputText] = useState('')

  // todoを入れる箱を用意する 文字列の配列ですよという型指定 初期値は空配列
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if(!saved) return []

    return JSON.parse(saved)
  })

  // 副作用を管理するためのフック。第2引数に渡した配列の中身が変わるたびに、第1引数で渡した関数が実行される。
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])// この中に書いた値が変わったときだけ、useEffectを実行する

  // ボタンが押されたときに実行する関数
  const handleAdd = () => {
    // 前後の空白を削除する 空の文字と空白は含めない
    if (inputText.trim() === '') return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputText,
      done: false,
    }

    // 今ある配列を全部コピー、そこに新しいTodoを追加する
    setTodos([...todos, newTodo])
    // 入力欄を空にする
    setInputText('')
  }

  const handleDelete = (idToDelete: string) => {
    // indexToDelete以外の要素を残す
    const newTodos = todos.filter((todo) => todo.id !== idToDelete)
    setTodos(newTodos)
  }

  const handleToggleDone = (idToToggle: string) => {
    // チェックされた箇所のチェックを切り替える
    const newTodos = todos.map((todo) => {
      if (todo.id !== idToToggle) return todo
      return { ...todo, done: !todo.done }
    })
    // 新しい配列を渡す
    setTodos(newTodos)
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
            onToggleDone={handleToggleDone}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
