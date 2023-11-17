import { Session, User, auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const withAuth = async (callback: (session: User) => any) => {
  const user = await currentUser()

  if (!user || !user.firstName || !user.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  return callback(user)
}
