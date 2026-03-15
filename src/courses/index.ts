import type { Course, Lesson } from '@/engine/types'

const courseModules = import.meta.glob<{ default: Course }>('./*/course.json', {
  eager: true,
})

const lessonModules = import.meta.glob<{ default: Lesson }>('./*/lessons/*.json', { eager: true })

const courses: Record<string, Course> = {}
for (const [path, mod] of Object.entries(courseModules)) {
  const match = path.match(/\.\/([^/]+)\/course\.json$/)
  if (match) {
    const courseId = match[1]
    courses[courseId] = (mod as { default: Course }).default
  }
}

const lessons: Record<string, Record<string, Lesson>> = {}
for (const [path, mod] of Object.entries(lessonModules)) {
  const match = path.match(/\.\/([^/]+)\/lessons\/(.+)\.json$/)
  if (match) {
    const [, courseId, lessonId] = match
    if (!lessons[courseId]) lessons[courseId] = {}
    lessons[courseId][lessonId] = (mod as { default: Lesson }).default
  }
}

export function getCourse(courseId: string): Course | null {
  return courses[courseId] ?? null
}

export function getLesson(courseId: string, lessonId: string): Lesson | null {
  return lessons[courseId]?.[lessonId] ?? null
}

export function getAllCourses(): Course[] {
  return Object.values(courses)
}
