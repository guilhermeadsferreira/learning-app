# LESSON_SCHEMA.md — Estrutura de Lições

Este documento define o formato padrão para lições.

Todas as lições seguem o modelo pedagógico definido em PEDAGOGY.md.

---

# Estrutura básica

Arquivo:

```
lessons/lesson-id.json
```

Exemplo:

```json
{
  "id": "usestate-intro",
  "title": "Introdução ao useState",
  "type": "concept",
  "hook": "Como React lembra valores entre renders?",
  "analogy": "Imagine um post-it colado na tela que guarda um valor.",
  "explanation": "useState é um hook que permite guardar estado em um componente funcional.",
  "example": {
    "code": "const [count, setCount] = useState(0)"
  },
  "challenge": {
    "type": "implementation",
    "description": "Crie um contador que aumenta ao clicar em um botão.",
    "starterCode": "function Counter() { return <div></div> }"
  },
  "remember": "useState retorna o estado atual e uma função para atualizá-lo."
}
```

---

# Campos principais

## id

Identificador único da lição.

---

## title

Título da lição.

---

## type

Tipos possíveis:

* concept
* challenge
* quiz
* project

---

## hook

Pergunta ou contexto que introduz o conceito.

---

## analogy

Analogia para facilitar compreensão.

---

## explanation

Explicação curta do conceito.

Máximo recomendado: 6 linhas.

---

## example

Código demonstrando o conceito.

---

## challenge

Exercício prático.

Campos:

* type
* description
* starterCode

---

## remember

Resumo curto do conceito.

---

# Tipos de desafio

## completion

Completar código.

---

## correction

Corrigir erro.

---

## implementation

Implementar código.

---

## debugging

Encontrar bug.

---

# Exemplo de quiz

```json
{
  "type": "quiz",
  "question": "O que useState retorna?",
  "options": [
    "Um valor",
    "Um array com estado e função",
    "Uma função",
    "Um objeto"
  ],
  "correct": 1
}
```

---

# Boas práticas

* explicações curtas
* analogias claras
* exemplos reais
* desafios frequentes
* progressão de dificuldade
