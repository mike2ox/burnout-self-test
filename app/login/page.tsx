'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSend = async () => {
    if (!email.trim()) return
    setMsg('전송 중…')
    const sb = createClient()
    const { error } = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      setMsg('오류: ' + error.message)
      return
    }
    setMsg('')
    setSent(true)
  }

  return (
    <div className="wrap">
      <section className={styles.hero}>
        <span className={styles.eyebrow}>인증</span>
        <h1 className={styles.title}>
          나의 기록을 보려면<br /><em>로그인이 필요합니다</em>
        </h1>
        <p className={styles.sub}>
          이메일 주소를 입력하면 로그인 링크를 보내드립니다.<br />
          링크를 클릭하면 바로 로그인됩니다.
        </p>

        {!sent ? (
          <div className={styles.formWrap}>
            <div className={styles.inputRow}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="이메일 주소"
              />
              <button onClick={handleSend}>링크 받기</button>
            </div>
            {msg && <p className={styles.msg}>{msg}</p>}
          </div>
        ) : (
          <div className={styles.sentWrap}>
            <p className={styles.sentOk}>✓ 로그인 링크를 발송했습니다</p>
            <p className={styles.sentDesc}>
              이메일을 확인하고 <strong>Sign in</strong> 링크를 클릭하면<br />
              자동으로 로그인됩니다.
            </p>
            <button className={styles.backBtn} onClick={() => setSent(false)}>
              ← 다른 이메일로 시도
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
