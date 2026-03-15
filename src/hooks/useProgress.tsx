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

interface ProgressContextValue {
  progress: UserProgress
  completeLesson: (lessonId: string, xpGained: number) => void
  setCurrentLesson: (lessonId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgress)

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

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
