import type { Todo } from '../types/todo'
import { supabase } from '../lib/supabase'

export async function getTodos(userId: string): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createTodo(text: string, userId: string): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ text, done: false, user_id: userId }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeTodo(id: number): Promise<void> {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) throw error
}

export async function updateTodoDone(id: number, done: boolean): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .update({ done })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTodoText(id: number, text: string): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .update({ text })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
