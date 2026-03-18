import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
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
import { useAuth } from '@/hooks/useAuth'
import {
  fetchProgress,
  upsertLessonProgress,
  migrateFromLocalStorage,
} from '@/services/supabase/progress'

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
  isHydrating: boolean
  completeLesson: (lessonId: string, xpGained: number) => void
  setCurrentLesson: (lessonId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress>(loadProgressWithMigration)
  const [isHydrating, setIsHydrating] = useState(false)
  const prevUserIdRef = useRef<string | null>(null)

  // Sync to localStorage always (fallback for guest + offline)
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  // Auth-aware hydration: when user signs in, migrate + fetch from Supabase
  useEffect(() => {
    const prevUserId = prevUserIdRef.current
    const currentUserId = user?.id ?? null

    prevUserIdRef.current = currentUserId

    if (currentUserId && currentUserId !== prevUserId) {
      // User just signed in — hydrate from Supabase
      setIsHydrating(true)
      const localProgress = loadProgressWithMigration()

      migrateFromLocalStorage(currentUserId, localProgress)
        .then(() => fetchProgress(currentUserId))
        .then((remoteProgress) => {
          if (remoteProgress) {
            setProgress(remoteProgress)
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('[progress] hydration error:', err)
        })
        .finally(() => {
          setIsHydrating(false)
        })
    }

    if (!currentUserId && prevUserId) {
      // User signed out — revert to localStorage
      setProgress(loadProgressWithMigration())
    }
  }, [user])

  const completeLesson = useCallback(
    (lessonId: string, xpGained: number) => {
      setProgress((p) => {
        const next = completeLessonStorage(p, lessonId, xpGained)

        // Optimistic: fire-and-forget upsert to Supabase
        if (user) {
          upsertLessonProgress(user.id, lessonId, xpGained).catch((err) => {
            // eslint-disable-next-line no-console
            console.error('[progress] upsert error:', err)
          })
        }

        return next
      })
    },
    [user]
  )

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
      isHydrating,
      completeLesson,
      setCurrentLesson,
      isLessonCompleted,
    }),
    [progress, isHydrating, completeLesson, setCurrentLesson, isLessonCompleted]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
