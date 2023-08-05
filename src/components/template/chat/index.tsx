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
import { LocalStorageKey } from '@/types/constants'
import { ConfigProvider, Spin } from 'antd'
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
  const [initing, setIniting] = useState(true)
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
    const newMesages: IMessage[] = [...messages, messageObject]
    setMessages(newMesages)
  }

  const getAnswer = useCallback(() => {
    const newMesages: IMessage[] = [...messages]
    const userMessage = newMesages.at(-1)
    console.log('userMessage', userMessage)
    if (userMessage?.role !== 'user') return
    if (userMessage.status === 'success') return

    setIsWaiting(true)
    const bodyMessage: SendMessageBody[] = [
      { role: 'system', content: model.getDescription() },
      ...messages,
      userMessage,
    ].map((message) => ({ role: message.role as SendMessageBody['role'], content: message.content }))

    // newMesages[messages.length - 1].status = 'sent'
    // setMessages(newMesages)

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

  const handleAnalyst = useCallback(
    (message: IMessage) => {
      if (isGettingComment || analystedMessageIds.includes(message.id)) return

      setIsGettingComment(true)
      const messageIndex = messages.findIndex((m) => m.id === message.id)
      if (messageIndex === -1) return

      const bodyMessage: SendMessageBody[] = [
        {
          role: 'user',
          content: `Jenny: ${messages[messageIndex - 1].content}\n AndyStrongBome: ${message.content}`,
        },
      ]

      const newAnalystedMessages: IAnalystMessage[] = [
        ...analystedMessages,
        { ...message, comment: '', status: 'sent' },
      ]
      setAnalystMessages(newAnalystedMessages)

      ChatService.checkGrammar(bodyMessage)
        .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
          const comment = res.data?.choices[0]?.message.content
            .replaceAll(`AndyStrongBome's`, 'your')
            .replaceAll('AndyStrongBome', 'You')
          newAnalystedMessages[newAnalystedMessages.length - 1].comment = comment
          newAnalystedMessages[newAnalystedMessages.length - 1].status = 'success'
          setAnalystMessages(newAnalystedMessages)
        })
        .catch(() => {
          newAnalystedMessages[newAnalystedMessages.length - 1].status = 'error'
          setAnalystMessages(newAnalystedMessages)
        })
        .finally(() => setIsGettingComment(false))
    },
    [analystedMessageIds, analystedMessages, isGettingComment, messages]
  )

  const newestMessage = messages.at(-1)

  const reSend = () => {
    getAnswer()
  }

  useEffect(() => {
    const userNewestMessage = messages.at(-2)
    if (
      userNewestMessage &&
      isShowAnalyst &&
      userNewestMessage?.role === 'user' &&
      userNewestMessage.status === 'success'
    ) {
      handleAnalyst(userNewestMessage)
    }
    if (newestMessage?.status !== 'error') {
      getAnswer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    scrollToBottom('#message-container')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  useEffect(() => {
    const value = localStorage.getItem(LocalStorageKey.CHAT_SETTING)
    if (!value) return

    setSettings(JSON.parse(value))
  }, [])

  useEffect(() => {
    localStorage.setItem(LocalStorageKey.CHAT_SETTING, JSON.stringify(settings))
    setIniting(false)
  }, [settings])

  return (
    <ConfigProvider theme={darkTheme}>
      <div className="flex flex-grow h-screen max-h-[90vh] antialiased shadow">
        <div className="flex flex-row h-full w-full">
          <Conversations />
          <div className="grid grid-cols-12 gap-7 p-6 pb-0 w-full">
            <div className={`col-start-1 ${isShowAnalyst ? 'col-end-8' : 'col-end-12'} flex gap-2 flex-grow flex-col`}>
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
                  initing={initing}
                  messages={messages}
                  isSending={isWaiting}
                  isGettingComment={isGettingComment}
                  model={model}
                  settings={settings}
                  setMessages={setMessages}
                  handleAnalyst={handleAnalyst}
                  reSend={reSend}
                />
                {!initing && <InputBox sendMessage={sendMessage} isWaiting={isWaiting} settings={settings} />}
              </div>
            </div>

            {isShowAnalyst && (
              <AnalyistedMessage isGettingComment={isGettingComment} analystedMessages={analystedMessages} />
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default AIChat
