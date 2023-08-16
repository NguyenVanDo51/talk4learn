import { Logo } from '@/components/level1/Logo'
import { useDimention } from '@/hooks/helpers/useDimention'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsOpenMenu } from '@/redux/slices/appSlice'
import { Avatar, Divider, Drawer, Dropdown } from 'antd'
import { Feedback } from './components/feedback'
import { About } from './components/about'
import { signOut, useSession } from 'next-auth/react'
import { AIModels } from '@/types/chat/models'
import { Settings } from './components/settings'
import { MenuItem } from './components/MenuItem'
import { usePathname, useRouter } from 'next/navigation'

const ChatSidebar = () => {
  const { data } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-3 overflow-y-auto justify-between h-full">
      <div className="flex flex-col space-y-1">
        {AIModels.map((model) => (
          <MenuItem
            key={model.id}
            active={pathname === '/app'}
            icon={
              <Avatar src={model.avatar} size={24}>
                {model.name.at(0)}
              </Avatar>
            }
            onClick={() => router.push('/app')}
          >
            {model.name}
          </MenuItem>
        ))}
      </div>

      <div className="flex flex-col">
        <Settings />
        <About />
        <Feedback />
      </div>
    </div>
  )
}

export const Sidebar = () => {
  const isOpenMenu = useAppSelector((state) => state.app.isOpenMenu)
  const dispatch = useAppDispatch()
  const { isDesktop } = useDimention()
  const closeMenu = () => {
    dispatch(setIsOpenMenu(!isOpenMenu))
  }

  if (isDesktop) {
    return (
      <div className={`${isOpenMenu ? 'flex' : 'hidden'} lg:flex flex-col w-60 flex-shrink-0 h-full z-50`}>
        <ChatSidebar />
      </div>
    )
  }

  return (
    <Drawer
      placement="left"
      open={isOpenMenu}
      onClose={closeMenu}
      headerStyle={{ height: 56 }}
      bodyStyle={{ padding: 0 }}
      closeIcon={<i className="fa-solid fa-xmark text-xl text-white"></i>}
      title={
        <div className="flex justify-center pr-4">
          <Logo />
        </div>
      }
    >
      <ChatSidebar />
    </Drawer>
  )
}
