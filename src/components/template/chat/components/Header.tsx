import { AppButton } from '@/components/level1/AppButton'
import { FC } from 'react'
import { SettingModal } from './SettingModal'
import { IAIModel } from '@/types/chat'
import { IChatSetting } from '..'

interface IProps {
  model: IAIModel
  settings: IChatSetting
  setIsShowComment: (value: boolean) => void
  setSettings: (settings: IChatSetting) => void
  isShowAnalyst: boolean
}

export const Header: FC<IProps> = ({ model, settings, isShowAnalyst, setIsShowComment, setSettings }) => {
  return (
    <>
      <div className="flex items-center justify-between p-2 md:p-4">
        <AppButton icon={<i className="fa-solid fa-bars text-xl"></i>} type="text" />
        <span className="font-medium text-lg">Chat with {model.name}</span>

        <div className="flex gap-2">
          <SettingModal settings={settings} setSettings={setSettings} />
          <AppButton onClick={() => setIsShowComment(!isShowAnalyst)} size="small" type="text">
            <i className={`fa-solid fa-outdent text-xl ${isShowAnalyst ? 'text-primary' : 'text-gray-500'}`}></i>
          </AppButton>
        </div>
      </div>
    </>
  )
}
