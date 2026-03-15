# Boas Práticas React Router v7

Documento de referência técnica para uso do React Router na plataforma Learning Engine. Baseado na documentação oficial (reactrouter.com) e nas convenções do React Router v7.

---

## 1. Pacote e imports

### Pacote canônico

No React Router v7, o pacote canônico é `react-router`. O `react-router-dom` existe para compatibilidade, mas importe de `react-router` para novas implementações.

```tsx
// Preferido
import { createBrowserRouter, RouterProvider, Link, useParams, Outlet } from 'react-router'

// Legado (evitar em código novo)
import { Link } from 'react-router-dom'
```

---

## 2. Data Mode (createBrowserRouter)

O Data Mode usa `createBrowserRouter` e `RouterProvider`, com configuração de rotas fora da árvore React. É o modo recomendado para aplicações com carregamento de dados, ações e estados de pending/error.

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'course/:courseId', element: <CoursePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

ReactDOM.createRoot(root).render(<RouterProvider router={router} />)
```

---

## 3. Error handling

### errorElement

Defina `errorElement` nas rotas para capturar erros de renderização, loaders e actions. Use `useRouteError` para exibir o erro.

```tsx
function ErrorPage() {
  const error = useRouteError()
  return (
    <div>
      <h1>Algo deu errado</h1>
      <p>{error?.message ?? 'Erro desconhecido'}</p>
    </div>
  )
}
```

Adicione em rotas raiz e, se necessário, em rotas filhas críticas.

---

## 4. Rota 404

Use um catch-all `path: "*"` como último filho para rotas não encontradas.

```tsx
{
  path: '*',
  element: <NotFoundPage />,
}
```

---

## 5. Lazy loading

### Lazy de rotas

Use a propriedade `lazy` do `createBrowserRouter` ou `React.lazy` + `Suspense` para code splitting:

```tsx
// Opção 1: lazy no router
{
  path: 'course/:courseId',
  lazy: () => import('./pages/CoursePage'),
}

// Opção 2: React.lazy + Suspense
const CoursePage = lazy(() => import('./pages/CoursePage'))
// No element do layout:
<Suspense fallback={<Loading />}>
  <Outlet />
</Suspense>
```

---

## 6. Layout routes e Outlet

Rotas aninhadas usam `Outlet` para renderizar o conteúdo filho:

```tsx
function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

---

## 7. Navegação

### Link

Para links declarativos, use `Link`:

```tsx
<Link to="/course/react">Curso React</Link>
<Link to={`/course/${courseId}/lesson/${lessonId}`}>Lição</Link>
```

### useNavigate

Para navegação programática (após submit, timeout, etc.):

```tsx
const navigate = useNavigate()
navigate('/course/react')
navigate(-1) // voltar
```

### Navigate

Para redirecionamentos condicionais durante o render:

```tsx
if (!lesson) return <Navigate to="/" replace />
```

### useMatch

Para verificar se a rota atual corresponde a um padrão (evitar `pathname.includes`):

```tsx
const courseMatch = useMatch('/course/:courseId/*')
const showSidebar = !!courseMatch
```

---

## 8. Parâmetros e dados

### useParams

Acesse parâmetros dinâmicos da URL:

```tsx
const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
```

### Loaders (opcional)

Para dados que devem ser carregados antes do render, use `loader`:

```tsx
export async function loader({ params }) {
  const course = await getCourse(params.courseId)
  return { course }
}

// No componente
const { course } = useLoaderData()
```

Para dados estáticos ou síncronos (ex: JSON bundlado), loaders podem ser dispensados.

---

## 9. Resumo de checklist

| Item          | Descrição                                           |
| ------------- | --------------------------------------------------- |
| Imports       | Usar `react-router`                                 |
| errorElement  | Em rota raiz (e filhas críticas)                    |
| Rota 404      | `path: "*"` como último filho                       |
| Lazy loading  | Para CoursePage e LessonPage                        |
| useMatch      | Em vez de `pathname.includes` para detecção de rota |
| Link + Button | Usar `Button asChild` com `Link` dentro             |

---

## Referências

- [React Router — Start](https://reactrouter.com/start)
- [React Router — Data Mode](https://reactrouter.com/start/modes)
- [React Router — Error Handling](https://reactrouter.com/route/error-element)
