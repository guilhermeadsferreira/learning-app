import type { CourseTag } from '@/engine/types'

export type AccentColor = 'violet' | 'blue' | 'amber' | 'emerald' | 'indigo' | 'sky' | 'orange'

const tagToAccent: Partial<Record<CourseTag, AccentColor>> = {
  Frontend: 'violet',
  React: 'violet',
  'Next.js': 'violet',
  Vue: 'violet',
  Angular: 'violet',
  JavaScript: 'violet',
  TypeScript: 'violet',
  Backend: 'blue',
  'Node.js': 'blue',
  Django: 'blue',
  Laravel: 'blue',
  PHP: 'blue',
  Python: 'blue',
  Arquitetura: 'amber',
  IA: 'emerald',
  SQL: 'indigo',
  'C#': 'indigo',
  Produtividade: 'sky',
  Programação: 'orange',
  Go: 'orange',
  Rust: 'orange',
  Java: 'orange',
}

export const accentConfig: Record<
  AccentColor,
  {
    border: string
    shadow: string
    bg: string
    text: string
    dot: string
    iconBg: string
    ring: string
  }
> = {
  violet: {
    border: 'border-l-violet-500/60',
    shadow: 'group-hover:shadow-violet-500/10',
    bg: 'group-hover:bg-violet-500/[0.03]',
    text: 'text-violet-400',
    dot: 'bg-violet-500',
    iconBg: 'bg-violet-500/10',
    ring: 'ring-violet-500/30',
  },
  blue: {
    border: 'border-l-blue-500/60',
    shadow: 'group-hover:shadow-blue-500/10',
    bg: 'group-hover:bg-blue-500/[0.03]',
    text: 'text-blue-400',
    dot: 'bg-blue-500',
    iconBg: 'bg-blue-500/10',
    ring: 'ring-blue-500/30',
  },
  amber: {
    border: 'border-l-amber-500/60',
    shadow: 'group-hover:shadow-amber-500/10',
    bg: 'group-hover:bg-amber-500/[0.03]',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    iconBg: 'bg-amber-500/10',
    ring: 'ring-amber-500/30',
  },
  emerald: {
    border: 'border-l-emerald-500/60',
    shadow: 'group-hover:shadow-emerald-500/10',
    bg: 'group-hover:bg-emerald-500/[0.03]',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
    iconBg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/30',
  },
  indigo: {
    border: 'border-l-indigo-500/60',
    shadow: 'group-hover:shadow-indigo-500/10',
    bg: 'group-hover:bg-indigo-500/[0.03]',
    text: 'text-indigo-400',
    dot: 'bg-indigo-500',
    iconBg: 'bg-indigo-500/10',
    ring: 'ring-indigo-500/30',
  },
  sky: {
    border: 'border-l-sky-500/60',
    shadow: 'group-hover:shadow-sky-500/10',
    bg: 'group-hover:bg-sky-500/[0.03]',
    text: 'text-sky-400',
    dot: 'bg-sky-500',
    iconBg: 'bg-sky-500/10',
    ring: 'ring-sky-500/30',
  },
  orange: {
    border: 'border-l-orange-500/60',
    shadow: 'group-hover:shadow-orange-500/10',
    bg: 'group-hover:bg-orange-500/[0.03]',
    text: 'text-orange-400',
    dot: 'bg-orange-500',
    iconBg: 'bg-orange-500/10',
    ring: 'ring-orange-500/30',
  },
}

export function getAccent(tags: CourseTag[]): AccentColor {
  for (const tag of tags) {
    const accent = tagToAccent[tag]
    if (accent) return accent
  }
  return 'violet'
}
