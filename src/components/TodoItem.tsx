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
    <li className="flex itemmx-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.done}
          disabled={togglingId === todo.id}
          onChange={() => onToggleDone(todo.id)}
        />

        <span
          className={
            todo.done ? 'text-slate-400 line-through' : 'text-slate-800'
          }
        >
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => onDelete(todo.id)}
        disabled={deletingId === todo.id}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 translation hover:bg-slate-100 disabled:cursor-not -allowed disabled:opacity-50"
      >
        {deletingId === todo.id ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  )
}
