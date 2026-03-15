import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import type { UserProgress } from '@/engine/types'
import {
  loadProgress,
  saveProgress,
  completeLesson as completeLessonStorage,
} from '@/engine/progress'
import { migrateProgressXp } from '@/engine/progress-migration'
import { getAllCourses, getLesson } from '@/courses'

function findLessonForMigration(
  lessonId: string
): { courseId: string; type: 'explanation' | 'challenge' | 'quiz' } | null {
  for (const course of getAllCourses()) {
    for (const module of course.modules) {
      if (module.lessons.includes(lessonId)) {
        const lesson = getLesson(course.id, lessonId)
        if (lesson) return { courseId: course.id, type: lesson.type }
        return { courseId: course.id, type: 'explanation' }
      }
    }
  }
  return null
}

function loadProgressWithMigration(): UserProgress {
  const loaded = loadProgress()
  return migrateProgressXp(loaded, findLessonForMigration)
}

interface ProgressContextValue {
  progress: UserProgress
  completeLesson: (lessonId: string, xpGained: number) => void
  setCurrentLesson: (lessonId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgressWithMigration)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const completeLesson = useCallback((lessonId: string, xpGained: number) => {
    setProgress((p) => completeLessonStorage(p, lessonId, xpGained))
  }, [])

  const setCurrentLesson = useCallback((lessonId: string) => {
    setProgress((p) => ({ ...p, currentLessonId: lessonId }))
  }, [])

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessonIds.includes(lessonId),
    [progress.completedLessonIds]
  )

  const value = useMemo(
    () => ({
      progress,
      completeLesson,
      setCurrentLesson,
      isLessonCompleted,
    }),
    [progress, completeLesson, setCurrentLesson, isLessonCompleted]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
