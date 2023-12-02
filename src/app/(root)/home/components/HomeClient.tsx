"use client"

import PostCap from "@/components/displayers/botsCap"
import { ScenarioInterface } from "@/types/lesson/type"

export const HomeClient = ({ bots }: { bots: ScenarioInterface[] }) => {
  return (
    <div className="container max-w-2xl my-0 mx-auto p-3">
      <h1 className="font-medium text-lg">Your bots</h1>
      <div className="flex flex-col  mt-3">
        {bots?.length > 0
          ? bots.map((bot) => <PostCap key={bot.id} bot={bot} />)
          : "No Data"}
      </div>
    </div>
  )
}
