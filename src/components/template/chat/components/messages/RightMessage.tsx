import { AppButton, AppDeleteButton } from '@/components/level1/antd/AppButton'
import { SpeakerService } from '@/service/speaker'
import { IMessage } from '@/types/chat'
import { memo } from 'react'
import { MessageProps } from '.'

interface RightMessageProps extends MessageProps {
  message: IMessage
  avatar: string | null | undefined
  reStart: () => void
  setMessageToCheck: (message: IMessage) => void
}

export const RightMessage = memo(function RightMessage({
  message,
  setMessageToCheck,
  reStart,
  reSend,
}: RightMessageProps) {
  return (
    <div className="col-start-2 col-end-13 p-1 rounded-lg  message-item" id={message.id}>
      <div className="flex items-center gap-3 justify-start  flex-row-reverse">
        <div
          className="relative bg-indigo-100 rounded-2xl dark:bg-dark-primary p-3 px-4 shadow"
          style={{ borderBottomRightRadius: 0 }}
        >
          <div>{message.content}</div>
          <div className="flex justify-end">
            <AppButton
              size="small"
              type="link"
              className="rounded-full text-xs"
              onClick={() => setMessageToCheck(message)}
            >
              Kiểm tra
            </AppButton>
          </div>
        </div>

        {message.status === 'error' ? (
          <AppButton
            onClick={reSend}
            type="link"
            size="small"
            danger
            icon={<i className="fa-solid fa-rotate-left m-0"></i>}
          >
            Failed
          </AppButton>
        ) : (
          <div className="message-actions flex items-center gap-2">
            <AppDeleteButton onConfirm={reStart} title="Delete" type="link" />
            {message.recorded && (
              <AppButton
                onClick={() => {
                  SpeakerService.cancel()
                  new Audio(message.recorded).play()
                }}
                size="small"
                type="link"
                icon={<i className="fa-solid fa-volume-low"></i>}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
})
