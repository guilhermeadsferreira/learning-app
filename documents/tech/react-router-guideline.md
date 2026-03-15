# Guia React Router v7 — Learning Engine

Guia prático para desenvolvedores que estão começando com React Router. Explica os conceitos fundamentais, como o roteamento funciona neste projeto e como adicionar novas páginas.

---

## 1. O que é o React Router?

O React Router transforma uma aplicação React em uma **Single Page Application (SPA)** com múltiplas "páginas". Em vez do navegador recarregar a página inteira a cada clique, o React Router:

1. Intercepta a navegação (cliques em links, botão voltar, etc.)
2. Atualiza a URL no navegador
3. Renderiza o componente correspondente à nova URL

Tudo isso sem recarregar a página — o que torna a navegação instantânea.

---

## 2. Modo de uso: Data Mode

O React Router v7 tem três modos. Este projeto usa o **Data Mode**:

| Modo             | Como configura                                    | Quando usar                                                         |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------- |
| Declarative      | `<BrowserRouter>` + `<Routes>` + `<Route>` no JSX | Apps simples, sem data APIs                                         |
| **Data Mode** ✅ | `createBrowserRouter` + `RouterProvider`          | Apps com rotas configuradas como objetos, suporte a loaders/actions |
| Framework        | Plugin Vite `@react-router/dev`                   | File-based routing, SSR, type-safety automática                     |

No **Data Mode**, as rotas são definidas como **objetos JavaScript** fora da árvore React — e o `RouterProvider` conecta o router ao React.

---

## 3. Fluxo completo: do `main.tsx` à tela

Aqui está o caminho que o código percorre, do ponto de entrada até o componente renderizado:

```
main.tsx → App.tsx → createBrowserRouter → RouterProvider → AppShell → Outlet → Página
```

### Passo a passo:

### 3.1. `main.tsx` — Ponto de entrada

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

Cria a raiz do React e renderiza `<App />`. Nenhuma lógica de roteamento aqui.

### 3.2. `App.tsx` — Definição das rotas

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: (<ProgressProvider><AppShell /></ProgressProvider>),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: 'course/:courseId', lazy: async () => { ... } },
      { path: 'course/:courseId/lesson/:lessonId', lazy: async () => { ... } },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}
```

**O que acontece aqui:**

1. `createBrowserRouter(...)` — cria o router com a árvore de rotas
2. `RouterProvider` — conecta o router ao React
3. A rota raiz (`path: '/'`) renderiza o `AppShell` (layout)
4. As rotas filhas (`children`) são renderizadas **dentro** do AppShell via `<Outlet />`

### 3.3. `AppShell.tsx` — Layout com Outlet

```tsx
import { Outlet } from 'react-router'

export function AppShell() {
  return (
    <div>
      <Header />
      <div>
        {showSidebar && <SidebarCourseNavigation />}
        <main>
          <Outlet /> {/* ← Aqui entra a página da rota ativa */}
        </main>
      </div>
    </div>
  )
}
```

O `<Outlet />` é o **ponto de inserção** das rotas filhas. Quando a URL muda, o React Router troca o conteúdo do Outlet — o Header e Sidebar continuam na tela.

### 3.4. Página renderizada

Dependendo da URL, o Outlet renderiza:

| URL                       | Componente     | Carregamento       |
| ------------------------- | -------------- | ------------------ |
| `/`                       | `HomePage`     | Imediato (bundled) |
| `/course/react`           | `CoursePage`   | Lazy (sob demanda) |
| `/course/react/lesson/01` | `LessonPage`   | Lazy (sob demanda) |
| `/qualquer-coisa`         | `NotFoundPage` | Imediato (bundled) |

---

## 4. Conceitos-chave

### 4.1. Rotas aninhadas (Nested Routes)

A rota raiz (`path: '/'`) é o **pai**. As rotas em `children` são **filhas**. O componente pai usa `<Outlet />` para definir onde o conteúdo filho aparece.

```
URL: /course/react/lesson/01

Árvore renderizada:
├── ProgressProvider
│   └── AppShell (path: "/")
│       ├── Header
│       ├── SidebarCourseNavigation
│       └── <Outlet />
│           └── LessonPage (path: "course/:courseId/lesson/:lessonId")
```

Os caminhos dos filhos são **relativos ao pai**. Como o pai é `/`, o caminho `course/:courseId` resulta em `/course/:courseId`.

### 4.2. `Component` vs `element`

Duas formas de associar um componente a uma rota:

```tsx
// Component — passa a referência da função (sem JSX)
{ path: 'about', Component: AboutPage }

// element — passa JSX (útil quando precisa de wrapper ou props)
{ path: '/', element: <ProgressProvider><AppShell /></ProgressProvider> }
```

Use `Component` por padrão. Use `element` quando precisar envolver o componente com providers ou passar props.

### 4.3. Parâmetros dinâmicos (`:param`)

O `:` antes de um segmento da URL indica um **parâmetro dinâmico**:

```tsx
// Definição da rota
{ path: 'course/:courseId/lesson/:lessonId', ... }

// URL real: /course/react/lesson/intro-jsx
// courseId = "react", lessonId = "intro-jsx"
```

No componente, leia os parâmetros com `useParams`:

```tsx
import { useParams } from 'react-router'

function LessonPage() {
  const { courseId, lessonId } = useParams()
  // courseId = "react", lessonId = "intro-jsx"
}
```

### 4.4. Index Route

Uma rota com `index: true` é renderizada quando a URL bate **exatamente** com o path do pai:

```tsx
children: [
  { index: true, Component: HomePage }, // renderiza em "/"
  { path: 'about', Component: AboutPage }, // renderiza em "/about"
]
```

### 4.5. Catch-all (`path: '*'`)

Captura qualquer URL que não foi correspondida pelas rotas anteriores. Sempre deve ser a **última** rota filha:

```tsx
{ path: '*', Component: NotFoundPage }
```

---

## 5. Navegação

### 5.1. `Link` — Links declarativos

Para navegação padrão (o equivalente a `<a href="...">`):

```tsx
import { Link } from 'react-router'

<Link to="/course/react">Ver curso</Link>
<Link to={`/course/${courseId}/lesson/${lessonId}`}>Próxima lição</Link>
```

### 5.2. `useNavigate` — Navegação programática

Para navegar após uma ação (submit de formulário, timeout, etc.):

```tsx
import { useNavigate } from 'react-router'

function CompleteLessonButton() {
  const navigate = useNavigate()

  function handleComplete() {
    saveProgress()
    navigate('/course/react') // vai para a página do curso
  }

  return <button onClick={handleComplete}>Concluir</button>
}
```

Também aceita números para navegar no histórico:

```tsx
navigate(-1) // voltar uma página
navigate(-2) // voltar duas páginas
```

### 5.3. `Navigate` — Redirecionamento no render

Para redirecionar condicionalmente durante a renderização:

```tsx
import { Navigate } from 'react-router'

function CoursePage() {
  const { course } = useCourse()

  if (!course) return <Navigate to="/" replace />

  return <div>...</div>
}
```

O `replace` evita que o redirecionamento entre no histórico (o botão "voltar" não leva de volta ao redirect).

### 5.4. `useMatch` — Detectar rota ativa

Para verificar se a URL atual corresponde a um padrão:

```tsx
import { useMatch } from 'react-router'

function AppShell() {
  const courseMatch = useMatch('/course/:courseId/*')
  const showSidebar = !!courseMatch // sidebar aparece em rotas de curso
}
```

Prefira `useMatch` em vez de `location.pathname.includes(...)`.

---

## 6. Lazy Loading (code splitting)

Páginas grandes são carregadas **sob demanda** para não aumentar o bundle inicial. O Data Mode tem suporte nativo via a propriedade `lazy`:

```tsx
{
  path: 'course/:courseId',
  lazy: async () => {
    const { CoursePage } = await import('./pages/CoursePage')
    return { Component: CoursePage }
  },
}
```

**Como funciona:**

1. O usuário clica em um link para `/course/react`
2. O React Router faz o `import()` do módulo `CoursePage`
3. Enquanto carrega, a página anterior **continua visível** (sem tela em branco)
4. Quando o módulo carrega, renderiza o componente

**Quando usar lazy:**

- Páginas com muitas dependências (ex: editor de código, lição completa)
- Páginas que nem todo usuário vai acessar

**Quando NÃO usar:**

- Páginas leves que todos acessam (ex: `HomePage`, `NotFoundPage`)
- Componentes de layout (ex: `AppShell`)

---

## 7. Tratamento de erros

### `errorElement`

Captura erros de renderização na rota (e nos filhos):

```tsx
{
  path: '/',
  element: <AppShell />,
  errorElement: <ErrorPage />,  // captura erros de qualquer rota filha
  children: [...]
}
```

### `useRouteError`

No componente de erro, acesse o erro capturado:

```tsx
import { useRouteError } from 'react-router'

function ErrorPage() {
  const error = useRouteError() as Error | undefined
  return <p>{error?.message ?? 'Algo deu errado'}</p>
}
```

---

## 8. Como adicionar uma nova página

Passo a passo para criar uma nova rota no projeto:

### Passo 1: Criar o componente da página

```tsx
// src/pages/ProfilePage.tsx
import { Link } from 'react-router'

export function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-50">Perfil</h1>
      <Link to="/">Voltar</Link>
    </div>
  )
}
```

### Passo 2: Registrar a rota em `App.tsx`

Adicione a rota em `children` no `createBrowserRouter`:

```tsx
// Para página leve (carregamento imediato):
{ path: 'profile', Component: ProfilePage }

// Para página pesada (lazy loading):
{
  path: 'profile',
  lazy: async () => {
    const { ProfilePage } = await import('./pages/ProfilePage')
    return { Component: ProfilePage }
  },
}
```

### Passo 3: Navegar para a nova página

```tsx
<Link to="/profile">Meu perfil</Link>
```

---

## 9. Estrutura de arquivos

```
src/
├── main.tsx                          # Ponto de entrada — renderiza <App />
├── App.tsx                           # Define as rotas com createBrowserRouter
├── pages/                            # Componentes de página (uma por rota)
│   ├── HomePage.tsx                  # /
│   ├── CoursePage.tsx                # /course/:courseId
│   ├── LessonPage.tsx                # /course/:courseId/lesson/:lessonId
│   ├── ErrorPage.tsx                 # Exibido quando ocorre erro
│   └── NotFoundPage.tsx              # Exibido para URLs inválidas
├── components/
│   └── layout/
│       ├── AppShell.tsx              # Layout raiz — Header + Sidebar + <Outlet />
│       ├── Header.tsx                # Barra de navegação superior
│       ├── SidebarCourseNavigation.tsx  # Sidebar de navegação do curso
│       └── PageLoading.tsx           # Spinner de carregamento
└── hooks/                            # Hooks customizados
    ├── useProgress.tsx               # Estado de progresso (context)
    ├── useCourse.ts                  # Dados do curso (lê courseId da URL)
    └── useLesson.ts                  # Dados da lição (lê lessonId da URL)
```

---

## 10. Diagrama visual do fluxo

```
┌─────────────────────────────────────────────────┐
│  Navegador                                      │
│  URL: /course/react/lesson/intro-jsx            │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  RouterProvider                                 │
│  (conecta o router ao React)                    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Rota raiz: path="/"                            │
│  ┌─────────────────────────────────────────┐    │
│  │ ProgressProvider                        │    │
│  │  └── AppShell                           │    │
│  │       ├── Header                        │    │
│  │       ├── SidebarCourseNavigation       │    │
│  │       └── <Outlet />                    │    │
│  │            │                            │    │
│  └────────────┼────────────────────────────┘    │
└───────────────┼─────────────────────────────────┘
                │ match: course/:courseId/lesson/:lessonId
                ▼
┌─────────────────────────────────────────────────┐
│  LessonPage                                     │
│  courseId = "react"                              │
│  lessonId = "intro-jsx"                         │
└─────────────────────────────────────────────────┘
```

---

## 11. Resumo rápido

| Conceito              | O que faz                       | Onde usar                    |
| --------------------- | ------------------------------- | ---------------------------- |
| `createBrowserRouter` | Cria o router com as rotas      | `App.tsx` (uma vez)          |
| `RouterProvider`      | Conecta o router ao React       | `App.tsx` (uma vez)          |
| `Outlet`              | Renderiza a rota filha ativa    | Componentes de layout        |
| `Component`           | Associa componente à rota       | Definição de rota            |
| `lazy`                | Carrega componente sob demanda  | Rotas de páginas pesadas     |
| `Link`                | Link declarativo (sem reload)   | Qualquer componente          |
| `useNavigate`         | Navegação programática          | Handlers de evento           |
| `Navigate`            | Redirect durante render         | Componentes com condição     |
| `useParams`           | Lê parâmetros da URL            | Páginas com `:param`         |
| `useMatch`            | Verifica se URL bate com padrão | Lógica condicional de layout |
| `errorElement`        | Componente de erro da rota      | Rota raiz                    |

---

## Referências

- [React Router — Modos (Data Mode)](https://reactrouter.com/start/modes)
- [React Router — Roteamento](https://reactrouter.com/start/data/routing)
- [React Router — Navigating](https://reactrouter.com/start/data/navigating)
- Boas práticas do projeto: `documents/tech/react-router-best-practices.md`
