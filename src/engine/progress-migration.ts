import type { UserProgress } from './types'
import { getXpForLesson } from './xp'

/**
 * Encontra o courseId de uma lição iterando os cursos.
 * Usado na migração de XP — o módulo progress não pode importar courses diretamente.
 */
export type FindLessonFn = (
  lessonId: string
) => { courseId: string; type: 'explanation' | 'challenge' | 'quiz' } | null

/**
 * Recalcula XP quando há inconsistência: lições completadas mas XP zerado ou inválido.
 * Isso corrige dados antigos ou corrompidos no localStorage.
 */
export function migrateProgressXp(progress: UserProgress, findLesson: FindLessonFn): UserProgress {
  const xpInvalid =
    progress.xp === undefined ||
    progress.xp === null ||
    Number.isNaN(progress.xp) ||
    (progress.completedLessonIds.length > 0 && progress.xp === 0)

  if (!xpInvalid) return progress

  let totalXp = 0
  for (const lessonId of progress.completedLessonIds) {
    const found = findLesson(lessonId)
    if (found) {
      totalXp += getXpForLesson(found.type)
    } else {
      totalXp += 10
    }
  }

  return {
    ...progress,
    xp: totalXp,
  }
}
