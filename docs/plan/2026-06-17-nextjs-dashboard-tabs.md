# 번아웃 체크 → Next.js 15 전환 + 대시보드 탭 추가

## Context

현재 `burnout-check.html` 단일 파일에 모든 로직이 혼재되어 있습니다.
- Supabase auth(magic link) + `history` / `methods` 두 테이블 사용
- 설문 로직, 결과 계산, UI, API 통신이 한 파일에 뒤섞임
- 라우팅 없음 → phase 전환으로 페이지 흉내

**목표:** Next.js 15 App Router로 전환하면서
1. 로그인 후 **이전 번아웃 체크 리포트** / **나만의 번아웃 탈출 방법** 탭 대시보드 제공
2. UI / 비즈니스 로직 / 데이터 통신 계층 분리 (SoC)

---

## 라우트 구조

```
/                         → /dashboard/history 로 리다이렉트 (미인증 시 /login)
/login                    → magic link 로그인 폼
/auth/callback            → Supabase 이메일 링크 콜백 처리
/dashboard/history        → [탭①] 이전 번아웃 체크 리포트 목록 + "새 측정 시작" CTA
/dashboard/methods        → [탭②] 나만의 번아웃 탈출 방법 CRUD
/survey                   → 설문 (인트로 → 15개 문항 → 제출 후 /result/[id])
/result/[id]              → 결과 상세 (점수·게이지·리포트·처방)
```

---

## 디렉토리 레이아웃

```
burnout-self-test/
├── app/
│   ├── layout.tsx                   # 루트 레이아웃 (폰트, Nav)
│   ├── page.tsx                     # → redirect /dashboard/history
│   ├── login/page.tsx               # 로그인 폼
│   ├── auth/callback/route.ts       # Supabase auth callback
│   ├── dashboard/
│   │   ├── layout.tsx               # 탭 네비게이션 포함 대시보드 레이아웃
│   │   ├── history/page.tsx         # 리포트 목록 (Server Component)
│   │   └── methods/page.tsx         # 탈출 방법 관리 (Client Component)
│   ├── survey/page.tsx              # 설문 (Client Component)
│   └── result/[id]/page.tsx         # 결과 상세 (Server Component)
│
├── components/
│   ├── ui/Button, GaugeBar, StatusBanner, TabNav, Nav, LogoutButton
│   └── features/survey, history, methods, result
│
├── lib/supabase, api, utils
├── constants/questions, scale, remedies
├── hooks/useSurvey, useMethods
├── types/index.ts
└── middleware.ts
```

---

## SoC 계층 분리

| 계층 | 위치 | 역할 |
|------|------|------|
| **데이터 통신** | `lib/api/*.ts`, `lib/supabase/*.ts` | Supabase CRUD, 인증 |
| **비즈니스 로직** | `lib/utils/score.ts`, `hooks/*.ts` | 점수 계산, 상태 분류, UI 상태 |
| **UI** | `components/**/*.tsx`, `app/**/page.tsx` | 렌더링만 담당 |
| **상수** | `constants/*.ts` | 문항·척도·처방 데이터 |

## 구현 결과 (2026-06-17)

- 빌드 성공 ✓ (9개 페이지)
- TypeScript 타입 에러 없음 ✓
- CSS Modules로 기존 디자인 토큰 유지 ✓
