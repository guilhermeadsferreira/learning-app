import type { UserProgress } from './types'

const STORAGE_KEY = 'learning-engine-progress'

export function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as UserProgress
      const xp = typeof parsed.xp === 'number' && !Number.isNaN(parsed.xp) ? parsed.xp : 0
      return {
        completedLessonIds: Array.isArray(parsed.completedLessonIds)
          ? parsed.completedLessonIds
          : [],
        currentLessonId: typeof parsed.currentLessonId === 'string' ? parsed.currentLessonId : '',
        xp,
      }
    }
  } catch {
    // ignore parse errors
  }
  return {
    completedLessonIds: [],
    currentLessonId: '',
    xp: 0,
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function completeLesson(
  progress: UserProgress,
  lessonId: string,
  xpGained: number
): UserProgress {
  const completed = progress.completedLessonIds.includes(lessonId)
    ? progress.completedLessonIds
    : [...progress.completedLessonIds, lessonId]
  return {
    ...progress,
    completedLessonIds: completed,
    currentLessonId: lessonId,
    xp: progress.xp + (completed ? 0 : xpGained),
  }
}
