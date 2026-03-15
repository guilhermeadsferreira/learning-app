# COURSE_SCHEMA.md — Estrutura de Curso

Este documento define o formato padrão para cursos da plataforma.

Cursos são definidos como **conteúdo declarativo**.

Isso permite adicionar novos cursos sem alterar o código da aplicação.

---

# Estrutura de diretórios

```
courses/
  course-id/
    course.json
    modules/
      module-id.json
    lessons/
      lesson-id.json
```

---

# course.json

Define metadados do curso.

Exemplo:

```json
{
  "id": "react-fundamentals",
  "title": "React Fundamentals",
  "description": "Aprenda os fundamentos do React através de lições curtas e desafios práticos.",
  "difficulty": "beginner",
  "estimatedDuration": "4 hours",
  "modules": [
    "intro",
    "components",
    "state"
  ]
}
```

---

# module schema

Arquivo: modules/module-id.json

Exemplo:

```json
{
  "id": "components",
  "title": "Componentes",
  "description": "Aprenda como criar e usar componentes em React.",
  "lessons": [
    "components-intro",
    "props",
    "composition"
  ]
}
```

---

# Estrutura de módulos

Cada módulo deve conter:

* introdução
* conceitos
* exercícios
* desafio
* mini projeto

---

# Campos padrão

Curso:

* id
* title
* description
* difficulty
* estimatedDuration
* modules

Módulo:

* id
* title
* description
* lessons

---

# Boas práticas

Cursos devem:

* começar simples
* evoluir gradualmente
* incluir exercícios frequentes
* terminar módulos com mini projetos

---

# Exemplo de curso

```
react-fundamentals
  intro
    - what-is-react
    - jsx
  components
    - components-intro
    - props
  state
    - usestate
    - events
```
