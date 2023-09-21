'use client'
import { Avatar, Popover } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SettingModal } from './components/settings'
import { useEffect, useState } from 'react'
import { UserService } from '@/service/user/index.service'

export const Sidebar = () => {
  const { data } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  console.log('pathname', pathname)
  const menuItems = [
    {
      key: '/app',
      label: 'Trang chủ',
      icon: (
        <Image
          width="50"
          height="50"
          src="https://img.icons8.com/bubbles/50/home-page.png"
          alt="home-page"
        />
      ),
    },
    {
      key: '/app/conversations',
      label: 'Luyện tập',
      icon: (
        <div className="flex justify-center items-center">
          <Image
            width="40"
            height="40"
            src="https://img.icons8.com/external-flat-icon-mangsaabguru-/40/external-exercise-housework-and-hobby-flat-flat-icon-mangsaabguru-.png"
            alt="external-Exercise-fitness-goofy-color-kerismaker"
          />
        </div>
      ),
    },
    {
      key: '/app/profile',
      label: 'Hồ sơ',
      icon: (
        <div className="pl-1">
          <Avatar size={40} src={data?.user?.image} />
        </div>
      ),
    },
    {
      key: '/app/setting',
      label: 'Cài đặt',
      icon: (
        <Image width="50" height="50" src="https://img.icons8.com/bubbles/50/gear.png" alt="gear" />
      ),
      onClick: () => setOpen(true),
    },
    {
      key: 'more',
      icon: (
        <Image
          width="100"
          height="100"
          src="https://img.icons8.com/cute-clipart/100/connection-status-off.png"
          alt="connection-status-off"
        />
      ),
      label: 'Xem thêm',
      popover: (
        <div className="grid gap-2 min-w-[150px]">
          <span className="cursor-pointer inline-flex gap-2 items-center hover:bg-[#0000000f] rounded-xl py-2 p-4 text-[#777777] font-medium">
            Trợ giúp
          </span>
          <span
            onClick={() => {
              signOut()
            }}
            className="cursor-pointer inline-flex gap-2 items-center hover:bg-[#0000000f] rounded-xl py-2 p-4 text-[#ff4b4b] font-medium"
          >
            Đăng xuất
          </span>
        </div>
      ),
      onClick: () => null,
    },
  ]

  const getSettings = async () => {
    await UserService.getSettings()
  }

  useEffect(() => {
    if (!data?.user?.email) return
    getSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user?.email])

  return (
    <>
      {menuItems.map(({ key, icon, label, onClick, popover }) => {
        const content = (
          <li key={key}>
            <Link
              href={onClick ? '' : key}
              className={`flex border-2 border-transparent items-center px-4 py-[2px] text-gray-900 rounded-2xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                pathname === key
                  ? ' !border-primary !bg-bg-primary !hover:bg-bg-primary text-active'
                  : ''
              }`}
              onClick={(e) => {
                if (onClick) {
                  e.stopPropagation()
                  onClick()
                }
              }}
            >
              <span className="w-12 h-12 flex text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                {icon}
              </span>
              <span className="ml-3">{label}</span>
            </Link>
          </li>
        )

        return popover ? (
          <Popover trigger={['hover']} placement="right" content={popover} key={key}>
            {content}
          </Popover>
        ) : (
          content
        )
      })}

      <SettingModal open={open} onCancel={() => setOpen(false)} />
    </>
  )
}
