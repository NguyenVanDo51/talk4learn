'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export interface Lesson {
  id: number
  title: string
  topic: string
  duration: string
  image: string
  videoUrl: string
  youtubeId: string
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Lesson 1',
    topic: 'Greetings',
    duration: '5 minutes',
    image: 'https://via.placeholder.com/150',
    videoUrl: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/YUlNbVLJTJo" title="Beginner Levels - Learn English through Oxford English video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    youtubeId: 'YUlNbVLJTJo'
  },
  {
    id: 2,
    title: 'Lesson 2',
    topic: 'Colors',
    duration: '8 minutes',
    image: 'https://via.placeholder.com/150',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
    youtubeId: 'lTfZ_wXkB_A'
  },
]

const VideoSelectionScreen: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose a Video Lesson to Start Learning</h1>
      <div className="grid grid-cols-4 gap-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white p-4 shadow rounded">
            <Image width={100} height={100} src={lesson.image} alt={lesson.title} className="w-full h-auto mb-2" />
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <p className="text-gray-500">{lesson.topic}</p>
            <p className="text-gray-500">{lesson.duration}</p>
            <Link
              href={`/lessons/${lesson.id}`}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Start Learning
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoSelectionScreen
