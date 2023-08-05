'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Conversations } from './components/Conversation'
import { InputBox } from './components/InputBox'
import { Message } from './components/Message'
import { AIModels, IAIModel, IMessage, initialConversation } from '@/types/chat'
import { SendMessageBody } from '@/service/chat/type'
import { ChatService } from '@/service/chat/index.service'
import { OpenAIMessgaeResponse } from '@/service/chat/openai'
import { AxiosResponse } from 'axios'
import { uniqueId } from 'lodash'
import { speak } from '@/helps/speech'
import { AnalyistedMessage } from './components/AnalystedMessage'
import { AppButton } from '@/components/level1/AppButton'
import { scrollToBottom } from '@/helpers/dom'
import { SettingModal } from './components/SettingModal'
// import { getData } from '@/helps/storage'
import { LocalStorageKey } from '@/types/constants'
import { ConfigProvider } from 'antd'
import { darkTheme } from '@/theme/themeConfig'

export interface IChatSetting {
  type: 'text' | 'voice'
  style: 'formal' | 'informal'
  isShowAnalyst: boolean
}

const settingDefault: IChatSetting = {
  type: 'text',
  style: 'formal',
  isShowAnalyst: true,
}

export type IAnalystMessage = IMessage & { comment: string }

const AIChat = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialConversation)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isGettingComment, setIsGettingComment] = useState(false)
  const [model] = useState<IAIModel>(AIModels[0])
  const [settings, setSettings] = useState<IChatSetting>(settingDefault)
  const [analystedMessages, setAnalystMessages] = useState<IAnalystMessage[]>([])
  const { isShowAnalyst } = settings

  const analystedMessageIds = useMemo(() => {
    return analystedMessages.map((m) => m.id)
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
    setIsWaiting(true)
    const newMesages: IMessage[] = [...messages, messageObject]
    setMessages(newMesages)
  }

  const getAnswer = useCallback(() => {
    const userMessage = messages.pop()
    if (userMessage?.role !== 'user') return

    const bodyMessage: SendMessageBody[] = [
      { role: 'system', content: model.getDescription() },
      ...messages,
      userMessage,
    ].map((message) => ({ role: message.role as SendMessageBody['role'], content: message.content }))

    return ChatService.sendMessage(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const messageResponse = res.data?.choices[0]?.message.content
        speak(messageResponse)

        const newMesages: IMessage[] = [...messages, { ...userMessage, status: 'success' }]
        newMesages.push({ id: uniqueId(), role: 'assistant', content: messageResponse })
        setMessages(newMesages)
      })
      .catch(() => {
        const newMesages: IMessage[] = [...messages, { ...userMessage, status: 'error' }]
        setMessages(newMesages)
      })
      .finally(() => setIsWaiting(false))
  }, [messages, model])

  const setIsShowComment = (value: boolean) => {
    setSettings({ ...settings, isShowAnalyst: value })
  }

  const handleAnalyst = useCallback(
    (message: IMessage) => {
      if (isGettingComment) return

      setIsGettingComment(true)
      const messageIndex = messages.findIndex((m) => m.id === message.id)
      if (messageIndex === -1) return

      const bodyMessage: SendMessageBody[] = [
        {
          role: 'user',
          content: `Jenny: ${messages[messageIndex - 1].content}\n AndyStrongBome: ${message.content}`,
        },
      ]

      ChatService.checkGrammar(bodyMessage)
        .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
          const comment = res.data?.choices[0]?.message.content
            .replaceAll(`AndyStrongBome's`, 'your')
            .replaceAll('AndyStrongBome', 'You')
          setAnalystMessages([...analystedMessages, { ...message, comment }])
        })
        .finally(() => setIsGettingComment(false))
    },
    [analystedMessages, isGettingComment, messages]
  )

  useEffect(() => {
    const newestMessage = messages.at(-1)
    const userNewestMessage = messages.at(-2)

    if (
      userNewestMessage &&
      isShowAnalyst &&
      !analystedMessageIds.includes(userNewestMessage.id) &&
      userNewestMessage?.role === 'user' &&
      userNewestMessage.status === 'success'
    ) {
      handleAnalyst(userNewestMessage)
    }

    if (newestMessage?.role === 'user') {
      getAnswer()
    }
  }, [analystedMessageIds, getAnswer, handleAnalyst, isShowAnalyst, messages])

  useEffect(() => {
    scrollToBottom('#message-container')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.at(-1)])

  useEffect(() => {
    const value = localStorage.getItem(LocalStorageKey.CHAT_SETTING)
    if (!value) return

    setSettings(JSON.parse(value))
  }, [])

  useEffect(() => {
    localStorage.setItem(LocalStorageKey.CHAT_SETTING, JSON.stringify(settings))
  }, [settings])

  return (
    <ConfigProvider theme={darkTheme}>
      <div className="flex flex-grow h-screen max-h-[90vh] antialiased shadow">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <Conversations />
          <div className="flex gap-7 flex-auto p-6 pb-0">
            <div className="flex gap-2 flex-grow flex-col">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Chat with {model.name}</span>

                <div className="flex gap-2">
                  <SettingModal settings={settings} setSettings={setSettings} />
                  <AppButton onClick={() => setIsShowComment(!isShowAnalyst)} size="small" type="text">
                    <i
                      className={`fa-solid fa-outdent text-xl ${isShowAnalyst ? 'text-primary' : 'text-gray-500'}`}
                    ></i>
                  </AppButton>
                </div>
              </div>

              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl max-h-[95%] bg-gray-100 dark:bg-black p-3">
                <Message
                  messages={messages}
                  isSending={isWaiting}
                  isGettingComment={isGettingComment}
                  model={model}
                  settings={settings}
                  setMessages={setMessages}
                  handleAnalyst={handleAnalyst}
                />
                <InputBox sendMessage={sendMessage} isWaiting={isWaiting} settings={settings} />
              </div>
            </div>

            {isShowAnalyst && <AnalyistedMessage messages={analystedMessages} />}
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default AIChat
