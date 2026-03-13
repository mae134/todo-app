import type { Todo } from '../types/todo'
import { supabase } from '../lib/supabase'

export async function getTodos(): Promise<Todo[]> {
  //
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function createTodo(text: string): Promise<Todo> {
  const { data, error } = await supabase
    .from('todo')
    .insert([{ text, done: false }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeTodo(id: number): Promise<void> {
  const { error } = await supabase.from('todo').delete().eq('id', id)
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
