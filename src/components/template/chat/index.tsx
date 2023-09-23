'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import { InputBox } from './components/InputBox'
import { Message } from './components/messages'
import { IMessage } from '@/types/chat'
import { AxiosResponse } from 'axios'
import { ScrollSelecter, scrollToBottom } from '@/helpers/dom'
import { v4 } from 'uuid'
import { AIModels } from '@/types/chat/models'
import { SpeakerService } from '@/service/speaker'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Header } from './components/Header'
import { ModalInfo, ModalSuccess } from '@/components/level1/antd/AppModal'
import { CupIcon } from './icons/cup'
import { Alert, App, Divider, Input, Modal } from 'antd'
import { AppButton } from '@/components/level1/antd/AppButton'
import { HelperBox } from './components/HelperBox'
import { ChatService } from './service'
import { SendMessageBody } from './service/request'
import { OpenAIMessgaeResponse } from './service/response'
import { Translation } from './components/Translation'
import { Suggestions } from './components/Suggestions'
import { ChatContext } from './context'

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
  const router = useRouter()

  const sendMessage = async (message: string | Blob, recorded?: string) => {
    if (isWaiting) return
    if (typeof message === 'string' && !message.trim()) return
    const messageObject: IMessage = {
      id: v4(),
      role: 'user',
      content: '',
      recorded,
    }

    if (typeof message === 'string') {
      messageObject.content = message
    } else {
      setIsWaiting(true)
      const res = await ChatService.speechToText(message)
      setIsWaiting(false)

      if (res.data) {
        messageObject.content = res.data
      }
    }

    if (!messageObject.content) {
      return
    }
    setTimeout(() => {
      scrollToBottom(ScrollSelecter.Message)
    }, 100)

    const newMesages: IMessage[] = [...messages, messageObject]
    setMessages(newMesages)
  }

  const handleDoneMessage = useCallback(() => {
    ModalSuccess.show({
      title: '',
      icon: null,
      content: (
        <div className="flex flex-col items-center justify-center gap-4">
          <CupIcon size={128} isColor />
          <span className="font-medium text-xl">Chúc mừng, bạn đã hoàn thành bài học!</span>
        </div>
      ),
      footer: (
        <div className="mt-5 flex gap-3 justify-end">
          <AppButton
            type="text"
            onClick={() => {
              router.back()
              Modal.destroyAll()
            }}
          >
            Hoàn thành
          </AppButton>
          <AppButton onClick={() => Modal.destroyAll()}>Tiếp tục</AppButton>
        </div>
      ),
    })
  }, [router])

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
        if (messageResponse.includes('Done_message')) {
          handleDoneMessage()
          return
        }

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
  }, [handleDoneMessage, messages, systemMessage])

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
    <ChatContext.Provider value={{ messages }}>
      <div className="flex flex-grow gap-4 justify-center h-full bg-[#ebedf8] overflow-hidden">
        <div className="w-full md:w-[567px] bg-white shadow-md">
          <Header />
          <Message
            infomation={infomation}
            messages={messages}
            isSending={isWaiting}
            setMessages={setMessages}
            reSend={reSend}
          />
          <InputBox sendMessage={sendMessage} isWaiting={isWaiting} />
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <Suggestions />

          <Translation />
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default AIChat
