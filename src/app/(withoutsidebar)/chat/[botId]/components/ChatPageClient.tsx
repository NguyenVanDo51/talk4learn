"use client"
import AIChat from "@/components/template/chat"
import { useSettings } from "@/hooks/helpers/use-settings"
import { ScenarioInterface } from "@/types/lesson/type"
import { useEffect } from "react"

export const ChatPageClient = ({ bot }: { bot: ScenarioInterface }) => {
  const { initSettings } = useSettings()

  useEffect(() => {
    initSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AIChat lesson={bot} />
}
