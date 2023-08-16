import { SendMessageBody } from '@/service/chat/request'
import { VIP_KEY } from '@/types/constants/openapikey'

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: VIP_KEY[0],
})
const openai = new OpenAIApi(configuration)

export const createChatCompletion = (messages: SendMessageBody[], options: { max_tokens: number }) => {
  const { max_tokens } = options || {}
  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0,
    max_tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
}

export { openai }
