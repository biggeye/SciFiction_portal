import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function SignOut() {
  const { user, signOut } = useUser()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  )
}