import { AppButton } from '@/components/level1/antd/AppButton'
import { IMessage } from '@/types/chat'
import { Alert, Divider, Spin } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { SpeakerService } from '@/service/speaker'
import { useAppSelector } from '@/hooks/redux'
import { LeftMessage } from './LeftMessage'
import { RightMessage } from './RightMessage'
import { AppModal } from '@/components/level1/antd/AppModal'
import { AppSpin } from '@/components/level1/antd/AppSpin'
import { ChatService } from '../../service'
import { SendMessageBody } from '../../service/request'

export interface MessageProps {
  isSending: boolean
  messages: IMessage[]
  infomation?: string
  setMessages: (messages: IMessage[]) => void
  reSend: () => void
}

export const Message: FC<MessageProps> = (props) => {
  const { messages, infomation, isSending, setMessages } = props

  const [checkResult, setCheckResult] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [messageToCheck, setMessageToCheck] = useState<IMessage>()

  const reStart = (index: number) => {
    setMessages(messages.slice(0, index))
  }

  const inputType = useAppSelector((t) => t.setting.inputType)

  const inputHeight = inputType === 'text' ? 75 : 85
  const { data } = useSession()
  const readText = (text: string) => {
    SpeakerService.speak(text)
  }

  useEffect(() => {
    if (!messageToCheck) return

    if (messageToCheck.comment) {
      setCheckResult(messageToCheck.comment)
      return
    }

    setLoading(true)
    const bodyMessage: SendMessageBody[] = [
      {
        role: 'user',
        content: messageToCheck.content,
      },
    ]
    ChatService.checkGrammar(bodyMessage)
      .then((res) => {
        const result = res.data?.choices[0]?.message.content
        setCheckResult(result)
        setMessages(
          [...messages].map((m) => (m.id === messageToCheck.id ? { ...m, comment: result } : m))
        )
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageToCheck])

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-2 lg:p-3"
      id="message-container"
      style={{
        height: `calc(100vh - ${inputHeight + 64}px)`,
      }}
    >
      {infomation && (
        <Alert message={infomation} type="info" className='mb-3' />
      )}
      <div className="flex flex-col">
        <div className="grid grid-cols-12 gap-y-2 pb-10">
          {messages.map((message, index) =>
            message.role === 'assistant' ? (
              <LeftMessage
                {...props}
                inputType={inputType}
                readText={readText}
                message={message}
                isLastItem={messages.at(-1)?.id === message.id}
                key={message.id ?? `msg_${index}`}
              />
            ) : (
              <RightMessage
                key={`msg_${index}`}
                {...props}
                avatar={data?.user?.image}
                message={message}
                reStart={() => reStart(index)}
                setMessageToCheck={(msg) => setMessageToCheck(msg)}
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

      <AppModal
        title="Grammar checking"
        open={!!messageToCheck}
        onCancel={() => setMessageToCheck(undefined)}
        footer={[
          <AppButton key={'as'} size="middle" onClick={() => setMessageToCheck(undefined)}>
            Close
          </AppButton>,
        ]}
      >
        <div className="grid gap-3">
          <div>
            Your answer: <span className="font-medium">{messageToCheck?.content}</span>
          </div>
          <Divider className="m-0" />
          <div>{loading ? <AppSpin /> : checkResult}</div>
        </div>
      </AppModal>
    </div>
  )
}
