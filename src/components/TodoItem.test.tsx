import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from './TodoItem'
import { beforeEach, test, vi } from 'vitest'

const mockToggle = vi.fn()
const mockDelete = vi.fn()
const mockUpdate = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

const mockTodo = {
  id: 1,
  text: 'test todo',
  done: false,
  user_id: 'user-1',
  created_at: '2026-03-30',
}

test('Todoのテキストが表示される', () => {
  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  expect(screen.getByText('test todo')).toBeInTheDocument()
})

test('checkboxクリックでonToggleDoneが呼ばれる', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  const checkbox = screen.getByRole('checkbox')

  await user.click(checkbox)

  expect(mockToggle).toHaveBeenCalledWith(1)
})

test('DeleteクリックでonDeleteが呼ばれる', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Delete' }))

  expect(mockDelete).toHaveBeenCalledWith(1)
})

test('Editクリックで入力モードになる', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Edit' }))

  // inputが出る
  expect(screen.getByDisplayValue('test todo')).toBeInTheDocument()
})

test('SaveでonUpdateTodoTextが呼ばれる', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Edit' }))

  const input = screen.getByDisplayValue('test todo')

  await user.clear(input)
  await user.type(input, 'updated todo')

  await user.click(screen.getByRole('button', { name: 'Save' }))

  expect(mockUpdate).toHaveBeenCalledWith(1, 'updated todo')
})

test('Cancelで編集がキャンセルされる', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Edit' }))

  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  expect(screen.getByText('test todo')).toBeInTheDocument()
})

test('Enterで編集を保存する', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Edit' }))

  const input = screen.getByDisplayValue('test todo')
  await user.clear(input)
  await user.type(input, 'updated todo{enter}')

  expect(mockUpdate).toHaveBeenCalledWith(1, 'updated todo')
  expect(mockUpdate).toHaveBeenCalledTimes(1)
})

test('Escapeで編集がキャンセルされる', async () => {
  const user = userEvent.setup()

  render(
    <TodoItem
      todo={mockTodo}
      onToggleDone={mockToggle}
      onDelete={mockDelete}
      onUpdateTodoText={mockUpdate}
      deletingId={null}
      togglingId={null}
    />,
  )

  await user.click(screen.getByRole('button', { name: 'Edit' }))

  const input = screen.getByDisplayValue('test todo')
  await user.type(input, '{escape}')

  expect(screen.getByText('test todo')).toBeInTheDocument()
  expect(mockUpdate).not.toHaveBeenCalled()
})
