import fs from 'node:fs/promises'
import path from 'node:path'

const dbPath = path.resolve('db.json')

const tasks = [
  'Buy milk',
  'Read React docs',
  'Walk the dog',
  'Study TypeScript',
  'Build portfolio',
  'Write README',
  'Fix UI bugs',
  'Refactor hooks',
]

async function seedDb(count = 20) {
  const raw = await fs.readFile(dbPath, 'utf-8')
  const db = JSON.parse(raw)

  const todos = Array.isArray(db.todos) ? db.todos : []

  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id ?? 0), 0)

  const newTodos = Array.from({ length: count }, (_, i) => ({
    id: maxId + i + 1,
    text: `${tasks[i % tasks.length]} ${i + 1}`,
    done: false,
  }))

  const nextDb = {
    ...db,
    todos: [...todos, ...newTodos],
  }

  await fs.writeFile(dbPath, JSON.stringify(nextDb, null, 2), 'utf-8')

  console.log(`done: added ${count} todos`)
}

seedDb(20).catch((error) => {
  console.error('seedDb failed:', error)
  process.exit(1)
})
