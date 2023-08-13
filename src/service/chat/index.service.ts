import { SendMessageBody } from './request'
import { httpClient } from '../httpClient'
import store, { RootState } from '@/redux/store'

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
    console.log(settings)
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post(`/api/chat/grammar?lang=${settings.lang}`, { messages: bodyMessages })
  }
}
