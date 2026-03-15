import { useEffect, useRef, useCallback } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useActiveCode,
} from '@codesandbox/sandpack-react'
import { cn } from '@/lib/utils'

const sandpackTheme = {
  colors: {
    surface1: '#0f172a',
    surface2: '#1e293b',
    surface3: '#334155',
    base: '#94a3b8',
    clickable: '#94a3b8',
    hover: '#f1f5f9',
    accent: '#8b5cf6',
  },
  syntax: {
    plain: '#f1f5f9',
    comment: '#64748b',
    keyword: '#c084fc',
    tag: '#38bdf8',
    punctuation: '#94a3b8',
    definition: '#22d3ee',
    property: '#a78bfa',
    static: '#fbbf24',
    string: '#34d399',
  },
  font: {
    body: '"Nunito Variable", system-ui, sans-serif',
    mono: 'var(--font-geist-mono), monospace',
    size: '14px',
    lineHeight: '1.5',
  },
}

function CodeSync({ onCodeChange }: { onCodeChange?: (code: string) => void }) {
  const { code } = useActiveCode()
  const onCodeChangeRef = useRef(onCodeChange)
  onCodeChangeRef.current = onCodeChange

  useEffect(() => {
    onCodeChangeRef.current?.(code)
  }, [code])

  return null
}

interface CodeEditorPanelProps {
  starterCode: string
  onCodeChange?: (code: string) => void
  dependencies?: Record<string, string>
  className?: string
}

export function CodeEditorPanel({
  starterCode,
  onCodeChange,
  dependencies,
  className,
}: CodeEditorPanelProps) {
  const files = {
    '/App.js': {
      code: starterCode,
    },
  }

  const customSetup = dependencies
    ? { dependencies }
    : undefined

  const stableOnCodeChange = useCallback(
    (code: string) => onCodeChange?.(code),
    [onCodeChange]
  )

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-slate-700/50 shadow-md shadow-slate-950/50',
        className
      )}
    >
      <SandpackProvider
        template="react"
        files={files}
        theme={sandpackTheme}
        customSetup={customSetup}
      >
        <CodeSync onCodeChange={stableOnCodeChange} />
        <SandpackLayout>
          <SandpackCodeEditor
            style={{ minHeight: 550 }}
            showLineNumbers
            showTabs={false}
          />
          <SandpackPreview
            style={{ minHeight: 550 }}
            showOpenInCodeSandbox={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
