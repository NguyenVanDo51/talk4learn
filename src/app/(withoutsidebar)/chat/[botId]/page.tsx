import { redirect, useParams } from "next/navigation"
import { ChatPageClient } from "./components/ChatPageClient"
import { SITUATION_TABLE } from "@/app/api/situations/route"
import { firestore } from "@/service/firestore"
import { ILesson } from "@/types/lesson/type"
import { USER_TABLE } from "@/app/api/webhooks/clerk/route"
import { DocumentData } from "firebase-admin/firestore"
import { User } from "@clerk/nextjs/server"
import dayjs from "dayjs"

export default async function ChatPage(req: { params: { botId: string } }) {
  const bot = await firestore
    .collection(SITUATION_TABLE)
    .doc(req.params.botId)
    .get()
    .then(async (docSnaps: DocumentData) => {
      const bot: ILesson | undefined = docSnaps.data()
      if (!bot) return

      bot.author = (await firestore
        .collection(USER_TABLE)
        .doc(bot.createdBy)
        .get()
        .then((r) => r.data())) as User

      return bot
    })
  console.log("bot", bot)

  if (!bot) redirect("/")

  return (
    <ChatPageClient
      bot={{ ...bot, createdAt: dayjs(bot.createdAt).valueOf() } as ILesson}
    />
  )
}
