# Nova Home — Catálogo de Cursos com Busca e Tags

**Status:** concluído

---

## Objetivo

Redesenhar a HomePage para funcionar como um **catálogo de cursos** completo, com busca por palavra-chave, filtragem por tags de área (programação, ferramentas, IA, etc.) e uma experiência visual moderna que escale conforme novos cursos forem adicionados.

## Contexto

A HomePage atual (`src/pages/HomePage.tsx`) é minimalista: lista todos os cursos via `getAllCourses()` em um grid de cards com ícone, título, descrição e botão "Começar". Não há nenhum sistema de busca, categorização ou filtragem.

Com o crescimento do catálogo (hoje: React, Claude Code; futuros: TypeScript, Git, Node, etc.), a listagem plana se torna insuficiente. O usuário precisa encontrar cursos rapidamente, explorar por área de interesse e ter uma visão clara do que está disponível.

### Estado atual

- **`Course` type** (`src/engine/types.ts`): não possui campo `tags`
- **`course.json`**: não possui metadados de categorização
- **`src/courses/index.ts`**: API simples — `getAllCourses()`, `getCourse()`, `getLesson()`
- **HomePage**: grid direto sem busca ou filtro
- **PRD** (`documents/product/prd.md` §7.1): menciona "Listagem de cursos disponíveis" sem detalhamento

### Referências de UX

- **Codecademy Catalog**: grid com filtros laterais por área, linguagem, nível
- **Duolingo**: cards com progresso visual e categorias
- **Coursera Browse**: busca + tags + cards informativos

A solução deve manter o visual dark mode, limpo e moderno já estabelecido no projeto, usando Tailwind + shadcn/ui.

## Escopo

### Etapa 1 — Adicionar `tags` ao tipo `Course`

Adicionar campo `tags` ao tipo `Course` em `src/engine/types.ts`:

```ts
export interface Course {
  id: string
  title: string
  description: string
  icon: string
  tags: string[] // ex: ["programação", "frontend", "react"]
  modules: Module[]
  aiReviewContext?: AIReviewContext
}
```

**Critérios de sucesso:**

- Campo `tags` é `string[]` e obrigatório
- Todos os `course.json` existentes são atualizados com tags relevantes
- Documentação atualizada: `course_schema.md`, `content_generation.md`

**Decisão:** Tags como strings livres (flexível) vs. enum centralizado (consistente). Recomendação: strings livres agora, centralizar depois se necessário.

---

### Etapa 2 — Expandir a API de cursos

Adicionar funções utilitárias em `src/courses/index.ts`:

- `getAllTags(): string[]` — retorna todas as tags únicas dos cursos
- `getCoursesByTag(tag: string): Course[]` — filtra cursos por tag
- `searchCourses(query: string): Course[]` — busca por título e descrição (case-insensitive, substring match)

**Critérios de sucesso:**

- Funções são puras e reutilizáveis
- Busca é case-insensitive e remove acentos (normalização)

---

### Etapa 3 — Componentes da nova Home

Criar/refatorar componentes para a nova HomePage:

#### 3.1 — Hero Section

- Título e subtítulo da plataforma
- Campo de busca com ícone (input controlado)
- Visual atrativo, sem ser exagerado

#### 3.2 — Tag Filter Bar

- Chips/botões horizontais com as tags disponíveis
- "Todos" como opção padrão (sem filtro)
- Seleção de tag filtra os cursos exibidos
- Visual: chips com cores sutis, estado ativo destacado

#### 3.3 — Course Grid (refatorado)

- Cards de curso com: ícone, título, descrição, tags (badges), botão de ação
- Layout responsivo: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Estado vazio: mensagem amigável quando busca/filtro não retorna resultados

#### 3.4 — Contagem de resultados

- Exibir "X cursos encontrados" quando há filtro/busca ativa

**Critérios de sucesso:**

- Busca e filtro por tag funcionam em conjunto (AND)
- Transições suaves ao filtrar
- Responsivo e acessível
- Usa componentes shadcn/ui existentes (Input, Badge, Card, Button)

---

### Etapa 4 — Lógica de estado na HomePage

Gerenciar estado local na HomePage com hooks:

- `useState` para `searchQuery` e `selectedTag`
- `useMemo` para filtrar cursos combinando busca + tag
- Debounce opcional na busca (se performance for um problema, improvável com poucos cursos)

**Critérios de sucesso:**

- Filtro é reativo e instantâneo
- Limpar busca/tag restaura lista completa
- URL não precisa refletir filtros (estado local é suficiente por agora)

---

### Etapa 5 — Atualizar documentação

- `documents/product/prd.md` §7.1: detalhar funcionalidades de busca e filtragem na home
- `documents/product/course_schema.md`: documentar campo `tags`
- `documents/product/content_generation.md`: incluir `tags` nos exemplos JSON

**Critérios de sucesso:**

- Docs refletem o estado implementado
- Nenhuma feature aspiracional descrita como implementada

---

## Questões a responder

- As tags devem ser pré-definidas em algum arquivo central ou livres no `course.json`?
- Deve haver suporte a múltiplas tags selecionadas simultaneamente (OR) ou apenas uma tag por vez?
- Incluir indicador de progresso do usuário nos cards da home? (pode ser escopo futuro)
- A busca deve incluir tags no matching ou apenas título/descrição?

## Entregável

- HomePage redesenhada com busca por palavra-chave e filtragem por tags
- Tipo `Course` estendido com campo `tags`
- Todos os `course.json` atualizados com tags
- API de cursos expandida com busca e filtragem
- Documentação sincronizada
