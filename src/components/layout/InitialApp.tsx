'use client'
import { useTheme } from '@/hooks/helpers/useTheme'
import { darkTheme, defaultTheme } from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import { FC, useEffect } from 'react'

export const InitialApp: FC<{ children: any }> = ({ children }) => {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.classList.remove('dark')
    document.body.classList.remove('light')
    document.body.classList.add(theme)
  }, [theme])

  return <ConfigProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>{children}</ConfigProvider>
}
