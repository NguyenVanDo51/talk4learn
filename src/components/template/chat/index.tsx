'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import { InputBox } from './components/InputBox'
import { Message } from './messages'
import { IMessage } from '@/types/chat'
import { SendMessageBody } from '@/service/chat/request'
import { ChatService } from '@/service/chat/index.service'
import { OpenAIMessgaeResponse } from '@/service/chat/response'
import { AxiosResponse } from 'axios'
import { ScrollSelecter, scrollToBottom } from '@/helpers/dom'
import { v4 } from 'uuid'
import { AIModels } from '@/types/chat/models'
import { SpeakerService } from '@/service/speaker'

export type IAnalystMessage = IMessage & { comment: string }

interface IProps {
  initialSystemMessage?: string
  storageKey?: string
  initialMessages?: IMessage[]
  infomation?: string
}

const AIChat: FC<IProps> = ({ initialSystemMessage, storageKey, initialMessages, infomation }) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages ?? [])
  const [isWaiting, setIsWaiting] = useState(false)
  const [systemMessage] = useState<string>(initialSystemMessage ?? AIModels[0].getDescription())

  const sendMessage = (message: string, recorded?: string) => {
    if (!message.trim() || isWaiting) return
    setTimeout(() => {
      scrollToBottom(ScrollSelecter.Message)
    }, 100)

    const messageObject: IMessage = {
      id: v4(),
      role: 'user',
      content: message.trim(),
      recorded,
    }
    const newMesages: IMessage[] = [...messages, messageObject]
    setMessages(newMesages)
  }

  const getAnswer = useCallback(() => {
    const newMesages: IMessage[] = [...messages]
    const userMessage = newMesages.at(-1)
    if (userMessage?.role !== 'user') return
    if (userMessage.status === 'success') return

    setIsWaiting(true)
    const bodyMessage: SendMessageBody[] = [
      { role: 'system', content: systemMessage },
      ...messages,
      userMessage,
    ].map((message) => ({
      role: message.role as SendMessageBody['role'],
      content: message.content.at(-1) !== '.' ? `${message.content}.` : message.content,
    }))

    ChatService.sendMessage(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const messageResponse = res.data?.choices[0]?.message.content
        SpeakerService.speak(messageResponse)

        newMesages[messages.length - 1].status = 'success'
        newMesages.push({ id: v4(), role: 'assistant', content: messageResponse })
        setMessages(newMesages)
      })
      .catch(() => {
        newMesages[messages.length - 1].status = 'error'
        setMessages(newMesages)
      })
      .finally(() => setIsWaiting(false))
  }, [messages, systemMessage])

  const getFirstMessage = () => {
    setIsWaiting(true)
    ChatService.sendMessage([
      { role: 'system', content: systemMessage },
      { role: 'user', content: 'excuse me' },
    ])
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const messageResponse = res.data?.choices[0]?.message.content
        const message: IMessage = {
          id: v4(),
          role: 'assistant',
          content: messageResponse,
        }
        SpeakerService.speak(messageResponse)

        setMessages([message])
      })
      .finally(() => setIsWaiting(false))
  }

  const reSend = () => {
    getAnswer()
  }
  const newestMessage = messages.at(-1)

  useEffect(() => {
    if (newestMessage?.status !== 'error') {
      getAnswer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    scrollToBottom(ScrollSelecter.Message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  useEffect(() => {
    if (!initialMessages) {
      getFirstMessage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessages])

  useEffect(() => {
    if (storageKey && messages.length > 1) {
      localStorage.setItem(storageKey, JSON.stringify(messages))
    }
  }, [messages, storageKey])

  useEffect(() => {
    if (!storageKey) return

    const msg = localStorage.getItem(storageKey)
    if (msg) {
      setMessages(JSON.parse(msg))
    }
  }, [initialMessages, storageKey])

  return (
    <div className="flex flex-grow justify-center h-full">
      <div className="w-full bg-gray-100 dark:bg-dark-active-main-bg rounded-3xl">
        <Message
          infomation={infomation}
          messages={messages}
          isSending={isWaiting}
          setMessages={setMessages}
          reSend={reSend}
        />
        <InputBox sendMessage={sendMessage} isWaiting={isWaiting} />
      </div>
    </div>
  )
}

export default AIChat
