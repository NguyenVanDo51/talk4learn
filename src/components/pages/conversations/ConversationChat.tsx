'use client'

import dynamic from 'next/dynamic'
import { AppSpin } from '@/components/level1/antd/AppSpin'
import { lessons } from '@/api/lesson'
import { ILesson } from '@/types/lesson/type'

const ConversationChat = dynamic(() => import('@/components/template/chat'), {
  loading: () => <AppSpin />,
})

export default function ConversationChatPage(props: any) {
  console.log('props', props)
  const lesson = lessons.find((l) => l.id === props.params.id)
  if (!lesson) {
    window.location.href = '/not-found'
  }

  return <ConversationChat initialSystemMessage={generatePrompt(lesson!)} />
}

const generatePrompt = (lesson: ILesson): string => {
  const { modelContext, modelTask, level } = lesson

  const prompt = `
   you receive messages and responses with your role. and follow the rules:
- ${modelContext}.
- your task: ${modelTask}
- using vocabulary range in ${level} English level
- at the end of the conversation, response: "The end."
  `
  return prompt
}
