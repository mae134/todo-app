const API_BASE_URL = 'http://localhost:3001/todos'

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

async function seedTodos(count = 20) {
  for (let i = 0; i < count; i++) {
    const text = `${tasks[i % tasks.length]} ${i + 1}`

    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, done: false }),
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const todo = await res.json()
    console.log(`created ${i + 1}:`, todo)
  }

  console.log(`done: ${count} todos created`)
}

seedTodos(20).catch((error) => {
  console.error('seed failed:', error)
  process.exit(1)
})
