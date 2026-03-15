import { useState, useRef, useCallback } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useLesson } from '@/hooks/useLesson'
import { useProgress } from '@/hooks/useProgress'
import { getCourse } from '@/courses'
import { LessonLayout } from '@/components/lesson/LessonLayout'
import { LessonContent } from '@/components/lesson/LessonContent'
import { ChallengeCard } from '@/components/lesson/ChallengeCard'
import { FeedbackCard } from '@/components/lesson/FeedbackCard'
import { AIReviewCard } from '@/components/lesson/AIReviewCard'
import { APIKeyDialog } from '@/components/lesson/APIKeyDialog'
import { CodeEditorPanel } from '@/components/editor/CodeEditorPanel'
import { Button } from '@/components/ui/button'
import { getXpForLesson } from '@/engine/xp'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import {
  reviewWithAI,
  askAIQuestion,
  getApiKey,
} from '@/services/ai-review'
import type { AIReviewResponse } from '@/engine/types'

export function LessonPage() {
  const { lesson, courseId, lessonId } = useLesson()
  const { completeLesson, isLessonCompleted } = useProgress()
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error'
    message: string
    xpGained?: number
  } | null>(null)

  const [aiReview, setAiReview] = useState<AIReviewResponse | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)

  const currentCodeRef = useRef<string>('')

  const handleCodeChange = useCallback((code: string) => {
    currentCodeRef.current = code
  }, [])

  if (!lesson || !courseId || !lessonId) {
    return <Navigate to="/" replace />
  }

  const course = getCourse(courseId)
  const allLessonIds = course?.modules.flatMap((m) => m.lessons) ?? []
  const currentIndex = allLessonIds.indexOf(lessonId)
  const prevLessonId = currentIndex > 0 ? allLessonIds[currentIndex - 1] : null
  const nextLessonId =
    currentIndex >= 0 && currentIndex < allLessonIds.length - 1
      ? allLessonIds[currentIndex + 1]
      : null

  const handleComplete = () => {
    const xp = getXpForLesson(lesson.type)
    completeLesson(lessonId, xp)
    setFeedback({
      type: 'success',
      message: 'Parabéns! Lição concluída.',
      xpGained: xp,
    })
  }

  const handleCheckSolution = () => {
    handleComplete()
  }

  const handleAIReview = async () => {
    const apiKey = getApiKey()
    if (!apiKey) {
      setShowApiKeyDialog(true)
      return
    }

    if (!lesson.challenge) return

    setAiLoading(true)
    setAiError(null)
    setAiReview(null)

    try {
      const review = await reviewWithAI(
        {
          studentCode: currentCodeRef.current || lesson.challenge.starterCode,
          lessonTitle: lesson.title,
          challengeInstructions: lesson.challenge.instructions,
          solution: lesson.challenge.solution,
          hint: lesson.challenge.hint,
          lessonContext: lesson.analogy,
        },
        apiKey
      )
      setAiReview(review)

      if (review.isCorrect && !isLessonCompleted(lessonId)) {
        handleComplete()
      }
    } catch (err) {
      setAiError(
        err instanceof Error ? err.message : 'Erro ao conectar com a IA'
      )
    } finally {
      setAiLoading(false)
    }
  }

  const handleAskQuestion = async (question: string): Promise<string> => {
    const apiKey = getApiKey()
    if (!apiKey) {
      setShowApiKeyDialog(true)
      return 'Configure sua API key primeiro.'
    }

    return askAIQuestion(
      question,
      lesson.title,
      currentCodeRef.current || lesson.challenge?.starterCode || '',
      apiKey
    )
  }

  const handleApiKeySet = () => {
    setShowApiKeyDialog(false)
    handleAIReview()
  }

  const isChallenge = lesson.type === 'challenge' && lesson.challenge

  return (
    <LessonLayout
      footer={
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {prevLessonId ? (
              <Link to={`/course/${courseId}/lesson/${prevLessonId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="size-4" />
                  Anterior
                </Button>
              </Link>
            ) : null}
            <Link to={`/course/${courseId}`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <RotateCcw className="size-4" />
                Revisar
              </Button>
            </Link>
          </div>
          <div>
            {nextLessonId ? (
              <Link to={`/course/${courseId}/lesson/${nextLessonId}`}>
                <Button size="sm" className="flex items-center gap-1">
                  Próxima lição
                  <ChevronRight className="size-4" />
                </Button>
              </Link>
            ) : (
              <Link to={`/course/${courseId}`}>
                <Button size="sm">Voltar ao curso</Button>
              </Link>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-50">
            {lesson.title}
          </h1>
          {lesson.difficulty && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                lesson.difficulty === 'beginner'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : lesson.difficulty === 'intermediate'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              {lesson.difficulty === 'beginner'
                ? 'Iniciante'
                : lesson.difficulty === 'intermediate'
                  ? 'Intermediário'
                  : 'Avançado'}
            </span>
          )}
        </div>

        <LessonContent lesson={lesson} />

        {isChallenge && lesson.challenge && (
          <>
            <ChallengeCard
              challenge={lesson.challenge}
              onHintClick={
                lesson.challenge.hint
                  ? () => setShowHint((h) => !h)
                  : undefined
              }
            />
            {showHint && lesson.challenge?.hint && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-400">
                  {lesson.challenge.hint}
                </p>
              </div>
            )}

            <CodeEditorPanel
              starterCode={lesson.challenge.starterCode}
              onCodeChange={handleCodeChange}
              dependencies={lesson.challenge.sandpackDependencies}
            />

            <div className="flex gap-2">
              <Button
                onClick={handleCheckSolution}
                className="flex-1"
                disabled={isLessonCompleted(lessonId)}
              >
                {isLessonCompleted(lessonId)
                  ? 'Concluído'
                  : 'Marcar como concluído'}
              </Button>
            </div>

            {showApiKeyDialog && (
              <APIKeyDialog
                onKeySet={handleApiKeySet}
                onCancel={() => setShowApiKeyDialog(false)}
              />
            )}

            <AIReviewCard
              review={aiReview}
              isLoading={aiLoading}
              error={aiError}
              onReview={handleAIReview}
              onAskQuestion={handleAskQuestion}
              isLessonCompleted={isLessonCompleted(lessonId)}
            />
          </>
        )}

        {feedback && (
          <FeedbackCard
            type={feedback.type}
            message={feedback.message}
            xpGained={feedback.xpGained}
          />
        )}

        {!isChallenge && (
          <Button
            onClick={handleComplete}
            disabled={isLessonCompleted(lessonId)}
            className="w-full"
          >
            {isLessonCompleted(lessonId)
              ? 'Concluído'
              : 'Marcar como concluído'}
          </Button>
        )}
      </div>
    </LessonLayout>
  )
}
