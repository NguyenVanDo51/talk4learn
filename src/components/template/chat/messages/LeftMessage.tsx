import { AudioPlayer } from "@/components/level1/AudioPlayer"
import { AppButton } from "@/components/level1/antd/AppButton"
import { scrollToBottom, ScrollSelecter } from "@/helpers/dom"
import { speak } from "@/helps/speech"
import { ISetting } from "@/redux/slices/settingSlice"
import { SpeakerService } from "@/service/speaker"
import { IMessage } from "@/types/chat"
import { AIModels } from "@/types/chat/models"
import { Avatar } from "antd"
import { memo, useState, useEffect } from "react"
import { MessageProps } from "."

interface LeftMessageProps extends MessageProps {
  message: IMessage
  isLastItem: boolean
  inputType: ISetting['inputType']
  readText: (text: string) => void
}

export const LeftMessage = memo(function LeftMessage({ message, inputType, isLastItem, readText }: LeftMessageProps) {
  const { content } = message
  const [type, setType] = useState(inputType)

  const onChangeType = () => {
    setType(type === 'text' ? 'voice' : 'text')
    SpeakerService.cancel()
    if (isLastItem) {
      scrollToBottom(ScrollSelecter.Message)
    }
  }

  useEffect(() => {
    setType(inputType)
  }, [inputType])

  return (
    <>
      <div className="col-start-1 col-end-12 p-1 rounded-lg message-item" id={message.id}>
        <div className="flex gap-2 lg:gap-3 flex-row items-center">
          <Avatar src={AIModels[0].avatar} size={'default'} className="min-w-[32px]"></Avatar>

          <div className="text-sm bg-white dark:bg-slate-700 py-1 px-4 shadow rounded-3xl max-w-full overflow-hidden whitespace-break-spaces">
            {type === 'voice' ? <AudioPlayer text={content} /> : <div className="py-1">{content}</div>}
          </div>

          <div className="message-actions flex items-center gap-2">
            {type === 'text' && (
              <AppButton
                onClick={() => speak(content)}
                size="small"
                type="link"
                icon={<i className="fa-solid fa-volume-low"></i>}
              />
            )}

            <AppButton
              onClick={onChangeType}
              type="link"
              size="small"
              danger={false}
              icon={<i className="fa-solid fa-arrows-rotate"></i>}
            />
          </div>
        </div>
      </div>
    </>
  )
})