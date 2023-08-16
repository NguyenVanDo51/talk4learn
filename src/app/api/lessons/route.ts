import { lessons } from '@/api/lesson'
import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.json(lessons)
}
