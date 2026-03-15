import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ProgressProvider } from '@/hooks/useProgress'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PageLoading } from '@/components/layout/PageLoading'

const CoursePage = lazy(() => import('./pages/CoursePage').then((m) => ({ default: m.CoursePage })))
const LessonPage = lazy(() => import('./pages/LessonPage').then((m) => ({ default: m.LessonPage })))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProgressProvider>
        <AppShell />
      </ProgressProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'course/:courseId',
        element: (
          <Suspense fallback={<PageLoading />}>
            <CoursePage />
          </Suspense>
        ),
      },
      {
        path: 'course/:courseId/lesson/:lessonId',
        element: (
          <Suspense fallback={<PageLoading />}>
            <LessonPage />
          </Suspense>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
