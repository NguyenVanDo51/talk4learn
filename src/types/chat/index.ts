import { v4 } from 'uuid'

export interface IMessage {
  id?: string
  role: 'system' | 'user' | 'assistant'
  content: string
  comment?: string
  recorded?: string
  status?: 'success' | 'error' | 'sent'
}

const greatings = [
  "Hi there, how's your day going?",
  'Hello! What brings you here today?',
  "Hey, it's nice to meet you. What can I help you with?",
  "Greetings! What's new in your world?",
  'Hey, are you up to anything interesting right now?',
  "Hello! I hope you're having a great day so far.",
  "Hello there! What's on your mind today?",
]

export const initialConversation: IMessage[] = [
  {
    id: v4(),
    role: 'assistant',
    content: greatings[Math.floor(Math.random() * greatings.length)],
  },
]
