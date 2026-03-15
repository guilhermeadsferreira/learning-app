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

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  for (const course of Object.values(courses)) {
    for (const tag of course.tags) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

export function getCoursesByTag(tag: string): Course[] {
  return Object.values(courses).filter((course) =>
    course.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

export function searchCourses(query: string): Course[] {
  const normalizedQuery = normalizeForSearch(query.trim())
  if (!normalizedQuery) return Object.values(courses)
  return Object.values(courses).filter((course) => {
    const titleMatch = normalizeForSearch(course.title).includes(normalizedQuery)
    const descMatch = normalizeForSearch(course.description).includes(normalizedQuery)
    return titleMatch || descMatch
  })
}
