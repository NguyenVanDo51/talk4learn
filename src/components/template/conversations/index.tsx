import { lessons } from '@/api/lesson'
import { LessonCard } from './components/LessonCard'
import { useAppSelector } from '@/hooks/redux'
import { categories } from '@/api/categories'
import { Divider } from 'antd'
import { useLessonsCompleted } from '@/hooks/fetchers/useLessonsCompleted'

const Conversations = () => {
  const lang = useAppSelector((t) => t.setting.lang)
  const {lessonsCompleted } = useLessonsCompleted()
  
  return (
    <div className="flex flex-col items-center justify-center">
      {categories.map((category) => (
        <div key={category.id} className='mt-3'>
          <Divider>
            <span className="text-[#9a9a9a] text-xl font-normal">{category.name}</span>
          </Divider>
          <div className="flex flex-wrap gap-6">
            {category.lessons?.map((lesson) => {
              return <LessonCard key={lesson?.id} isCompleted={lessonsCompleted?.includes(lesson.id)} lesson={lesson} lang={lang} />
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Conversations
