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
  textTranscription: string
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Lesson 1',
    topic: 'Greetings',
    duration: '5 minutes',
    image: 'https://via.placeholder.com/150',
    videoUrl:
      '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/YUlNbVLJTJo" title="Beginner Levels - Learn English through Oxford English video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    youtubeId: 'YUlNbVLJTJo',
    textTranscription: `Unfortunately, I lacked the opportunity to talk to someone when I used to improve my speaking skills. \nThat's why I am making this video for you guys. So you won't spend too much time on developing your speaking skills as I did as you might understand this is a speaking practice lesson and the topic is traveling abroad basically I'm going to ask you a question then there will be a brief pause for just five seconds I know that it's not enough to answer my questions so I want you to pause the video and talk to me after a brief pause you'll see how some text appears on the bottom center of your screen somewhere here it's my version of announcer and I think you may want to pause the video and read it to analyze the structure grammar and learn some new vocabulary by the way all the new essential vocabulary is written in bold so I want you to write them down and add them to your vocabulary I'll explain you some rules and requirements that you must follow to properly answer my questions you can either copy my suggested answer or adjust your answer following the requirements and the rules and if you're ready let's just start it what tourist places do you like to visit now pause the video and answer the question now pause the video and read the suggested answer by giving short answers like I like traveling to mountains or I love going to museums you may sound either uninterested in having conversation or someone who doesn't speak English well try to give a proper answer and do not hesitate to add some details let's look at the next question and I'll explain how to give a good response what do you like about traveling now pause the video and read the suggested answer look at my answer I always stick to the rule of three sentences where the first sentence is the introduction the second one is your main idea and the third sentence might be the part of the main idea or the conclusion start using it because with this strategy your answers won't be too short to sound rude and indifferent and not too long to bore someone to tears also this is a great strategy to let the conversation flow and impress The Examiner in the IELTS speaking exam part one the third question would you say that traveling has changed you as a person pause the video and read the suggested answer and stop saying I have been in Paris or in historical places or in big cities it's not correct because there is a huge difference between I've been in and I have been to look at my simple answer I used after being 2. we use I've been to when we are talking about places that we have visited but I've been in is used when we are talking about stain or leaving somewhere for a while from the past up to the present have you ever missed a flight what happened pause the video and read the suggested answer so now I'm going to give you some advice about vocabulary using academic phrases is a great idea when it comes to passing exams but if you are just practicing speaking to improve it at least try to use a few everyday expressions and structures that a native English speaker would use if you analyze my answer you will see that I used phrases like Charter flight good value for money and I didn't write when I was going to the airport I wrote on my way to the airport and I used all these new vocabulary because these are the Expressions that all natives use in their everyday English have travel blogs or channels make you want to travel more this is the ideal answer because it contains idioms and proper grammar it's not too long and not too short I even used synonyms instead of saying bucket list twice I replaced it with wish list and I even used figurative language in the last sentence and this is the level that I want you to reach guys and for that you should just practice with me all right if you like these type of videos and if you want more of these please let me know in the comment section and I'll make more videos like it also don't forget to like it and subscribe for more and of course I'm going to see you in the next one have a nice day bye bye`,
  },
  {
    id: 2,
    title: 'Lesson 2',
    topic: 'Colors',
    duration: '8 minutes',
    image: 'https://via.placeholder.com/150',
    videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
    youtubeId: 'YUlNbVLJTJo',
    textTranscription: `unfortunately I lacked the opportunity to talk to someone when I used to improve my speaking skills that's why I am making this video for you guys so you won't spend too much time on developing your speaking skills as I did as you might understand this is a speaking practice lesson and the topic is traveling abroad basically I'm going to ask you a question then there will be a brief pause for just five seconds I know that it's not enough to answer my questions so I want you to pause the video and talk to me after a brief pause you'll see how some text appears on the bottom center of your screen somewhere here it's my version of announcer and I think you may want to pause the video and read it to analyze the structure grammar and learn some new vocabulary by the way all the new essential vocabulary is written in bold so I want you to write them down and add them to your vocabulary I'll explain you some rules and requirements that you must follow to properly answer my questions you can either copy my suggested answer or adjust your answer following the requirements and the rules and if you're ready let's just start it what tourist places do you like to visit now pause the video and answer the question now pause the video and read the suggested answer by giving short answers like I like traveling to mountains or I love going to museums you may sound either uninterested in having conversation or someone who doesn't speak English well try to give a proper answer and do not hesitate to add some details let's look at the next question and I'll explain how to give a good response what do you like about traveling now pause the video and read the suggested answer look at my answer I always stick to the rule of three sentences where the first sentence is the introduction the second one is your main idea and the third sentence might be the part of the main idea or the conclusion start using it because with this strategy your answers won't be too short to sound rude and indifferent and not too long to bore someone to tears also this is a great strategy to let the conversation flow and impress The Examiner in the IELTS speaking exam part one the third question would you say that traveling has changed you as a person pause the video and read the suggested answer and stop saying I have been in Paris or in historical places or in big cities it's not correct because there is a huge difference between I've been in and I have been to look at my simple answer I used after being 2. we use I've been to when we are talking about places that we have visited but I've been in is used when we are talking about stain or leaving somewhere for a while from the past up to the present have you ever missed a flight what happened pause the video and read the suggested answer so now I'm going to give you some advice about vocabulary using academic phrases is a great idea when it comes to passing exams but if you are just practicing speaking to improve it at least try to use a few everyday expressions and structures that a native English speaker would use if you analyze my answer you will see that I used phrases like Charter flight good value for money and I didn't write when I was going to the airport I wrote on my way to the airport and I used all these new vocabulary because these are the Expressions that all natives use in their everyday English have travel blogs or channels make you want to travel more this is the ideal answer because it contains idioms and proper grammar it's not too long and not too short I even used synonyms instead of saying bucket list twice I replaced it with wish list and I even used figurative language in the last sentence and this is the level that I want you to reach guys and for that you should just practice with me all right if you like these type of videos and if you want more of these please let me know in the comment section and I'll make more videos like it also don't forget to like it and subscribe for more and of course I'm going to see you in the next one have a nice day bye bye`,
  },
  // Add more lessons here
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
