'use client'

import dynamic from 'next/dynamic'
import { signIn, useSession } from 'next-auth/react'
import { LoadingScreen } from '@/components/level1/Loading'
import { AppButton } from '@/components/level1/antd/AppButton'
import Link from 'next/link'

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

  return (
    <div className="w-[100vw] -h-[100vh] flex items-center justify-center">
      <AppButton onClick={() => signIn('google')}>
        {/* <Link href={'/api/auth/signin'}> */}
          Login to continue
          {/* </Link> */}
      </AppButton>
    </div>
  )
}
