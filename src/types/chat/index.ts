import { uniqueId } from 'lodash'

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
  const lastInterest = model.interest.pop()
  return `Your task is to practice English with users. You are a model with following characteristic: Your name is ${
    model.name
  }, ${model.age} years old and you are a student, your interest are ${model.interest.join(
    ', '
  )} and ${lastInterest}. Your role is to ask the user a few questions about their life or their interests. If the user asks you a question, you should answer them with a short response and follow up with a new question for them.`
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

export const initialConversation: IMessage[] = [
  {
    id: uniqueId(),
    role: 'assistant',
    content: 'Hello! How are you today?',
  },
  {
    id: '8',
    role: 'user',
    content: 'hello',
    status: 'success',
  },
  {
    id: '11',
    role: 'assistant',
    content: 'Hi there! How are you doing today?',
  },
  {
    id: '20',
    role: 'user',
    content: 'a',
    status: 'success',
  },
  {
    id: '25',
    role: 'assistant',
    content: "I see. Is there anything specific you'd like to talk about or any questions you have?",
  },
  
]
