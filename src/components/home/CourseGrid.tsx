import type { Course } from '@/engine/types'
import { CourseCard } from './CourseCard'
import { cn } from '@/lib/utils'

interface CourseGridProps {
  courses: Course[]
  hasActiveFilter: boolean
  className?: string
}

export function CourseGrid({ courses, hasActiveFilter, className }: CourseGridProps) {
  const isEmpty = courses.length === 0

  return (
    <div className={cn('space-y-4', className)}>
      {hasActiveFilter && (
        <p className="text-center text-sm text-slate-500">
          {isEmpty
            ? 'Nenhum curso encontrado'
            : `${courses.length} ${courses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}`}
        </p>
      )}
      {isEmpty ? (
        <div className="rounded-xl border border-dashed border-slate-600/50 bg-slate-800/30 px-8 py-16 text-center">
          <p className="text-slate-400">
            {hasActiveFilter
              ? 'Tente ajustar a busca ou o filtro para encontrar cursos.'
              : 'Nenhum curso disponível no momento.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
