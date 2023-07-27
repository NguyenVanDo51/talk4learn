import { useEffect, useState } from 'react'
import { IVocabulary } from '@/app/types/vocabulary'
import { Button } from '@/components/level1/AppButton'
import { uniqueId } from 'lodash'
import { Lesson, lessons } from '@/components/level3/VideoSelectionScreen'
import { LessonPractice } from '@/components/level3/lesson'

export default function LessonPage({ params }: { params: { id: number } }) {
  const { id } = params

  return <LessonPractice id={id} />
}
