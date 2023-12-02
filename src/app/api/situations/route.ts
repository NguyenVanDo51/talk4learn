import { SITUATION_TABLE } from "@/libs/table-name"
import { firestore } from "@/service/firestore"
import { ScenarioInterface } from "@/types/lesson/type"
import { currentUser } from "@clerk/nextjs/server"
import { randomUUID } from "crypto"
import { CollectionReference } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

// a next api to get all completed lessons
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)

  const offset = Number(searchParams.get("offset") || 0)
  const limit = Number(searchParams.get("limit") || 5)
  const tag = searchParams.get("tag") ?? ""
  const name = searchParams.get("name") ?? ""

  try {
    let ref = firestore.collection(SITUATION_TABLE)

    if (tag?.trim()) {
      ref = ref.where(
        "tags",
        "array-contains",
        tag
      ) as CollectionReference<ScenarioInterface>
    }

    if (name?.trim()) {
      ref = ref
        .where("name", ">=", name)
        .where("name", "<=", name + "\uf8ff")
        .orderBy("name", "asc") as CollectionReference<ScenarioInterface>
    }

    const result = await ref
      .orderBy("used", "desc")
      .offset(offset)
      .limit(limit)
      .get()
      .then((docSnapshot) => {
        const d: ScenarioInterface[] = []
        docSnapshot.forEach((doc) => {
          d.push(doc.data() as ScenarioInterface)
        })
        return d
      })
    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const POST = async (req: Request) => {
  const user = await currentUser()
  const body = await req.json()
  const id = body.id ?? randomUUID()

  try {
    const doc = await firestore.collection(SITUATION_TABLE).doc(id)
    const payload: ScenarioInterface = {
      id,
      ...body,
      used: 1,
      createdBy: user?.id,
      createdAt: new Date(),
    }
    let result = await doc.set(payload)

    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
