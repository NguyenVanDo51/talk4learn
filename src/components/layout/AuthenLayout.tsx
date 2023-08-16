"use client"
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { LoadingScreen } from '../level1/Loading'
import { UserService } from '@/service/user/index.service'
import { useRouter } from 'next/navigation'

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

  return <div>{children}</div>
}
