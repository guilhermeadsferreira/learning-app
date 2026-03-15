import { useParams } from 'react-router-dom'
import { getLesson } from '@/courses'

export function useLesson() {
  const { courseId, lessonId } = useParams<{
    courseId: string
    lessonId: string
  }>()
  const lesson =
    courseId && lessonId ? getLesson(courseId, lessonId) : null
  return { lesson, courseId, lessonId }
}
