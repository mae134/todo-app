import { useState, useEffect } from 'react'
import type { Todo } from '../types/todo'


export function useTodos() {

  // ローディング画面状態
  const [loading, setLoading] = useState(false)
  // エラー画面状態
  const [error, setError] = useState<string | null>(null)
  // todoを入れる箱を用意する 文字列の配列ですよという型指定 初期値は空配列
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos-v1')
    if (!stored) return []
    return JSON.parse(stored)
  })

  useEffect(() => {
    localStorage.setItem('todos-v1', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    async function load() {

      setLoading(true)
      setError(null)

      try {

        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        setTodos(data)
      } catch (error) {
        setError('データ取得に失敗しました')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const addTodo = async (text: string) => {
    // 前後の空白を削除する 空の文字と空白は含めない
    if (text.trim() === '') return

    try{
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, done: false }),
      })

      if(!res.ok) throw new Error('API error')

        const newTodo = await res.json()

        // サーバーが返したTodoをStateに追加
        setTodos((prev) => [...prev, newTodo])
    } catch(e){
      setError('Todoの追加に失敗しました')
    }
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
    loading,
    error
  }
}