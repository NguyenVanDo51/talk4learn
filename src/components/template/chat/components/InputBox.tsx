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
  setSettings: (settings: IChatSetting) => void
  sendMessage: (message: string, voiceRecoreded?: string) => void
}

let recognition: any = null
let audioChunks: any = []
let rec: any
if (typeof window !== 'undefined') {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
}

export const InputBox: FC<IProps> = ({ isWaiting, settings, setSettings, sendMessage }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<string>()
  const [recording, setRecording] = useState<string>()
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
          setRecording(URL.createObjectURL(blob))
        }
      }
      setInited(true)
    })

    return () => rec?.stop()
  }, [])

  useEffect(() => {
    if (!recognition || !inited) return

    recognition.onresult = (event: { results: SpeechRecognitionResultList }) => {
      if (rec) {
        rec.stop()
      }
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

  const type = settings.inputType
  const setType = (value: IChatSetting['inputType']) => {
    setSettings({ ...settings, inputType: value })
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
    <div className="flex gap-4 lg:gap-4 flex-row items-center min-h-16 h-fit rounded-xl w-full p-2 pl-4 lg:p-3">
      {type === 'voice' ? (
        <div className="pr-4 flex gap-4 justify-center flex-grow items-center">
          {changeIcon}
          <Button
            onClick={handleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center  ${
              isRecording ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-black'
            }`}
          >
            <i className={`fa-solid fa-microphone text-3xl cursor-pointer ${isRecording ? 'text-white' : ''}`}></i>
          </Button>
        </div>
      ) : (
        <>
          {changeIcon}
          <div className="flex-grow">
            <AppInput
              ref={messageRef as any}
              placeholder={isRecording ? 'Recording your voice ...' : 'Input here'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-1 pl-4"
              type="text"
              disabled={isRecording}
              suffix={
                <div className="flex items-center gap-4 lg:gap-5">
                  <i
                    onClick={handleRecord}
                    className={`fa-solid fa-microphone cursor-pointer ${isRecording ? 'text-purple-500' : ''}`}
                  ></i>
                  <AppButton
                    onClick={handleSendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white"
                    icon={
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
                    }
                  />
                </div>
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage()
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
