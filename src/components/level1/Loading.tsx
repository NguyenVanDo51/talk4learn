import { Spin } from 'antd'
import { Logo } from './Logo'

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-[100vw] h-[100vh]">
      <div className="flex items-center gap-3">
        <Logo /> <Spin />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4 text-center">English Learning with AI Chatbot</h1>
        <p className="text-lg text-center">
          Practice English, improve grammar, and enhance your skills with Ranga, the AI-powered chatbot.
        </p>
      </div>
    </div>
  )
}
