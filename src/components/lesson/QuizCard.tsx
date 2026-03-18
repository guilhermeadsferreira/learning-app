import { useState } from 'react'
import type { QuizQuestion } from '@/engine/types'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle } from 'lucide-react'

interface QuizCardProps {
  questions: QuizQuestion[]
  onAllAnswered?: () => void
}

export function QuizCard({ questions, onAllAnswered }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleSelect = (questionIndex: number, optionId: string) => {
    if (answers[questionIndex] !== undefined) return // já respondeu
    const next = { ...answers, [questionIndex]: optionId }
    setAnswers(next)
    if (Object.keys(next).length === questions.length) {
      onAllAnswered?.()
    }
  }

  return (
    <div className="space-y-6">
      {questions.map((question, qi) => {
        const selectedId = answers[qi]
        const answered = selectedId !== undefined
        const selectedOption = question.options.find((o) => o.id === selectedId)
        const isCorrect = selectedOption?.isCorrect ?? false

        return (
          <div key={qi} className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5">
            <p className="mb-4 font-medium text-slate-100">
              <span className="mr-2 text-slate-500">{qi + 1}.</span>
              {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((option) => {
                const isSelected = selectedId === option.id
                const showResult = answered

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelect(qi, option.id)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                      !answered &&
                        'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-700/30',
                      showResult &&
                        isSelected &&
                        option.isCorrect &&
                        'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
                      showResult &&
                        isSelected &&
                        !option.isCorrect &&
                        'border-rose-500/40 bg-rose-500/10 text-rose-300',
                      showResult &&
                        !isSelected &&
                        option.isCorrect &&
                        'border-emerald-500/20 bg-emerald-500/5 text-emerald-400/70',
                      showResult &&
                        !isSelected &&
                        !option.isCorrect &&
                        'border-slate-700/30 bg-transparent text-slate-500'
                    )}
                  >
                    <span className="mt-0.5 shrink-0">
                      {showResult && option.isCorrect ? (
                        <CheckCircle2 className="size-4 text-emerald-400" />
                      ) : showResult && isSelected && !option.isCorrect ? (
                        <XCircle className="size-4 text-rose-400" />
                      ) : (
                        <span
                          className={cn(
                            'flex size-4 items-center justify-center rounded-full border text-xs',
                            isSelected
                              ? 'border-violet-400 bg-violet-500/20 text-violet-300'
                              : 'border-slate-600 text-slate-500'
                          )}
                        />
                      )}
                    </span>
                    <span>{option.text}</span>
                  </button>
                )
              })}
            </div>

            {answered && selectedOption?.explanation && (
              <p
                className={cn(
                  'mt-3 rounded-lg px-3 py-2 text-sm',
                  isCorrect ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'
                )}
              >
                {selectedOption.explanation}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
