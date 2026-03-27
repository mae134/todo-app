import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { AuthForm } from './components/AuthForm'
import { TodoPage } from './components/TodoPage'

function App() {
  // ユーザー情報の状態
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadUser() {
      // ユーザー情報を取得
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    loadUser()

    // ログイン状態が変わったらuserを更新する
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <AuthForm />
      </div>
    )
  }

  return <TodoPage user={user} />
}

export default App
