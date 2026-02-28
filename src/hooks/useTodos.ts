import { useState, useEffect} from 'react'
import type { Todo } from '../types/todo'


export function useTodos(){
  // todoを入れる箱を用意する 文字列の配列ですよという型指定 初期値は空配列
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos-v1')
    if (!stored) return []
    return JSON.parse(stored)
  })

  useEffect(() => {
    localStorage.setItem('todos-v1', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    // 前後の空白を削除する 空の文字と空白は含めない
    if (text.trim() === '') return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      done: false,
    }
    
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => 
      todo.id === id ? { ...todo, done: !todo.done } : todo))
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  }
}