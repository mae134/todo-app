import fs from 'node:fs/promises'
import path from 'node:path'

const dbPath = path.resolve('../todo-local-db/db.json')

async function resetDb() {
  try {
    const raw = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(raw)

    const nextDb = {
      ...db,
      todos: [],
    }

    await fs.writeFile(dbPath, JSON.stringify(nextDb, null, 2), 'utf-8')

    console.log('done: todos cleared (0 items)')
  } catch (error) {
    console.error('resetDb failed:', error)
    // 一般的なエラー終了
    process.exit(1)
  }
}

resetDb()
