import { Link } from 'react-router'
import type { Course } from '@/engine/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="border-slate-700/50 bg-slate-800/50 transition-all duration-200 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5">
      <CardHeader>
        <span className="text-3xl">{course.icon}</span>
        <CardTitle className="text-slate-50">{course.title}</CardTitle>
        <CardDescription className="text-slate-400">{course.description}</CardDescription>
        {course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {course.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="h-auto min-h-7 rounded-full border-slate-600/70 bg-slate-700/70 px-3.5 py-1.5 text-sm font-normal text-slate-300"
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="mt-auto">
        <Link
          to={`/course/${course.id}`}
          className={cn(buttonVariants(), 'flex w-full items-center justify-center gap-2')}
        >
          Começar
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
