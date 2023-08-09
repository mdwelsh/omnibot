import { Metadata } from 'next'

import './index.css'

export const metadata: Metadata = {
  title: {
    default: 'Omnibot - The Omnibus Project AI Chatbot',
    template: `%s - Omnibot`
  },
  description:
    'Omnibot is an AI chatbot that answers questions about the Omnibus Project podcast.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
