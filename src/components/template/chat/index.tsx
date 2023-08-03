'use client'

import { useEffect, useState } from 'react'
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
import { getData } from '@/helps/storage'
import { LocalStorageKey } from '@/types/constants'

export interface IChatSetting {
  type: 'text' | 'voice'
  style: 'formal' | 'informal'
}

export const AIChat = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialConversation)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isGettingComment, setIsGettingComment] = useState(false)
  const [model] = useState<IAIModel>(AIModels[0])
  const [isShowComment, setIsShowComment] = useState(false)
  const [settings, setSettings] = useState<IChatSetting>(
    getData(LocalStorageKey.CHAT_SETTING) ?? {
      type: 'text',
      style: 'formal',
    }
  )

  const sendMessage = (message: string, recorded?: string) => {
    if (!message || isWaiting) return
    console.log('old', messages)
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
    const bodyMessage: SendMessageBody[] = [{ role: 'system', content: model.getDescription() }, ...newMesages].map(
      (message) => ({ role: message.role as SendMessageBody['role'], content: message.content })
    )
    setMessages(newMesages)
    ChatService.sendMessage(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const messageResponse = res.data?.choices[0]?.message.content
        speak(messageResponse)
        newMesages.push({ id: uniqueId(), role: 'assistant', content: messageResponse })
        setMessages(newMesages)
      })
      .finally(() => setIsWaiting(false))
  }

  const handleAnalyst = (message: IMessage) => {
    if (isGettingComment) return

    setIsGettingComment(true)
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
    ChatService.sendMessage(bodyMessage)
      .then((res: AxiosResponse<OpenAIMessgaeResponse>) => {
        const comment = res.data?.choices[0]?.message.content
        setIsShowComment(true)
        setMessages([...messages].map((m) => (m.id === message.id ? { ...m, comment } : m)))
      })
      .finally(() => setIsGettingComment(false))
  }

  useEffect(() => {
    scrollToBottom('#message-container')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.at(-1)])

  return (
    <div className="flex flex-grow h-screen max-h-[90vh] antialiased shadow">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Conversations />
        <div className="flex gap-7 flex-auto p-6 pb-0">
          <div className="flex gap-2 flex-grow flex-col">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Chat with {model.name}</span>

              <div className="flex gap-2">
                <SettingModal settings={settings} setSettings={setSettings} />
                <AppButton onClick={() => setIsShowComment(!isShowComment)} size="small" type="text">
                  <i className={`fa-solid fa-outdent text-xl ${isShowComment ? 'text-primary' : 'text-gray-500'}`}></i>
                </AppButton>
              </div>
            </div>
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl max-h-[95%] bg-gray-100 p-3">
              <Message
                messages={messages}
                isSending={isWaiting}
                isGettingComment={isGettingComment}
                model={model}
                settings={settings}
                setMessages={setMessages}
                handleAnalyst={handleAnalyst}
              />
              <InputBox sendMessage={sendMessage} isWaiting={isWaiting} />
            </div>
          </div>
          {isShowComment && <AnalyistedMessage messages={messages} />}
        </div>
      </div>
    </div>
  )
}
