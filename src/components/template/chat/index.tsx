'use client'

import { useState } from 'react'
import { Conversations } from './components/Conversation'
import { InputBox } from './components/InputBox'
import { Message } from './components/Message'
import { AIModels, IMessage, initialConversation } from '@/types/chat'
import { SendMessageBody } from '@/service/chat/type'
import { ChatService } from '@/service/chat/index.service'
import { OpenAIMessgaeResponse } from '@/service/chat/openai'
import { AxiosResponse } from 'axios'
import { uniqueId } from 'lodash'
import { speak } from '@/helps/speech'

export const AIChat = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialConversation)
  const [isSending, setIsSending] = useState(false)

  const sendMessage = (message: string) => {
    if (!message || isSending) return

    setIsSending(true)
    const newMesages: IMessage[] = [
      ...messages,
      {
        id: uniqueId(),
        role: 'user',
        content: message,
      },
    ]
    const bodyMessage: SendMessageBody[] = [
      { role: 'system', content: AIModels[0].getDescription() },
      ...newMesages,
    ].map((message) => ({ role: message.role as SendMessageBody['role'], content: message.content }))
    setMessages(newMesages)

    ChatService.sendMessage(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const messageResponse = res.data?.choices[0]?.message.content
        speak(messageResponse)
        setMessages([...newMesages, { id: uniqueId(), role: 'assistant', content: messageResponse }])
      })
      .finally(() => setIsSending(false))
  }

  const handleAnalyst = (message: IMessage) => {
    const bodyMessage: SendMessageBody[] = [
      {
        role: 'system',
        content:
          'You will be provided with statements. Your task is to convert them to standard English and point out shortly what and why is wrong with that statements by Vietnamese.',
      },
      {
        role: 'user',
        content: message.content,
      },
    ]
    ChatService.sendMessage(bodyMessage).then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
      const comment = res.data?.choices[0]?.message.content
      const newMessage = [...messages].map((m) => (m.id === message.id ? { ...m, comment } : m))
      setMessages(newMessage)
    })
  }

  return (
    <div className="flex flex-grow h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Conversations />
        <div className="flex flex-col flex-auto h-full p-6 pb-0">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <Message messages={messages} isSending={isSending} analyst={handleAnalyst} />
              </div>
            </div>
            <InputBox sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
