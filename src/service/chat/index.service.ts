import { SendMessageBody } from './type'
import { httpClient } from '../httpClient'

export class ChatService {
  static sendMessage = (messages: SendMessageBody[]) => {
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post('/api/chat', { messages: bodyMessages })
  }

  static checkGrammar = (messages: SendMessageBody[]) => {
    const bodyMessages = [...messages]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post('/api/chat/grammar', { messages: bodyMessages })
  }
}
