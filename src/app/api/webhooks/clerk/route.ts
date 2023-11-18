import { firestore } from "@/service/firestore"
import { WebhookEvent } from "@clerk/nextjs/server"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

const USER_TABLE = "users"

export const POST = async (req: Request) => {
  const body = await req.json()
  const id = body.data.id ?? randomUUID()

  try {
    switch (body.type) {
      case "user.created":
      case "user.updated":
        await firestore.collection(USER_TABLE).doc(id).set(body.data)
        break
      case "user.deleted":
        await firestore.collection(USER_TABLE).doc(id).delete()
      default:
        break
    }
    return new NextResponse("ok", { status: 200 })
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
  
}
