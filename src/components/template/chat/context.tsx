import { IMessage } from '@/types/chat'
import { createContext } from 'react'

interface IChatContext {
  messages: IMessage[]
}

const initialValues = {
  messages: [],
}

export const ChatContext = createContext<IChatContext>(initialValues)
