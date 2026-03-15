import { getAllTags } from '@/courses'
import { useCourseFilter } from '@/hooks/useCourseFilter'
import { HeroSection } from '@/components/home/HeroSection'
import { TagFilterBar } from '@/components/home/TagFilterBar'
import { CourseGrid } from '@/components/home/CourseGrid'

export function HomePage() {
  const { filteredCourses, searchQuery, selectedTag, setSearchQuery, setSelectedTag } =
    useCourseFilter()
  const tags = getAllTags()
  const hasActiveFilter = searchQuery.trim() !== '' || selectedTag !== null

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} className="mb-6" />
      <TagFilterBar
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        className="mb-8"
      />
      <CourseGrid courses={filteredCourses} hasActiveFilter={hasActiveFilter} />
    </div>
  )
}
