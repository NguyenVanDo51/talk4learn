import { redirect, useParams } from "next/navigation"
import { ChatPageClient } from "./components/ChatPageClient"
import { SITUATION_TABLE } from "@/app/api/situations/route"
import { firestore } from "@/service/firestore"
import { ILesson } from "@/types/lesson/type"

export default async function ChatPage(req: { params: { botId: string } }) {
  const bot = await firestore
    .collection(SITUATION_TABLE)
    .doc(req.params.botId)
    .get()
    .then((r) => r.data())
  console.log("bot", bot)

  if (!bot) redirect("/")

  return <ChatPageClient bot={bot as ILesson} />
}
