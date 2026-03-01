import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

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

test('localStorageから復元される', () => {
  const mockTodos = [{ id: 1, text: '保存済みタスク', done: false }]

  localStorage.setItem('todos-v1', JSON.stringify(mockTodos))

  render(<App />)

  expect(screen.getByText('保存済みタスク')).toBeVisible()
})

test('EnterキーでTodoが追加される', async () => {
  const user = userEvent.setup()
  render(<App />)

  const input = screen.getByRole('textbox')
  await user.type(input, 'パンを買う{Enter}')

  expect(screen.getByText('パンを買う')).toBeVisible()
})
