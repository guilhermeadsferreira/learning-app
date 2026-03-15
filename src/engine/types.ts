/** Tipo de desafio — define como a IA avalia a resposta do aluno */
export type ChallengeStyle =
  | 'code' // desafio de código (React, Python, FastAPI…)
  | 'query' // desafio de query (SQL, NoSQL…)
  | 'scenario' // desafio de cenário/decisão (Gestão, AWS…)
  | 'written' // desafio escrito/textual (documentação, análise…)

/** Contexto para prompts de IA por curso. Permite adaptar revisão e respostas ao domínio. */
export interface AIReviewContext {
  /** Assunto principal (ex: "React", "PostgreSQL", "Gestão de Pessoas") */
  subject: string
  /** Áreas de expertise para o prompt (ex: "hooks, componentes, JSX, Tailwind") */
  expertise?: string
  /** Linguagem para blocos de código nas mensagens (default: "text") */
  codeLanguage?: string
  /** Como a IA deve avaliar a resposta do aluno (default: "code") */
  challengeStyle?: ChallengeStyle
}

export interface Course {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  modules: Module[]
  /** Contexto opcional para prompts de revisão por IA. Se ausente, usa fallback por courseId. */
  aiReviewContext?: AIReviewContext
}

export interface Module {
  id: string
  title: string
  lessons: string[]
}

export type LessonType = 'explanation' | 'challenge' | 'quiz'
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export interface LessonContent {
  sections: ContentSection[]
}

export interface ContentSection {
  type: 'paragraph' | 'code' | 'list' | 'heading' | 'callout'
  content: string
  language?: string
  variant?: 'tip' | 'warning' | 'info'
}

export interface TestCase {
  input?: string
  expected: string
  description?: string
}

export interface Challenge {
  instructions: string
  starterCode: string
  solution: string
  tests: TestCase[]
  hint?: string
  solutionExplanation?: string
  sandpackDependencies?: Record<string, string>
}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
  explanation?: string
}

export interface QuizQuestion {
  question: string
  options: QuizOption[]
}

export interface Lesson {
  id: string
  courseId: string
  moduleId: string
  title: string
  type: LessonType
  xp: number
  difficulty?: DifficultyLevel
  analogy?: string
  content: LessonContent
  challenge?: Challenge
  quiz?: QuizQuestion[]
  keyTakeaways?: string[]
  commonMistakes?: string[]
  realWorldExample?: string
  encouragement?: string
}

export interface UserProgress {
  completedLessonIds: string[]
  currentLessonId: string
  xp: number
}

export interface AIReviewRequest {
  studentCode: string
  lessonTitle: string
  challengeInstructions: string
  solution: string
  hint?: string
  lessonContext?: string
  /** ID do curso (para prompts dinâmicos) */
  courseId: string
  /** Contexto de IA do curso. Se ausente, usa fallback. */
  aiReviewContext?: AIReviewContext
}

export interface AIReviewResponse {
  feedback: string
  isCorrect: boolean
  encouragement: string
  suggestions?: string[]
  nextStepHint?: string
}
