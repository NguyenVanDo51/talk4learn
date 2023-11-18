import { withAuth } from "@/helpers/server-side"
import { firestore } from "@/service/firestore"
import { NextResponse } from "next/server"
import { SITUATION_TABLE } from "../route"
import {
  createChatCompletion,
  generateLessonPrompt,
} from "@/helpers/server-side/openai"
import { ILesson } from "@/types/lesson/type"
import { DocumentData } from "firebase-admin/firestore"

// a next api to get all completed lessons
export const GET = (req: Request, { params }: { params: { id: string } }) => {
  return withAuth(async () => {
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
  })
}

export const PUT = (req: Request, { params }: { params: { id: string } }) => {
  return withAuth(async () => {
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
  })
}

export const POST = (req: Request, { params }: { params: { id: string } }) => {
  return withAuth(async () => {
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

    try {
      const res = await createChatCompletion(messages, {
        max_tokens: 500,
        temperature: 1.5,
      })
      return NextResponse.json(res)
    } catch (e: any) {
      return new Response(e, {
        status: e.response?.status || 500,
      })
    }
  })
}