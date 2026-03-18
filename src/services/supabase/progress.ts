import { supabase } from './client'
import type { UserProgress } from '@/engine/types'

interface ProgressRow {
  lesson_id: string
  xp_gained: number
  completed_at: string
}

export async function fetchProgress(userId: string): Promise<UserProgress | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .schema('study_app')
    .from('user_progress')
    .select('lesson_id, xp_gained, completed_at')
    .eq('user_id', userId)
    .order('completed_at', { ascending: true })

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[supabase] fetchProgress error:', error.message)
    return null
  }

  if (!data || data.length === 0) return null

  const rows = data as ProgressRow[]
  return {
    completedLessonIds: rows.map((r) => r.lesson_id),
    currentLessonId: rows[rows.length - 1]?.lesson_id ?? '',
    xp: rows.reduce((sum, r) => sum + r.xp_gained, 0),
  }
}

export async function upsertLessonProgress(
  userId: string,
  lessonId: string,
  xpGained: number
): Promise<void> {
  if (!supabase) return

  const { error } = await supabase.schema('study_app').from('user_progress').upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      xp_gained: xpGained,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_id', ignoreDuplicates: false }
  )

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[supabase] upsertLessonProgress error:', error.message)
  }
}

export async function migrateFromLocalStorage(
  userId: string,
  localProgress: UserProgress
): Promise<void> {
  if (!supabase || localProgress.completedLessonIds.length === 0) return

  const rows = localProgress.completedLessonIds.map((lessonId) => ({
    user_id: userId,
    lesson_id: lessonId,
    xp_gained: 0, // XP histórico sem granularidade — limitação aceita (ADR-001)
    completed_at: new Date().toISOString(),
  }))

  const { error } = await supabase.schema('study_app').from('user_progress').upsert(rows, {
    onConflict: 'user_id,lesson_id',
    ignoreDuplicates: true,
  })

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[supabase] migrateFromLocalStorage error:', error.message)
  }
}
