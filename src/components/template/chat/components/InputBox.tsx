'use client'
import { AppButton } from '@/components/level1/AppButton'
import { AppInput } from '@/components/level1/AppInput'
import { getUserMedia } from '@/helpers/mp3'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { IChatSetting } from '..'
import { Button, Tooltip } from 'antd'
import { AppTooltip } from '@/components/level1/AppTooltip'

interface IProps {
  isWaiting: boolean
  settings: IChatSetting
  sendMessage: (message: string, voiceRecoreded?: string) => void
}

let recognition: any = null
let audioChunks: any = []
let rec: any
if (typeof window !== 'undefined') {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
}

export const InputBox: FC<IProps> = ({ isWaiting, settings, sendMessage }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<string>()
  const [recording, setRecording] = useState<string>()
  const [type, setType] = useState<IChatSetting['type']>(settings.type)
  const [inited, setInited] = useState(false)

  const messageRef: MutableRefObject<HTMLInputElement | undefined> = useRef()

  useEffect(() => {
    getUserMedia({ audio: true }).then((stream: any) => {
      rec = new MediaRecorder(stream)
      rec.ondataavailable = (e: any) => {
        audioChunks = []
        audioChunks.push(e.data)
        if (rec.state == 'inactive') {
          let blob = new Blob(audioChunks, { type: 'audio/mp3' })
          console.log(blob, URL.createObjectURL(blob))
          setRecording(URL.createObjectURL(blob))
        }
      }
      setInited(true)
    })

    return () => rec.stop()
  }, [])

  useEffect(() => {
    if (!recognition || !inited) return
    console.log('rec', rec)
    recognition.onresult = (event: { results: SpeechRecognitionResultList }) => {
      if (rec) {
        rec.stop()
      }
      console.log('event', event.results[0][0].confidence)
      const speechToText = event.results[0][0].transcript
      setIsRecording(false)
      if (speechToText) {
        setTranscript(speechToText)
      }
    }

    return () => {
      recognition.stop()
    }
  }, [inited, sendMessage])

  useEffect(() => {
    if (transcript && recording) {
      sendMessage(transcript, recording)
      setTranscript('')
      setRecording('')
    }
  }, [recording, sendMessage, transcript])

  useEffect(() => {
    setType(settings.type)
  }, [settings.type])

  const handleRecord = () => {
    if (isRecording) {
      recognition.stop()
      rec.stop()
    } else {
      recognition.start()
      rec.start()
    }
    setIsRecording(!isRecording)
  }

  const handleSendMessage = () => {
    if (isWaiting) return

    messageRef.current?.focus()
    if (!message.length) return

    setMessage('')
    sendMessage(message)
  }

  const changeIcon = (
    <AppTooltip title="Change input type">
      <i
        className="fa-solid fa-arrows-rotate cursor-pointer"
        onClick={() => setType(type === 'text' ? 'voice' : 'text')}
      ></i>
    </AppTooltip>
  )

  return (
    <div className="flex flex-row items-center h-16 rounded-xl w-full p-3">
      {type === 'voice' ? (
        <div className="flex gap-3 justify-center flex-grow items-center">
          <Button
            onClick={handleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center  ${
              isRecording ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-black'
            }`}
          >
            <i className={`fa-solid fa-microphone text-3xl cursor-pointer ${isRecording ? 'text-white' : ''}`}></i>
          </Button>
          {changeIcon}
        </div>
      ) : (
        <>
          <div className="flex-grow">
            <AppInput
              ref={messageRef as any}
              placeholder={isRecording ? 'Recording your voice ...' : 'Input here'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              disabled={isRecording}
              suffix={
                <div className="flex gap-3">
                  <i
                    onClick={handleRecord}
                    className={`fa-solid fa-microphone cursor-pointer ${isRecording ? 'text-purple-500' : ''}`}
                  ></i>
                  {changeIcon}
                </div>
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
              <span>
                <svg
                  className="w-4 h-4 transform rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </AppButton>
          </div>
        </>
      )}
    </div>
  )
}
