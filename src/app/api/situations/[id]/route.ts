import { firestore } from "@/service/firestore"
import { NextResponse } from "next/server"
import { SITUATION_TABLE } from "../route"
import { createChatCompletion, generateLessonPrompt } from "@/libs/openai"
import { ILesson } from "@/types/lesson/type"
import { DocumentData } from "firebase-admin/firestore"

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await firestore
      .collection(SITUATION_TABLE)
      .doc(params.id)
      .get()
      .then((res) => res.data())
    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json()
  try {
    const doc = await firestore.collection(SITUATION_TABLE).doc(params.id)

    let result = await doc.set(body)

    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json()
  const lesson: DocumentData | ILesson | null | undefined = await firestore
    .collection(SITUATION_TABLE)
    .doc(params.id)
    .get()
    .then((r) => r.data())

  if (!lesson) {
    return new Response("Lesson not found", {
      status: 404,
    })
  }

  const messages = [
    { role: "system", content: generateLessonPrompt(lesson as ILesson) },
    ...body.messages,
  ]
  console.log("messages", messages[0])
  try {
    const res = await createChatCompletion(messages, {
      max_tokens: 500,
      temperature: 1.5,
    })
    return NextResponse.json(res)
  } catch (e: any) {
    console.log("POST /api/situations" + params.id, e)
    return new Response(e, {
      status: e.response?.status || 500,
    })
  }
}
