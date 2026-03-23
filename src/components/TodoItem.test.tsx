import { render, screen } from '@testing-library/react'
import { TodoItem } from './TodoItem'
import userEvent from '@testing-library/user-event'
import type { Todo } from '../types/todo'

describe('TodoItem', () => {
  const todo: Todo = {
    id: 1,
    text: '牛乳を買う',
    done: false,
    user_id: 'test-user-id',
    created_at: '2026-03-23T10:00.0002',
  }

  test('Todoのテキストが表示される', () => {
    render(
      <TodoItem
        todo={todo}
        onToggleDone={() => {}}
        onDelete={() => {}}
        onUpdateTodoText={() => {}}
        deletingId={null}
        togglingId={null}
      />,
    )

    expect(screen.getByText('牛乳を買う')).toBeVisible()
  })

  test('Deleteボタンを押すと onDelete が呼ばれる', async () => {
    const user = userEvent.setup()
    const onDelete = jest.fn()

    render(
      <TodoItem
        todo={todo}
        onToggleDone={() => {}}
        onDelete={onDelete}
        onUpdateTodoText={() => {}}
        deletingId={null}
        togglingId={null}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
