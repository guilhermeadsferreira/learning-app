# Roteiro Completo: Curso React — Do Iniciante ao Avançado

> Baseado em pesquisa de materiais atualizados (2024-2025), boas práticas da documentação oficial do React, e ecossistema moderno.

---

## Visão Geral

Este roteiro cobre **React** do zero até conceitos avançados, incluindo o ecossistema completo: Node.js, npm, Vite, Tailwind CSS, React Router, gerenciamento de estado, formulários, data fetching, testes e boas práticas.

**Duração estimada:** 3-6 meses de estudo consistente  
**Pré-requisitos:** HTML, CSS, JavaScript (ES6+), conceitos básicos de DOM

---

## Fase 0 — Ecossistema e Ferramentas

### Módulo 0: Node.js e npm
- **node-npm-intro** — O que é Node.js e npm
- **package-json** — Entendendo package.json e scripts
- **npm-install** — Instalando e gerenciando dependências

### Módulo 0.1: Vite e Setup
- **vite-intro** — Por que Vite (vs CRA)
- **criando-projeto** — Criando projeto React com Vite
- **estrutura-pastas** — Estrutura de pastas em projetos React

---

## Fase 1 — Fundamentos do React

### Módulo 1: Introdução
- **what-is-react** — O que é React
- **jsx** — JSX: sintaxe e regras
- **jsx-expressoes** — Expressões e interpolação no JSX

### Módulo 2: Componentes
- **components** — Componentes funcionais
- **props** — Props: passando dados
- **props-children** — Props children e composição
- **component-composition** — Composição de componentes
- **component-best-practices** — Boas práticas: componentes pequenos e focados

### Módulo 3: Estado e Interatividade
- **use-state** — useState
- **events** — Eventos em React
- **controlled-uncontrolled** — Controlled vs Uncontrolled
- **forms-basic** — Formulários básicos

---

## Fase 2 — Hooks e Efeitos

### Módulo 4: useEffect
- **use-effect-intro** — O que é useEffect
- **use-effect-dependencies** — Array de dependências
- **use-effect-cleanup** — Cleanup e subscriptions

### Módulo 5: Hooks Avançados
- **use-ref** — useRef: referências e valores mutáveis
- **use-context** — useContext: estado global simples
- **use-reducer** — useReducer: estado complexo
- **use-memo-callback** — useMemo e useCallback: quando usar

### Módulo 6: Custom Hooks
- **custom-hooks-intro** — O que são custom hooks
- **custom-hooks-criando** — Criando seu primeiro custom hook
- **custom-hooks-padroes** — Padrões: useFetch, useLocalStorage
- **custom-hooks-boas-praticas** — Boas práticas de custom hooks

---

## Fase 3 — Estilização e Roteamento

### Módulo 7: Estilização
- **css-react** — CSS no React: abordagens
- **tailwind-intro** — Tailwind CSS: utilitários
- **tailwind-components** — Tailwind com componentes React
- **css-modules** — CSS Modules (opcional)

### Módulo 8: React Router
- **react-router-intro** — O que é React Router
- **rotas-basicas** — Rotas básicas e navegação
- **rotas-dinamicas** — Rotas dinâmicas e useParams
- **rotas-aninhadas** — Nested routes e Outlet
- **layout-routes** — Layout routes e proteção

---

## Fase 4 — Estado e Dados

### Módulo 9: Gerenciamento de Estado
- **context-api** — Context API em profundidade
- **context-best-practices** — Boas práticas do Context
- **estado-local-vs-global** — Quando usar estado local vs global

### Módulo 10: Formulários Avançados
- **react-hook-form** — React Hook Form
- **validacao-zod** — Validação com Zod
- **formularios-complexos** — Formulários dinâmicos e arrays

### Módulo 11: Data Fetching
- **fetch-api** — Fetch API e useEffect
- **loading-error-states** — Estados de loading e erro
- **tanstack-query** — TanStack Query (React Query)

---

## Fase 5 — Arquitetura e Boas Práticas

### Módulo 12: Código Limpo e Padrões
- **clean-code-react** — Código limpo em React
- **componentes-reutilizaveis** — Componentes reutilizáveis
- **compound-components** — Padrão Compound Components
- **render-props** — Render props e padrões de composição

### Módulo 13: Tratamento de Erros
- **error-boundaries** — Error Boundaries
- **error-handling** — Estratégias de error handling

### Módulo 14: Testes
- **testing-intro** — Por que testar
- **react-testing-library** — React Testing Library
- **testando-componentes** — Testando componentes
- **testando-hooks** — Testando custom hooks

### Módulo 15: Performance
- **react-memo** — React.memo
- **lazy-suspense** — Lazy loading e Suspense
- **code-splitting** — Code splitting
- **quando-otimizar** — Profile antes de otimizar

---

## Fase 6 — Avançado

### Módulo 16: TypeScript com React
- **typescript-intro** — TypeScript no React
- **tipos-props** — Tipando props e componentes
- **tipos-hooks** — Tipando hooks e eventos

### Módulo 17: React 19 e Futuro
- **react-19-actions** — Actions e useFormStatus
- **react-19-use** — use() hook
- **proximos-passos** — Next.js e ecossistema

---

## Referências e Fontes (2024-2025)

- [React Docs (beta.reactjs.org)](https://beta.reactjs.org) — Documentação oficial
- [React 19 Release](https://react.dev/blog/2024/12/05/react-19)
- [Vite](https://vitejs.dev) — Build tool recomendado
- [Tailwind CSS](https://tailwindcss.com)
- [React Router v6](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com)
- [React Testing Library](https://testing-library.com/react)
- FreeCodeCamp React Roadmap 2024
- Scaler React Roadmap 2026
- Kent C. Dodds — Epic React, compound components
- Documentação oficial: "The nine best recommendations"

---

## Boas Práticas Resumidas

### Componentes
- Componentes pequenos e com responsabilidade única
- Definir componentes no topo do arquivo (não dentro de outros)
- Preferir composição sobre herança

### Hooks
- Extrair lógica compartilhada em custom hooks
- Nomear custom hooks com prefixo `use`
- Evitar hooks gigantes; compor hooks pequenos

### Estado
- useState para estado local
- useReducer para lógica complexa
- Context para tema, auth, i18n
- Zustand/Redux para estado global complexo

### Performance
- **Não** usar useMemo/useCallback por padrão
- Otimizar apenas após identificar problema real
- React 19 Compiler reduz necessidade de memoização manual

### Código
- Nomes descritivos
- Evitar "magic numbers"
- Código autoexplicativo
- Testes que simulam uso real
