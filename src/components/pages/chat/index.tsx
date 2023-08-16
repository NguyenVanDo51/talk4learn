'use client'

import dynamic from 'next/dynamic'
import { APP_NAME } from '@/types/constants'
import { AppSpin } from '@/components/level1/antd/AppSpin'

const title = `${APP_NAME} - English Learning with AI Chatbot`
const description = `Practice English, improve grammar, and enhance your skills with Ranga, the AI-powered chatbot.`

const AIChat = dynamic(() => import('@/components/template/chat') as any, {
  loading: () => <AppSpin />,
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
