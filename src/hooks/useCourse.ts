import { useParams } from 'react-router-dom'
import { getCourse } from '@/courses'

export function useCourse() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : null
  return { course, courseId }
}
