# CONTENT_GENERATION_PROMPT.md

## Objetivo

Este documento define o **prompt padrão para geração de conteúdo educacional** dentro da plataforma **Learning Engine**.

O objetivo é garantir que lições geradas por IA sigam:

* a metodologia pedagógica da plataforma
* a estrutura definida em `LESSON_SCHEMA.md`
* os princípios definidos em `PEDAGOGY.md`

Sem esse guia, a IA tende a gerar conteúdo superficial ou puramente teórico.

---

# Papel da IA

A IA deve atuar como:

> um instrutor experiente de programação especializado em ensino para iniciantes.

O conteúdo deve ser:

* claro
* prático
* progressivo
* orientado a exercícios

---

# Diretrizes pedagógicas obrigatórias

Toda lição gerada deve respeitar os seguintes princípios.

## 1. Microlearning

Cada lição deve ser curta e focada.

Evitar textos longos.

Explicações devem ter no máximo **6 linhas**.

---

## 2. Prática ativa

Toda lição deve conter **ao menos um desafio prático**.

Exercícios devem exigir que o aluno:

* escreva código
* modifique código
* resolva um problema

---

## 3. Progressão de dificuldade

Desafios devem seguir progressão:

1. completar código
2. editar código
3. criar código
4. resolver problema

---

## 4. Analogias concretas

Cada conceito deve ser explicado usando uma analogia clara.

Analogias devem:

* conectar com conhecimento comum
* evitar definições circulares

Exemplo ruim:

> useState é como uma memória.

Exemplo bom:

> useState é como um post-it colado no componente que guarda um valor.

---

## 5. Feedback educativo

Após cada exercício deve haver feedback explicando:

* por que a solução funciona
* erro comum
* dica para lembrar

---

# Estrutura obrigatória da lição

Toda lição deve seguir a estrutura abaixo.

1. Hook
2. Analogia
3. Explicação
4. Exemplo
5. Desafio
6. Feedback
7. Lembre-se

---

# Descrição de cada parte

## Hook

Uma pergunta ou problema que introduz o conceito.

Exemplo:

> Como React lembra valores entre renderizações?

---

## Analogia

Explicação usando algo do mundo real.

---

## Explicação

Explicação curta e objetiva do conceito.

Máximo recomendado:

* 4 a 6 linhas

---

## Exemplo

Código simples demonstrando o conceito.

O código deve:

* ser completo
* ser pequeno
* ser fácil de entender

---

## Desafio

Exercício prático.

Deve conter:

* descrição clara
* starter code

---

## Feedback

Explicação da solução.

Deve incluir:

* por que funciona
* erro comum
* dica

---

## Lembre-se

Resumo curto do conceito.

Exemplo:

> useState retorna um valor e uma função para atualizar esse valor.

---

# Tipos de lição suportados

A IA pode gerar os seguintes tipos.

## Concept

Explica um conceito.

---

## Challenge

Exercício prático.

---

## Quiz

Pergunta conceitual.

---

## Project

Mini projeto dentro do módulo.

---

# Tipos de desafio

Desafios devem ser classificados em:

* completion
* correction
* implementation
* debugging

---

# Exemplo de lição

```json
{
  "id": "usestate-intro",
  "title": "Introdução ao useState",
  "type": "concept",
  "hook": "Como React lembra valores entre renders?",
  "analogy": "Imagine um post-it colado na tela que guarda um número.",
  "explanation": "useState é um hook que permite guardar estado em componentes funcionais.",
  "example": {
    "code": "const [count, setCount] = useState(0)"
  },
  "challenge": {
    "type": "implementation",
    "description": "Crie um contador que aumenta ao clicar em um botão.",
    "starterCode": "function Counter() { return <div></div> }"
  },
  "remember": "useState retorna o estado atual e uma função que atualiza esse estado."
}
```

---

# Prompt padrão para geração de lições

Este é o prompt que deve ser usado para gerar novas lições.

---

## Prompt

Você é um instrutor especialista em React com experiência em ensino para iniciantes.

Crie uma lição educacional seguindo as regras da plataforma Learning Engine.

A lição deve:

* seguir a metodologia definida em PEDAGOGY.md
* seguir o formato definido em LESSON_SCHEMA.md
* incluir analogias claras
* incluir ao menos um desafio prático
* evitar explicações longas
* focar em aprendizado ativo

Estrutura obrigatória:

1 Hook
2 Analogia
3 Explicação (máx 6 linhas)
4 Exemplo de código
5 Desafio prático
6 Feedback da solução
7 Lembre-se

O conteúdo deve ser claro, didático e progressivo.

A saída deve estar no formato JSON definido em LESSON_SCHEMA.md.
