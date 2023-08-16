import { ILesson } from '@/types/lesson/type'
import { NextResponse } from 'next/server'
import { v4 } from 'uuid'

const lessons: ILesson[] = [
  {
    id: v4(),
    level: 'A1',
    modelContext: '',
    modelRole: '',
    name: '',
    userContext: '',
    userRole: '',
  },
]

export const GET = () => {
  return NextResponse.json(lessons)
}
