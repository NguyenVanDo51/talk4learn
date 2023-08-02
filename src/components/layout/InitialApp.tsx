'use client'
import { useTheme } from '@/hooks/helpers/useTheme'
import { darkTheme, defaultTheme } from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import { FC, useEffect } from 'react'
import StyledComponentsRegistry from '../../../lib/AntdRegistry'

export const InitialApp: FC<{ children: any }> = ({ children }) => {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.classList.remove('dark')
    document.body.classList.remove('light')
    document.body.classList.add(theme)
  }, [theme])

  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>{children}</ConfigProvider>
    </StyledComponentsRegistry>
  )
}
