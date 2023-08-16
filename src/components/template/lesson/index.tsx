import { LessonService } from '@/service/lesson/index.service'
import { useQuery } from '@tanstack/react-query'

const Lesson = () => {
  const {data} = useQuery({ queryFn: LessonService.get })

  return <div>Comming soon</div>
}

export default Lesson
