import { AppButton } from '@/components/level1/antd/AppButton'
import { Logo } from '@/components/level1/Logo'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { setIsOpenMenu } from '@/redux/slices/appSlice'
import { Dropdown, Avatar } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const MainHeader = () => {
  const isOpenMenu = useAppSelector((state) => state.app.isOpenMenu)
  const { data } = useSession()
  const pathname = usePathname()

  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    dispatch(setIsOpenMenu(!isOpenMenu))
  }

  return (
    <div className="p-2 lg:px-4 fixed flex items-center justify-between w-screen z-[9999] dark:bg-dark-main">
      <div className="flex items-center gap-3">
        <AppButton
          className="ml-4 lg:hidden h-fit"
          onClick={toggleMenu}
          size="small"
          icon={<i className="fa-solid fa-bars text-xl"></i>}
          type="text"
        />
        <Logo />
      </div>
      <div className="flex gap-4">
        <Link href={'/app'} className={pathname === '/app' ? 'dark:text-dark-primary font-medium' : ''}>
          <i className="fa-regular fa-robot"></i> Chat
        </Link>
        <Link href={'/app/conversations'} className={pathname === '/app/conversations' ? 'dark:text-dark-primary font-medium' : ''}>
          <i className="fa-regular fa-messages"></i> Conversations
        </Link>
      </div>

      <Dropdown
        className="p-0"
        menu={{
          items: [
            {
              key: '1',
              label: (
                <button
                  className="flex flex-row items-center hover:bg-gray-100 dark:bg-black dark:hover:bg-dark-primary w-full p-3"
                  onClick={() => signOut()}
                >
                  <i className="fa-regular fa-arrow-right-from-bracket text-2xl"></i>
                  <div className="ml-3 text-sm font-semibold">Sign out</div>
                </button>
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
  )
}
