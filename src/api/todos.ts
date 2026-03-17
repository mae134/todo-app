// import * as localApi from './todos.local'
import * as supabaseApi from './todos.supabase'

// const todoApi = import.meta.env.DEV ? localApi : supabaseApi

// 一時的に Supabase を使う
const todoApi = supabaseApi

export const {
  getTodos,
  createTodo,
  removeTodo,
  updateTodoDone,
  updateTodoText,
} = todoApi
