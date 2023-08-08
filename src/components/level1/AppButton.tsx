'use client'

import { FC, ReactNode } from 'react'
import { Button as AntButton, ButtonProps, Popconfirm } from 'antd'
interface AppButtonProps extends ButtonProps {
  children?: React.ReactNode
}

export const AppButton: FC<AppButtonProps> = ({ children, type = 'primary', size = 'large', ...props }) => {
  return (
    <AntButton type={type} size={size} {...props}>
      {children}
    </AntButton>
  )
}

interface IProps extends AppButtonProps {
  title?: string
  description?: string
  children?: ReactNode
  onConfirm: () => void
}

export const AppDeleteButton: React.FC<IProps> = ({
  children,
  title = 'Confirm',
  description = 'Are you sure to delete this?',
  onConfirm,
  ...props
}) => {
  return (
    <Popconfirm title={title} description={description} onConfirm={onConfirm} okText="Yes" cancelText="No">
      <AppButton danger size="small" icon={<i className="fa-solid fa-trash"></i>} {...props}>
        {children}
      </AppButton>
    </Popconfirm>
  )
}
