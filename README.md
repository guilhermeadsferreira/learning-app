# Learning Engine

Plataforma web gamificada de aprendizado técnico. O primeiro curso disponível é **React Fundamentals**.

## Stack

- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- Sandpack (editor de código interativo)
- React Router

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

## Estrutura

```
src/
  components/     # Componentes reutilizáveis
  layouts/       # AppShell, Header, Sidebar
  pages/         # HomePage, CoursePage, LessonPage
  courses/       # Conteúdo declarativo (JSON)
  engine/        # Tipos, progresso, XP
  hooks/         # useProgress, useCourse, useLesson
```

## Curso React Fundamentals

- **Módulo 1 - Introdução**: O que é React, JSX
- **Módulo 2 - Componentes**: Componentes, Props
- **Módulo 3 - Estado**: useState, Eventos

O progresso é salvo no `localStorage`.
