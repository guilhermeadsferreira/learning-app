import type { AIReviewRequest, AIReviewResponse, AIReviewContext } from '@/engine/types'
import { callAI } from './callers'
import {
  buildReviewSystemPrompt,
  buildReviewUserMessage,
  buildQuestionSystemPrompt,
  resolveAIReviewContext,
} from './prompts'

function parseReviewResponse(content: string): AIReviewResponse {
  try {
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    return JSON.parse(cleaned) as AIReviewResponse
  } catch {
    return {
      feedback: content,
      isCorrect: false,
      encouragement: 'Continue tentando! Cada erro é uma oportunidade de aprender.',
      suggestions: [],
    }
  }
}

export async function reviewWithAI(
  request: AIReviewRequest,
  apiKey: string
): Promise<AIReviewResponse> {
  const context = resolveAIReviewContext(request.courseId, request.aiReviewContext)
  const content = await callAI(
    buildReviewSystemPrompt(context),
    buildReviewUserMessage(request),
    apiKey,
    1000
  )
  return parseReviewResponse(content)
}

export interface AskAIQuestionParams {
  question: string
  lessonTitle: string
  studentCode: string
  courseId: string
  aiReviewContext?: AIReviewContext
}

export async function askAIQuestion(params: AskAIQuestionParams, apiKey: string): Promise<string> {
  const context = resolveAIReviewContext(params.courseId, params.aiReviewContext)
  const userMsg = `Código atual do aluno:\n\`\`\`jsx\n${params.studentCode}\n\`\`\`\n\nPergunta: ${params.question}`
  return callAI(buildQuestionSystemPrompt(context, params.lessonTitle), userMsg, apiKey, 600)
}
