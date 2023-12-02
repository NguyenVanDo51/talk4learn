import { firestore } from "@/service/firestore"
import { SITUATION_TABLE } from "@/libs/table-name"
import { currentUser } from "@clerk/nextjs/server"
import { HomeClient } from "./components/HomeClient"
import { ScenarioInterface } from "@/types/lesson/type"

export default async function Home() {
  const user = await currentUser()
  const result = await firestore
    .collection(SITUATION_TABLE)
    .where("createdBy", "==", user?.id)
    .orderBy("createdAt", "desc")
    .get()

  const bots: ScenarioInterface[] = []
  result?.forEach((b) => {
    bots.push(JSON.parse(JSON.stringify(b.data())) as ScenarioInterface)
  })

  return <HomeClient bots={bots} />
}
