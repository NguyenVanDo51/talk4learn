import { Collapse, CollapseProps } from 'antd'
import { FC, ReactNode } from 'react'

interface IProps extends CollapseProps {
  children: ReactNode
  isCollapsible?: boolean
}

export const AppCard: FC<IProps> = ({ children, isCollapsible = false }) => {
  return (
    <Collapse
      activeKey={isCollapsible ? '1' : undefined}
      className="max-height-50"
      items={[
        {
          key: '1',
          label: 'Your vocabularies',
          children,
        },
      ]}
    />
  )
}
