'use client'
import { getServerSession } from 'next-auth/next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Conversations } from './components/Conversation'
import { InputBox } from './components/InputBox'
import { Message } from './components/Message'
import { AIModels, IAIModel, IMessage, initialConversation } from '@/types/chat'
import { SendMessageBody } from '@/service/chat/request'
import { ChatService } from '@/service/chat/index.service'
import { OpenAIMessgaeResponse } from '@/service/chat/response'
import { AxiosResponse } from 'axios'
import { uniqueId } from 'lodash'
import { speak } from '@/helps/speech'
import { AnalyistedMessage } from './components/AnalystedMessage'
import { scrollToBottom } from '@/helpers/dom'
import { LocalStorageKey } from '@/types/constants'
import { ConfigProvider } from 'antd'
import { darkTheme } from '@/theme/themeConfig'
import { Header } from './components/Header'
import { useSpeech } from '@/hooks/helpers/useSpeech'
import { useDimention } from '@/hooks/helpers/useDimention'

export interface IChatSetting {
  type: 'text' | 'voice'
  inputType: 'text' | 'voice'
  style: 'formal' | 'informal'
  isShowAnalyst: boolean
}

const settingDefault: IChatSetting = {
  type: 'text',
  inputType: 'text',
  style: 'formal',
  isShowAnalyst: false,
}

export type IAnalystMessage = IMessage & { comment: string }

const AIChat = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialConversation)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isGettingComment, setIsGettingComment] = useState(false)
  const [initing, setIniting] = useState(true)
  const [model] = useState<IAIModel>(AIModels[0])
  const [settings, setSettings] = useState<IChatSetting>(settingDefault)
  const [analystedMessages, setAnalystMessages] = useState<IAnalystMessage[]>([])
  const { isShowAnalyst } = settings
  const { isDesktop } = useDimention()
  useSpeech()

  const analystedMessageIds = useMemo(() => {
    return analystedMessages.filter((m) => !m.content).map((m) => m.id)
  }, [analystedMessages])

  const sendMessage = (message: string, recorded?: string) => {
    if (!message || isWaiting) return
    setTimeout(() => {
      scrollToBottom('#message-container')
    }, 100)

    const messageObject: IMessage = {
      id: uniqueId(),
      role: 'user',
      content: message,
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
    ].map((message) => ({ role: message.role as SendMessageBody['role'], content: message.content }))

    ChatService.sendMessage(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const messageResponse = res.data?.choices[0]?.message.content
        speak(messageResponse)

        newMesages[messages.length - 1].status = 'success'
        newMesages.push({ id: uniqueId(), role: 'assistant', content: messageResponse })
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
        content: `- ${messages[messageIndex - 1].content}\n - ${message.content}`,
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
          .replaceAll(`AndyStrongBome's`, 'your')
          .replaceAll('AndyStrongBome', 'You')
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
    if (
      userNewestMessage &&
      // isShowAnalyst &&
      userNewestMessage?.role === 'user' &&
      userNewestMessage.status === 'success'
    ) {
      if (isDesktop) {
        if (isShowAnalyst) handleAnalyst()
      } else {
        handleAnalyst()
      }
    }

    if (newestMessage?.status !== 'error') {
      getAnswer()
    }

    localStorage.setItem(LocalStorageKey.CHAT_HISTORY, JSON.stringify(messages))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    scrollToBottom('#message-container')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  useEffect(() => {
    const value = localStorage.getItem(LocalStorageKey.CHAT_SETTING)
    // const msg = localStorage.getItem(LocalStorageKey.CHAT_HISTORY)
    value && setSettings(JSON.parse(value))
    // msg && setMessages(JSON.parse(msg))
  }, [])

  useEffect(() => {
    localStorage.setItem(LocalStorageKey.CHAT_SETTING, JSON.stringify(settings))
    setIniting(false)
  }, [settings])

  return (
    <ConfigProvider theme={darkTheme}>
      <div className="flex flex-grow h-screen antialiased shadow">
        <div className="flex flex-row h-full w-full">
          <Conversations />
          <div className="flex flex-grow justify-center">
            <div className="grid grid-cols-12 w-full">
              <div
                className={`col-start-1 col-end-13 ${
                  isShowAnalyst ? 'lg:col-end-8' : 'lg:col-end-13'
                } flex flex-grow flex-col`}
              >
                <Header
                  model={model}
                  settings={settings}
                  isShowAnalyst={isShowAnalyst}
                  setIsShowComment={setIsShowComment}
                  setSettings={setSettings}
                />

                <div className="grid h-full bg-gray-100 dark:bg-dark-main">
                  <Message
                    initing={initing}
                    messages={messages}
                    isSending={isWaiting}
                    isGettingComment={isGettingComment}
                    model={model}
                    settings={settings}
                    setMessages={setMessages}
                    reSend={reSend}
                  />
                  {!initing && (
                    <InputBox
                      sendMessage={sendMessage}
                      setSettings={setSettings}
                      isWaiting={isWaiting}
                      settings={settings}
                    />
                  )}
                </div>
              </div>

              {!initing && (
                <AnalyistedMessage
                  isShowAnalyst={isShowAnalyst}
                  isGettingComment={isGettingComment}
                  analystedMessages={analystedMessages}
                  setAnalystMessages={setAnalystMessages}
                  setIsShowComment={setIsShowComment}
                  handleAnalyst={handleAnalyst}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default AIChat
