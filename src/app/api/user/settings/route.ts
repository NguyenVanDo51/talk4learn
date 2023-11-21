import { firestore } from "@/service/firestore"
import { NextRequest, NextResponse } from "next/server"
import { defaultSettings } from "@/redux/slices/settingSlice"
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  const user = await currentUser()
  const payload = await req.json()
  try {
    await firestore.doc("settings/" + user?.id).set(payload)
    return new NextResponse("1")
  } catch (e) {
    return NextResponse.json(e)
  }
}

export async function GET() {
  const user = await currentUser()
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
}
