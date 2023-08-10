import { Logo } from '@/components/level1/Logo'
import { useDimention } from '@/hooks/helpers/useDimention'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsOpenMenu } from '@/redux/slices/appSlice'
import { AIModels } from '@/types/chat'
import { Avatar, Divider, Drawer, Dropdown, Modal } from 'antd'
import { Feedback } from '../items/feedback'
import { About } from '../items/about'
import { signOut, useSession } from 'next-auth/react'
import { ModalConfirm } from '@/components/level1/antd/AppModal'

const ConversationList = () => {
  const { data } = useSession()

  return (
    <div className="flex flex-col gap-3 overflow-y-auto pt-2 justify-between h-full">
      <div className="flex flex-col space-y-1">
        {AIModels.map((model) => (
          <button
            key={model.id}
            className="flex flex-row items-center  hover:bg-gray-100 dark:bg-dark-primary px-4 py-3"
          >
            <Avatar>{model.name.at(0)}</Avatar>
            <div className="ml-3 text-sm font-semibold">{model.name}</div>
          </button>
        ))}
      </div>
      <div className="flex flex-col">
        <Divider className="m-0" />
        <About />
        <Feedback />
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
          <button className="flex flex-row justify-between items-center hover:bg-gray-100 dark:hover:bg-dark-primary px-4 py-3">
            <div className="flex items-center">
              <Avatar src={data?.user?.image} />
              <span className="ml-3 text-sm font-semibold">{data?.user?.name}</span>
            </div>
            <i className="fa-regular fa-ellipsis-stroke"></i>
          </button>
        </Dropdown>
      </div>
    </div>
  )
}

export const Conversations = () => {
  const isOpenMenu = useAppSelector((state) => state.app.isOpenMenu)
  const dispatch = useAppDispatch()
  const { isDesktop } = useDimention()
  const closeMenu = () => {
    dispatch(setIsOpenMenu(!isOpenMenu))
  }

  if (isDesktop) {
    return (
      <div
        className={`${
          isOpenMenu ? 'flex' : 'hidden'
        } lg:flex flex-col w-60 flex-shrink-0 h-full z-50 shadow-md border-r dark:border-dark-line`}
      >
        <div className="flex items-center justify-center min-h-[54px] dark:bg-dark-active-main-bg">
          <Logo />
        </div>
        <ConversationList />
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
      <ConversationList />
    </Drawer>
  )
}
