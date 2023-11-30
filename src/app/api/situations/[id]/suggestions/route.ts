import { generateLessonPrompt, createChatCompletion } from "@/libs/openai"
import { SITUATION_TABLE } from "@/libs/table-name"
import { firestore } from "@/service/firestore"
import { ILesson } from "@/types/lesson/type"
import { DocumentData } from "firebase-admin/firestore"
import { NextResponse, NextRequest } from "next/server"

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json()
  const lesson = body.lesson

  const messages = [
    { role: "system", content: generateLessonPrompt(lesson as ILesson, true) },
    ...body.messages,
  ]

  return createChatCompletion(messages, { max_tokens: 200, temperature: 1.2 })
    .then((data) => {
      return NextResponse.json(
        data?.toLowerCase().includes("done_message") ? "ok" : data
      )
    })
    .catch((e: any) => {
      return new Response(e.response ?? e, {
        status: e.response.status || 500,
      })
    })
}
