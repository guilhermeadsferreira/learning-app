import { useState, useCallback, type RefObject } from 'react'
import { reviewWithAI, askAIQuestion, getApiKey } from '@/services/ai-review'
import type { AIReviewResponse, Lesson, Course } from '@/engine/types'

interface UseAIReviewParams {
  lesson: Lesson | null
  courseId: string
  course: Course | null
  lessonId: string
  isLessonCompleted: (id: string) => boolean
  onComplete: () => void
  codeRef: RefObject<string>
}

export function useAIReview({
  lesson,
  courseId,
  course,
  lessonId,
  isLessonCompleted,
  onComplete,
  codeRef,
}: UseAIReviewParams) {
  const [aiReview, setAiReview] = useState<AIReviewResponse | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)

  const handleAIReview = useCallback(async () => {
    const apiKey = getApiKey()
    if (!apiKey) {
      setShowApiKeyDialog(true)
      return
    }

    if (!lesson?.challenge) return

    setAiLoading(true)
    setAiError(null)
    setAiReview(null)

    try {
      const review = await reviewWithAI(
        {
          studentCode: codeRef.current || lesson?.challenge?.starterCode || '',
          lessonTitle: lesson.title,
          challengeInstructions: lesson.challenge.instructions,
          solution: lesson.challenge.solution,
          hint: lesson.challenge.hint,
          lessonContext: lesson.analogy,
          courseId,
          aiReviewContext: course?.aiReviewContext,
        },
        apiKey
      )
      setAiReview(review)

      if (review.isCorrect && !isLessonCompleted(lessonId)) {
        onComplete()
      }
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Erro ao conectar com a IA')
    } finally {
      setAiLoading(false)
    }
  }, [lesson, courseId, course, lessonId, isLessonCompleted, onComplete, codeRef])

  const handleAskQuestion = useCallback(
    async (question: string): Promise<string> => {
      const apiKey = getApiKey()
      if (!apiKey) {
        setShowApiKeyDialog(true)
        return 'Configure sua API key primeiro.'
      }

      return askAIQuestion(
        {
          question,
          lessonTitle: lesson?.title ?? '',
          studentCode: codeRef.current || lesson?.challenge?.starterCode || '',
          courseId,
          aiReviewContext: course?.aiReviewContext,
        },
        apiKey
      )
    },
    [lesson, courseId, course, codeRef]
  )

  return {
    aiReview,
    aiLoading,
    aiError,
    showApiKeyDialog,
    handleAIReview,
    handleAskQuestion,
    setShowApiKeyDialog,
  }
}
