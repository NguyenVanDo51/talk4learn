"use client"

import { Avatar } from "@/components/displayers/Avatar"
import { ILesson } from "@/types/lesson/type"
import { Empty } from "antd"
import Link from "next/link"

export const HomeClient = ({ bots }: { bots: ILesson[] }) => {
  console.log("bots", bots)
  return (
    <div className="container max-w-2xl my-0 mx-auto p-3">
      <h1 className="font-medium text-lg">Your bots</h1>
      <div className="flex flex-col  mt-3">
        {bots?.length > 0
          ? bots.map((bot) => (
              <Link
                href={`/chat/${bot.id}`}
                key={bot.id}
                className="flex gap-3 border-b hover:bg-gray-100 p-2"
              >
                <Avatar
                  src={bot.botImage || "/bot_placeholder.png"}
                  size={64}
                  shape="square"
                />
                <div className="">
                  <p className="font-medium m-0">{bot.name}</p>

                  <span className="text-gray-500 text-sm p-0 truncate block">
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
            ))
          : "No Data"}
      </div>
    </div>
  )
}
