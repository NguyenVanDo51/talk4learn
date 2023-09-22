import fs from 'fs'
import path from 'path'
import { openai } from '@/helpers/server-side/openai'

export async function POST(req: any) {
  const form = await req.formData()

  const blob = form.get('file')

  if (!blob) {
    return new Response('Bad Request', {
      status: 400,
    })
  }

  const buffer = Buffer.from(await blob.arrayBuffer())
  const filename = `file.webm`
  let filepath = `${path.join('public', 'uploads', filename)}`

  fs.writeFileSync(filepath, buffer)

  const minFileSize = 18000 // bytes
  const stats: any = fs.statSync(filepath)

  if (parseInt(stats.size) < minFileSize) {
    return new Response('Bad Request', {
      status: 400,
    })
  }
  try {
    const result: any = await openai.createTranscription(
      fs.createReadStream(filepath) as any,
      'whisper-1',
      '',
      'json',
      0,
      'en'
    )

    return new Response(result?.data?.text, {
      status: 200,
    })
  } catch (error: any) {
    return new Response('', {
      status: 200,
    })
  }
}
