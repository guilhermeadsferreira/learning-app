import { type ReactNode } from 'react'
import { Link, Navigate } from 'react-router'
import { useCourse } from '@/hooks/useCourse'
import { useProgress } from '@/hooks/useProgress'
import { getLesson } from '@/courses'
import { cn } from '@/lib/utils'
import { getAccent, accentConfig } from '@/components/home/courseAccent'
import { Play, BookOpen, Code2, HelpCircle, CheckCircle2, Circle } from 'lucide-react'
import type { LessonType } from '@/engine/types'

const lessonTypeIcon: Record<LessonType, ReactNode> = {
  explanation: <BookOpen className="size-3.5" />,
  challenge: <Code2 className="size-3.5" />,
  quiz: <HelpCircle className="size-3.5" />,
}

export function CoursePage() {
  const { course, courseId } = useCourse()
  const { isLessonCompleted, progress } = useProgress()

  if (!course || !courseId) return <Navigate to="/" replace />

  const allLessonIds = course.modules.flatMap((m) => m.lessons)
  const totalLessons = allLessonIds.length
  const completedCount = allLessonIds.filter((lid) => isLessonCompleted(lid)).length
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const resumeId = allLessonIds.includes(progress.currentLessonId)
    ? progress.currentLessonId
    : (allLessonIds.find((lid) => !isLessonCompleted(lid)) ?? allLessonIds[0])

  const accent = getAccent(course.tags)
  const config = accentConfig[accent]

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Course header */}
      <div
        className={cn(
          'mb-10 rounded-xl border border-l-2 border-slate-700/50 bg-slate-800/40 p-6',
          config.border
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span
              className={cn(
                'flex size-12 items-center justify-center rounded-xl text-2xl shrink-0',
                config.iconBg
              )}
            >
              {course.icon}
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-50">{course.title}</h1>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{course.description}</p>
              {course.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn('flex items-center gap-1.5 text-xs font-medium', config.text)}
                    >
                      <span className={cn('size-1.5 rounded-full', config.dot)} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {resumeId && (
            <Link
              to={`/course/${courseId}/lesson/${resumeId}`}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2',
                'bg-slate-700/60 text-sm font-medium text-slate-200',
                'border border-slate-600/50 transition-all duration-150',
                'hover:bg-slate-700 hover:text-slate-50'
              )}
            >
              <Play className="size-3.5" />
              {completedCount > 0 ? 'Continuar' : 'Começar'}
            </Link>
          )}
        </div>

        {/* Progress */}
        <div className="mt-5 space-y-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/60">
            <div
              className={cn('h-full rounded-full transition-all duration-500', config.dot)}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            {completedCount} de {totalLessons} lições concluídas · {progressPercent}%
          </p>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-8">
        {course.modules.map((module, moduleIndex) => {
          const moduleCompleted = module.lessons.filter((lid) => isLessonCompleted(lid)).length
          return (
            <div key={module.id}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Módulo {moduleIndex + 1}
                </span>
                <div className="h-px flex-1 bg-slate-700/50" />
                <span className="text-xs text-slate-600">
                  {moduleCompleted}/{module.lessons.length}
                </span>
              </div>
              <h2 className="mb-3 text-sm font-semibold text-slate-300">{module.title}</h2>

              <div className="rounded-xl border border-slate-700/40 bg-slate-800/30 overflow-hidden">
                {module.lessons.map((lid, lessonIndex) => {
                  const lesson = getLesson(courseId, lid)
                  const completed = isLessonCompleted(lid)
                  const isCurrent = progress.currentLessonId === lid
                  const isLast = lessonIndex === module.lessons.length - 1

                  return (
                    <Link
                      key={lid}
                      to={`/course/${courseId}/lesson/${lid}`}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 transition-colors duration-150',
                        !isLast && 'border-b border-slate-700/30',
                        isCurrent ? 'bg-violet-500/10' : 'hover:bg-slate-700/30'
                      )}
                    >
                      {/* Lesson number */}
                      <span className="w-6 shrink-0 text-right text-xs tabular-nums text-slate-600">
                        {String(lessonIndex + 1).padStart(2, '0')}
                      </span>

                      {/* Completion indicator */}
                      {completed ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                      ) : (
                        <Circle
                          className={cn(
                            'size-4 shrink-0',
                            isCurrent ? config.text : 'text-slate-600'
                          )}
                        />
                      )}

                      {/* Title */}
                      <span
                        className={cn(
                          'flex-1 text-sm',
                          completed
                            ? 'text-slate-500'
                            : isCurrent
                              ? 'font-medium text-slate-100'
                              : 'text-slate-300'
                        )}
                      >
                        {lesson?.title ?? lid}
                      </span>

                      {/* Lesson type */}
                      {lesson && (
                        <span className="shrink-0 text-slate-600">
                          {lessonTypeIcon[lesson.type]}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
