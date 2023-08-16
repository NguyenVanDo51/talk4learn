'use client'

import dynamic from 'next/dynamic'
import { AppSpin } from '@/components/level1/antd/AppSpin'

const Conversations = dynamic(() => import('@/components/template/conversations') as any, {
  loading: () => <AppSpin />,
})

export default function ConversationsPage() {
  return <Conversations />
}
