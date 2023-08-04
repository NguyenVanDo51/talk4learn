import { AppButton, AppDeleteButton } from '@/components/level1/AppButton'
import { scrollToBottom } from '@/helpers/dom'
import { speak } from '@/helps/speech'
import { IAIModel, IMessage } from '@/types/chat'
import { Avatar, Spin } from 'antd'
import { FC, useEffect, useState } from 'react'
import { IChatSetting } from '..'
import { AudioPlayer } from '@/components/level1/AudioPlayer'

interface IProps {
  isSending: boolean
  messages: IMessage[]
  isGettingComment: boolean
  model: IAIModel
  settings: IChatSetting
  setMessages: (messages: IMessage[]) => void
  handleAnalyst: (m: IMessage) => void
}

export const Message: FC<IProps> = (props) => {
  const { messages, isSending, setMessages } = props

  const deleteMessage = (messageId: IMessage['id']) => {
    setMessages([...messages].filter((message) => message.id !== messageId))
  }

  const reStart = (index: number) => {
    setMessages(messages.slice(0, index))
  }

  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4" id="message-container">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2 pb-4">
          {messages.map((message, index) =>
            message.role === 'assistant' ? (
              <LeftMessage
                {...props}
                message={message}
                key={`msg_${index}`}
                deleteMessage={() => deleteMessage(message.id)}
              />
            ) : (
              <RightMessage
                key={`msg_${index}`}
                {...props}
                message={message}
                deleteMessage={() => deleteMessage(message.id)}
                reStart={() => reStart(index)}
              />
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
  deleteMessage: () => void
}

const LeftMessage: FC<LeftMessageProps> = ({ message, model, settings, deleteMessage }) => {
  const { content } = message
  const contentArray = content.split(' ')
  const [text, setText] = useState(contentArray[0])
  const [type, setType] = useState(settings.type)

  useEffect(() => {
    let index = 2
    let interval = setInterval(() => {
      if (index > contentArray.length) clearInterval(interval)

      setText(contentArray.slice(0, index).join(' '))
      index++
      scrollToBottom('#message-container')
    }, 150)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setType(settings.type)
  }, [settings.type])

  return (
    <>
      <div className="col-start-1 col-end-10 p-3 rounded-lg message-item" id={message.id}>
        <div className="flex gap-3 flex-row items-center">
          <Avatar size={'default'} className="min-w-[32px] bg-indigo-400 dark:bg-slate-800">
            {model.name.at(0)}
          </Avatar>
          <div className="text-sm bg-white dark:bg-black dark:bg-slate-700 py-2 px-4 shadow rounded-full">
            {type === 'voice' ? <AudioPlayer text={content} /> : <div>{text}</div>}
          </div>
          <div className="flex gap-2">
            <AppButton
              onClick={() => speak(content)}
              size="small"
              type="link"
              className="ml-2"
              icon={<i className="fa-solid fa-volume-low"></i>}
            />
            <AppDeleteButton onConfirm={deleteMessage} type="link" danger />
          </div>
        </div>
      </div>
    </>
  )
}

interface RightMessageProps extends IProps {
  message: IMessage
  deleteMessage: () => void
  reStart: () => void
}

const RightMessage: FC<RightMessageProps> = ({ message, reStart, deleteMessage, handleAnalyst }) => {
  return (
    <div className="col-start-4 col-end-13 p-3 rounded-lg message-item" id={message.id}>
      <div className="flex items-center gap-3 justify-start flex-row-reverse">
        <Avatar size={'default'} className="min-w-[32px] bg-green-500">
          U
        </Avatar>
        <div className="relative text-sm bg-indigo-100 dark:bg-black py-2 px-4 shadow rounded-full">
          <div>{message.content}</div>
        </div>

        <div className="flex gap-2">
          <AppDeleteButton onConfirm={deleteMessage} type="link" />
          <AppDeleteButton
            description={'Restart from this message?'}
            onConfirm={reStart}
            type="link"
            icon={<i className="fa-solid fa-rotate-left"></i>}
          />
          {!message.comment && (
            <AppButton
              onClick={() => handleAnalyst(message)}
              size="small"
              type="link"
              title="Analyist"
              icon={<i className="fa-solid fa-chart-simple"></i>}
            ></AppButton>
          )}
          {message.recorded && (
            <AppButton
              onClick={() => {
                new Audio(message.recorded).play()
              }}
              size="small"
              type="link"
              className="ml-2"
              icon={<i className="fa-solid fa-volume-low"></i>}
            />
          )}
        </div>
      </div>
    </div>
  )
}
