import { Loader2 } from 'lucide-react'

export function PageLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loader2 className="size-10 animate-spin text-violet-400" />
    </div>
  )
}
