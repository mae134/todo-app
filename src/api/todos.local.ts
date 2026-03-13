import type { Todo } from '../types/todo'

const API_BASE_URL = 'http://localhost:3001/todos'

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(API_BASE_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function createTodo(text: string): Promise<Todo> {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, done: false }),
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function removeTodo(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

export async function updateTodoDone(id: number, done: boolean): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done }),
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updateTodoText(id: number, text: string): Promise<Todo> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
