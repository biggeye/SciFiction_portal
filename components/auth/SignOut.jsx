import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function SignOut() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  )
}