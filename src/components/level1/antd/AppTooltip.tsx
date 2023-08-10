import { Tooltip, TooltipProps } from 'antd'
import { ReactNode, FC } from 'react'

type IProps = TooltipProps & {
  children: ReactNode
}
export const AppTooltip: FC<IProps> = ({ children, ...props }) => {
  return <Tooltip {...props}>{children}</Tooltip>
}
