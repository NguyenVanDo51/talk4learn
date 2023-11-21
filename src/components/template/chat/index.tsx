"use client"
import { FC } from "react"
import { InputBox } from "./components/InputBox"
import { Message } from "./components/messages"
import { IMessage } from "@/types/chat"
import { Header } from "./components/Header"
import { Translation } from "./components/Translation"
import { Suggestions } from "./components/Suggestions"
import { ChatContext } from "./context"
import { ILesson } from "@/types/lesson/type"
import { useChat } from "./hooks/useChat"

export type IAnalystMessage = IMessage & { comment: string }

interface IProps {
  lesson: ILesson
}

const AIChat: FC<IProps> = ({ lesson }) => {
  const { messages, isWaiting, setMessages, reSend, sendMessage } =
    useChat(lesson)

  return (
    <ChatContext.Provider value={{ messages, lesson }}>
      <div className="flex flex-grow gap-4 justify-center h-full bg-[#ebedf8] overflow-hidden">
        <div className="w-full md:w-[567px] bg-white shadow-md">
          <Header />

          <Message
            isSending={isWaiting}
            setMessages={setMessages}
            reSend={reSend}
          />

          <InputBox sendMessage={sendMessage} isWaiting={isWaiting} />
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <Suggestions />
          <Translation />
        </div>
      </div>
    </ChatContext.Provider>
  )
}

export default AIChat
