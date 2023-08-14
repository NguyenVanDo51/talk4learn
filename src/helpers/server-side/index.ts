import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'

export const withAuth = async (callback: (session: Session) => any) => {
  const session: null | Session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthentication', {
      status: 401,
    })
  }

  return callback(session)
}
