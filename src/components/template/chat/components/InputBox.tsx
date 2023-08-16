'use client'
import { AppButton, DebouncedButton } from '@/components/level1/antd/AppButton'
import { AppInput } from '@/components/level1/antd/AppInput'
import { getUserMedia } from '@/helpers/mp3'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { IChatSetting } from '..'
import { Button } from 'antd'
import { AppTooltip } from '@/components/level1/antd/AppTooltip'
import { AppNotifycation } from '@/components/level1/antd/AppNotification'
import { ISetting, setInputType } from '@/redux/slices/settingSlice'
import { useAppSelector } from '@/hooks/redux'
import { useDispatch } from 'react-redux'
import { ScrollSelecter, scrollToBottom } from '@/helpers/dom'

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
  const [recording, setRecording] = useState<string>()
  const [granted, setGranted] = useState(false)
  const chatMode = useAppSelector((state) => state.setting.chatMode)
  const inputType = useAppSelector((t) => t.setting.inputType)

  const dispatch = useDispatch()

  const changeInputType = (type: ISetting['inputType']) => {
    dispatch(setInputType(type))
  }
  const messageRef: MutableRefObject<HTMLInputElement | undefined> = useRef()

  const requestAccessMicro = () => {
    setGranted(false)
    return getUserMedia({ audio: true }).then((stream: any) => {
      rec = new MediaRecorder(stream)
      rec.ondataavailable = (e: any) => {
        audioChunks = []
        audioChunks.push(e.data)
        if (rec.state == 'inactive') {
          let blob = new Blob(audioChunks, { type: 'audio/mp3' })
          setRecording(URL.createObjectURL(blob))
          recognition.stop()
        }
      }
      setGranted(true)
      return rec
    })
  }

  const handleRecord = () => {
    if (!rec) {
      requestAccessMicro().then(() => {
        handleRecord()
      })
      return
    }
    if (isRecording) {
      recognition.stop()
      rec.stop()
    } else {
      setMessage('')
      try {
        recognition.start()
        rec.start()
      } catch {
        recognition.stop()
        rec.stop()
      }
    }
    setIsRecording(!isRecording)
  }

  const handleSendMessage = () => {
    if (isWaiting) return

    messageRef.current?.focus()
    if (!message.length) return
    sendMessage(message, recording)
    setMessage('')
    setRecording('')
  }

  useEffect(() => {
    scrollToBottom(ScrollSelecter.Message)
  }, [inputType])

  useEffect(() => {
    changeInputType(chatMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMode])

  useEffect(() => {
    if (!recognition) return

    recognition.onresult = (event: { results: SpeechRecognitionResultList }) => {
      rec?.stop()
      const speechToText = event.results[0][0].transcript
      setIsRecording(false)
      if (speechToText) {
        setMessage(speechToText)
      }
      setTimeout(() => {
        messageRef.current?.focus()
      }, 300)
    }

    return () => {
      recognition.stop()
      rec?.stop()
    }
  }, [granted])

  useEffect(() => {
    if (message && recording && inputType === 'voice') {
      sendMessage(message, recording)
      setMessage('')
      setRecording('')
    }
  }, [message, recording, sendMessage, inputType])

  const changeIcon = (
    <AppTooltip title="Change input type">
      <i
        className={
          inputType === 'text' ? 'fa-solid fa-arrows-rotate cursor-pointer' : 'fa-regular fa-keyboard cursor-pointer'
        }
        onClick={() => changeInputType(inputType === 'text' ? 'voice' : 'text')}
      ></i>
    </AppTooltip>
  )

  return (
    <div className="flex gap-4 lg:gap-4 flex-row items-center min-h-16 h-fit rounded-xl w-full p-2 pl-4 lg:pl-6 lg:p-3">
      {inputType === 'voice' ? (
        <div className="pr-5 flex gap-6 justify-center flex-grow items-center">
          {changeIcon}
          <DebouncedButton
            onClick={handleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center  ${
              isRecording ? 'bg-primary text-white shadow-lg' : 'dark:bg-black'
            }`}
          >
            <i className={`fa-solid fa-microphone text-3xl cursor-pointer ${isRecording ? 'text-white' : ''}`}></i>
          </DebouncedButton>
        </div>
      ) : (
        <>
          {changeIcon}
          <div className="flex-grow">
            <AppInput
              ref={messageRef as any}
              placeholder={isRecording ? 'Recording your voice ...' : 'Send a message'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-1 pl-4"
              type="text"
              disabled={isRecording}
              suffix={
                <div className="flex items-center gap-4 lg:gap-5">
                  <i
                    onClick={handleRecord}
                    className={`fa-solid fa-microphone cursor-pointer text-xl ${isRecording ? 'text-purple-500' : ''}`}
                  ></i>
                  <AppButton
                    onClick={handleSendMessage}
                    className="flex items-center justify-center bg-primary hover:bg-indigo-600 text-white"
                    icon={
                      <svg
                        className="ml-1 w-4 min-h-4 transform rotate-90"
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
