import { AppButton } from '@/components/level1/AppButton'
import { speak } from '@/helps/speech'
import { IMessage } from '@/types/chat'
import { Popover, Spin } from 'antd'
import { FC, useEffect, useState } from 'react'

interface IProps {
  isSending: boolean
  analyst: (message: IMessage) => void
  messages: IMessage[]
}

export const Message: FC<IProps> = ({ messages, isSending, analyst }) => {
  console.log('messages', messages)
  return (
    <div className="grid grid-cols-12 gap-y-2">
      {messages.map((message, index) =>
        message.role === 'assistant' ? (
          <LeftMessage content={message.content} key={`msg_${index}`} />
        ) : (
          <RightMessage message={message} analyst={() => analyst(message)} key={`msg_${index}`} />
        )
      )}

      {isSending && (
        <div className="col-start-1 col-end-12 px-3">
          <Spin spinning />
        </div>
      )}
    </div>
  )
}

const LeftMessage: FC<{ content: string }> = ({ content }) => {
  const contentArray = content.split(' ')
  const [text, setText] = useState(contentArray[0])

  useEffect(() => {
    let index = 2
    let interval = setInterval(() => {
      if (index > contentArray.length) clearInterval(interval)

      setText(contentArray.slice(0, index).join(' '))
      index++
    }, 150)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg message-item">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{text}</div>
        </div>

        <AppButton
          onClick={() => speak(content)}
          size="small"
          type="link"
          className="ml-2"
          icon={<i className="fa-solid fa-volume-low"></i>}
        ></AppButton>
      </div>
    </div>
  )
}

const RightMessage: FC<{ message: IMessage; analyst: () => void }> = ({ message, analyst }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg message-item">
      <div className="flex items-center gap-3 justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
        <Popover trigger="hover" content={message.comment ? <div>{message.comment}</div> : undefined}>
          <div className="relative text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>{message.content}</div>
          </div>
        </Popover>

        {!message.comment && (
          <AppButton
            onClick={analyst}
            size="small"
            type="link"
            className="ml-2"
            icon={<i className="fa-solid fa-chart-simple"></i>}
          ></AppButton>
        )}
      </div>
    </div>
  )
}
