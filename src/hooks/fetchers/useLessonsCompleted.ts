import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux'
import { LessonService } from '@/service/lesson/index.service'
import { setLessonsCompleted } from '@/redux/slices/lessonsSlice'

export const useLessonsCompleted = () => {
  const { lessonsCompleted } = useAppSelector((state) => state.lessons)
  const dispatch = useAppDispatch()

  const getLessonsCompleted = useCallback(() => {
    LessonService.getLessonsCompleted().then((res) => {
      dispatch(setLessonsCompleted(res.data))
    })
  }, [dispatch])

  useEffect(() => {
    if (lessonsCompleted.length) return
    getLessonsCompleted()
  }, [dispatch, getLessonsCompleted, lessonsCompleted.length])

  return {
    lessonsCompleted,
    refreshLessonsCompleted: getLessonsCompleted,
  }
}
