import { firestore } from "@/service/firestore"
import { ILesson } from "@/types/lesson/type"
import { currentUser } from "@clerk/nextjs/server"
import { randomUUID } from "crypto"
import { CollectionReference } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

const TABLE_NAME = "bio"

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)
  const name = searchParams.get("name") ?? ""

  try {
    let ref = firestore.collection(TABLE_NAME)

    if (name?.trim()) {
      ref = ref
        .where("name", ">=", name)
        .where("name", "<=", name + "\uf8ff")
        .orderBy("name", "asc") as CollectionReference<ILesson>
    }

    const result = await ref
      .orderBy("used", "desc")
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
  const body = await req.json()
  if (!body.username) {
    return new Response("missing username", {
      status: 400,
    })
  }

  const id = body.username.trim()

  try {
    const doc = await firestore.collection(TABLE_NAME).doc(id)
    const payload: ILesson = {
      id,
      ...body,
      createdAt: new Date().valueOf(),
    }
    await doc.set(payload)

    return NextResponse.json(payload)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
