'use client'

import { FC } from 'react'
import { Modal, ModalProps } from 'antd'

export interface AppModalProps extends ModalProps {
  children: React.ReactNode
}

export const AppModal: FC<AppModalProps> = ({ children, ...props }) => {
  return <Modal centered {...props}>{children}</Modal>
}
