# PRD — Learning Engine (Plataforma de Estudo Gamificado)

## 1. Nome provisório do projeto

**Learning Engine** (nome temporário)

A aplicação será uma **plataforma web de estudo assistido e gamificado**, inicialmente focada em programação.

O primeiro curso será **React Fundamentals**, mas a arquitetura deve permitir múltiplos cursos no futuro.

---

# 2. Objetivo do Produto

Criar uma experiência de estudo que:

- aumente engajamento
- reduza frustração ao aprender frameworks novos
- incentive prática ativa
- facilite revisão de conceitos
- permita progresso claro

A plataforma deve combinar:

- microlearning
- prática guiada
- gamificação leve
- revisão estruturada
- progresso visual

---

# 3. Público-alvo

Pessoas que querem evoluir na programação. A plataforma apoia os estudos com metodologias que favorecem retenção, percepção de evolução e prazer no aprendizado.

---

# 4. Problema que queremos resolver

Estudar frameworks novos costuma gerar:

- excesso de teoria
- pouca prática guiada
- dificuldade de retenção
- sensação de complexidade
- baixa motivação para continuar estudando

A plataforma deve tornar o aprendizado:

- progressivo
- visual
- prático
- motivador

---

# 5. Proposta de valor

O usuário deve sentir que:

- cada lição é pequena e possível
- está sempre avançando
- pode revisar facilmente
- não está “perdido” no conteúdo

---

# 6. Princípios pedagógicos

A plataforma será baseada em:

### Microlearning

Lições curtas e objetivas.

### Active Recall

O usuário precisa recuperar a informação ativamente.

### Prática ativa

Resolver exercícios e escrever código.

### Revisão

Revisitar conceitos e exercícios anteriores.

### Progressão gradual

Dificuldade crescente.

### Analogias

Conectar novos conceitos com conhecimentos prévios.

---

# 7. Escopo do MVP

O MVP foi superado. O projeto evoluiu além do escopo inicial e hoje inclui 16 módulos, 65 lições, sistema de IA (Professor IA) e gamificação completa. As funcionalidades abaixo representam o estado atual.

## 7.1 Funcionalidades

### Cursos

Listagem de cursos disponíveis na home, com busca por palavra-chave (título e descrição) e filtragem por tags de área (programação, frontend, IA, ferramentas, etc.). Cada curso exibe ícone, título, descrição e badges de tags.

### Módulos

Agrupamento de lições.

### Lições

Tipos iniciais de lição:

- explicação curta
- desafio de código
- quiz simples

### Progresso

Usuário deve visualizar:

- progresso do curso
- lição atual
- próximas lições

### Gamificação básica

- XP por lição
- barra de progresso

### Revisão

Usuário pode reabrir lições anteriores.

---

# 8. Curso inicial

## Curso

**React: Do Iniciante ao Avançado**

### Estrutura atual (16 módulos, 65 lições)

1. Ecossistema e Ferramentas (Node, npm, Vite, estrutura)
2. Introdução ao React (o que é React, JSX)
3. Componentes (props, children, composição, boas práticas)
4. Estado e Interatividade (useState, eventos, controlled/uncontrolled, formulários)
5. useEffect e Efeitos
6. Hooks Avançados (useRef, useContext, useReducer, useMemo/useCallback)
7. Custom Hooks
8. Estilização com Tailwind CSS
9. React Router
10. Gerenciamento de Estado (Context API)
11. Formulários Avançados (react-hook-form, Zod)
12. Data Fetching (fetch, TanStack Query)
13. Padrões e Boas Práticas
14. Testes
15. Performance
16. Avançado (TypeScript, React 19)

---

# 9. Experiência do usuário

A tela principal de lição deve conter:

## Header

- nome do curso
- XP
- progresso

## Sidebar

- módulos
- lições

## Área principal

- título da lição
- analogia
- explicação
- desafio
- editor de código
- preview
- feedback

## Rodapé

- dica
- revisar
- próxima lição

---

# 10. Stack tecnológica

## Frontend

- React
- Vite
- TypeScript

## UI

- TailwindCSS
- shadcn/ui

## Editor

- Sandpack

## Persistência

- localStorage (progresso e XP do usuário)

---

# 11. Estrutura de conteúdo

Cursos devem ser definidos como **conteúdo declarativo**, permitindo reuso da plataforma.

Exemplo de estrutura:

```
courses/
  react/
    course.json
    lessons/
      jsx.json
      props.json
      useState.json
```

Isso permitirá criar novos cursos sem alterar o código da aplicação.

---

# 12. Arquitetura conceitual

```
src/
├── components/     → editor, gamification, layout, lesson, ui
├── courses/        → conteúdo declarativo (course.json, lessons/*.json)
├── engine/         → types, progress, xp
├── hooks/          → useCourse, useLesson, useProgress
├── lib/            → utils
├── pages/          → HomePage, CoursePage, LessonPage
├── services/       → ai-review (Claude, OpenAI)
└── styles/         → globals.css
```

Descrição:

- **courses** → conteúdo dos cursos em JSON
- **components** → editor (Sandpack), gamification (XP, progress bar), layout (AppShell, Header, Sidebar), lesson (ChallengeCard, FeedbackCard, AIReviewCard)
- **engine** → tipos TypeScript, persistência de progresso, sistema de XP
- **hooks** → acesso a curso, lição e progresso
- **pages** → rotas da aplicação
- **services** → integração com APIs de IA (revisão de código, chat)

---

# 13. Critérios de sucesso do MVP

Sinais positivos incluem:

- completar um módulo inteiro
- facilidade em continuar estudando
- compreensão dos conceitos básicos de React
- sensação clara de progresso

---

# 14. Fora de escopo (por enquanto)

Não fazem parte do escopo atual:

- multiplayer
- ranking global
- marketplace de cursos
- aplicativo mobile
- analytics complexos

---

# 15. Evoluções futuras (pós-MVP)

Possíveis evoluções da plataforma:

- sistema de revisão automática (spaced repetition)
- analytics de aprendizado
- novos cursos (TypeScript, Next.js, Node, Docker)
- sistema de conquistas e níveis
- trilhas personalizadas
- modo multiplayer ou comunidade

**Já implementado:** IA tutor (Professor IA) — revisão de código e chat com Claude/OpenAI.

---

# 15.1 Sistema de IA (Professor IA)

Implementado. Permite:

- **Revisão de código**: o aluno envia seu código e recebe feedback estruturado (feedback, isCorrect, encouragement, suggestions, nextStepHint)
- **Chat**: tirar dúvidas durante desafios
- **Providers**: Claude (Anthropic) e OpenAI, com troca dinâmica
- **API Key**: armazenada localmente no navegador

---

# 15.2 Sistema de XP

Implementado. Valores por tipo de lição:

- **explanation** / **quiz**: 10 XP
- **challenge**: 25 XP

Progresso persistido em localStorage.

---

# 16. Próximos passos

O projeto está além do MVP. Os itens abaixo representam melhorias pedagógicas e técnicas identificadas como prioritárias:

### Pedagógico

1. Criar lições do tipo `quiz` intercaladas no curso React (retrieval practice)
2. Adicionar mini projetos ao final dos módulos principais
3. Adicionar campo `hook` às lições (pergunta provocativa antes da analogia)
4. Converter algumas lições `explanation` em `challenge` (aumentar % de prática ativa)
5. Popular o campo `tests[]` nos challenges para validação automática

### Técnico

6. Implementar desbloqueio progressivo de lições (Mastery Learning)
7. Implementar sistema de revisão com spaced repetition
8. Adicionar classificação de tipo de desafio (`challengeType`) ao schema
9. Novos cursos (Python, TypeScript, Next.js, Node.js, Docker)
10. Analytics de progresso e aprendizado
