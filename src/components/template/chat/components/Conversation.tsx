import { Logo } from '@/components/level1/Logo'
import { useDimention } from '@/hooks/helpers/useDimention'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsOpenMenu } from '@/redux/slices/appSlice'
import { AIModels } from '@/types/chat'
import { Avatar, Drawer } from 'antd'

const ConversationList = () => {
  return (
    <div className="flex flex-col space-y-1 -mx-2 overflow-y-auto">
      {AIModels.map((model) => (
        <button
          key={model.id}
          className="flex flex-row items-center  hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-700 rounded-xl p-2"
        >
          <Avatar>{model.name.at(0)}</Avatar>
          <div className="ml-2 text-sm font-semibold">{model.name}</div>
        </button>
      ))}
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
        } lg:flex flex-col pl-6 pr-2 w-60 flex-shrink-0 h-full z-50 dark:bg-dark-main shadow-md`}
      >
        <div className="flex items-center h-[54px]">
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
