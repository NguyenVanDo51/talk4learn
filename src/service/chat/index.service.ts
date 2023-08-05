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
    const bodyMessages = [
      {
        role: 'system',
        content: `You will receive statement of Jenny and AndyStrongBome. Your objective is identify any grammar errors or instances where the AndyStrongBome's response does not align with Jenny's question. If you find any errors or inconsistencies, provide a brief explanation of the issue`,
      },
      ...messages,
    ]
    if (bodyMessages.length > 12) {
      bodyMessages.splice(1, bodyMessages.length - 10)
    }
    return httpClient.post('/api/chat/grammar', { messages: bodyMessages })
  }
}
