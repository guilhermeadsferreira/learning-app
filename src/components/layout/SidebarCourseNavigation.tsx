import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useProgress } from '@/hooks/useProgress'
import { getCourse, getLesson } from '@/courses'
import { ChevronDown, Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarCourseNavigationProps {
  className?: string
  onNavigate?: () => void
}

export function SidebarCourseNavigation({ className, onNavigate }: SidebarCourseNavigationProps) {
  const { courseId, lessonId } = useParams()
  const { isLessonCompleted } = useProgress()
  const course = courseId ? getCourse(courseId) : null

  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set(course?.modules.map((m) => m.id) ?? [])
  )

  const lessonsByModule = useMemo(() => {
    if (!course || !courseId) return {} as Record<string, { id: string; title: string }[]>
    return Object.fromEntries(
      course.modules.map((m) => [
        m.id,
        m.lessons.map((lid) => ({
          id: lid,
          title: getLesson(courseId, lid)?.title ?? lid.replace(/-/g, ' '),
        })),
      ])
    )
  }, [course, courseId])

  if (!course) return null

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) next.delete(moduleId)
      else next.add(moduleId)
      return next
    })
  }

  return (
    <aside
      className={cn('flex w-64 flex-col border-r border-slate-800 bg-slate-900/50', className)}
    >
      <nav className="flex flex-col gap-1 p-3">
        {course.modules.map((module) => {
          const isExpanded = expandedModules.has(module.id)
          return (
            <div key={module.id} className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-50"
              >
                <ChevronDown
                  className={cn('size-4 transition-transform', isExpanded && 'rotate-180')}
                />
                {module.title}
              </button>
              {isExpanded &&
                (lessonsByModule[module.id] ?? []).map(({ id: lid, title }) => {
                  const href = `/course/${courseId ?? ''}/lesson/${lid}`
                  const isActive = lessonId === lid
                  const completed = isLessonCompleted(lid)
                  return (
                    <Link
                      key={lid}
                      to={href}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 pl-9 text-sm transition-all',
                        isActive
                          ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
                        completed && !isActive && 'text-emerald-400/80'
                      )}
                    >
                      {completed ? (
                        <Check className="size-4 shrink-0 text-emerald-500" />
                      ) : (
                        <Circle className="size-4 shrink-0 opacity-50" />
                      )}
                      {title}
                    </Link>
                  )
                })}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
