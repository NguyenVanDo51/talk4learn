"use client"

import dynamic from 'next/dynamic'
 
const AIChat = dynamic(() => import('@/components/template/chat') as any, {
  loading: () => <p>Loading...</p>,
})

export default function AIChatPage() {
  return <AIChat />
}
