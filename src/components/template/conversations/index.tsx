import { lessons } from '@/api/lesson'
import { LessonCard } from './components/LessonCard'

const Conversations = () => {
  const onStartLesson = () => {}
  return (
    <div className="container mx-auto flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">Select a Lesson</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onStartLesson={onStartLesson} />
        ))}
      </div>
    </div>
  )
}

export default Conversations
