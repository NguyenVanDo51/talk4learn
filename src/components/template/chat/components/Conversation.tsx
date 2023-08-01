import { AIModels } from '@/types/chat'

export const Conversations = () => {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 h-full">
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
        </div>

        <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
          {AIModels.map((model) => (
            <button key={model.id} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">H</div>
              <div className="ml-2 text-sm font-semibold">{model.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
