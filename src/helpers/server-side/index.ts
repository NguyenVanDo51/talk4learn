import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const withAuth = async (request: NextRequest, cb: () => Promise<NextResponse>) => {
  const token = await getToken({ req: request, raw: true })
  if (!token) {
    return new Response('Unauthentication', {
      status: 401,
    })
  }

  return cb()
}
