import type { Course, Lesson } from '@/engine/types'

import reactCourse from './react/course.json'

// Carrega todas as lições dinamicamente - não precisa importar cada uma manualmente
const lessonModules = import.meta.glob<{ default: Lesson }>(
  './react/lessons/*.json',
  { eager: true }
)

const lessons: Record<string, Record<string, Lesson>> = {
  react: {},
}

for (const [path, mod] of Object.entries(lessonModules)) {
  const match = path.match(/\/lessons\/(.+)\.json$/)
  if (match) {
    const lessonId = match[1]
    lessons.react[lessonId] = (mod as { default: Lesson }).default
  }
}

const courses: Record<string, Course> = {
  react: reactCourse as Course,
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
