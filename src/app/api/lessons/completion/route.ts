import { withAuth } from '@/helpers/server-side'
import { firestore } from '@/service/firestore'
import { NextRequest, NextResponse } from 'next/server'

// a next api to get all completed lessons
export const GET = () => {
  return withAuth(async (session) => {
    try {
      const result = await firestore.doc('lessonUser/' + session.user.id).get()
      return NextResponse.json(result.data()?.completedLessons ?? [])
    } catch (e: any) {
      return new Response(e, {
        status: 500,
      })
    }
  })
}

// a next api to mark complete a lesson
export const PUT = (req: NextRequest) => {
  return withAuth(async (session) => {
    const body = await req.json()
    try {
      const doc = await firestore.collection('lessonUser').doc(session.user.id)
      const data = await doc.get()
      console.log('data', data.exists, data.data(), session, body)
      let result = null

      if (data?.exists) {
        result = await doc.update({
          completedLessons: [...data.data()?.completedLessons, body.lessonId],
        })
      } else {
        result = await doc.set({
          completedLessons: [body.lessonId],
        })
      }

      return NextResponse.json(result)
    } catch (e: any) {
      return new Response(e, {
        status: 500,
      })
    }
  })
}