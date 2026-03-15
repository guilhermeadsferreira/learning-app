export interface Course {
  id: string
  title: string
  description: string
  icon: string
  modules: Module[]
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
}

export interface AIReviewResponse {
  feedback: string
  isCorrect: boolean
  encouragement: string
  suggestions?: string[]
  nextStepHint?: string
}
