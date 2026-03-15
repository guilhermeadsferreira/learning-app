# PRD — Learning Engine (Plataforma de Estudo Gamificado)

## 1. Nome provisório do projeto

**Learning Engine** (nome temporário)

A aplicação será uma **plataforma web de estudo assistido e gamificado**, inicialmente focada em programação.

O primeiro curso será **React Fundamentals**, mas a arquitetura deve permitir múltiplos cursos no futuro.

---

# 2. Objetivo do Produto

Criar uma experiência de estudo que:

* aumente engajamento
* reduza frustração ao aprender frameworks novos
* incentive prática ativa
* facilite revisão de conceitos
* permita progresso claro

A plataforma deve combinar:

* microlearning
* prática guiada
* gamificação leve
* revisão estruturada
* progresso visual

---

# 3. Público-alvo inicial

Desenvolvedores que já possuem base em:

* HTML
* CSS
* JavaScript
* PHP

Mas que estão migrando para frameworks modernos como React.

---

# 4. Problema que queremos resolver

Estudar frameworks novos costuma gerar:

* excesso de teoria
* pouca prática guiada
* dificuldade de retenção
* sensação de complexidade
* baixa motivação para continuar estudando

A plataforma deve tornar o aprendizado:

* progressivo
* visual
* prático
* motivador

---

# 5. Proposta de valor

O usuário deve sentir que:

* cada lição é pequena e possível
* está sempre avançando
* pode revisar facilmente
* não está “perdido” no conteúdo

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

O MVP precisa validar a ideia, então será **deliberadamente pequeno**.

## 7.1 Funcionalidades

### Cursos

Listagem de cursos disponíveis.

### Módulos

Agrupamento de lições.

### Lições

Tipos iniciais de lição:

* explicação curta
* desafio de código
* quiz simples

### Progresso

Usuário deve visualizar:

* progresso do curso
* lição atual
* próximas lições

### Gamificação básica

* XP por lição
* barra de progresso

### Revisão

Usuário pode reabrir lições anteriores.

---

# 8. Curso inicial

## Curso

**React Fundamentals**

### Estrutura inicial

#### Módulo 1 — Introdução

* O que é React
* JSX

#### Módulo 2 — Componentes

* Componentes
* Props

#### Módulo 3 — Estado

* useState
* eventos

---

# 9. Experiência do usuário

A tela principal de lição deve conter:

## Header

* nome do curso
* XP
* progresso

## Sidebar

* módulos
* lições

## Área principal

* título da lição
* analogia
* explicação
* desafio
* editor de código
* preview
* feedback

## Rodapé

* dica
* revisar
* próxima lição

---

# 10. Stack tecnológica

## Frontend

* React
* Vite
* TypeScript

## UI

* TailwindCSS
* shadcn/ui

## Editor

* Sandpack ou Monaco Editor

## Persistência (planejado)

* Supabase

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
learning-engine
│
├ courses
│
├ components
│
├ engine
│
├ pages
│
└ services
```

Descrição:

* **courses** → conteúdo dos cursos
* **components** → componentes reutilizáveis
* **engine** → lógica de execução das lições
* **pages** → páginas da aplicação
* **services** → integração com APIs e persistência

---

# 13. Critérios de sucesso do MVP

Sinais positivos incluem:

* completar um módulo inteiro
* facilidade em continuar estudando
* compreensão dos conceitos básicos de React
* sensação clara de progresso

---

# 14. Fora de escopo (por enquanto)

Não fazem parte do MVP inicial:

* multiplayer
* ranking global
* marketplace de cursos
* aplicativo mobile
* IA tutor avançado
* analytics complexos

---

# 15. Evoluções futuras (pós-MVP)

Possíveis evoluções da plataforma:

* sistema de revisão automática (spaced repetition)
* IA tutor para ajudar em exercícios
* analytics de aprendizado
* novos cursos (TypeScript, Next.js, Node, Docker)
* sistema de conquistas e níveis
* trilhas personalizadas
* modo multiplayer ou comunidade

---

# 16. Próximos passos

1. Criar scaffold inicial do projeto
2. Implementar layout base da aplicação
3. Criar estrutura declarativa de cursos
4. Implementar primeira tela de lição
5. Criar primeiras lições do curso React
6. Implementar sistema básico de progresso
7. Testar experiência de estudo
8. Iterar no design e na pedagogia
