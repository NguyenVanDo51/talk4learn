import AIChatPage from "@/components/pages/chat"
import { firestore } from "@/service/firestore"
import { auth, redirectToSignIn, useAuth } from "@clerk/nextjs"
import { SITUATION_TABLE } from "../api/situations/route"
import { currentUser } from "@clerk/nextjs/server"
import { MyBotClient } from "./components/MyBotClient"
import { ILesson } from "@/types/lesson/type"

export default async function Home() {
  const user = await currentUser()
  const result = await firestore
    .collection(SITUATION_TABLE)
    .where("author.id", "==", user?.id)
    .get()

  const bots: ILesson[] = []

  result?.forEach((b) => {
    bots.push(b.data() as ILesson)
  })

  return <MyBotClient bots={bots} />
}
