import { AIModels } from '@/types/chat'
import { Avatar } from 'antd'

export const Conversations = () => {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-40 flex-shrink-0 h-full">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 dark:bg-slate-500 dark:text-white h-4 w-4 rounded-full">
            1
          </span>
        </div>

        <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
          {AIModels.map((model) => (
            <button
              key={model.id}
              className="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl p-2"
            >
              <Avatar>{model.name.at(0)}</Avatar>
              <div className="ml-2 text-sm font-semibold">{model.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
