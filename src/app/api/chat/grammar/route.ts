import { withAuth } from '@/helpers/server-side'
import { SendMessageBody } from '@/service/chat/request'
import { VIP_KEY } from '@/types/constants/openapikey'
import { NextRequest, NextResponse } from 'next/server'
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: VIP_KEY[0],
})

const openai = new OpenAIApi(configuration)

export async function POST(request: NextRequest) {
  return withAuth(request, async () => {
    const body = await request.json()

    return openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Review grammar errors in the message and assess whether the response is appropriate for the question, providing a concise explanation. If there are grammar errors, offer a corrected sentence.`,
          },
          ...body.messages.map((m: SendMessageBody) => ({
            ...m,
            content: `${m.content} \n Analyze whether my answer is reasonable?`,
          })),
        ],
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res: any) => {
        return NextResponse.json(res.data)
      })
      .catch((e: any) => {
        return new Response(e, {
          status: e.response.status || 500,
        })
      })
  })
}

export async function GET() {
  return NextResponse.json({ data: 'hi' })
}
