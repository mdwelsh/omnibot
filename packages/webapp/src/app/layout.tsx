import React from 'react'
import { Providers } from './providers'
//import { Metadata } from 'next'
import './globals.css'

// export const metadata: Metadata = {
//   title: {
//     default: 'Omnibot - The Omnibus Project AI Chatbot',
//     template: `%s - Omnibot`
//   },
//   description:
//     'Omnibot is an AI chatbot that answers questions about the Omnibus Project podcast.',
//   icons: {
//     icon: '/favicon.png',
//     shortcut: '/favicon.png',
//     apple: '/apple-touch-icon.png'
//   }
// }

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
