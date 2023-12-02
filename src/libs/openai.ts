import { SendMessageBody } from "@/components/template/chat/service/request"
import { VIP_KEY } from "@/types/constants/openapikey"
import { ScenarioInterface } from "@/types/lesson/type"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const createChatCompletion = (
  messages: SendMessageBody[],
  options?: { max_tokens: number; temperature?: number }
) => {
  const { max_tokens, temperature } = options || {}
  return openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: temperature ?? 0,
      max_tokens: max_tokens ?? 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res?.choices?.[0]?.message?.content)
}

export const generateLessonPrompt = (
  lesson: ScenarioInterface,
  isReverse: boolean = false
): string => {
  const { assistantInstruction } = lesson

  const prompt = `Your task is practice english with the user through a role-playing game.
Situation: ${assistantInstruction}.
The Rules:
- Provide concise answers.
- Using simple words and sentences.
- Maximum 50 words in 1 response.
- In case the user responds with unrelated questions or statements, let them know.
- Only focus on the current situation.
`
  console.log("prompt", prompt)
  return prompt
}

export { openai }
