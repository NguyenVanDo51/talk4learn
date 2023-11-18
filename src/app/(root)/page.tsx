import { firestore } from "@/service/firestore"
import { SITUATION_TABLE } from "../api/situations/route"
import { currentUser } from "@clerk/nextjs/server"
import { HomeClient } from "./components/HomeClient"
import { ILesson } from "@/types/lesson/type"

export default async function Home() {
  const user = await currentUser()
  const result = await firestore
    .collection(SITUATION_TABLE)
    .where("createdBy", "==", user?.id)
    .get()

  const bots: ILesson[] = []

  result?.forEach((b) => {
    bots.push(b.data() as ILesson)
  })

  return <HomeClient bots={bots} />
}
