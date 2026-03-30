import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import { AuthForm } from './AuthForm'
import { supabase } from '../lib/supabase'

const { mockSignInWithPassword, mockSignUp } = vi.hoisted(() => {
  return {
    mockSignInWithPassword: vi.fn(),
    mockSignUp: vi.fn(),
  }
})

beforeEach(() => {
  vi.clearAllMocks()

  // handlesubmitはasyncなので、モックもPromiseを返す形にしておく
  mockSignInWithPassword.mockResolvedValue({ error: null })
  mockSignUp.mockResolvedValue({ error: null })
})

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
    },
  },
}))

test('初期表示は Login 画面である', () => {
  render(<AuthForm />)

  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Go to Sign Up' }),
  ).toBeInTheDocument()
})

test('Go to Sign Up を押すと Sign Up 画面に切り替わる', async () => {
  const user = userEvent.setup()

  render(<AuthForm />)

  await user.click(screen.getByRole('button', { name: 'Go to Sign Up' }))

  expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Go to Login' }),
  ).toBeInTheDocument()
})

test('email と password が空のとき submit ボタンは disabled', () => {
  render(<AuthForm />)

  const submitButton = screen.getByRole('button', { name: 'Login' })

  expect(submitButton).toBeDisabled()
})

test('Login送信で signInWithPassword が呼ばれる', async () => {
  const user = userEvent.setup()

  render(<AuthForm />)

  await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
  await user.type(screen.getByPlaceholderText('Password'), 'password123')

  await user.click(screen.getByRole('button', { name: 'Login' }))

  expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  })
  expect(supabase.auth.signInWithPassword).toHaveBeenCalledTimes(1)
})

test('Sign Up送信で signUp が呼ばれる', async () => {
  const user = userEvent.setup()

  render(<AuthForm />)

  await user.click(screen.getByRole('button', { name: 'Go to Sign Up' }))

  await user.type(screen.getByPlaceholderText('Email'), 'new@example.com')
  await user.type(screen.getByPlaceholderText('Password'), 'password123')

  await user.click(screen.getByRole('button', { name: 'Sign Up' }))

  expect(supabase.auth.signUp).toHaveBeenCalledWith({
    email: 'new@example.com',
    password: 'password123',
  })
  expect(supabase.auth.signUp).toHaveBeenCalledTimes(1)
})
