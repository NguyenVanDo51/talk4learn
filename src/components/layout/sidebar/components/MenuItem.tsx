import { FC, ReactNode } from 'react'

interface IProps {
  icon?: ReactNode
  iconClass?: string
  children: ReactNode
  active?: boolean
  onClick?: () => void
}

export const MenuItem: FC<IProps> = ({ children, icon, active, iconClass, onClick }) => {
  return (
    <button
      className={`flex rounded-full flex-row items-center py-2 ${
        active ? 'dark:bg-[#3b3e45]' : ''
      } dark:hover:bg-[#3b3e45] px-4`}
      onClick={onClick}
    >
      {iconClass ? <i className={`${iconClass} text-xl`}></i> : icon}
      <div className="ml-3 text-sm font-semibold">{children}</div>
    </button>
  )
}
