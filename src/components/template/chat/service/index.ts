import { SendMessageBody } from "./request"
import { httpClient } from "../../../../service/httpClient"
import store from "@/redux/store"
import { IMessage } from "@/types/chat"
import { ILesson } from "@/types/lesson/type"

export class ChatService {
  static sendMessageInSituation = (
    lesson: ILesson,
    messages: SendMessageBody[]
  ) => {
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post("/api/situations/" + lesson.id, {
      lesson,
      messages: bodyMessages,
    })
  }

  static checkGrammar = (messages: SendMessageBody[]) => {
    const settings = store.getState().setting
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post(`/api/chat/grammar?lang=${settings.lang}`, {
      messages: bodyMessages,
    })
  }

  static speechToText = (audio: Blob) => {
    const formData = new FormData()
    formData.append("file", audio)

    return httpClient.post("/api/chat/speech-to-text", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static getSuggestion = (lesson: ILesson, messages: SendMessageBody[]) => {
    let bodyMessages: IMessage[] = JSON.parse(JSON.stringify(messages))
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }

    bodyMessages = bodyMessages.map((message: IMessage) => {
      if (message.role === "user") {
        message.role = "assistant"
      } else {
        message.role = "user"
      }
      return { role: message.role, content: message.content }
    })

    return httpClient.post("/api/situations/" + lesson.id + "/suggestions", {
      lesson,
      messages: bodyMessages,
    })
  }
}
