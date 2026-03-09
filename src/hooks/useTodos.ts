import { useState, useEffect } from 'react'
import type { Todo } from '../types/todo'
import { API_BASE_URL } from '../api/config'

export function useTodos() {
  // 新しいTodoを追加中かどうかの状態
  const [adding, setAdding] = useState(false)
  // 削除中のTodoのIDを保持する状態
  const [deletingId, setDeletingId] = useState<number | null>(null)
  // 完了状態を切り替え中のTodoのIDを保持する状態
  const [togglingId, setTogglingId] = useState<number | null>(null)
  // ローディング画面状態
  const [loading, setLoading] = useState(false)
  // エラー画面状態
  const [error, setError] = useState<string | null>(null)
  // todoを入れる箱を用意する 文字列の配列ですよという型指定 初期値は空配列
  const [todos, setTodos] = useState<Todo[]>([])

  // GET: 初回ロード
  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(API_BASE_URL)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = (await res.json()) as Todo[]
        setTodos(data)
      } catch (error) {
        setError('Failed to get todo')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  // POST: 新しいTodoを追加する関数
  const addTodo = async (text: string) => {
    // 前後の空白を削除する 空の文字と空白は含めない
    if (text.trim() === '') return

    setAdding(true)
    setError(null)

    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, done: false }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const newTodo = (await res.json()) as Todo

      // サーバーが返したTodoをStateに追加
      setTodos((prev) => [...prev, newTodo])
    } catch (e) {
      console.error(e)
      setError('Failed to add todo')
    } finally {
      setAdding(false)
    }
  }

  // DELETE: Todoを削除する関数
  const deleteTodo = async (id: number) => {
    try {
      setDeletingId(id)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      // サーバー削除が成功したら、画面からも消す
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (e) {
      console.error(e)
      setError('Failed to delete todo')
    } finally {
      setDeletingId(null)
    }
  }

  // PATCH: Todoの完了状態を切り替える関数
  const toggleTodo = async (id: number) => {
    const target = todos.find((todo) => todo.id === id)
    if (!target) return

    setTogglingId(id)
    setError(null)

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !target.done }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      // 表示更新
      const updatedTodo = (await res.json()) as Todo
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
      )
    } catch (error) {
      console.error(error)
      setError('Failed to update todo')
    } finally {
      setTogglingId(null)
    }
  }

  const updateTodoText = async (id: number, newText: string) => {
    const trimmedText = newText.trim()
    const target = todos.find((todo) => todo.id === id)
    if (!target) return

    setError(null)

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmedText }),
      })

      if (!res.ok) {
        throw new Error('HTTP ${res.status}')
      }

      // 表示更新
      const updateTodo = (await res.json()) as Todo
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updateTodo : todo)),
      )
    } catch (error) {
      console.log(error)
      setError('Failed to update todo')
    }
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodoText,
    loading,
    adding,
    deletingId,
    togglingId,
    error,
  }
}
