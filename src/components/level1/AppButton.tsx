'use client'

import { FC } from 'react'
import { Button as AntButton, ButtonProps } from 'antd'

interface IProps extends ButtonProps {
  children?: React.ReactNode
}

export const AppButton: FC<IProps> = ({ children, type = 'primary', size = 'large', ...props }) => {
  return (
    <AntButton type={type} size={size} {...props}>
      {children}
    </AntButton>
  )
}
