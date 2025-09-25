import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'STM Tunneling Simulator | Interactive Learning Tool',
  description: 'Learn about Scanning Tunneling Microscopy through interactive visualization of quantum tunneling effects.',
  keywords: 'STM, scanning tunneling microscope, quantum tunneling, microscopy, physics, education',
  authors: [{ name: 'STM Learning Tool' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${GeistMono.className}`}>
        {children}
      </body>
    </html>
  )
}
