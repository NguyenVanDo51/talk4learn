'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { LoadingScreen } from '../level1/Loading'
import { UserService } from '@/service/user/index.service'
import { useRouter } from 'next/navigation'
import { darkTheme, defaultTheme } from '@/theme/themeConfig'
// import { ConfigProvider } from 'antd'
import { MainHeader } from './Header'

export const AuthenLayout = ({ children }: any) => {
  const { data, status } = useSession()

  const route = useRouter()
  const getSettings = async () => {
    await UserService.getSettings()
  }

  useEffect(() => {
    if (!data?.user?.email) return
    getSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user?.email])

  if (status === 'loading') {
    return <LoadingScreen fullScreen />
  }

  if (status === 'unauthenticated') {
    route.push('/')
    return <LoadingScreen fullScreen />
  }

  return (
    // <ConfigProvider theme={defaultTheme}>
      <div className="flex flex-col flex-grow h-screen">
        <MainHeader />

        <div
          className="flex flex-row w-full mt-[52px] overflow-hidden gap-5 px-2 lg:px-5"
          style={{ height: 'calc(100vh - 52px)' }}
        >
          <div className="flex-grow overflow-y-auto">{children}</div>
        </div>
      </div>
    // </ConfigProvider>
  )
}
