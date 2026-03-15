# Gestão de Produto — Status Document e Persona de PM

**Status:** concluído
**Concluído em:** 2026-03-15

---

## Objetivo

Criar uma camada de gestão de produto no projeto: um documento vivo de status do produto (`product-status.md`) e um slash command `/product-review` que ativa uma persona de Product Manager para avaliar o produto, identificar gaps e propor evoluções.

## Contexto

O projeto tem uma documentação técnica bem estruturada (`documents/product/strategy/prd.md`, `pedagogy.md`, etc.) e um CLAUDE.md que orienta o desenvolvimento. Mas não existe uma visão de produto **atualizada no tempo** — o PRD é um documento estático que não reflete o estado real do produto a cada sprint.

Dois problemas concretos:

1. **Sem snapshot do produto atual:** não há um lugar que responda "o que existe hoje, o que está funcionando, o que está em aberto" de forma concisa e atualizada.
2. **Sem perspectiva de PM:** as decisões hoje são guiadas pelo desenvolvedor/guardião arquitetural (papel do CLAUDE.md). Não há uma persona que pense em priorização, experiência do usuário, evolução do produto e oportunidades.

## Escopo

### Etapa 1 — Criar `documents/product/product-status.md`

Documento vivo que captura o estado atual do produto. Deve ser atualizado sempre que houver mudanças relevantes a nível de produto (novos cursos, features, mudanças de UX, decisões arquiteturais com impacto no usuário).

Estrutura sugerida:

```markdown
# Product Status — Learning Engine

**Última atualização:** {data}

## O que existe hoje
- Cursos disponíveis (lista com status: completo / em progresso / planejado)
- Features ativas (gamificação, AI review, etc.)
- Stack atual

## O que está funcionando bem
(evidências ou hipóteses)

## Gaps e limitações conhecidas
(o que o produto ainda não faz que deveria)

## Próximas evoluções em radar
(não é um backlog formal — é o que está sendo considerado)
```

**Critério de sucesso:** arquivo criado com o estado atual preenchido.

**Ponto de atenção:** precisa ser mantido manualmente (ou com auxílio do `/product-review`). Definir a convenção de quando atualizar — sugestão: sempre que uma task de feature/produto for concluída.

---

### Etapa 2 — Criar slash command `/product-review`

Um comando que ativa uma persona de Product Manager para analisar o produto e gerar saídas úteis.

**O que a persona deve fazer:**
- Ler `documents/product/product-status.md`, `prd.md` e `pedagogy.md`
- Avaliar o produto atual: o que está bom, o que está faltando, o que está inconsistente com a proposta de valor
- Propor evoluções priorizadas (impacto × esforço)
- Identificar oportunidades não óbvias (ex: features que outras plataformas similares têm)
- Sugerir ajustes de posicionamento, UX ou conteúdo se relevante
- Opcionalmente: atualizar `product-status.md` com o resultado da revisão

**Arquivo:** `.claude/commands/product-review.md`

**Critério de sucesso:** comando funciona no Claude Code e gera uma análise útil em menos de 1 execução.

---

### Etapa 3 — Adicionar gatilho de atualização ao CLAUDE.md

Incluir na tabela "Curadoria código × documentação" um gatilho para quando `product-status.md` deve ser atualizado:

| Gatilho | Documento a verificar |
|---|---|
| Nova feature entregue ou curso publicado | `product-status.md` |

**Critério de sucesso:** CLAUDE.md reflete a convenção de manutenção do status document.

---

### Etapa 4 — Adicionar `/product-review` à tabela de slash commands do CLAUDE.md

Registrar o novo comando na tabela "Slash commands disponíveis".

---

## Questões respondidas

- **Atualização automática vs. manual:** o `/product-review` pergunta ao usuário antes de atualizar `product-status.md` — nunca sobrescreve automaticamente.
- **Tom da persona de PM:** estratégico + focado no usuário. Pensa em impacto × esforço, experiência do usuário e coerência com a proposta de valor.
- **Consulta às tasks pendentes:** sim — o comando lê `tasks/` (excluindo `done/`) para cruzar com a análise e sugerir priorização de backlog.

## Entregável

1. ✅ `documents/product/product-status.md` — snapshot atual do produto preenchido
2. ✅ `.claude/commands/product-review.md` — slash command `/product-review` funcional
3. ✅ `CLAUDE.md` atualizado com gatilho e novo comando na tabela
