import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/helpers/server-side'
import formidable, { IncomingForm } from 'formidable'
import { openai } from '@/helpers/server-side/openai'
import { NextApiRequest, NextApiResponse } from 'next'
import { Writable } from 'stream'

export const config = {
  api: {
    bodyParser: false,
  },
}

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 7,
  allowEmptyFiles: false,
  multiples: false,
}

function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts)

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      return accept({ fields, files })
    })
  })
}

const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk)
      next()
    },
  })

  return writable
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // return withAuth(async () => {
  try {
    const chunks: never[] = []

    const { fields, files } = await formidablePromise(req, {
      ...formidableConfig,
      // consume this, otherwise formidable tries to save the file to disk
      fileWriteStreamHandler: () => fileConsumer(chunks),
    })

    console.log(fields)
    console.log(files)
    const { file } = files

    const fileData = Buffer.concat(chunks) // or is it from? I always mix these up

    const audioFile = fileData

    if (!audioFile) {
      return new Response('audio file is required', {
        status: 400,
      })
    }

    // Transcribe audio file
    const transcriptionResponse = await openai.transcribe({
      audio: fileData,
      // Add other options if needed
    })

    if (!transcriptionResponse.data || !transcriptionResponse.data.text) {
      return new Response('Failed to transcribe audio file', {
        status: 400,
      })
    }

    // Send back the transcribed text
    return NextResponse.json({ text: transcriptionResponse.data.text })
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', {
      status: 500,
    })
  }
  // })
}
