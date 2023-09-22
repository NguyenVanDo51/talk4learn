import { cleanInput } from '@/api/utils'
import { withAuth } from '@/helpers/server-side'
import { NextApiRequest } from 'next'

import { TranslationServiceClient } from '@google-cloud/translate'

const translationClient = new TranslationServiceClient({
  projectId: process.env?.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
  },
})
const location = 'global'

export async function GET(req: Request) {
  return withAuth(async () => {
    const searchParams = new URLSearchParams(req.url.split('?')[1])
    const text = searchParams?.get('text')
    console.log('req', text)
    if (!text) return new Response('text can not empty', { status: 201 })

    try {
      const [response] = await translationClient.translateText({
        parent: `projects/${process.env?.FIREBASE_PROJECT_ID}/locations/${location}`,
        contents: [cleanInput(text)],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: 'vi',
      })

      console.log(`Translation: ${response.translations}`)
      return new Response('response?.translations')
    } catch (error: any) {
      console.error(error)
      return new Response('')
    }
  })
}
