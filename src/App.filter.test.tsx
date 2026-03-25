import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { vi } from 'vitest'

test('AddでTodoが追加される', async () => {
  const user = userEvent.setup()

  render(<App />)

  const input = screen.getByRole('textbox')
  await user.type(input, '牛乳を買う')

  const addButton = screen.getByRole('button', { name: /add/i })
  await user.click(addButton)

  // 画面上に「牛乳を買う」というテキストが表示されているか
  expect(screen.getByText('牛乳を買う')).toBeVisible()
})

// test('localStorageから復元される', () => {
//   const mockTodos = [{ id: 1, text: '保存済みタスク', done: false }]

//   localStorage.setItem('todos-v1', JSON.stringify(mockTodos))

//   render(<App />)

//   expect(screen.getByText('保存済みタスク')).toBeVisible()
// })

test('EnterキーでTodoが追加される', async () => {
  const user = userEvent.setup()
  render(<App />)

  const input = screen.getByRole('textbox')
  await user.type(input, 'パンを買う{Enter}')

  expect(screen.getByText('パンを買う')).toBeVisible()
})

vi.mock('./hooks/useTodos', () => ({
  useTodos: () => ({
    todos: [
      {
        id: 1,
        text: 'active todo',
        done: false,
        user_id: 'user-1',
        created_at: '2026-03-25T00:00:00Z',
      },
      {
        id: 2,
        text: 'completed todo',
        done: true,
        user_id: 'user-1',
        created_at: '2026-03-25T00:00:01Z',
      },
    ],
    addTodo: vi.fn(),
    deleteTodo: vi.fn(),
    toggleTodo: vi.fn(),
    updateTodoText: vi.fn(),
    loading: false,
    adding: false,
    deletingId: null,
    togglingId: null,
    error: null,
  }),
}))

vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'user-1',
            email: 'test@example.com',
          },
        },
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      }),
      signOut: vi.fn(),
    },
  },
}))

describe('filter buttons', () => {
  test('shows only active todos when Active is clicked', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('active todo')).toBeInTheDocument()
      expect(screen.getByText('completed todo')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: 'Active' }))

    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.queryByText('completed todo')).not.toBeInTheDocument()
  })

  test('shows only completed todos when Completed is clicked', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('active todo')).toBeInTheDocument()
      expect(screen.getByText('completed todo')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: 'Completed' }))

    expect(screen.getByText('completed todo')).toBeInTheDocument()
    expect(screen.queryByText('active todo')).not.toBeInTheDocument()
  })

  test('shows all todos when All is clicked', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('active todo')).toBeInTheDocument()
      expect(screen.getByText('completed todo')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: 'Completed' }))
    await userEvent.click(screen.getByRole('button', { name: 'All' }))

    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.getByText('completed todo')).toBeInTheDocument()
  })
})
