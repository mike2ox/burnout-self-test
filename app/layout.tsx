import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/ui/Nav'

export const metadata: Metadata = {
  title: '번아웃 체크 — MBI-GS 기반',
  description: 'Maslach MBI-GS 기반 번아웃 자가 측정 도구',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&family=Noto+Sans+KR:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
