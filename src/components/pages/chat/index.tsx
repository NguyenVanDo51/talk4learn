'use client'

import dynamic from 'next/dynamic'
import { LoadingScreen } from '@/components/level1/Loading'
import { AuthenLayout } from '@/components/layout/AuthenLayout'

const AIChat = dynamic(() => import('@/components/template/chat') as any, {
  loading: () => <LoadingScreen />,
})

export default function AIChatPage() {
  return (
    <AuthenLayout>
      <AIChat />
    </AuthenLayout>
  )
}

export async function getServerSideProps({ res }: any) {
  return {
    props: {},
  }
}
