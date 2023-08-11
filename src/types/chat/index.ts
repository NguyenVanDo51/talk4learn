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
  return 'Do not tell that you are an AI model. You will impersonate a character to practice English with users. You are a model with following characteristic: \n: Your name: {{name}}\n Your olds: {{old}} \n Your job: {{job}} \n Your hobbies: undefined.\n Asking the user any questions about their life. If you giving a question, you should answer them with a very short response (maximum 40 words) and follow up the conversation.'
    .replaceAll('{{name}}', model.name)
    .replaceAll('{{old}}', String(model.age))
    .replaceAll('{{job}}', String(model.job))
}

export const AIModels: IAIModel[] = [
  {
    id: 'jenny',
    name: 'Andy',
    age: 18,
    job: 'student',
    interest: ['music', 'shopping', 'game'],
    avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/81/81e2382f3d317ceccae21659787e274a1c7ed074.jpg',
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
