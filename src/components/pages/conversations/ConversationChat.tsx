'use client'

import dynamic from 'next/dynamic'
import { AppSpin } from '@/components/level1/antd/AppSpin'
import { lessons } from '@/api/lesson'
import { ILesson } from '@/types/lesson/type'
import { useAppSelector } from '@/hooks/redux'

const ConversationChat = dynamic(() => import('@/components/template/chat'), {
  loading: () => <AppSpin />,
})

export default function ConversationChatPage(props: any) {
  console.log('props', props)
  const lang = useAppSelector((t) => t.setting.lang)
  const lesson = lessons.find((l) => l.id === props.params.id)
  if (!lesson) {
    window.location.href = '/not-found'
  }

  return <ConversationChat initialSystemMessage={generatePrompt(lesson!)} infomation={lesson?.userContext[lang]} />
}

const generatePrompt = (lesson: ILesson): string => {
  const { modelContext } = lesson

  const prompt = `role-playing game:
Situation: ${modelContext}.
The Rules:
- Provide concise answers.
- After the user achieves their desired outcome and no longer requires assistance, respond with only word:'done_message'.`
  return prompt
}
