import { uniqueId } from 'lodash'
import { v4 } from 'uuid'

export interface IMessage {
  id?: string
  role: 'system' | 'user' | 'assistant'
  content: string
  comment?: string
  recorded?: string
  status?: 'success' | 'error' | 'sent'
}

export interface IAIModel {
  id: string
  name: string
  age: number
  job: string
  interest: string[]
  avatar?: string | null
  getDescription: () => string
}

const getModelTask = (model: IAIModel) => {
  return 'You will impersonate a character to practice English with users. Do not tell that you are an AI model. You are a model with following characteristic: \n: Your name: Jenny\n Your olds: 18 \n Your job: student \n Your hobbies: undefined.\n Asking the user any questions about their life. If you giving a question, you should answer them with a very short response and follow up the conversation.'
}

export const AIModels: IAIModel[] = [
  {
    id: 'jenny',
    name: 'Jenny',
    age: 18,
    job: 'student',
    interest: ['music', 'shopping', 'game'],
    avatar: null,
    getDescription() {
      return getModelTask(this)
    },
  },
]

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
