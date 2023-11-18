import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/helpers/server-side'
import {
  createChatCompletion,
  generateLessonPrompt,
} from "@/helpers/server-side/openai"
import { lessons } from "@/helpers/server-side/lesson/lesson"

export const GET = () => {
  return NextResponse.json(lessons)
}

export async function POST(request: NextRequest) {
  return withAuth(async () => {
    const body = await request.json()
    const lesson = lessons.find((l) => l.id === body.lessonId)
    if (!lesson) {
      return new Response('Lesson not found', {
        status: 404,
      })
    }

    const messages = [
      { role: "system", content: generateLessonPrompt(lesson, true) },
      ...body.messages,
    ]
    return createChatCompletion(messages, { max_tokens: 200, temperature: 1.2 })
      .then((data) => {
        return NextResponse.json(data?.toLowerCase().includes('done_message') ? 'ok' : data)
      })
      .catch((e: any) => {
        return new Response(e.response ?? e, {
          status: e.response.status || 500,
        })
      })
  })
}
