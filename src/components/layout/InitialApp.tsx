'use client'
import { darkTheme, defaultTheme } from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import { FC } from 'react'

export const InitialApp: FC<{ children: any }> = ({ children }) => {
  // const { theme } = useTheme()
  const theme = 'dark'
  // useEffect(() => {
  //   document.body.classList.remove('dark')
  //   document.body.classList.remove('light')
  //   document.body.classList.add(theme)
  // }, [theme])

  return <ConfigProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>{children}</ConfigProvider>
}
