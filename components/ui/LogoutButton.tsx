'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './LogoutButton.module.css'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const sb = createClient()
    await sb.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button className={styles.btn} onClick={handleLogout}>
      로그아웃
    </button>
  )
}
