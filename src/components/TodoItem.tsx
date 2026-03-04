import type { Todo } from '../types/todo'

type Props = {
  todo: Todo
  onToggleDone: (id: number) => void
  onDelete: (id: number) => void
  deletingId: number | null
  togglingId: number | null
}

export function TodoItem({
  todo,
  onToggleDone,
  onDelete,
  deletingId,
  togglingId,
}: Props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        disabled={togglingId === todo.id}
        onChange={() => onToggleDone(todo.id)}
      />

      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        disabled={deletingId === todo.id}
      >
        {deletingId === todo.id ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  )
}
