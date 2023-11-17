"use client"

import { ILesson } from "@/types/lesson/type"

export const MyBotClient = ({ bots }: { bots: ILesson[] }) => {
  return <div>My bot {String(bots)}</div>
}
