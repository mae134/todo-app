import { useState, useEffect} from 'react'
import type { Todo } from '../types/todo'


export function useTodos(){
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos-v1');
    if (!stored) return []
    return JSON.parse(stored)
  })

  useEffect(() => {
    localStorage.setItem('todos-v1', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
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