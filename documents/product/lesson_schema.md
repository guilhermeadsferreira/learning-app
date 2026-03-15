# LESSON_SCHEMA.md — Estrutura de Lições

Este documento define o formato padrão para lições da plataforma **Learning Engine**.

Todas as lições seguem o modelo pedagógico definido em [pedagogy.md](pedagogy.md).

O schema abaixo corresponde à implementação real em `src/engine/types.ts`.

---

## Tipos de lição

| Tipo        | Descrição                                 |
| ----------- | ----------------------------------------- |
| explanation | Lição conceitual com conteúdo estruturado |
| challenge   | Lição com desafio prático no Sandpack     |
| quiz        | Lição com perguntas de múltipla escolha   |

---

## Estrutura básica

Arquivo: `src/courses/{course-id}/lessons/{lesson-id}.json`

Exemplo completo:

```json
{
  "id": "use-state",
  "courseId": "react",
  "moduleId": "state",
  "title": "useState",
  "type": "challenge",
  "xp": 25,
  "difficulty": "beginner",
  "analogy": "Imagine uma lousa mágica. Você escreve um número nela (o estado). Quando apaga e escreve outro número, todo mundo que está olhando para a lousa vê a mudança instantaneamente.",
  "content": {
    "sections": [
      { "type": "heading", "content": "O que é useState?" },
      { "type": "paragraph", "content": "useState é o Hook mais básico e mais usado do React..." },
      { "type": "code", "content": "const [count, setCount] = useState(0);", "language": "jsx" },
      { "type": "list", "content": "Item 1\nItem 2\nItem 3" },
      {
        "type": "callout",
        "content": "O valor inicial do useState é usado APENAS na primeira renderização.",
        "variant": "info"
      }
    ]
  },
  "challenge": {
    "instructions": "Crie um contador que aumenta ao clicar em um botão.",
    "starterCode": "import { useState } from 'react';\n\nexport default function App() { ... }",
    "solution": "import { useState } from 'react';\n\nexport default function App() { ... }",
    "tests": [],
    "hint": "Use useState(0) para criar o estado.",
    "solutionExplanation": "Usamos useState(0) para inicializar o contador em zero."
  },
  "keyTakeaways": [
    "useState retorna [valor, setter] — sempre desestruture assim",
    "Chamar o setter dispara uma re-renderização do componente"
  ],
  "commonMistakes": [
    "Usar variável normal em vez de useState — a tela não atualiza",
    "Modificar o estado diretamente — React não detecta a mudança"
  ],
  "realWorldExample": "Em um e-commerce, o estado controla quantos itens estão no carrinho.",
  "encouragement": "useState é o hook que você mais vai usar na vida."
}
```

---

## Campos da lição

| Campo            | Tipo            | Obrigatório | Descrição                                                           |
| ---------------- | --------------- | ----------- | ------------------------------------------------------------------- |
| id               | string          | Sim         | Identificador único (igual ao nome do arquivo sem .json)            |
| courseId         | string          | Sim         | ID do curso ao qual pertence                                        |
| moduleId         | string          | Sim         | ID do módulo ao qual pertence                                       |
| title            | string          | Sim         | Título da lição                                                     |
| type             | LessonType      | Sim         | `explanation`, `challenge`, ou `quiz`                               |
| xp               | number          | Sim         | Pontos de experiência (10 para explanation/quiz, 25 para challenge) |
| difficulty       | DifficultyLevel | Não         | `beginner`, `intermediate`, ou `advanced`                           |
| analogy          | string          | Não         | Analogia para facilitar compreensão                                 |
| content          | LessonContent   | Sim         | Conteúdo estruturado em seções                                      |
| challenge        | Challenge       | Não\*       | Desafio prático (\*obrigatório se type=challenge)                   |
| quiz             | QuizQuestion[]  | Não\*       | Perguntas (\*obrigatório se type=quiz)                              |
| keyTakeaways     | string[]        | Não         | Pontos-chave para lembrar                                           |
| commonMistakes   | string[]        | Não         | Erros comuns a evitar                                               |
| realWorldExample | string          | Não         | Exemplo do mundo real                                               |
| encouragement    | string          | Não         | Mensagem motivacional                                               |

---

## ContentSection

O conteúdo da lição é estruturado em seções. Cada seção tem `type` e `content`.

| Tipo      | Campos extras                         | Descrição                                   |
| --------- | ------------------------------------- | ------------------------------------------- |
| heading   | —                                     | Título de seção                             |
| paragraph | —                                     | Texto corrido                               |
| code      | language?                             | Bloco de código (ex: `jsx`, `javascript`)   |
| list      | —                                     | Lista (itens separados por `\n`)            |
| callout   | variant: `tip` \| `warning` \| `info` | Destaque visual (dica, atenção, informação) |

---

## Challenge

Desafio prático com editor Sandpack. Obrigatório quando `type` é `challenge`.

| Campo                | Tipo                  | Obrigatório | Descrição                                                          |
| -------------------- | --------------------- | ----------- | ------------------------------------------------------------------ |
| instructions         | string                | Sim         | O que o aluno deve fazer                                           |
| starterCode          | string                | Sim         | Código inicial no editor                                           |
| solution             | string                | Sim         | Solução de referência (usada pela IA para revisão)                 |
| tests                | TestCase[]            | Sim         | Array de testes (pode ser vazio `[]`)                              |
| hint                 | string                | Não         | Dica para o aluno                                                  |
| solutionExplanation  | string                | Não         | Explicação da solução                                              |
| sandpackDependencies | Record<string,string> | Não         | Dependências extras do Sandpack (ex: `{"react-router-dom": "^6"}`) |

---

## TestCase

| Campo       | Tipo   | Descrição                     |
| ----------- | ------ | ----------------------------- |
| input       | string | Entrada (opcional)            |
| expected    | string | Saída esperada                |
| description | string | Descrição do teste (opcional) |

---

## QuizQuestion

Para lições tipo `quiz`. Cada pergunta tem opções com `isCorrect` por item.

| Campo    | Tipo         | Descrição          |
| -------- | ------------ | ------------------ |
| question | string       | Pergunta           |
| options  | QuizOption[] | Opções de resposta |

---

## QuizOption

| Campo       | Tipo    | Descrição                                     |
| ----------- | ------- | --------------------------------------------- |
| id          | string  | Identificador único da opção                  |
| text        | string  | Texto da opção                                |
| isCorrect   | boolean | Se é a resposta correta                       |
| explanation | string  | Explicação (opcional, exibida após responder) |

---

## Boas práticas

- Explicações curtas (máx. 6 linhas por parágrafo)
- Analogias concretas conectando com conhecimento prévio
- Toda lição `challenge` deve ter `hint` e `solutionExplanation`
- Usar `keyTakeaways` para reforçar conceitos
- Usar `commonMistakes` em lições de prática
- Usar `realWorldExample` para contextualizar
- XP: 10 para explanation/quiz, 25 para challenge
