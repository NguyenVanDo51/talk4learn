import { NextResponse } from 'next/server'
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const body = await request.json()

  return openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: body.messages,
      temperature: 0,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res: any) => {
      return NextResponse.json(res.data)
    })
    .catch((e: any) => {
      return new Response(e, {
        status: 500,
      })
    })
}

export async function GET() {
  return NextResponse.json({ data: 'hi' })
}

// "messages": [
//   {
//       "role": "system",
//       "content": "Your task is to practice English with users. you will ask the user a few questions about their life. If the user asks you a question, you would answer them with a short answer and attach a new question to them.\n"
//   },
//   {
//       "role": "assistant",
//       "content": "Hello! How are you today?"
//   },
//   {
//       "role": "user",
//       "content": "I'm great. how are you?"
//   }
// ]
