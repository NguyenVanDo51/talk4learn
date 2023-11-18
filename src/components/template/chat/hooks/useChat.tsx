import { scrollToBottom, ScrollSelecter } from "@/helpers/dom"
import { SpeakerService } from "@/service/speaker"
import { IMessage } from "@/types/chat"
import { AxiosResponse } from "axios"
import { useState, useCallback, useEffect } from "react"
import { v4 } from "uuid"
import { ChatService } from "../service"
import { SendMessageBody } from "../service/request"
import { ILesson } from "@/types/lesson/type"

export const useChat = (lesson: ILesson, initialMessages?: IMessage[]) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages ?? [])
  const [isWaiting, setIsWaiting] = useState(false)

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
        SpeakerService.speak(messageResponse)

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
  }, [lesson, messages])

  const getFirstMessage = () => {
    const messageResponse = lesson.assistantFirstMessage

    if (!messageResponse) return
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

  return { messages, isWaiting, setMessages, reSend, sendMessage }
}