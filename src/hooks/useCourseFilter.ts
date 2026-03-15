import { useMemo, useState } from 'react'
import type { Course } from '@/engine/types'
import { getAllCourses, getCoursesByTag, searchCourses } from '@/courses'

export function useCourseFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredCourses = useMemo((): Course[] => {
    let result: Course[]
    if (selectedTag) {
      result = getCoursesByTag(selectedTag)
    } else {
      result = getAllCourses()
    }
    if (searchQuery.trim()) {
      result = result.filter((course) => {
        const searchResults = searchCourses(searchQuery)
        return searchResults.some((c) => c.id === course.id)
      })
    }
    return result
  }, [searchQuery, selectedTag])

  return {
    filteredCourses,
    searchQuery,
    selectedTag,
    setSearchQuery,
    setSelectedTag,
  }
}
