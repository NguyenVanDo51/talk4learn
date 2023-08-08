import { AppButton } from '@/components/level1/AppButton'
import { FC, MutableRefObject, useRef } from 'react'
import { ISettingRef, SettingModal } from './SettingModal'
import { IAIModel } from '@/types/chat'
import { IChatSetting } from '..'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsOpenMenu } from '@/redux/slices/appSlice'
import { Avatar } from 'antd'

interface IProps {
  model: IAIModel
  settings: IChatSetting
  setIsShowComment: (value: boolean) => void
  setSettings: (settings: IChatSetting) => void
  isShowAnalyst: boolean
}

export const Header: FC<IProps> = ({ model, settings, isShowAnalyst, setIsShowComment, setSettings }) => {
  const isOpenMenu = useAppSelector((state) => state.app.isOpenMenu)
  const settingRef: MutableRefObject<ISettingRef | undefined> = useRef()

  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    dispatch(setIsOpenMenu(!isOpenMenu))
  }

  return (
    <>
      <div className={`flex items-center justify-between h-[56px] ${isShowAnalyst ? '' : 'lg:pr-4'} `}>
        <AppButton
          className="pl-2 lg:hidden"
          onClick={toggleMenu}
          size="small"
          icon={<i className="fa-solid fa-bars text-xl"></i>}
          type="text"
        />

        <div className="flex justify-center flex-grow">
          <span
            className="font-medium cursor-pointer flex gap-2 items-center"
            onClick={() => settingRef.current?.open()}
          >
            <Avatar src={model.avatar}>{model.name.at(0)}</Avatar>
            <span className="text-lg">
              {model.name} <i className="fa-solid fa-angle-right text-xs"></i>
            </span>
          </span>
        </div>
        <div className="flex gap-2">
          <AppButton
            className="mr-3 lg:w-[30px]"
            onClick={() => setIsShowComment(!isShowAnalyst)}
            size="small"
            type="text"
            icon={
              <i className={`fa-regular fa-layer-group text-xl ${isShowAnalyst ? 'text-primary' : 'text-white'}`} />
            }
          />
        </div>
      </div>

      <SettingModal ref={settingRef} settings={settings} setSettings={setSettings} />
    </>
  )
}
