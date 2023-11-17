import { SendMessageBody } from "@/components/template/chat/service/request"
import { VIP_KEY } from "@/types/constants/openapikey"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: VIP_KEY[0],
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

export { openai }
