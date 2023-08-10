import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// export { default } from "next-auth/middleware"

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // return new NextResponse('Invalid client', {
  //   status: 400,
  // })
  console.log('pathname', pathname)
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ['/api/chat/:path*'],
  matcher: ['/api/test/:path*'],
}
