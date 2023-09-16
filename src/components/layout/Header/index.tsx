import { AppButton } from '@/components/level1/antd/AppButton'
import { Logo } from '@/components/level1/Logo'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { setIsOpenMenu } from '@/redux/slices/appSlice'
import { Dropdown, Avatar, Drawer } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { About } from '../sidebar/components/about'
import { Feedback } from '../sidebar/components/feedback'
import { SettingModal } from '../sidebar/components/settings'
import { Fragment, useEffect, useState } from 'react'
import { useDimention } from '@/hooks/helpers/useDimention'
import { MenuItem } from '../sidebar/components/MenuItem'

export const MainHeader = () => {
  const isOpenMenu = useAppSelector((state) => state.app.isOpenMenu)
  const { data } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const { isDesktop } = useDimention()
  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    dispatch(setIsOpenMenu(!isOpenMenu))
  }

  const activeClass = 'dark:text-dark-primary font-medium bg-white rounded-md px-2 py-1 shadow-md'
  const items = [
    {
      key: '/app',
      title: 'Chat',
      icon: <i className="fa-regular fa-robot"></i>,
    },
    {
      key: '/app/conversations',
      title: 'Conversations',
      icon: <i className="fa-regular fa-messages"></i>,
    },
    {
      key: '',
      title: 'Settings',
      icon: <i className="fa-regular fa-gear"></i>,
      onClick: () => setOpen(true),
    },
  ]

  useEffect(() => {
    dispatch(setIsOpenMenu(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderBarButon = () => (
    <AppButton
      className="lg:hidden h-fit py-0"
      onClick={toggleMenu}
      size="middle"
      icon={<i className="fa-solid fa-bars text-xl"></i>}
      type="text"
    />
  )
  return (
    <>
      <div className="p-2 lg:px-4 fixed flex items-center justify-between w-screen z-[99] dark:bg-dark-main">
        {isDesktop ? (
          <div className="flex items-center justify-between lg:justify-start gap-3">
            {renderBarButon()}
            <Logo />
          </div>
        ) : (
          <>
            {renderBarButon()}
            <Logo />
          </>
        )}

        <div className="items-center gap-4 main-menu hidden lg:flex">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              className={pathname === item.key ? activeClass : ''}
              onClick={
                item.onClick
                  ? (e) => {
                      e.preventDefault()
                      item?.onClick?.()
                    }
                  : undefined
              }
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </div>

        <Dropdown
          className="p-0"
          menu={{
            items: [
              {
                key: '1',
                label: <About />,
              },
              {
                key: '2',
                label: <Feedback />,
              },
              {
                key: '4',
                label: (
                  <MenuItem onClick={() => signOut()} iconClass="fa-regular fa-arrow-right-from-bracket">
                    Sign out
                  </MenuItem>
                ),
              },
            ],
          }}
          trigger={['click']}
        >
          <span className="cursor-pointer">
            <Avatar src={data?.user?.image} /> <i className="fa-regular fa-chevron-down"></i>
          </span>
        </Dropdown>
      </div>

      <Drawer
        placement="left"
        open={isOpenMenu}
        onClose={toggleMenu}
        headerStyle={{ height: 56 }}
        bodyStyle={{ padding: 0 }}
        closeIcon={<i className="fa-solid fa-xmark text-xl text-white"></i>}
        title={
          <div className="flex justify-center pr-4">
            <Logo />
          </div>
        }
      >
        <div className="flex flex-col items-center justify-start">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              className={`w-full p-3 py-4 inline-block ${
                pathname === item.key ? 'font-medium bg-primary text-white' : ''
              }`}
              onClick={
                item.onClick
                  ? (e) => {
                      e.preventDefault()
                      item.onClick()
                      toggleMenu()
                    }
                  : undefined
              }
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </div>
      </Drawer>

      <SettingModal open={open} onCancel={() => setOpen(false)} />
    </>
  )
}
