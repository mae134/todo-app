import * as supabaseApi from './todos.supabase'

const todoApi = supabaseApi

export const {
  getTodos,
  createTodo,
  removeTodo,
  updateTodoDone,
  updateTodoText,
} = todoApi
