import { firestore } from "@/service/firestore"
import { WebhookEvent } from "@clerk/nextjs/server"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

const USER_TABLE = "users"

export const POST = async (req: Request) => {
  const body = await req.json()
  const id = body.data.id ?? randomUUID()

  const evt = body?.evt as WebhookEvent
  switch (evt.type) {
    case "user.created":
    case "user.updated":
      await firestore.collection(USER_TABLE).doc(id).set(body.data)
      break
    case "user.deleted":
      await firestore.collection(USER_TABLE).doc(id).delete()
    default:
      break
  }
  return new NextResponse(null, { status: 200 })
}
