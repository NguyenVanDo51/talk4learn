import { Collapse, Spin } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import { IAnalystMessage } from '..'
import { AppButton } from '@/components/level1/AppButton'

interface IProps {
  isGettingComment: boolean
  analystedMessages: IAnalystMessage[]
}

export const AnalyistedMessage: FC<IProps> = ({ isGettingComment, analystedMessages }) => {
  const [activeKey, setActiveKey] = useState<string[]>([])

  const messagesPasred = analystedMessages.map((m) => ({
    key: m.id,
    label: (
      <div className="flex justify-between">
        <span>{m.content}</span>{' '}
        {m.status === 'error' && (
          <AppButton type="link" danger={false} icon={<i className="fa-solid fa-arrows-rotate"></i>} />
        )}
        {m.status === 'sent' && <Spin spinning />}
      </div>
    ),
    children: m.comment,
    type: 'divider',
  }))

  useEffect(() => {
    if (isGettingComment) return
    
    const newestMessage = analystedMessages.at(-1)
    if (newestMessage) {
      setActiveKey([newestMessage.id] as any)
    }
  }, [isGettingComment, analystedMessages])

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
