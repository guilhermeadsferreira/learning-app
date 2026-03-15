import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProgressProvider } from '@/hooks/useProgress'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { CoursePage } from '@/pages/CoursePage'
import { LessonPage } from '@/pages/LessonPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProgressProvider>
        <AppShell />
      </ProgressProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'course/:courseId', element: <CoursePage /> },
      { path: 'course/:courseId/lesson/:lessonId', element: <LessonPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
