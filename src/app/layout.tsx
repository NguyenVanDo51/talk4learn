import './globals.css'
import '../styles/index.scss'
import '../../public/fontawesome/css/all.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'
import StyledComponentsRegistry from '../../lib/AntdRegistry'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RangaChat - Learn English through Conversations with AI',
  description:
    'Enhance your English skills effortlessly with RangaChat, the innovative language learning app. Engage in natural conversations with our AI-powered chatbot, making language practice enjoyable and effective. Start chatting today to boost your English proficiency and fluency.',
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
