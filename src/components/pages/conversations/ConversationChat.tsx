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
  const lang = useAppSelector((t) => t.setting.lang)
  const lesson = lessons.find((l) => l.id === props.params.id)
  if (!lesson) {
    window.location.href = '/not-found'
  }

  return <ConversationChat initialSystemMessage={generatePrompt(lesson!)} infomation={lesson?.userContext[lang]} />
}

const generatePrompt = (lesson: ILesson): string => {
  const { modelContext } = lesson

  const prompt = `your task is practice english with the user through a role-playing game.
Situation: ${modelContext}.
The Rules:
- Provide concise answers.
- Maximum 50 words in 1 response.
- In case the user responds with unrelated questions or statements, let them know.
- Ask them practical questions when encountering real-life situations.
- When the situation concludes, send a message with the content 'done_message'.`
  return prompt
}
