# Curso Cursor: Do Iniciante ao Avançado

**Status:** pendente

---

## Objetivo

Criar um curso completo sobre o **Cursor** — o editor de código com IA da Anysphere — cobrindo desde a instalação até o uso avançado de seus recursos agênticos, com foco em produtividade real para desenvolvedores.

## Contexto

O Cursor é atualmente o editor de código com IA mais popular do mercado, concorrendo diretamente com o GitHub Copilot e o Claude Code. Ele é construído sobre o VS Code e adiciona uma camada profunda de IA: completions inteligentes (Tab), chat contextual, Composer/Agent para edições multi-arquivo, e suporte a MCP.

A plataforma já possui o curso "Claude Code: Do Iniciante ao Avançado" — o curso de Cursor é um complemento natural, criando uma trilha de ferramentas de desenvolvimento com IA. Os dois cursos juntos cobrem os principais agentes de codificação do mercado.

O Cursor é uma ferramenta, não uma linguagem de programação. Portanto, o curso deve seguir o mesmo padrão do curso de Claude Code:
- Lições do tipo `explanation` e `quiz`
- `challengeStyle: scenario` (sem Sandpack, pois não há código a executar no browser)
- Foco em reconhecimento de situações e tomada de decisão

**Tags sugeridas:** `["IA", "Produtividade"]`

## Escopo

### Etapa 1 — Planejamento com `/new-course`

Executar o comando `/new-course` com o tema "Cursor", que irá:

- Definir metadados do curso (`courseId: cursor`)
- Planejar módulos e lições com estrutura completa
- Apresentar o plano para aprovação antes de gerar qualquer arquivo

**Critérios de sucesso:** plano aprovado com 6–9 módulos e 30–45 lições totais.

**Decisões a tomar:**
- Separar Tab, Chat, Composer e Agent em módulos distintos ou agrupar por fluxo de trabalho?
- Incluir módulo de comparação com outros editores (VS Code puro, GitHub Copilot)?
- Abordar configurações enterprise (self-hosted models, privacy mode)?

### Etapa 2 — Geração do `course.json`

Criar `src/courses/cursor/course.json` com:

- `id: "cursor"`
- `title`: "Cursor: Do Iniciante ao Avançado"
- `description`: descrição completa do curso
- `icon`: `"🖱️"` (ou emoji mais representativo)
- `tags`: `["IA", "Produtividade"]`
- `aiReviewContext`:
  - `subject`: "Cursor"
  - `expertise`: "Tab completion, Chat, Composer, Agent, Rules, Notepads, MCP, @-mentions, privacy mode, model selection"
  - `codeLanguage`: "bash"
  - `challengeStyle`: "scenario"
- Array de módulos com IDs das lições

### Etapa 3 — Estrutura de módulos esperada

Referência de módulos para o planejamento (ajustável durante `/new-course`):

| Módulo | Tema | Lições estimadas |
|--------|------|-----------------|
| 1 | Introdução e instalação | 3–4 |
| 2 | Interface e navegação | 3–4 |
| 3 | Tab Completion (Cursor Tab) | 4–5 |
| 4 | Chat e contexto (@-mentions) | 4–5 |
| 5 | Composer e Agent (edições multi-arquivo) | 5–6 |
| 6 | Rules e personalização | 4–5 |
| 7 | Notepads e memória | 3–4 |
| 8 | MCP e extensões | 3–4 |
| 9 | Workflows e produtividade avançada | 4–5 |

### Etapa 4 — Geração das lições por módulo

Gerar todas as lições JSON em `src/courses/cursor/lessons/`.

Proporção esperada por módulo:
- ~60% `explanation` (xp: 10) — conceitos, recursos, fluxos
- ~40% `quiz` (xp: 10) — cenários de uso real e decisões de ferramenta

Cada lição deve incluir:
- `analogy` conectando o recurso do Cursor a algo familiar
- `keyTakeaways` com os pontos práticos mais importantes
- `commonMistakes` com erros comuns de iniciantes
- `realWorldExample` de caso de uso no dia a dia de um dev

**Tópicos essenciais a cobrir:**

- Diferença entre **Tab**, **Chat**, **Composer** e **Agent** — quando usar cada um
- Como escrever **Rules** eficazes (`.cursor/rules/*.mdc`) — o equivalente ao CLAUDE.md
- **@-mentions** para contexto: `@file`, `@folder`, `@web`, `@docs`, `@git`, `@codebase`
- **Notepads**: memória persistente entre conversas
- **Model selection**: quando usar claude-3.5-sonnet vs gpt-4o vs cursor-small
- **Privacy Mode** e considerações de segurança em projetos corporativos
- **MCP** no Cursor: configuração e casos de uso
- Fluxo de **review e aprovação de diffs** gerados pelo Agent
- Integração com **Git**: como o Cursor usa contexto de diff/PR
- **Background Agent**: execução autônoma em segundo plano (recurso recente)
- **Cursor BugBot**: revisão automática de PRs com IA

**Analogias com Claude Code (usar ao longo do curso):**

O curso deve aproveitar o fato de que o aluno provavelmente já conhece (ou conhecerá) o Claude Code. Mapeamento de conceitos equivalentes:

| Cursor | Claude Code | Nota |
|--------|-------------|------|
| Rules (`.cursor/rules/*.mdc`) | `CLAUDE.md` | Mesmo propósito: instruções persistentes para a IA |
| Notepads | Memory system (`~/.claude/`) | Memória entre sessões |
| Agent mode | Claude Code em modo autônomo | Edições multi-arquivo sem aprovação step-by-step |
| Background Agent | `run_in_background` / Tasks | Execução assíncrona de tarefas longas |
| MCP no Cursor | MCP no Claude Code | Mesma spec, mesma configuração JSON |
| `@codebase` | CLAUDE.md + context window | Indexação semântica do repositório |
| Composer | Equivalent to multi-file edits via Agent tool | Escopo de edição expandido |
| `cursor-small` (modelo rápido) | Haiku (modelo leve) | Completions rápidas e baratas |

Usar essas analogias nas lições para ancorar o aprendizado em conhecimento prévio, reduzindo a carga cognitiva.

### Etapa 5 — Verificação final

Conferir integridade do curso:

- Todos os `lesson-id` do `course.json` têm arquivo JSON correspondente
- `courseId` e `moduleId` consistentes em todas as lições
- XP correto (10 para explanation/quiz)
- Nenhuma lição com `type: challenge` (não aplicável ao Cursor)
- Cobertura dos principais recursos do Cursor (Tab, Chat, Composer, Agent, Rules)

## Questões a responder

- Incluir lição comparando Cursor vs Claude Code para ajudar o aluno a escolher a ferramenta certa? *(decisão: provavelmente sim — público já conhece Claude Code)*
- Incluir módulo sobre **migração do VS Code** para Cursor (extensões, keybindings, settings sync)?
- Abordar o uso do Cursor com linguagens específicas (Python, TypeScript) ou manter genérico?
- Criar lição sobre **custos e planos** (Free, Pro, Business)?
- Cobrir **Cursor BugBot** (revisão de PRs) como lição dedicada ou apenas mencionar?

## Entregável

```
src/courses/cursor/
  course.json
  lessons/
    *.json  (30–45 arquivos de lição)
```

Curso disponível na home da plataforma, cobrindo os principais recursos do Cursor com ~300–450 XP total, complementando o curso de Claude Code na trilha de ferramentas de IA para desenvolvimento.
