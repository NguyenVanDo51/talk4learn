'use client'

import { FC } from 'react'
import { Modal, ModalProps } from 'antd'

interface IProps extends ModalProps {
  children: React.ReactNode
}

export const AppModal: FC<IProps> = ({ children, ...props }) => {
  return <Modal centered {...props}>{children}</Modal>
}
