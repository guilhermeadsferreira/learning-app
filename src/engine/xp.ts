export const XP_PER_LESSON = 10
export const XP_PER_CHALLENGE = 25

export function getXpForLesson(type: 'explanation' | 'challenge' | 'quiz'): number {
  return type === 'challenge' ? XP_PER_CHALLENGE : XP_PER_LESSON
}
