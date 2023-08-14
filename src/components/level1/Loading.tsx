import { Spin } from 'antd'
import { Logo } from './Logo'

export const LoadingScreen = () => {
  return (
    <div className="flex gap-3 items-center justify-center w-[100vw] h-[100vh]">
      <Logo /> <Spin />
    </div>
  )
}
