'use client'

import { FC, ForwardRefExoticComponent, MutableRefObject, RefAttributes, forwardRef } from 'react'
import { Input, InputProps, InputRef } from 'antd'

interface IProps extends InputProps {
  onEnter?: () => void
}

// eslint-disable-next-line react/display-name
export const AppInput: ForwardRefExoticComponent<IProps & RefAttributes<InputRef>> = forwardRef(
  ({ onEnter, ...props }: IProps, ref: any) => {
    return (
      <Input
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.()
          }
        }}
        {...props}
      />
    )
  }
)
