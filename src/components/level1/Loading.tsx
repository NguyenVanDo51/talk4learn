import { Logo } from './Logo'
import { AppSpin } from './antd/AppSpin';

export const LoadingScreen = ({ fullScreen, noLogo = false }: { fullScreen?: boolean; noLogo?: boolean }) => {
  return (
    <div className={`flex gap-3 items-center justify-center ${fullScreen ? 'w-[100vw] h-[100vh]' : 'w-full h-full'} `}>
      {!noLogo && <Logo />} <AppSpin />
    </div>
  )
}
