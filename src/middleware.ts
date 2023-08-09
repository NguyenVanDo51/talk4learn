import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('request', request.headers.get('host'))
  if (!request.url.startsWith('https://rangachat.com')) {
    return new NextResponse('Ivalid Client' + request.json(), {
      status: 400,
    })
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ['/api/chat/:path*'],
  matcher: ['/api/test/:path*'],
}
