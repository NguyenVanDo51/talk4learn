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
    const messages = [
      {
        role: 'system',
        content:
          'Bạn nhận một câu tiếng anh. Nhiệm vụ của bạn là giải thích ngắn gọn lỗi ngữ pháp của nó (nếu có). Phản hồi bằng tiếng việt.',
      },
      ...body.messages.map(({ content, ...m }: SendMessageBody) => ({
        ...m,
        content: /[a-z]/.test(content.trim().at(-1) as string) ? content + '.' : content,
      })),
    ]
    console.log('messages', messages)
    return openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0,
        max_tokens: body.max_tokens || 500,
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
