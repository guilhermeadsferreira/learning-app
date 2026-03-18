import { useMemo } from 'react'
import { Link } from 'react-router'
import { Menu, Settings, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { XPBadge } from '@/components/gamification/XPBadge'
import { ProgressBar } from '@/components/gamification/ProgressBar'
import { useProgress } from '@/hooks/useProgress'
import { useCourse } from '@/hooks/useCourse'
import { getCourse } from '@/courses'
import { useSettingsDrawer } from '@/hooks/useSettingsDrawer'
import { useAuth } from '@/hooks/useAuth'
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
  const { user, isLoading: isAuthLoading, signInWithGitHub } = useAuth()
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
          Kaizen.dev
        </Link>
        {course && <span className="text-slate-400">/ {course.title}</span>}
      </div>
      <div className="flex items-center gap-3">
        {!isAuthLoading && !user && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => signInWithGitHub()}
            className="gap-1.5 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          >
            <Github className="size-4" />
            <span className="hidden sm:inline">Entrar</span>
          </Button>
        )}
        {user && (
          <button
            onClick={openSettings}
            className="flex size-7 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300 ring-1 ring-violet-500/30 transition-colors hover:bg-violet-500/30"
            aria-label="Conta"
            title={user.user_metadata?.full_name ?? user.email}
          >
            {(user.user_metadata?.full_name ?? user.email ?? '?')[0].toUpperCase()}
          </button>
        )}
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
