import * as supabaseApi from './todos.supabase'

// Auth / RLS 対応後は、開発・本番ともに Supabase を使用する
const todoApi = supabaseApi

export const {
  getTodos,
  createTodo,
  removeTodo,
  updateTodoDone,
  updateTodoText,
} = todoApi
