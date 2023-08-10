'use client'

import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { LoadingScreen } from '@/components/level1/Loading'

const AIChat = dynamic(() => import('@/components/template/chat') as any, {
  loading: () => <LoadingScreen />,
})

export default function AIChatPage(props: any) {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (status === 'authenticated') {
    return <AIChat />
  }

  window.location.replace('/api/auth/signin')
}
