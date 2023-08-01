import { SendMessageBody } from './type'
import { httpClient } from '../httpClient'

export class ChatService {
  static sendMessage = (messages: SendMessageBody[]) => {
    return httpClient.post('/api/chat', { messages })
  }
}
