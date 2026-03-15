import { useMemo } from 'react'
import { Link } from 'react-router'
import { Menu, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { XPBadge } from '@/components/gamification/XPBadge'
import { ProgressBar } from '@/components/gamification/ProgressBar'
import { useProgress } from '@/hooks/useProgress'
import { useCourse } from '@/hooks/useCourse'
import { getCourse } from '@/courses'
import { useSettingsDrawer } from '@/contexts/SettingsDrawerContext'
import { getAllProviders, getApiKey } from '@/services/ai'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  onMobileMenuClick?: () => void
}

export function Header({ className, onMobileMenuClick }: HeaderProps) {
  const { progress } = useProgress()
  const { courseId } = useCourse()
  const { openSettings } = useSettingsDrawer()
  const needsApiKeyConfig = !getAllProviders().some((p) => getApiKey(p.id))
  const course = courseId ? getCourse(courseId) : null

  const { totalLessons, progressPercent } = useMemo(() => {
    const total = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0
    const completed = course
      ? progress.completedLessonIds.filter((id) =>
          course.modules.some((m) => m.lessons.includes(id))
        ).length
      : 0
    const percent = total > 0 ? (completed / total) * 100 : 0
    return { totalLessons: total, progressPercent: percent }
  }, [course, progress.completedLessonIds])

  return (
    <header
      className={cn(
        'flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {onMobileMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMobileMenuClick}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        )}
        <Link
          to="/"
          className="text-lg font-semibold text-slate-50 transition-colors hover:text-violet-400"
        >
          Learning Engine
        </Link>
        {course && <span className="text-slate-400">/ {course.title}</span>}
      </div>
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={openSettings}
          aria-label="Configurações"
          className="relative"
        >
          <Settings className="size-5" />
          {needsApiKeyConfig && (
            <span
              className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-amber-500"
              aria-hidden
            />
          )}
        </Button>
        <XPBadge xp={progress.xp} />
        {course && totalLessons > 0 && (
          <div className="hidden w-32 sm:block">
            <ProgressBar value={progressPercent} showLabel />
          </div>
        )}
      </div>
    </header>
  )
}
