import './globals.css'
import '../styles/index.scss'
import '../../public/fontawesome/css/all.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'
import StyledComponentsRegistry from '../../lib/AntdRegistry'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

const title = 'RangaChat - Learn English through Conversations with AI'
const description =
  'Master English effortlessly with RangaChat. Practice language skills by chatting with our AI, making learning enjoyable and effective. Start now for fluency!'
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
      'en-UK': '/en-UK',
    },
  },
  metadataBase: new URL('https://rangachat.com/'),
  openGraph: {
    title,
    description,
    url: 'https://rangachat.com/',
    siteName: 'RangaChat',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title,
    description,
    siteId: '1467726470533754880',
    creator: '@Andy',
    creatorId: '1467726470533754880',
    images: ['https://rangachat.com/logo.svg'],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
    other: {
      rel: '/logo.svg',
      url: '/logo.svg',
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
      <body className={inter.className + ' dark'}>
        <ReduxProvider>
          <StyledComponentsRegistry>
            {/* <MainHeader /> */}
            <main
              className="flex h-[100vh] overflow-hidden"
              // style={{ minHeight: 'calc(100vh - 46px)' }}
            >
              {children}
            </main>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
      <Analytics />
    </html>
  )
}
