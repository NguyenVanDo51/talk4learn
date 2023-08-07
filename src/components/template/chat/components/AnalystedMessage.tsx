import { Collapse, Drawer, Spin } from 'antd'
import { FC, useEffect, useState } from 'react'
import { IAnalystMessage } from '..'
import { AppButton } from '@/components/level1/AppButton'
import { useDimention } from '@/hooks/helpers/useDimention'

interface IProps {
  isGettingComment: boolean
  isShowAnalyst: boolean
  analystedMessages: IAnalystMessage[]
  setIsShowComment: (isShowAnalyst: boolean) => void
}

export const AnalyistedMessage: FC<IProps> = ({
  isGettingComment,
  isShowAnalyst,
  analystedMessages,
  setIsShowComment,
}) => {
  const [activeKey, setActiveKey] = useState<string[]>([])
  const { isDesktop } = useDimention()

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

  const renderContent = () =>
    messagesPasred.length > 0 ? (
      <Collapse
        size="small"
        items={messagesPasred}
        className="h-fit"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as string[])}
      ></Collapse>
    ) : (
      <span className="text-gray-500">Empty</span>
    )

  if (isDesktop && isShowAnalyst) {
    return (
      <div className="col-start-8 col-end-13">
        <div className="grid gap-3 w-full">
          <div className="font-bold flex justify-center items-center h-[54px]">Comment</div>
          {renderContent()}
        </div>
      </div>
    )
  }

  return (
    <Drawer
      placement="right"
      open={isShowAnalyst}
      onClose={() => setIsShowComment(false)}
      headerStyle={{ height: 56 }}
      closeIcon={<i className="fa-solid fa-xmark text-xl text-white"></i>}
      title={<div className="flex justify-center pr-4">Comments</div>}
    >
      {renderContent()}
    </Drawer>
  )
}
