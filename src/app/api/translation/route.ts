import { cleanInput } from "@/helpers/utils"
import { withAuth } from "@/helpers/server-side"
import { NextApiRequest } from "next"

import { TranslationServiceClient } from "@google-cloud/translate"
import axios, { AxiosResponse } from "axios"

const translationClient = new TranslationServiceClient({
  projectId: process.env?.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
  },
})
const location = "global"

export async function GET(req: Request) {
  return withAuth(async () => {
    const searchParams = new URLSearchParams(
      decodeURI(req.url).substring(req.url.indexOf("?"))
    )

    const text = searchParams?.get("text")
    const fromLang = searchParams?.get("fromLang")
    const toLang = searchParams?.get("toLang")
    console.log("req.url", req.url)
    console.log("text", text)
    console.log("fromLang", fromLang)
    console.log("toLang", toLang)

    if (!process.env?.GOOGLE_API_KEY)
      return new Response("text can not empty", { status: 201 })
    if (!text) return new Response("text can not empty", { status: 201 })

    try {
      let url = `https://translation.googleapis.com/language/translate/v2?key=${process.env?.GOOGLE_API_KEY}`
      url += "&q=" + encodeURI(text)
      url += `&source=${fromLang}`
      url += `&target=${toLang}`

      const res: AxiosResponse<ITranslationResponse> = await axios.get(url)
      return new Response(res.data.data.translations[0].translatedText)
    } catch (error: any) {
      console.error(error)
      return new Response("")
    }
  })
}

interface ITranslationResponse {
  data: {
    translations: [
      {
        translatedText: string
      }
    ]
  }
}
