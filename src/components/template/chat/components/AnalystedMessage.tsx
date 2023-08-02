import { IMessage } from '@/types/chat'
import { Collapse } from 'antd'
import { FC, useMemo } from 'react'

interface IProps {
  messages: IMessage[]
}

export const AnalyistedMessage: FC<IProps> = ({ messages }) => {
  const messagesPasred = useMemo(() => {
    return messages.filter((m) => m.comment).map((m) => ({ key: m.id, label: m.content, children: m.comment }))
  }, [messages])

  return (
    <div className="w-[20%] min-w-[20%]">
      <div className="grid gap-3 w-full">
        <div className="font-bold mb-3">Comment</div>
        {messagesPasred.length > 0 ? (
          <Collapse size="small" items={messagesPasred} className="h-fit"></Collapse>
        ) : (
          <span className="text-gray-500">Empty</span>
        )}
      </div>
    </div>
  )
}
