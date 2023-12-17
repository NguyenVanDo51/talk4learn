import { SendMessageBody } from "@/components/template/chat/service/request"
import {
  SettingLangEnum,
  SettingLangMapping,
} from "@/hooks/helpers/use-settings"
import { createChatCompletion, openai } from "@/libs/openai"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const lang: SettingLangEnum =
    (request.nextUrl.searchParams.get("lang") as SettingLangEnum) ||
    SettingLangEnum.EN

  const messages = [
    {
      role: "system",
      content: `Bạn nhận một câu tiếng anh. Nhiệm vụ của bạn là giải thích ngắn gọn lỗi ngữ pháp của nó (nếu có). Phản hồi bằng ${SettingLangMapping[lang]}. Nếu không có lỗi ngữ pháp thì trả lời là "👍 Good". `,
    },
    ...body.messages.map(({ content, ...m }: SendMessageBody) => ({
      ...m,
      content: `"${
        /[a-z]/.test(content.trim().at(-1) as string) ? content + "." : content
      }"`,
    })),
  ]

  return createChatCompletion(messages, body.max_tokens || 500)
    .then((res: any) => {
      return NextResponse.json(res)
    })
    .catch((e: any) => {
      return new Response(e, {
        status: e.response.status || 500,
      })
    })
}
