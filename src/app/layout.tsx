import './globals.css'
import '../styles/index.scss'
import '../../public/fontawesome/css/all.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'
import StyledComponentsRegistry from '../../lib/AntdRegistry'
import { Analytics } from '@vercel/analytics/react'
import Provider from '@/components/layout/Provider'
import { APP_NAME } from '@/types/constants'

const inter = Inter({ subsets: ['latin'] })

const title = `${APP_NAME} - English Learning with AI Chatbot`
const description = `Practice English, improve grammar, and enhance your skills with Ranga, the AI-powered chatbot.`

export const metadata: Metadata = {
  title,
  description,
  generator: 'Andy510@gmail.com',
  applicationName: 'Andy510@gmail.com',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'english chating',
    'practice english with ai',
    'ai chat',
    'practice with ai',
    'chatgpt',
    'learning english',
  ],
  authors: [{ name: 'Andy' }, { name: 'Andy', url: 'https://andydev.com' }],
  colorScheme: 'dark',
  creator: 'Andy',
  publisher: 'Andy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-UK': '/en-GB',
      'vi-VN': '/vi-VN',
    },
  },
  metadataBase: new URL('https://rangachat.com/'),
  openGraph: {
    title,
    description,
    url: 'https://rangachat.com/',
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title,
    description,
    siteId: '1467726470533754880',
    creator: '@Andy',
    creatorId: '1467726470533754880',
    images: ['https://rangachat.com/logo512.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: '/logo125.png',
    shortcut: '/logo125.png',
    apple: '/logo125.png',
    other: {
      rel: '/logo125.png',
      url: '/logo125.png',
    },
  },
  themeColor: 'black',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  category: 'education',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'dark ' + inter.className + ' vsc-initialized'}>
        <Provider>
          <ReduxProvider>
            <StyledComponentsRegistry>
              <main className="flex h-[100vh] overflow-hidden">{children}</main>
            </StyledComponentsRegistry>
          </ReduxProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}
