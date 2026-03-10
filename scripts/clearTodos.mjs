const API_BASE_URL = 'http://localhost:3001/todos'

async function clearTodos() {
  const res = await fetch(API_BASE_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const todos = await res.json()

  for (const todo of todos) {
    const deleteRes = await fetch(`${API_BASE_URL}/${todo.id}`, {
      method: 'DELETE',
    })

    if (!deleteRes.ok) {
      throw new Error(`Failed to delete todo ${todo.id}`)
    }

    console.log(`deleted ${todo.id}`)
  }

  console.log('done: all todos deleted')
}

clearTodos().catch((error) => {
  console.error('clear failed:', error)
  process.exit(1)
})
