import { LessonService } from '@/service/lesson/index.service'
import { useQuery } from '@tanstack/react-query'

const Lesson = () => {
  const {data} = useQuery({ queryFn: LessonService.get })

  console.log('data', data)

  
  return <div>Lesson</div>
}

export default Lesson
