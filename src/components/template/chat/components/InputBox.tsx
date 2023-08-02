"use client"
import { AppButton } from '@/components/level1/AppButton'
import { AppInput } from '@/components/level1/AppInput'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'

interface IProps {
  sendMessage: (message: string) => void
}




export const InputBox: FC<IProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState('')
  const [transcript, setTranscript] = useState<string>('')
  const [isRecording, setIsRecording] = useState(false)

  const messageRef: MutableRefObject<HTMLInputElement | undefined> = useRef()
  
  let recognition: any = null
  if (window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  }

  useEffect(() => {
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript
      setTranscript(speechToText)
      if (speechToText) {
        sendMessage(transcript)
      }
    }

    return () => recognition.stop()
  }, [recognition, sendMessage, transcript])

  const handleRecord = () => {
    if (isRecording) {
      recognition.stop()
      setTranscript('')
    } else {
      recognition.start()
    }
    setIsRecording(!isRecording)
  }

  const handleSendMessage = () => {
    messageRef.current?.focus()
    if (!message.length) return

    setMessage('')
    sendMessage(message)
  }

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div className="flex-grow">
        <AppInput
          ref={messageRef as any}
          placeholder={isRecording ? 'Recording your voice ...' : 'Input here'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          disabled={isRecording}
          suffix={
            <i
              onClick={handleRecord}
              className={`fa-solid fa-microphone cursor-pointer ${isRecording ? 'text-purple-500' : ''}`}
            ></i>
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage()
          }}
        />
      </div>

      <div className="ml-4">
        <AppButton
          onClick={handleSendMessage}
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          Send
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-90 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </AppButton>
      </div>
    </div>
  )
}
