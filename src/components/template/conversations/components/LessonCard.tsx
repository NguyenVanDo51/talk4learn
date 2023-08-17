import { ILesson } from '@/types/lesson/type'
import Link from 'next/link'
import React from 'react'

interface LessonCardProps {
  lesson: ILesson
  onStartLesson: () => void
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onStartLesson }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 cursor-pointer hover:bg-gray-100 transition duration-300">
      <h2 className="text-lg font-semibold mb-2">{lesson.name}</h2>
      <p className="text-gray-600">{lesson.userContext['vi']}</p>
      <p className="text-gray-500 mt-2">Level: {lesson.level}</p>
      <button
        onClick={onStartLesson}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        <Link href={`/app/conversations/${lesson.id}`}>Start Lesson</Link>
      </button>
    </div>
  )
}
