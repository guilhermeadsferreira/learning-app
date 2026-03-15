import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Bot,
  CheckCircle,
  XCircle,
  Loader2,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type { AIReviewResponse } from '@/engine/types'
import { cn } from '@/lib/utils'

interface AIReviewCardProps {
  review: AIReviewResponse | null
  isLoading: boolean
  error: string | null
  onReview: () => void
  onAskQuestion: (question: string) => Promise<string>
  isLessonCompleted: boolean
  className?: string
}

export function AIReviewCard({
  review,
  isLoading,
  error,
  onReview,
  onAskQuestion,
  isLessonCompleted,
  className,
}: AIReviewCardProps) {
  const [showChat, setShowChat] = useState(false)
  const [question, setQuestion] = useState('')
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [isAsking, setIsAsking] = useState(false)

  const handleAskQuestion = async () => {
    if (!question.trim() || isAsking) return

    const q = question.trim()
    setQuestion('')
    setChatMessages((prev) => [...prev, { role: 'user', content: q }])
    setIsAsking(true)

    try {
      const answer = await onAskQuestion(q)
      setChatMessages((prev) => [...prev, { role: 'ai', content: answer }])
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Desculpe, não consegui processar sua pergunta. Tente novamente.' },
      ])
    } finally {
      setIsAsking(false)
    }
  }

  if (!review && !isLoading && !error) {
    return (
      <div className={cn('space-y-3', className)}>
        <Button
          onClick={onReview}
          disabled={isLessonCompleted}
          variant="outline"
          className="w-full gap-2 border-violet-500/30 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 hover:text-violet-300"
        >
          <Bot className="size-4" />
          Pedir revisão do Professor IA
        </Button>

        <button
          type="button"
          onClick={() => setShowChat(!showChat)}
          className="flex w-full items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-300"
        >
          <MessageCircle className="size-4" />
          Tirar dúvida com a IA
          {showChat ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>

        {showChat && (
          <ChatBox
            messages={chatMessages}
            question={question}
            onQuestionChange={setQuestion}
            onSend={handleAskQuestion}
            isAsking={isAsking}
          />
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <Card className={cn('border-violet-500/20 bg-violet-500/5', className)}>
        <CardContent className="flex items-center gap-3 py-6">
          <Loader2 className="size-5 animate-spin text-violet-400" />
          <div>
            <p className="font-medium text-violet-400">Professor IA analisando seu código...</p>
            <p className="mt-1 text-sm text-slate-400">Isso pode levar alguns segundos</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn('border-rose-500/20 bg-rose-500/5', className)}>
        <CardContent className="py-4">
          <p className="text-sm text-rose-400">{error}</p>
          <Button
            onClick={onReview}
            variant="outline"
            size="sm"
            className="mt-3 border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
          >
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!review) return null

  return (
    <div className={cn('space-y-3', className)}>
      <Card className="border-violet-500/20 bg-violet-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-violet-400">
            <Bot className="size-5" />
            Revisão do Professor IA
            {review.isCorrect ? (
              <CheckCircle className="ml-auto size-5 text-emerald-400" />
            ) : (
              <XCircle className="ml-auto size-5 text-amber-400" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
            {review.feedback}
          </div>

          {review.suggestions && review.suggestions.length > 0 && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
              <p className="mb-2 text-sm font-medium text-blue-400">Sugestões de melhoria:</p>
              <ul className="space-y-1">
                {review.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-0.5 text-blue-400">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {review.nextStepHint && (
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
              <p className="text-sm text-slate-400">
                <span className="font-medium text-slate-300">Próximo passo: </span>
                {review.nextStepHint}
              </p>
            </div>
          )}

          <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3">
            <p className="text-sm text-violet-300">{review.encouragement}</p>
          </div>
        </CardContent>
      </Card>

      <button
        type="button"
        onClick={() => setShowChat(!showChat)}
        className="flex w-full items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-300"
      >
        <MessageCircle className="size-4" />
        Continuar conversa com a IA
        {showChat ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
      </button>

      {showChat && (
        <ChatBox
          messages={chatMessages}
          question={question}
          onQuestionChange={setQuestion}
          onSend={handleAskQuestion}
          isAsking={isAsking}
        />
      )}
    </div>
  )
}

function ChatBox({
  messages,
  question,
  onQuestionChange,
  onSend,
  isAsking,
}: {
  messages: { role: 'user' | 'ai'; content: string }[]
  question: string
  onQuestionChange: (v: string) => void
  onSend: () => void
  isAsking: boolean
}) {
  return (
    <Card className="border-slate-700/50 bg-slate-800/30">
      <CardContent className="p-3">
        {messages.length > 0 && (
          <div className="mb-3 max-h-60 space-y-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg p-3 text-sm',
                  msg.role === 'user'
                    ? 'ml-8 bg-violet-500/10 text-violet-300'
                    : 'mr-8 bg-slate-700/50 text-slate-300'
                )}
              >
                <p className="mb-1 text-xs font-medium opacity-60">
                  {msg.role === 'user' ? 'Você' : 'Professor IA'}
                </p>
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            ))}
            {isAsking && (
              <div className="mr-8 flex items-center gap-2 rounded-lg bg-slate-700/50 p-3">
                <Loader2 className="size-4 animate-spin text-violet-400" />
                <p className="text-sm text-slate-400">Pensando...</p>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSend()}
            placeholder="Pergunte algo sobre o desafio..."
            className="flex-1 rounded-lg border border-slate-700/50 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none"
          />
          <Button
            onClick={onSend}
            disabled={!question.trim() || isAsking}
            size="sm"
            className="shrink-0 bg-violet-600 hover:bg-violet-500"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
