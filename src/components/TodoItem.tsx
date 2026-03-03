import type { Todo } from '../types/todo'

type Props = {
  todo: Todo
  onToggleDone: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggleDone, onDelete }: Props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggleDone(todo.id)}
      />

      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
}
