import { AppButton } from "@/components/level1/antd/AppButton"
import { IMessage } from "@/types/chat"
import { Divider, Spin } from "antd"
import { FC, useContext, useEffect, useState } from "react"
import { useAppSelector } from "@/hooks/redux"
import { LeftMessage } from "./LeftMessage"
import { RightMessage } from "./RightMessage"
import { AppModal } from "@/components/level1/antd/AppModal"
import { AppSpin } from "@/components/level1/antd/AppSpin"
import { ChatService } from "../../service"
import { SendMessageBody } from "../../service/request"
import { ChatContext } from "../../context"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { Avatar } from "@/components/displayers/Avatar"

export interface MessageProps {
  isSending: boolean
  setMessages: (messages: IMessage[]) => void
  reSend: () => void
}

export const Message: FC<MessageProps> = (props) => {
  const { isSending, setMessages } = props
  const { lesson, messages } = useContext(ChatContext)
  const [checkResult, setCheckResult] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [messageToCheck, setMessageToCheck] = useState<IMessage>()

  const reStart = (index: number) => {
    setMessages(messages.slice(0, index))
  }

  const inputType = useAppSelector((t) => t.setting.inputType)

  const inputHeight = inputType === "text" ? 75 : 85
  const { user } = useUser()

  useEffect(() => {
    if (!messageToCheck) return

    if (messageToCheck.comment) {
      setCheckResult(messageToCheck.comment)
      return
    }

    setLoading(true)
    const bodyMessage: SendMessageBody[] = [
      {
        role: "user",
        content: messageToCheck.content,
      },
    ]

    ChatService.checkGrammar(bodyMessage)
      .then((res) => {
        const result = res.data
        console.log(result)
        setCheckResult(result === "Perfect." ? "Câu trả lời hoàn hảo" : result)
        setMessages(
          [...messages].map((m) =>
            m.id === messageToCheck.id ? { ...m, comment: result } : m
          )
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
      {lesson && (
        <div className="bg-[#f7f7f7] rounded-xl p-4">
          <div className="flex gap-3">
            <div>
              <Avatar
                alt="bot-image"
                src={lesson?.botImage || "/bot_placeholder.png"}
              />
            </div>

            <div className="flex flex-col gap-0.5 justify-center">
              <p className="font-medium m-0 text-lg">{lesson?.name}</p>

              <span className="text-sm">
                Operated by{" "}
                <span>
                  <Avatar
                    alt="bot-image"
                    src={lesson.author?.imageUrl}
                    size={20}
                    className="inline-block"
                  />

                  <span className="text-blue-400">
                    {lesson.author?.username}
                  </span>
                </span>
              </span>
            </div>
          </div>

          <span className="mt-2 text-sm text-[#5d6565]">
            {lesson.used ?? 1} monthly user{lesson.used > 1 ? "s" : ""}
          </span>

          <div className="text-sm p-0 mt-2">{lesson?.userInstruction}</div>
        </div>
      )}
      <div className="flex flex-col">
        <div className="grid grid-cols-12 gap-y-2 pb-10">
          {messages.map((message, index) =>
            message.role === "assistant" ? (
              <LeftMessage
                {...props}
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
          <AppButton
            key={"as"}
            size="middle"
            onClick={() => setMessageToCheck(undefined)}
          >
            Đóng
          </AppButton>,
        ]}
      >
        <div className="grid gap-3">
          <div>
            Bạn đã trả lời:{" "}
            <span className="font-medium">{messageToCheck?.content}</span>
          </div>
          <Divider className="m-0" />
          <div>{loading ? <AppSpin /> : checkResult}</div>
        </div>
      </AppModal>
    </div>
  )
}
