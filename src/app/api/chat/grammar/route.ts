import { VIP_KEY } from '@/types/constants/openapikey'
import { NextResponse } from 'next/server'
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: VIP_KEY[0]
})

const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const body = await request.json()

  return openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: body.messages,
      temperature: 0,
      max_tokens: 200,
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
}

export async function GET() {
  return NextResponse.json({ data: 'hi' })
}
