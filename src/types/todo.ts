export type Todo = {
  id: number
  text: string // タスク内容
  done: boolean // 完了タスク状態
  user_id: string
  created_at?: string // メタ情報
}
