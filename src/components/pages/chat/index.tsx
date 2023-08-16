'use client'

import dynamic from 'next/dynamic'
import { LoadingScreen } from '@/components/level1/Loading'
import { AuthenLayout } from '@/components/layout/AuthenLayout'
import { APP_NAME } from '@/types/constants'

const title = `${APP_NAME} - English Learning with AI Chatbot`
const description = `Practice English, improve grammar, and enhance your skills with Ranga, the AI-powered chatbot.`

const AIChat = dynamic(() => import('@/components/template/chat') as any, {
  loading: () => <LoadingScreen />,
})

export default function AIChatPage() {
  return <AIChat />
}

export async function getServerSideProps({ res }: any) {
  return {
    props: {
      title: title,
      description: description,
    },
  }
}
