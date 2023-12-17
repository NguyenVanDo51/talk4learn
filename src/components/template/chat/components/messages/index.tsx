import { IMessage } from "@/types/chat"
import { Spin } from "antd"
import { FC, useContext } from "react"
import { LeftMessage } from "./LeftMessage"
import { RightMessage } from "./RightMessage"
import { ChatContext } from "../../context"
import { useUser } from "@clerk/nextjs"
import { Avatar } from "@/components/displayers/Avatar"
import { useSettings } from "@/hooks/helpers/use-settings"
import { BotProfile } from "../BotProfile"

export interface MessageProps {
  isSending: boolean
  setMessages: (messages: IMessage[]) => void
  reSend: () => void
}

export const Message: FC<MessageProps> = (props) => {
  const { isSending, setMessages } = props
  const { lesson, messages } = useContext(ChatContext)

  const reStart = (index: number) => {
    setMessages(messages.slice(0, index))
  }

  const {
    settings: { inputType },
  } = useSettings()

  const inputHeight = inputType === "text" ? 75 : 85
  const { user } = useUser()

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden p-2 lg:p-3"
      id="message-container"
      style={{
        height: `calc(100vh - ${inputHeight + 64}px)`,
      }}
    >
      {lesson?.author && <BotProfile bot={lesson} />}

      <div className="flex flex-col">
        <div className="grid grid-cols-12 gap-y-2 pb-10">
          {messages.map((message, index) =>
            message.role === "assistant" ? (
              <LeftMessage
                {...props}
                avatar={lesson?.botImage}
                inputType={inputType}
                message={message}
                isLastItem={messages.at(-1)?.id === message.id}
                key={message.id ?? `msg_${index}`}
              />
            ) : (
              <RightMessage
                key={`msg_${index}`}
                {...props}
                avatar={user?.imageUrl}
                message={message}
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
