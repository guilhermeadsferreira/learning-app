import { useState, useRef, useCallback } from 'react'
import { Link, Navigate } from 'react-router'
import { useLesson } from '@/hooks/useLesson'
import { useProgress } from '@/hooks/useProgress'
import { useAIReview } from '@/hooks/useAIReview'
import { useLessonNavigation } from '@/hooks/useLessonNavigation'
import { getCourse } from '@/courses'
import { LessonLayout } from '@/components/lesson/LessonLayout'
import { LessonContent } from '@/components/lesson/LessonContent'
import { ChallengeCard } from '@/components/lesson/ChallengeCard'
import { FeedbackCard } from '@/components/lesson/FeedbackCard'
import { AIReviewCard } from '@/components/lesson/AIReviewCard'
import { APIKeyDialog } from '@/components/lesson/APIKeyDialog'
import { useSettingsDrawer } from '@/contexts/SettingsDrawerContext'
import { CodeEditorPanel } from '@/components/editor/CodeEditorPanel'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getXpForLesson } from '@/engine/xp'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

export function LessonPage() {
  const { lesson, courseId, lessonId } = useLesson()
  const { completeLesson, isLessonCompleted } = useProgress()
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error'
    message: string
    xpGained?: number
  } | null>(null)

  const currentCodeRef = useRef<string>('')
  const handleCodeChange = useCallback((code: string) => {
    currentCodeRef.current = code
  }, [])

  const course = courseId ? getCourse(courseId) : null
  const { prevLessonId, nextLessonId } = useLessonNavigation(course, courseId ?? '', lessonId ?? '')
  const { openSettings } = useSettingsDrawer()

  const handleComplete = useCallback(() => {
    if (!lesson || !lessonId) return
    const xp = getXpForLesson(lesson.type)
    completeLesson(lessonId, xp)
    setFeedback({
      type: 'success',
      message: 'Parabéns! Lição concluída.',
      xpGained: xp,
    })
  }, [lesson, lessonId, completeLesson])

  const aiReview = useAIReview({
    lesson,
    courseId: courseId ?? '',
    course,
    lessonId: lessonId ?? '',
    isLessonCompleted,
    onComplete: handleComplete,
    codeRef: currentCodeRef,
  })

  if (!lesson || !courseId || !lessonId) {
    return <Navigate to="/" replace />
  }

  const handleCheckSolution = () => {
    handleComplete()
  }

  const isChallenge = lesson.type === 'challenge' && lesson.challenge

  return (
    <LessonLayout
      footer={
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {prevLessonId ? (
              <Link
                to={`/course/${courseId}/lesson/${prevLessonId}`}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'inline-flex items-center gap-1'
                )}
              >
                <ChevronLeft className="size-4" />
                Anterior
              </Link>
            ) : null}
            <Link
              to={`/course/${courseId}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'inline-flex items-center gap-1'
              )}
            >
              <RotateCcw className="size-4" />
              Revisar
            </Link>
          </div>
          <div>
            {nextLessonId ? (
              <Link
                to={`/course/${courseId}/lesson/${nextLessonId}`}
                className={cn(buttonVariants({ size: 'sm' }), 'inline-flex items-center gap-1')}
              >
                Próxima lição
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <Link
                to={`/course/${courseId}`}
                className={cn(buttonVariants({ size: 'sm' }), 'inline-flex')}
              >
                Voltar ao curso
              </Link>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-50">{lesson.title}</h1>
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
              onHintClick={lesson.challenge.hint ? () => setShowHint((h) => !h) : undefined}
            />
            {showHint && lesson.challenge?.hint && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-400">{lesson.challenge.hint}</p>
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
                {isLessonCompleted(lessonId) ? 'Concluído' : 'Marcar como concluído'}
              </Button>
            </div>

            {aiReview.showApiKeyDialog && (
              <APIKeyDialog
                onOpenSettings={() => {
                  openSettings()
                  aiReview.setShowApiKeyDialog(false)
                }}
                onCancel={() => aiReview.setShowApiKeyDialog(false)}
              />
            )}

            <AIReviewCard
              review={aiReview.aiReview}
              isLoading={aiReview.aiLoading}
              error={aiReview.aiError}
              onReview={aiReview.handleAIReview}
              onAskQuestion={aiReview.handleAskQuestion}
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
            {isLessonCompleted(lessonId) ? 'Concluído' : 'Marcar como concluído'}
          </Button>
        )}
      </div>
    </LessonLayout>
  )
}
