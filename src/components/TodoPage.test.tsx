import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { User } from '@supabase/supabase-js'
import { TodoPage } from './TodoPage'

// useTodos をモック
vi.mock('../hooks/useTodos', () => ({
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

// supabase auth をモック
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}))

describe('Todoページ：フィルターボタンのテスト', () => {
  // 偽造ユーザーを作成
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
  } as User

  test('「Active」をクリックすると、アクティブなタスクのみが表示される', async () => {
    const user = userEvent.setup()

    // dom表示
    render(<TodoPage user={mockUser} />)

    // domが存在するか確認
    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.getByText('completed todo')).toBeInTheDocument()

    // 現在作業中タスクのフィルターボタンをクリック
    await user.click(screen.getByRole('button', { name: 'Active' }))

    // 現在作業中タスクのdomが存在しており、完了済みタスクのdomが存在しないかテスト
    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.queryByText('completed todo')).not.toBeInTheDocument()
  })

  test('「Completed」をクリックすると、完了したタスクのみが表示される', async () => {
    const user = userEvent.setup()

    // dom表示
    render(<TodoPage user={mockUser} />)

    // domが存在するか確認
    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.getByText('completed todo')).toBeInTheDocument()

    // 完了済みタスクのフィルターボタンをクリック
    await user.click(screen.getByRole('button', { name: 'Completed' }))

    // 現在作業中タスクのdomが存在せず、完了済みタスクのdomが存在するかテスト
    expect(screen.getByText('completed todo')).toBeInTheDocument()
    expect(screen.queryByText('active todo')).not.toBeInTheDocument()
  })

  test('「All」をクリックすると、すべてのタスクが表示される', async () => {
    const user = userEvent.setup()

    // dom表示
    render(<TodoPage user={mockUser} />)

    // 全てのタスクフィルターボタンの動作を確認するため、別のボタンを入力
    await user.click(screen.getByRole('button', { name: 'Completed' }))

    // 全てのタスクフィルターボタン入力
    await user.click(screen.getByRole('button', { name: 'All' }))

    // 全てのタスクのdomが存在しているかテスト
    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.getByText('completed todo')).toBeInTheDocument()
  })
})
