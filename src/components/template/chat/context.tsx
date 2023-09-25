import { IMessage } from '@/types/chat'
import { ILesson } from '@/types/lesson/type'
import { createContext } from 'react'

interface IChatContext {
  messages: IMessage[]
  lesson?: ILesson
}

const initialValues = {
  messages: [],
}

export const ChatContext = createContext<IChatContext>(initialValues)
