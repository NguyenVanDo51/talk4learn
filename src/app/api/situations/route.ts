import { withAuth } from "@/helpers/server-side"
import { firestore } from "@/service/firestore"
import { ILesson } from "@/types/lesson/type"
import { currentUser } from "@clerk/nextjs/server"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

export const SITUATION_TABLE = "situations"

// a next api to get all completed lessons
export const GET = async (req: Request) => {
  console.log(req)
  try {
    const result = await firestore
      .collection(SITUATION_TABLE)
      .get()
      .then((docSnapshot) => {
        const d: ILesson[] = []
        docSnapshot.forEach((doc) => {
          d.push(doc.data() as ILesson)
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
    const payload: ILesson = {
      id,
      ...body,
      used: 1,
      createdBy: user?.username,
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
