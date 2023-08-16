import { AppButton } from '@/components/level1/antd/AppButton'
import { FC } from 'react'
import { IChatSetting } from '..'
import { Avatar } from 'antd'
import { IAIModel } from '@/types/chat/models'

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
      <div className={`flex items-center justify-between min-h-[54px] dark:bg-dark-active-main-bg`}>
        <div className="flex justify-center flex-grow">
          <Avatar src={model.avatar}>{model.name.at(0)}</Avatar>
        </div>

        <AppButton
          className={`transition-none ${isShowAnalyst ? 'lg:mr-3' : ''} mr-4 lg:w-[30px] h-fit`}
          onClick={() => setIsShowComment(!isShowAnalyst)}
          size="small"
          type="text"
          icon={<i className={`fa-regular fa-sidebar-flip text-xl ${isShowAnalyst ? 'text-primary' : 'text-white'}`} />}
        />
      </div>
    </>
  )
}
