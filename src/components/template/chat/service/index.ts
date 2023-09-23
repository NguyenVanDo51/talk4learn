import { SendMessageBody } from './request'
import { httpClient } from '../../../../service/httpClient'
import store from '@/redux/store'
import { IMessage } from '@/types/chat'

export class ChatService {
  static sendMessage = (messages: SendMessageBody[]) => {
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post('/api/chat', { messages: bodyMessages })
  }

  static checkGrammar = (messages: SendMessageBody[]) => {
    const settings = store.getState().setting
    console.log('settings', settings)
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post(`/api/chat/grammar?lang=${settings.lang}`, { messages: bodyMessages })
  }

  static speechToText = (audio: Blob) => {
    const formData = new FormData()
    formData.append('file', audio)

    return httpClient.post('/api/chat/speech-to-text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  static getSuggestion = (messages: IMessage[]) => {
    console.log('messages', messages)

    return httpClient.post('/api/chat/suggestion')
  }
}
