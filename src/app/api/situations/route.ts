import { withAuth } from "@/helpers/server-side"
import { firestore } from "@/service/firestore"
import { ILesson } from "@/types/lesson/type"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

export const SITUATION_TABLE = "situations"

// a next api to get all completed lessons
export const GET = () => {
  return withAuth(async () => {
    try {
      const result = await firestore.doc(SITUATION_TABLE).get()
      return NextResponse.json(result.data() ?? [])
    } catch (e: any) {
      return new Response(e, {
        status: 500,
      })
    }
  })
}

export const POST = (req: Request) => {
  return withAuth(async (user) => {
    const body = await req.json()
    const id = body.id ?? randomUUID()
    try {
      const doc = await firestore.collection(SITUATION_TABLE).doc(id)
      const payload: ILesson = {
        id,
        ...body,
        used: 1,
        createdBy: user.id,
      }
      let result = await doc.set(payload)

      return NextResponse.json(result)
    } catch (e: any) {
      return new Response(e, {
        status: 500,
      })
    }
  })
}
