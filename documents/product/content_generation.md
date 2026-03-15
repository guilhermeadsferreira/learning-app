# CONTENT_GENERATION.md

## Objetivo

Este documento define o **prompt padrão para geração de conteúdo educacional** dentro da plataforma **Learning Engine**.

O objetivo é garantir que lições geradas por IA sigam:

* a metodologia pedagógica da plataforma ([pedagogy.md](pedagogy.md))
* a estrutura definida em [lesson_schema.md](lesson_schema.md)
* os princípios definidos neste documento

Sem esse guia, a IA tende a gerar conteúdo superficial ou incompatível com o sistema.

---

## Papel da IA

A IA deve atuar como:

> um instrutor experiente **na área do curso**, especializado em ensino para pessoas que querem evoluir naquele domínio.

O conteúdo deve ser:

* claro
* prático
* progressivo
* orientado a exercícios

A área pode ser: **programação**, **gestão**, **ferramentas**, **soft skills** ou qualquer outro domínio de conhecimento.

---

## Tipos de área e adaptação do conteúdo

### Programação

* **Papel**: instrutor de programação (React, Python, SQL, etc.)
* **Prática ativa**: lições `challenge` com código no Sandpack
* **Challenge**: obrigatório `starterCode`, `solution`, `tests`
* **ContentSection**: usar `code` com `language` apropriado (jsx, python, sql, etc.)

### Gestão / Negócios

* **Papel**: instrutor de gestão, metodologias, frameworks de trabalho
* **Prática ativa**: lições `explanation` + `quiz` (análise, decisão, conceitos)
* **Challenge**: não usar — o Sandpack é voltado a código
* **ContentSection**: priorizar `heading`, `paragraph`, `list`, `callout`; `code` apenas se houver exemplos (ex: fórmulas em planilha)

### Ferramentas (uso de software)

* **Papel**: instrutor de uso de ferramentas (Figma, Notion, AWS Console, etc.)
* **Prática ativa**: lições `explanation` + `quiz` (passo-a-passo, checklist)
* **Challenge**: não usar — o Sandpack é voltado a código
* **ContentSection**: usar `list` para passos numerados, `callout` para dicas e avisos

### Outros domínios

* Adaptar o papel ao domínio
* Preferir `explanation` + `quiz` quando não houver código
* Manter microlearning, analogias e feedback educativo

---

## Diretrizes pedagógicas obrigatórias

### 1. Microlearning

Cada lição deve ser curta e focada. Explicações devem ter no máximo **6 linhas** por parágrafo.

### 2. Prática ativa

* **Programação**: lições `challenge` exigem que o aluno escreva, modifique ou corrija código.
* **Outras áreas**: lições `quiz` exigem que o aluno analise, escolha ou raciocine sobre o conceito.

### 3. Analogias concretas

Cada conceito deve ter uma analogia conectando com conhecimento comum (mundo real, conceitos familiares).

Exemplo bom (programação):

> useState é como um post-it colado no componente que guarda um valor.

Exemplo bom (gestão):

> Um backlog é como uma lista de compras: você prioriza o que precisa primeiro e pode adicionar itens conforme surgem necessidades.

Exemplo ruim:

> useState é como uma memória.

### 4. Feedback educativo

Para lições com desafio ou quiz, incluir `solutionExplanation` (quando aplicável), `commonMistakes` e `keyTakeaways`.

---

## Formato JSON obrigatório

A saída deve seguir **exatamente** o schema em [lesson_schema.md](lesson_schema.md).

### Campos obrigatórios em toda lição

| Campo | Descrição |
|-------|-----------|
| id | Identificador único (kebab-case, ex: `use-state`, `backlog-priorizacao`) |
| courseId | ID do curso (ex: `react`, `gestao-agil`) |
| moduleId | ID do módulo ao qual pertence |
| title | Título da lição |
| type | `explanation`, `challenge` ou `quiz` |
| xp | 10 para explanation/quiz, 25 para challenge |
| content | Objeto com `sections` (array de ContentSection) |

### ContentSection — tipos suportados

| type | Campos | Uso |
|------|--------|-----|
| heading | content | Título de seção |
| paragraph | content | Texto corrido |
| code | content, language? | Bloco de código |
| list | content | Lista (itens separados por `\n`) |
| callout | content, variant: tip\|warning\|info | Destaque visual |

### Campos recomendados (pedagogicamente ricos)

| Campo | Descrição |
|-------|-----------|
| analogy | Analogia concreta para o conceito |
| keyTakeaways | Array de 2–4 pontos-chave |
| commonMistakes | Array de erros comuns (especialmente em challenges) |
| realWorldExample | Exemplo de uso no mundo real |
| encouragement | Mensagem motivacional curta |
| difficulty | `beginner`, `intermediate` ou `advanced` |

### Para lições tipo `challenge` (apenas programação)

| Campo | Obrigatório | Descrição |
|-------|------------|-----------|
| instructions | Sim | O que o aluno deve fazer |
| starterCode | Sim | Código inicial completo (incluir imports) |
| solution | Sim | Solução de referência |
| tests | Sim | Array (pode ser `[]`) |
| hint | Recomendado | Dica para o aluno |
| solutionExplanation | Recomendado | Explicação da solução |

### Para lições tipo `quiz` (qualquer área)

| Campo | Obrigatório | Descrição |
|-------|------------|-----------|
| quiz | Sim | Array de QuizQuestion |
| question | Sim | Texto da pergunta |
| options | Sim | Array com id, text, isCorrect, explanation? |

---

## Exemplos de lição

### Exemplo 1: Programação (React)

```json
{
  "id": "use-state",
  "courseId": "react",
  "moduleId": "state",
  "title": "useState",
  "type": "challenge",
  "xp": 25,
  "difficulty": "beginner",
  "analogy": "Imagine uma lousa mágica. Você escreve um número nela (o estado). Quando apaga e escreve outro número, todo mundo que está olhando vê a mudança instantaneamente. useState é essa lousa.",
  "content": {
    "sections": [
      { "type": "heading", "content": "O que é useState?" },
      { "type": "paragraph", "content": "useState é o Hook mais básico do React. Ele adiciona 'memória' a um componente funcional — um valor que persiste entre renderizações e que, quando muda, faz o React atualizar a tela." },
      { "type": "heading", "content": "Sintaxe" },
      { "type": "code", "content": "const [contador, setContador] = useState(0);", "language": "jsx" },
      { "type": "callout", "content": "O valor inicial do useState é usado APENAS na primeira renderização.", "variant": "info" }
    ]
  },
  "challenge": {
    "instructions": "Crie um contador que mostra o valor atual. Adicione dois botões: '+1' para incrementar e 'Resetar' para voltar a zero.",
    "starterCode": "import { useState } from 'react';\n\nexport default function App() {\n  return (\n    <div>\n      <p>Contador: {/* valor aqui */}</p>\n      <button>+1</button>\n      <button>Resetar</button>\n    </div>\n  );\n}",
    "solution": "import { useState } from 'react';\n\nexport default function App() {\n  const [contador, setContador] = useState(0);\n  return (\n    <div>\n      <p>Contador: {contador}</p>\n      <button onClick={() => setContador(prev => prev + 1)}>+1</button>\n      <button onClick={() => setContador(0)}>Resetar</button>\n    </div>\n  );\n}",
    "tests": [],
    "hint": "Use useState(0) para criar o estado. Para incrementar, use setContador(prev => prev + 1).",
    "solutionExplanation": "Usamos useState(0) para inicializar. O botão +1 usa a forma funcional (prev => prev + 1) para garantir que sempre incrementa do valor mais recente."
  },
  "keyTakeaways": [
    "useState retorna [valor, setter] — sempre desestruture assim",
    "Chamar o setter dispara uma re-renderização",
    "Use a forma funcional quando o novo estado depende do anterior"
  ],
  "commonMistakes": [
    "Usar variável normal em vez de useState — a tela não atualiza",
    "Modificar o estado diretamente — React não detecta a mudança"
  ],
  "realWorldExample": "Em um e-commerce, o estado controla quantos itens estão no carrinho. Cada clique em 'Adicionar' atualiza o badge no header.",
  "encouragement": "useState é o hook que você mais vai usar. Dominar ele é dominar a alma do React."
}
```

### Exemplo 2: Gestão (área não-code)

```json
{
  "id": "backlog-priorizacao",
  "courseId": "gestao-agil",
  "moduleId": "scrum",
  "title": "Priorização do Backlog",
  "type": "quiz",
  "xp": 10,
  "difficulty": "beginner",
  "analogy": "Um backlog é como uma lista de compras: você prioriza o que precisa primeiro e pode adicionar itens conforme surgem necessidades.",
  "content": {
    "sections": [
      { "type": "heading", "content": "O que é priorização?" },
      { "type": "paragraph", "content": "Priorizar o backlog significa ordenar os itens pela importância e urgência. O Product Owner é responsável por garantir que o time trabalhe no que traz mais valor primeiro." },
      { "type": "heading", "content": "Critérios comuns" },
      { "type": "list", "content": "Valor para o usuário\nEsforço estimado\nRisco e dependências\nAlinhamento com objetivos do produto" },
      { "type": "callout", "content": "A priorização é revisada a cada sprint. O backlog é um artefato vivo.", "variant": "tip" }
    ]
  },
  "quiz": [
    {
      "question": "Quem é o principal responsável pela priorização do backlog?",
      "options": [
        { "id": "a", "text": "Scrum Master", "isCorrect": false, "explanation": "O Scrum Master facilita o processo, mas não prioriza." },
        { "id": "b", "text": "Product Owner", "isCorrect": true, "explanation": "O PO maximiza o valor do produto e decide a ordem dos itens." },
        { "id": "c", "text": "Time de desenvolvimento", "isCorrect": false, "explanation": "O time estima e implementa, mas não define prioridade." }
      ]
    }
  ],
  "keyTakeaways": [
    "O Product Owner prioriza o backlog",
    "Valor e esforço são critérios centrais",
    "O backlog é revisado continuamente"
  ],
  "commonMistakes": [
    "Priorizar por quem grita mais alto",
    "Ignorar dependências técnicas"
  ],
  "realWorldExample": "Em um app de delivery, priorizar 'rastreamento em tempo real' antes de 'tema escuro' traz mais valor ao usuário.",
  "encouragement": "Priorizar bem é uma habilidade que se desenvolve com prática e feedback dos usuários."
}
```

---

## Prompt padrão para geração de lições

Use este prompt ao solicitar geração de novas lições. **Substitua [ÁREA]** e [DOMÍNIO] conforme o curso.

---

**Prompt (programação):**

Você é um instrutor especialista em [DOMÍNIO] (ex: React, Python, SQL) com experiência em ensino para pessoas que querem evoluir na programação.

Crie uma lição educacional seguindo as regras da plataforma Learning Engine.

A lição deve:

* seguir o formato JSON definido em **lesson_schema.md** (não use campos obsoletos como hook, explanation, example, remember)
* usar `content.sections` com tipos: heading, paragraph, code, list, callout
* incluir `courseId`, `moduleId`, `xp` (10 ou 25 conforme o tipo)
* incluir analogia concreta, keyTakeaways e, quando aplicável, commonMistakes, realWorldExample, encouragement
* para type=challenge: instructions, starterCode, solution, tests (array), hint, solutionExplanation
* evitar explicações longas (máx 6 linhas por parágrafo)
* focar em aprendizado ativo

A saída deve ser **apenas** o JSON válido, sem markdown ou texto extra.

---

**Prompt (gestão, ferramentas ou outro):**

Você é um instrutor especialista em [ÁREA] (ex: gestão ágil, uso de Figma, liderança) com experiência em ensino para pessoas que querem evoluir nesse domínio.

Crie uma lição educacional seguindo as regras da plataforma Learning Engine.

A lição deve:

* seguir o formato JSON definido em **lesson_schema.md**
* usar `content.sections` com tipos: heading, paragraph, list, callout (code apenas se houver exemplos)
* incluir `courseId`, `moduleId`, `xp` (10 para explanation/quiz)
* usar type `explanation` ou `quiz` — **não use** type `challenge` (reservado a código)
* incluir analogia concreta, keyTakeaways, commonMistakes, realWorldExample, encouragement
* para type=quiz: array `quiz` com question e options (id, text, isCorrect, explanation)
* evitar explicações longas (máx 6 linhas por parágrafo)
* focar em aprendizado ativo

A saída deve ser **apenas** o JSON válido, sem markdown ou texto extra.
