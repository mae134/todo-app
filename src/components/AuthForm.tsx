import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function AuthForm() {
  // ログイン状態
  const [isLogin, setIsLogin] = useState(false)
  // emailの状態
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // フォーム送信時の処理
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // ログインできるならログイン、そうでないならサインアップ
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        setMessage('Logged in successfully.')
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        setMessage(
          'Sign up successful. Check your email if confirmation is enabled.',
        )
      }
    } catch (error) {
      console.error(error)
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mb-6 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold text-slate-800">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>

      {message && (
        <p className="mb-4 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
          {message}
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mb-4 space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border focus:ring"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border focus:ring"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading || !email.trim() || !password.trim()}
          className="rounded-xl bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className="rounded-xl border border-slate-300 px-5 py-3 text-slate-600 transition hover:bg-slate-100"
        >
          {isLogin ? 'Go to Sign Up' : 'Go to Login'}
        </button>
      </div>
    </div>
  )
}
