'use client'

import { Provider } from 'react-redux'
import store from './store'
import { FC, ReactNode } from 'react'

export const ReduxProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
