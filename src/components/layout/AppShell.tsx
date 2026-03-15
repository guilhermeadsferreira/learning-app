import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { SidebarCourseNavigation } from './SidebarCourseNavigation'
import { cn } from '@/lib/utils'
export function AppShell() {
  const { pathname } = useLocation()
  const showSidebar = pathname.includes('/course/')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header
        onMobileMenuClick={
          showSidebar ? () => setMobileMenuOpen((o) => !o) : undefined
        }
      />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <>
            <SidebarCourseNavigation className="hidden shrink-0 lg:flex" />
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute left-0 top-0 h-full w-64 animate-in slide-in-from-left bg-slate-900">
                  <SidebarCourseNavigation
                    className="flex"
                    onNavigate={() => setMobileMenuOpen(false)}
                  />
                </div>
              </div>
            )}
          </>
        )}
        <main
          className={cn(
            'flex-1 overflow-auto',
            showSidebar && 'lg:border-l border-slate-800/50'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
