import { Link, Navigate } from 'react-router-dom'
import { useCourse } from '@/hooks/useCourse'
import { useProgress } from '@/hooks/useProgress'
import { getLesson } from '@/courses'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/gamification/ProgressBar'
import { Play } from 'lucide-react'

export function CoursePage() {
  const { course, courseId } = useCourse()
  const { isLessonCompleted } = useProgress()

  if (!course || !courseId) return <Navigate to="/" replace />

  const totalLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  )
  const completedCount = course.modules.reduce(
    (acc, m) =>
      acc +
      m.lessons.filter((lid) => isLessonCompleted(lid)).length,
    0
  )
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0
  const firstLessonId = course.modules[0]?.lessons[0]

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <span className="text-4xl">{course.icon}</span>
        <h1 className="mt-2 text-2xl font-bold text-slate-50">
          {course.title}
        </h1>
        <p className="mt-1 text-slate-400">{course.description}</p>
        <div className="mt-4 max-w-md">
          <ProgressBar value={progressPercent} max={100} showLabel />
        </div>
      </div>
      <div className="space-y-6">
        {course.modules.map((module) => (
          <Card
            key={module.id}
            className="border-slate-700/50 bg-slate-800/50"
          >
            <CardHeader>
              <CardTitle className="text-slate-50">{module.title}</CardTitle>
              <CardDescription>
                {module.lessons.length} lições
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {module.lessons.map((lid) => {
                const lesson = getLesson(courseId, lid)
                const completed = isLessonCompleted(lid)
                return (
                  <Link key={lid} to={`/course/${courseId}/lesson/${lid}`}>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start gap-2"
                    >
                      {completed ? (
                        <span className="text-emerald-500">✓</span>
                      ) : (
                        <Play className="size-4 text-slate-500" />
                      )}
                      {lesson?.title ?? lid}
                    </Button>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>
      {firstLessonId && (
        <div className="mt-8">
          <Link to={`/course/${courseId}/lesson/${firstLessonId}`}>
            <Button size="lg" className="flex items-center gap-2">
              {completedCount > 0 ? 'Continuar' : 'Começar'} o curso
              <Play className="size-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
