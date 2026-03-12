import fs from 'node:fs/promises'
import path from 'node:path'

// DBフォルダのパスを決める 絶対パスを取得
const dbDir = path.resolve('../todo-local-db')

// Db.jsonの場所を決める
const dbPath = path.join(dbDir, 'db.json')

// サンプルパスまでの絶対パスを取得
const examplePath = path.resolve('db.example.json')

async function ensureDbDirectory() {
  // DBフォルダを作る、すでに存在するなら何もしない。フォルダ作成は非同期
  await fs.mkdir(dbDir, { recursive: true })
  console.log('Checked DB directory')
}

async function ensureDbFile() {
  try {
    // db.jsonがあるか確認
    await fs.access(dbPath)
    console.log('db.json already exists')
  } catch {
    // なければexampleからコピー
    await fs.copyFile(examplePath, dbPath)
    console.log('Created db.json from example')
  }
}

async function bootstrapDb() {
  await ensureDbDirectory()
  await ensureDbFile()
}

bootstrapDb().catch((error) => {
  console.error('bootstrap-db failed:', error)
  process.exit(1)
})
