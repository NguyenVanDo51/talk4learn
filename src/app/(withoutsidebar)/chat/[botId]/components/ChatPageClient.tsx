"use client"
import AIChat from "@/components/template/chat"
import { useSettings } from "@/hooks/helpers/use-settings"
import { ScenarioInterface } from "@/types/lesson/type"
import { useEffect } from "react"

export const ChatPageClient = ({ bot }: { bot: ScenarioInterface }) => {
  return <AIChat lesson={bot} />
}
