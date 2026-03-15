import type { Course } from '@/engine/types'

export function useLessonNavigation(course: Course | null, _courseId: string, lessonId: string) {
  const allLessonIds = course?.modules.flatMap((m) => m.lessons) ?? []
  const currentIndex = allLessonIds.indexOf(lessonId)
  const prevLessonId = currentIndex > 0 ? allLessonIds[currentIndex - 1] : null
  const nextLessonId =
    currentIndex >= 0 && currentIndex < allLessonIds.length - 1
      ? allLessonIds[currentIndex + 1]
      : null

  return { prevLessonId, nextLessonId }
}
