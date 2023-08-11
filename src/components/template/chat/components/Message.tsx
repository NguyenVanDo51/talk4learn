import { AppButton, AppDeleteButton } from '@/components/level1/antd/AppButton'
import { ScrollSelecter, scrollToBottom } from '@/helpers/dom'
import { speak } from '@/helps/speech'
import { IMessage } from '@/types/chat'
import { Avatar, Spin } from 'antd'
import { FC, memo, useEffect, useState } from 'react'
import { IChatSetting } from '..'
import { AudioPlayer } from '@/components/level1/AudioPlayer'
import { useSession } from 'next-auth/react'
import { IAIModel } from '@/types/chat/models'
import { SpeakerService } from '@/service/speaker'

interface IProps {
  isSending: boolean
  messages: IMessage[]
  isGettingComment: boolean
  model: IAIModel
  settings: IChatSetting
  initing: boolean
  setMessages: (messages: IMessage[]) => void
  reSend: () => void
}

export const Message: FC<IProps> = (props) => {
  const { messages, initing, isSending, setMessages, settings } = props
  const reStart = (index: number) => {
    setMessages(messages.slice(0, index))
  }

  const inputHeight = settings.inputType === 'voice' ? 160 : 135
  const { data } = useSession()
  const readText = (text: string) => {
    SpeakerService.speak(text)
  }

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-2 lg:p-3"
      id="message-container"
      style={{
        height: `calc(100vh - ${inputHeight}px)`,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2 pb-10">
          {initing ? (
            <div className="w-fit p-3">
              <Spin />
            </div>
          ) : (
            messages.map((message, index) =>
              message.role === 'assistant' ? (
                <LeftMessage
                  {...props}
                  readText={readText}
                  message={message}
                  isLastItem={messages.at(-1)?.id === message.id}
                  key={message.id || `msg_${index}`}
                />
              ) : (
                <RightMessage
                  key={`msg_${index}`}
                  {...props}
                  avatar={data?.user?.image}
                  message={message}
                  reStart={() => reStart(index)}
                />
              )
            )
          )}

          {isSending && (
            <div className="col-start-1 col-end-12 px-3">
              <Spin spinning />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface LeftMessageProps extends IProps {
  message: IMessage
  isLastItem: boolean
  readText: (text: string) => void
}

const LeftMessage = memo(function LeftMessage({ message, model, settings, isLastItem, readText }: LeftMessageProps) {
  const { content } = message
  const contentArray = content.split(' ')
  // const [text, setText] = useState(contentArray[0])
  const [type, setType] = useState(settings.type)

  // useEffect(() => {
  //   if (!isLastItem) {
  //     return
  //   }
  //   let index = 2
  //   let interval = setInterval(() => {
  //     if (index > contentArray.length) clearInterval(interval)

  //     setText(contentArray.slice(0, index).join(' '))
  //     index++
  //   }, 150)

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const onChangeType = () => {
    setType(type === 'text' ? 'voice' : 'text')
    SpeakerService.cancel()
    if (isLastItem) {
      scrollToBottom(ScrollSelecter.Message)
    }
  }

  useEffect(() => {
    setType(settings.type)
  }, [settings.type])

  return (
    <>
      <div className="col-start-1 col-end-12 p-1 rounded-lg message-item" id={message.id}>
        <div className="flex gap-2 lg:gap-3 flex-row items-center">
          <Avatar size={'default'} className="min-w-[32px] bg-indigo-400 dark:bg-slate-800">
            {model.name.at(0)}
          </Avatar>

          <div className="text-sm bg-white dark:bg-slate-700 py-1 px-4 shadow rounded-3xl max-w-full overflow-hidden">
            {type === 'voice' ? (
              <AudioPlayer text={content} />
            ) : (
              <div className="py-1">{content}</div>
            )}
          </div>

          <div className="message-actions flex items-center gap-2">
            {type === 'text' && (
              <AppButton
                onClick={() => speak(content)}
                size="small"
                type="link"
                icon={<i className="fa-solid fa-volume-low"></i>}
              />
            )}

            <AppButton
              onClick={onChangeType}
              type="link"
              size="small"
              danger={false}
              icon={<i className="fa-solid fa-arrows-rotate"></i>}
            />
          </div>
        </div>
      </div>
    </>
  )
})

interface RightMessageProps extends IProps {
  message: IMessage
  avatar: string | null | undefined
  reStart: () => void
}

const RightMessage = memo(function RightMessage({ message, avatar, reStart, reSend }: RightMessageProps) {
  return (
    <div className="col-start-2 col-end-13 p-1 rounded-lg  message-item" id={message.id}>
      <div className="flex items-center gap-3 justify-start  flex-row-reverse">
        <div className="relative text-sm bg-indigo-100 dark:bg-dark-primary py-2 px-4 shadow rounded-3xl">
          <div>{message.content}</div>
        </div>

        {message.status === 'error' ? (
          <AppButton
            onClick={reSend}
            type="link"
            size="small"
            danger
            icon={<i className="fa-solid fa-rotate-left m-0"></i>}
          >
            Failed
          </AppButton>
        ) : (
          <div className="message-actions flex items-center gap-2">
            <AppDeleteButton onConfirm={reStart} title="Delete" type="link" />

            {message.recorded && (
              <AppButton
                onClick={() => {
                  new Audio(message.recorded).play()
                }}
                size="small"
                type="link"
                icon={<i className="fa-solid fa-volume-low"></i>}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
})
