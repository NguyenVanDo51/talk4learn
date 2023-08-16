'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { InputBox } from './components/InputBox'
import { Message } from './messages'
import { IMessage, initialConversation } from '@/types/chat'
import { SendMessageBody } from '@/service/chat/request'
import { ChatService } from '@/service/chat/index.service'
import { OpenAIMessgaeResponse } from '@/service/chat/response'
import { AxiosResponse } from 'axios'
import { AnalyistedMessage } from './components/AnalystedMessage'
import { ScrollSelecter, scrollToBottom } from '@/helpers/dom'
import { LocalStorageKey } from '@/types/constants'
import { useDimention } from '@/hooks/helpers/useDimention'
import { v4 } from 'uuid'
import { IAIModel, AIModels } from '@/types/chat/models'
import { SpeakerService } from '@/service/speaker'

export interface IChatSetting {
  style: 'formal' | 'informal'
  isShowAnalyst: boolean
}

const settingDefault: IChatSetting = {
  style: 'formal',
  isShowAnalyst: false,
}

export type IAnalystMessage = IMessage & { comment: string }

const AIChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isWaiting, setIsWaiting] = useState(false)
  const [isGettingComment, setIsGettingComment] = useState(false)
  const [initing, setIniting] = useState(true)
  const [model] = useState<IAIModel>(AIModels[0])
  const [settings, setSettings] = useState<IChatSetting>(settingDefault)
  const [analystedMessages, setAnalystMessages] = useState<IAnalystMessage[]>([])
  const { isShowAnalyst } = settings
  const { isDesktop } = useDimention()

  const analystedMessageIds = useMemo(() => {
    return analystedMessages.filter((m) => !!m.comment).map((m) => m.id)
  }, [analystedMessages])

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
      { role: 'system', content: model.getDescription() },
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
  }, [messages, model])

  const setIsShowComment = (value: boolean) => {
    setSettings({ ...settings, isShowAnalyst: value })
  }

  const handleAnalyst = useCallback(() => {
    const message = messages.at(-2)
    if (!message || isGettingComment || analystedMessageIds.includes(message.id)) return

    setIsGettingComment(true)
    const messageIndex = messages.findIndex((m) => m.id === message.id)
    if (messageIndex === -1) return

    const bodyMessage: SendMessageBody[] = [
      {
        role: 'user',
        content: message.content,
      },
    ]

    const newAnalystedMessages: IAnalystMessage[] = [...analystedMessages]
    if (newAnalystedMessages.at(-1)?.id === message.id) {
      newAnalystedMessages.at(-1)!.comment = ''
      newAnalystedMessages.at(-1)!.status = 'sent'
    } else {
      newAnalystedMessages.push({ ...message, comment: '', status: 'sent' })
    }
    setAnalystMessages(newAnalystedMessages)

    ChatService.checkGrammar(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const comment = res.data?.choices[0]?.message.content
        newAnalystedMessages.at(-1)!.comment = comment
        newAnalystedMessages.at(-1)!.status = 'success'
        setAnalystMessages(newAnalystedMessages)
      })
      .catch(() => {
        newAnalystedMessages.at(-1)!.status = 'error'
        setAnalystMessages(newAnalystedMessages)
      })
      .finally(() => setIsGettingComment(false))
  }, [analystedMessageIds, analystedMessages, isGettingComment, messages])

  const reSend = () => {
    getAnswer()
  }
  const userNewestMessage = messages.at(-2)
  const newestMessage = messages.at(-1)

  useEffect(() => {
    if (userNewestMessage && userNewestMessage?.role === 'user' && userNewestMessage.status === 'success') {
      if (isDesktop) {
        if (isShowAnalyst) handleAnalyst()
      } else {
        handleAnalyst()
      }
    }

    if (newestMessage?.status !== 'error') {
      getAnswer()
    }

    if (messages.length > 0) {
      localStorage.setItem(LocalStorageKey.CHAT_HISTORY, JSON.stringify(messages))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    scrollToBottom(ScrollSelecter.Message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  useEffect(() => {
    const value = localStorage.getItem(LocalStorageKey.CHAT_SETTING)
    const msg = localStorage.getItem(LocalStorageKey.CHAT_HISTORY)

    value && setSettings(JSON.parse(value))
    setMessages(msg ? JSON.parse(msg) : initialConversation)
  }, [])

  useEffect(() => {
    localStorage.setItem(LocalStorageKey.CHAT_SETTING, JSON.stringify(settings))
    setIniting(false)
  }, [settings])

  return (
    <div className="flex flex-grow justify-center h-full">
      <div className="grid grid-cols-12 w-full gap-6">
        <div className={`col-start-1 col-end-13 flex flex-grow flex-col`}>
          <div
            className="grid bg-gray-100 dark:bg-dark-active-main-bg rounded-3xl"
            style={{ height: 'calc(100% - 12px)' }}
          >
            <Message
              initing={initing}
              messages={messages}
              isSending={isWaiting}
              isGettingComment={isGettingComment}
              model={model}
              setMessages={setMessages}
              reSend={reSend}
            />
            {!initing && (
              <InputBox sendMessage={sendMessage} setSettings={setSettings} isWaiting={isWaiting} settings={settings} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChat
