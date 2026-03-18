import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthProvider } from '@/hooks/useAuth'
import { ProgressProvider } from '@/hooks/useProgress'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <ProgressProvider>
          <AppShell />
        </ProgressProvider>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'course/:courseId',
        lazy: async () => {
          const { CoursePage } = await import('./pages/CoursePage')
          return { Component: CoursePage }
        },
      },
      {
        path: 'course/:courseId/lesson/:lessonId',
        lazy: async () => {
          const { LessonPage } = await import('./pages/LessonPage')
          return { Component: LessonPage }
        },
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
