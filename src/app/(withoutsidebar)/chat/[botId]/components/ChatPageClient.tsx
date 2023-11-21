import AIChat from "@/components/template/chat"
import { ILesson } from "@/types/lesson/type"

export const ChatPageClient = ({ bot }: { bot: ILesson }) => {
  return <AIChat lesson={bot} />
}
