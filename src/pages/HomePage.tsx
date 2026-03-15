import { Lightbulb } from 'lucide-react'
import { getAllTags } from '@/courses'
import { useCourseFilter } from '@/hooks/useCourseFilter'
import { HeroSection } from '@/components/home/HeroSection'
import { TagFilterBar } from '@/components/home/TagFilterBar'
import { CourseGrid } from '@/components/home/CourseGrid'
import { useSettingsDrawer } from '@/contexts/SettingsDrawerContext'
import { getAllProviders, getApiKey } from '@/services/ai-review'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HomePage() {
  const { filteredCourses, searchQuery, selectedTag, setSearchQuery, setSelectedTag } =
    useCourseFilter()
  const tags = getAllTags()
  const hasActiveFilter = searchQuery.trim() !== '' || selectedTag !== null
  const { openSettings } = useSettingsDrawer()
  const needsApiKeyConfig = !getAllProviders().some((p) => getApiKey(p.id))

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} className="mb-6" />
      <TagFilterBar
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        className="mb-8"
      />
      {needsApiKeyConfig && (
        <div
          className={cn(
            'mb-8 flex flex-col gap-3 rounded-lg border border-violet-500/20 bg-violet-500/5 p-4',
            'sm:flex-row sm:items-center sm:justify-between'
          )}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-violet-400" />
            <div>
              <p className="font-medium text-slate-200">
                Para a melhor experiência, configure seu Professor IA
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                A revisão por IA dá feedback personalizado nos seus exercícios.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={openSettings}
            className="shrink-0 bg-violet-600 hover:bg-violet-500"
          >
            Configurar agora
          </Button>
        </div>
      )}
      <CourseGrid courses={filteredCourses} hasActiveFilter={hasActiveFilter} />
    </div>
  )
}
