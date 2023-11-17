import { firestore } from '@/service/firestore'
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/helpers/server-side'
import { defaultSettings } from '@/redux/slices/settingSlice'

export async function POST(req: NextRequest) {
  return withAuth(async (user) => {
    const payload = await req.json()
    try {
      await firestore.doc("settings/" + user?.id).set(payload)
      return new NextResponse("1")
    } catch (e) {
      return NextResponse.json(e)
    }
  })
}

export async function GET() {
  return withAuth(async (user) => {
    try {
      const data = await firestore.doc("settings/" + user?.id).get()

      if (data.data()) {
        return NextResponse.json(data.data())
      }

      await firestore.doc("settings/" + user?.id).create(defaultSettings)

      return NextResponse.json(defaultSettings)
    } catch (e) {
      return NextResponse.json(e)
    }
  })
}
