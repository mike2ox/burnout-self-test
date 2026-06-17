import { Button } from '@/components/ui/Button'
import styles from './SurveyIntro.module.css'

interface SurveyIntroProps {
  onStart: () => void
}

export function SurveyIntro({ onStart }: SurveyIntroProps) {
  return (
    <section className={styles.hero}>
      <span className={styles.eyebrow}>근거 기반 번아웃 자가 측정</span>
      <h1 className={styles.title}>
        지금 나의 에너지는<br /><em>얼마나 남아 있을까</em>
      </h1>
      <p className={styles.sub}>
        Christina Maslach의 MBI-GS를 기반으로 소진·냉소·효능감을 측정합니다.
        15개 문항, 약 5분 소요됩니다.
      </p>

      <div className={styles.dimGrid}>
        <div className={`${styles.dimCard} ${styles.ex}`}>
          <span className={styles.icon}>⚡</span>
          <div className={styles.dimName}>소진 Exhaustion</div>
          <div className={styles.dimDesc}>일로 인해 에너지가 고갈되고 만성적으로 피로한 상태</div>
        </div>
        <div className={`${styles.dimCard} ${styles.cy}`}>
          <span className={styles.icon}>🌫</span>
          <div className={styles.dimName}>냉소 Cynicism</div>
          <div className={styles.dimDesc}>업무에 대한 무관심, 거리감, 의욕 저하</div>
        </div>
        <div className={`${styles.dimCard} ${styles.ef}`}>
          <span className={styles.icon}>🌱</span>
          <div className={styles.dimName}>효능감 Efficacy</div>
          <div className={styles.dimDesc}>일을 잘 해낼 수 있다는 자신감과 성취감</div>
        </div>
      </div>

      <Button onClick={onStart}>측정 시작하기 →</Button>

      <div className={styles.basisRow}>
        <span className={styles.chip}>Maslach et al., 1996</span>
        <span className={styles.chip}>40년간 수십 개국 검증</span>
        <span className={styles.chip}>WHO ICD-11 3차원 부합</span>
      </div>
    </section>
  )
}
