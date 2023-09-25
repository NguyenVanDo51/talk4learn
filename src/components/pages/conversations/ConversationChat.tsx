import dynamic from 'next/dynamic'
import { AppSpin } from '@/components/level1/antd/AppSpin'
import { lessons } from '@/api/lesson'
import { redirect } from 'next/navigation'

const ConversationChat = dynamic(() => import('@/components/template/chat'), {
  loading: () => <AppSpin />,
})

export default function ConversationChatPage(props: any) {
  const lesson = lessons.find((l) => l.id === props.params.id)
  if (!lesson) {
    redirect('/not-found')
  }

  return <ConversationChat lesson={lesson} />
}
