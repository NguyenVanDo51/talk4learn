import Link from "next/link"
import { Avatar } from "@/components/displayers/Avatar"
import { ILesson } from "@/types/lesson/type"


const PostCap = ({ bot }: { bot: ILesson }) => {
  return (
    <>
      <Link
        href={`/chat/${bot.id}`}
        key={bot.id}
        className="flex gap-3 bg-gray-100 p-2 mb-2 rounded-xl border shadow border-transparent hover:border-blue-500"
      >
        <Avatar
          src={bot.botImage || "/bot_placeholder.png"}
          size={64}
          shape="square"
        />
        <div className="">
          <p className="font-medium m-0">{bot.name}</p>

          <span className="line-clamp-1 text-gray-500 text-sm">
            {bot.userInstruction}
          </span>

          <div className="flex flex-row text-xs items-center mt-1">
            <span className="mr-2">
              {bot.used ?? 1} monthly user{bot.used > 1 ? "s" : ""}
            </span>

            {bot.tags?.map((tag, index) => (
              <span
                key={`${tag}_${index}`}
                className="bg-gray-200 text-gray-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  )
}

export default PostCap
