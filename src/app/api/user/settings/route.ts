import { firestore } from '@/service/firestore'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/helpers/server-side'
import { defaultSettings } from '@/redux/slices/settingSlice'

export async function POST(req: NextRequest) {
  return withAuth(async (session) => {
    const payload = await req.json()
    try {
      await setDoc(doc(firestore, 'settings', session?.user?.email), payload)
      return new NextResponse('1')
    } catch (e) {
      return NextResponse.json(e)
    }
  })
}

export async function GET() {
  return withAuth(async (session) => {
    try {
      const data = await getDoc(doc(firestore, 'settings', session?.user?.email))
      if (data.exists()) {
        return NextResponse.json(data.data())
      }
      try {
        console.log('addDoc')
        await setDoc(doc(firestore, 'settings', session?.user?.email), defaultSettings)
      } catch (e) {
        console.log('e1', e)
      }
      return NextResponse.json(defaultSettings)
    } catch (e) {
      console.log('e', e)
      return NextResponse.json(e)
    }
  })
}
