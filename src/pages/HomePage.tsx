import { Link } from 'react-router-dom'
import { getAllCourses } from '@/courses'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HomePage() {
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-50">
          Learning Engine
        </h1>
        <p className="mt-2 text-slate-400">
          Aprenda programação de forma gamificada. Lições curtas, prática ativa e progresso visível.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="border-slate-700/50 bg-slate-800/50 transition-all duration-200 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
          >
            <CardHeader>
              <span className="text-3xl">{course.icon}</span>
              <CardTitle className="text-slate-50">{course.title}</CardTitle>
              <CardDescription className="text-slate-400">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={`/course/${course.id}`}>
                <Button variant="default" className="flex w-full items-center justify-center gap-2">
                  Começar
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
