'use client'
import { AppButton, DebouncedButton } from '@/components/level1/antd/AppButton'
import { AppInput } from '@/components/level1/antd/AppInput'
import { getUserMedia } from '@/helpers/mp3'
import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { AppTooltip } from '@/components/level1/antd/AppTooltip'
import { AppNotifycation } from '@/components/level1/antd/AppNotification'
import { ISetting, setInputType } from '@/redux/slices/settingSlice'
import { useAppSelector } from '@/hooks/redux'
import { useDispatch } from 'react-redux'
import { ScrollSelecter, scrollToBottom } from '@/helpers/dom'
import Image from 'next/image'
import { ChatService } from '../service'

interface IProps {
  isWaiting: boolean
  sendMessage: (message: string | Blob, voiceRecoreded?: string) => void
}

let audioChunks: any = []
let rec: MediaRecorder | null = null

export const InputBox: FC<IProps> = ({ isWaiting, sendMessage }) => {
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [granted, setGranted] = useState(false)
  const chatMode = useAppSelector((state) => state.setting.chatMode)
  const inputType = useAppSelector((t) => t.setting.inputType)

  const dispatch = useDispatch()

  const changeInputType = (type: ISetting['inputType']) => {
    dispatch(setInputType(type))
  }
  const messageRef: MutableRefObject<HTMLInputElement | undefined> = useRef()

  const requestAccessMicro = useCallback(() => {
    setGranted(false)
    return getUserMedia({ audio: true }).then((stream: any) => {
      rec = new MediaRecorder(stream)

      rec.ondataavailable = (e: any) => {
        console.log('e', e)
        audioChunks = []
        audioChunks.push(e.data)
        if (rec?.state == 'inactive') {
          let blob = new Blob(audioChunks, { type: 'audio/mp3' })

          sendMessage(blob, URL.createObjectURL(blob))
        }
      }
      setGranted(true)
    })
  }, [sendMessage])

  const handleRecord = () => {
    if (!rec) {
      requestAccessMicro().then(() => {
        handleRecord()
      })
      return
    }

    if (isRecording) {
      rec.stop()
      setIsRecording(false)
      return
    }

    setMessage('')
    rec.start()
    setIsRecording(true)
  }

  const handleSendMessage = () => {
    if (isWaiting) return

    messageRef.current?.focus()
    if (!message.length) return
    sendMessage(message)
    setMessage('')
  }

  useEffect(() => {
    scrollToBottom(ScrollSelecter.Message)
    if (inputType === 'voice') {
      requestAccessMicro()
    }
  }, [inputType, requestAccessMicro])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'Space') {
        handleRecord()
      }
    }

    if (inputType === 'voice') {
      window.removeEventListener('keydown', handleKeydown)
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputType, isRecording])

  useEffect(() => {
    changeInputType(chatMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMode])

  useEffect(() => {
    return () => {
      rec?.stop()
    }
  }, [granted])

  useEffect(() => {
    if (message && inputType === 'voice') {
      sendMessage(message)
      setMessage('')
    }
  }, [message, sendMessage, inputType])

  const changeIcon = (
    <AppTooltip title="Đổi kiểu nhập">
      <AppButton
        type="text"
        className='!rounded-md'
        onClick={() => {
          changeInputType(inputType === 'text' ? 'voice' : 'text')
          setTimeout(() => {
            messageRef.current?.focus()
          }, 200)
        }}
        icon={
          <i
            className={
              inputType === 'text'
                ? 'fa-solid fa-arrows-rotate cursor-pointer'
                : 'fa-regular fa-keyboard cursor-pointer'
            }
          ></i>
        }
      ></AppButton>
    </AppTooltip>
  )

  return (
    <div className="flex gap-1 flex-row items-center min-h-16 h-fit rounded-xl w-full p-2 lg:p-3">
      {inputType === 'voice' ? (
        <div className="flex gap-6 justify-center flex-grow items-center relative">
          <span className="absolute top-[18px] left-0">{changeIcon}</span>

          <DebouncedButton
            onClick={handleRecord}
            className={`!w-[4rem] !h-[4rem] flex items-center justify-center !text-[1.6rem] !rounded-full ${
              isRecording ? '!bg-red-400' : ''
            }`}
          >
            {isRecording ? (
              <i className="fa-solid fa-pause"></i>
            ) : (
              <i className="fa-solid fa-microphone"></i>
            )}
          </DebouncedButton>
        </div>
      ) : (
        <>
          {changeIcon}
          <div className="flex-grow">
            <AppInput
              ref={messageRef as any}
              placeholder={isRecording ? 'Đang ghi âm ...' : 'Nhập tin nhắn'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="py-3 px-5"
              type="text"
              size="large"
              disabled={isRecording}
              suffix={
                <div className="flex items-center gap-4 lg:gap-5">
                  <i
                    onClick={handleSendMessage}
                    className={`fa-solid fa-send cursor-pointer text-blue-500 text-xl ${
                      isRecording ? 'text-blue-800' : ''
                    }`}
                  ></i>
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
