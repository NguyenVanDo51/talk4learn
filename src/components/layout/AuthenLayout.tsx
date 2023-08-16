'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { LoadingScreen } from '../level1/Loading'
import { UserService } from '@/service/user/index.service'
import { useRouter } from 'next/navigation'
import { darkTheme } from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import { Conversations } from '../template/sidebar'

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
    return <LoadingScreen />
  }

  if (status === 'unauthenticated') {
    route.push('/')
    return <LoadingScreen />
  }

  return (
    <ConfigProvider theme={darkTheme}>
      <div className="flex flex-grow h-screen">
        <div className="flex flex-row h-full w-full">
          <Conversations />
          <div className="flex-grow">{children}</div>
        </div>
      </div>
    </ConfigProvider>
  )
}
