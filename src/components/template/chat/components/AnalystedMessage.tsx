import { Collapse } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import { IAnalystMessage } from '..'

interface IProps {
  messages: IAnalystMessage[]
}

export const AnalyistedMessage: FC<IProps> = ({ messages }) => {
  const [activeKey, setActiveKey] = useState<string[]>([])

  const messagesPasred = useMemo(() => {
    return messages.filter((m) => m.comment).map((m) => ({ key: m.id, label: m.content, children: m.comment }))
  }, [messages])

  useEffect(() => {
    const newestMessage = messages.at(-1)
    if (newestMessage) {
      setActiveKey([newestMessage.id] as any)
    }
  }, [messages])

  return (
    <div className="col-start-8 col-end-13">
      <div className="grid gap-3 w-full">
        <div className="font-bold mb-3">Comment</div>
        {messagesPasred.length > 0 ? (
          <Collapse
            size="small"
            items={messagesPasred}
            className="h-fit"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key as string[])}
          ></Collapse>
        ) : (
          <span className="text-gray-500">Empty</span>
        )}
      </div>
    </div>
  )
}
