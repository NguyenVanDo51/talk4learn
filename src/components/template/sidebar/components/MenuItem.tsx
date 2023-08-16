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
      className={`flex flex-row items-center h-[56px] ${
        active ? 'dark:bg-dark-primary' : ''
      } dark:hover:bg-dark-primary px-4 py-3`}
      onClick={onClick}
    >
      {iconClass ? <i className={`${iconClass} text-xl`}></i> : icon}
      <div className="ml-3 text-sm font-semibold">{children}</div>
    </button>
  )
}
