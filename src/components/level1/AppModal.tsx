'use client'

import { FC } from 'react'
import { ConfigProvider, Modal, ModalProps } from 'antd'
import { darkTheme } from '@/theme/themeConfig'

export interface AppModalProps extends ModalProps {
  children: React.ReactNode
}

export const AppModal: FC<AppModalProps> = ({ children, ...props }) => {
  return (
    <Modal centered {...props}>
      {children}
    </Modal>
  )
}
