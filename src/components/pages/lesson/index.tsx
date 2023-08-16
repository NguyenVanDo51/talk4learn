'use client'

import dynamic from 'next/dynamic'
import { AppSpin } from '@/components/level1/antd/AppSpin'

const Lesson = dynamic(() => import('@/components/template/lesson') as any, {
  loading: () => <AppSpin />,
})

export default function LessonPage() {
  return <Lesson />
}
