import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Applications Tracker',
  description: 'Track your job search in Tokyo',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
