import { LessonPractice } from '@/components/level3/lesson'

export default function LessonPage({ params }: { params: { id: number } }) {
  const { id } = params

  return <LessonPractice id={id} />
}
