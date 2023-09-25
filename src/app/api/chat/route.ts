import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/helpers/server-side'
import { createChatCompletion } from '@/helpers/server-side/openai'

export async function POST(request: NextRequest) {
  
  return withAuth(async () => {
    const body = await request.json()
    return createChatCompletion(body.messages, body.max_tokens)
      .then((data) => {
        return NextResponse.json(data)
      })
      .catch((e: any) => {
        return new Response(e, {
          status: e.response.status || 500,
        })
      })
  })
}
