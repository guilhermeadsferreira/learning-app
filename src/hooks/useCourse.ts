import { useParams } from 'react-router'
import { getCourse } from '@/courses'

export function useCourse() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : null
  return { course, courseId }
}
