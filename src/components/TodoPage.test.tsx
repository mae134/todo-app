import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { User } from '@supabase/supabase-js'
import { TodoPage } from './TodoPage'
import { supabase } from '../lib/supabase'

const mockDeleteTodo = vi.fn()

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
    deleteTodo: mockDeleteTodo,
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

    // 全てのタスクフィルターボタンの動作を確認するため、別のボタンをクリック
    await user.click(screen.getByRole('button', { name: 'Completed' }))

    // 全てのタスクフィルターボタンクリック
    await user.click(screen.getByRole('button', { name: 'All' }))

    // 全てのタスクのdomが存在しているかテスト
    expect(screen.getByText('active todo')).toBeInTheDocument()
    expect(screen.getByText('completed todo')).toBeInTheDocument()
  })
})

test('「Logout」をクリックするとsignOutが呼ばれる', async () => {
  const user = userEvent.setup()

  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
  } as User

  // dom表示
  render(<TodoPage user={mockUser} />)

  // ログアウトボタンをクリック
  await user.click(screen.getByRole('button', { name: 'Logout' }))

  // クリックされた後、signOut関数が呼び出されているか(handleLogout内の仮関数が呼び出されているか)
  expect(supabase.auth.signOut).toHaveBeenCalled()
})

describe('Todoページ：Clear completed ボタンのテスト', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
  } as User

  test('完了済みタスクがあるとき、Clear completed ボタンが表示される', () => {
    // dom表示
    render(<TodoPage user={mockUser} />)

    // 正規表現で大文字小文字でもdomを取得、domを確認
    expect(
      screen.getByRole('button', { name: /Clear completed/i }),
    ).toBeInTheDocument()
  })

  test('Clear completed をクリックすると、完了済みタスクの deleteTodo が呼ばれる', async () => {
    const user = userEvent.setup()

    // 前のテスト呼ばれた可能性があるので、呼ばれた回数を一応リセットしておく
    mockDeleteTodo.mockClear()

    // dom表示
    render(<TodoPage user={mockUser} />)

    // 完了タスク削除ボタンをクリック
    await user.click(screen.getByRole('button', { name: /Clear completed/i }))

    // idが2の引数でdeleteTodoが呼ばれているか
    expect(mockDeleteTodo).toHaveBeenCalledWith(2)

    // mockDeleteTodoが何回呼ばれたか
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1)
  })
})
