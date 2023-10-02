"use client"
import { FC, useCallback, useEffect, useState } from "react"
import { InputBox } from "./components/InputBox"
import { Message } from "./components/messages"
import { IMessage } from "@/types/chat"
import { AxiosResponse } from "axios"
import { ScrollSelecter, scrollToBottom } from "@/helpers/dom"
import { v4 } from "uuid"
import { AIModels } from "@/types/chat/models"
import { SpeakerService } from "@/service/speaker"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "./components/Header"
import { ModalInfo, ModalSuccess } from "@/components/level1/antd/AppModal"
import { CupIcon } from "./icons/cup"
import { Alert, App, Divider, Input, Modal } from "antd"
import { AppButton } from "@/components/level1/antd/AppButton"
import { HelperBox } from "./components/HelperBox"
import { ChatService } from "./service"
import { SendMessageBody } from "./service/request"
import { Translation } from "./components/Translation"
import { Suggestions } from "./components/Suggestions"
import { ChatContext } from "./context"
import { ILesson } from "@/types/lesson/type"
import { lessons } from "@/api/lesson"
import { useAppSelector } from "@/hooks/redux"
import { LessonService } from "@/service/lesson/index.service"
import { useLessonsCompleted } from "@/hooks/fetchers/useLessonsCompleted"

export type IAnalystMessage = IMessage & { comment: string }

interface IProps {
  lesson?: ILesson
  initialMessages?: IMessage[]
  infomation?: string
}

const AIChat: FC<IProps> = ({
  lesson = lessons[0],
  initialMessages,
  infomation,
}) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages ?? [])
  const [isWaiting, setIsWaiting] = useState(false)
  const { refreshLessonsCompleted } = useLessonsCompleted()
  const router = useRouter()

  const sendMessage = async (message: string | Blob, recorded?: string) => {
    if (isWaiting) return
    if (typeof message === "string" && !message.trim()) return
    const messageObject: IMessage = {
      id: v4(),
      role: "user",
      content: "",
      recorded,
    }

    if (typeof message === "string") {
      messageObject.content = message
    } else {
      setIsWaiting(true)
      const res = await ChatService.speechToText(message)
      setIsWaiting(false)

      if (res.data) {
        messageObject.content = res.data
      }
    }

    if (!messageObject.content) {
      return
    }
    setTimeout(() => {
      scrollToBottom(ScrollSelecter.Message)
    }, 100)

    const newMesages: IMessage[] = [...messages, messageObject]
    setMessages(newMesages)
  }

  const handleDoneMessage = useCallback(async () => {
    ModalSuccess.show({
      title: "",
      icon: null,
      content: (
        <div className="flex flex-col items-center justify-center gap-4">
          <CupIcon size={128} isColor />
          <span className="font-medium text-xl">
            Chúc mừng, bạn đã hoàn thành bài học!
          </span>
        </div>
      ),
      footer: (
        <div className="mt-5 flex gap-3 justify-end">
          <AppButton
            type="text"
            onClick={() => {
              router.back()
              Modal.destroyAll()
            }}
          >
            Hoàn thành
          </AppButton>

          <AppButton onClick={() => Modal.destroyAll()}>Tiếp tục</AppButton>
        </div>
      ),
    })

    await LessonService.completeLesson(lesson?.id)
    await refreshLessonsCompleted()
  }, [lesson?.id, refreshLessonsCompleted, router])

  const getAnswer = useCallback(() => {
    const newMesages: IMessage[] = [...messages]
    const userMessage = newMesages.at(-1)
    if (userMessage?.role !== "user") return
    if (userMessage.status === "success") return

    setIsWaiting(true)
    const bodyMessage: SendMessageBody[] = [...messages, userMessage].map(
      (message) => ({
        role: message.role as SendMessageBody["role"],
        content:
          message.content.at(-1) !== "."
            ? `${message.content}.`
            : message.content,
      })
    )

    ChatService.sendMessage(lesson?.id, bodyMessage)
      .then((res: AxiosResponse<string>) => {
        let messageResponse = res.data
        const isDone = messageResponse.toLowerCase().includes("done_message")
        if (isDone) {
          messageResponse = messageResponse
            .replace("Done_message", "")
            .replace("done_message", "")
          alert(messageResponse)
        }

        SpeakerService.speak(messageResponse, {
          onend: () => {
            if (isDone) {
              handleDoneMessage()
            }
          },
        })

        newMesages[messages.length - 1].status = "success"
        newMesages.push({
          id: v4(),
          role: "assistant",
          content: messageResponse,
        })
        setMessages(newMesages)
      })
      .catch(() => {
        newMesages[messages.length - 1].status = "error"
        setMessages(newMesages)
      })
      .finally(() => setIsWaiting(false))
  }, [handleDoneMessage, lesson, messages])

  const getFirstMessage = () => {
    const messageResponse = lesson.assistantFirstMessage
    const message: IMessage = {
      id: v4(),
      role: "assistant",
      content: messageResponse,
    }
    SpeakerService.speak(messageResponse)
    setMessages([message])
  }

  const reSend = () => {
    getAnswer()
  }

  const newestMessage = messages.at(-1)

  useEffect(() => {
    if (newestMessage?.status !== "error") {
      getAnswer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    scrollToBottom(ScrollSelecter.Message)

    return () => {
      SpeakerService.cancel()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestMessage])

  useEffect(() => {
    if (!initialMessages) {
      getFirstMessage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessages])

  return (
    <ChatContext.Provider value={{ messages, lesson }}>
      <div className="flex flex-grow gap-4 justify-center h-full bg-[#ebedf8] overflow-hidden">
        <div className="w-full md:w-[567px] bg-white shadow-md">
          <Header />
          <Message
            isSending={isWaiting}
            setMessages={setMessages}
            reSend={reSend}
          />
          <InputBox sendMessage={sendMessage} isWaiting={isWaiting} />
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <Suggestions />

          <Translation />
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default AIChat
