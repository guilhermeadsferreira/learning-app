# Revisão da Organização de `src/`

**Status:** concluído

---

## Objetivo

Auditar a estrutura de diretórios e convenções de `src/`, corrigir inconsistências encontradas e documentar as decisões arquiteturais de forma definitiva.

---

## Contexto

O projeto cresceu incrementalmente — features foram sendo adicionadas sem uma revisão global da organização. A estrutura atual tem alguns pontos que merecem atenção:

1. **`src/layouts/` existe e está vazio** — diretório morto sem propósito definido.
2. **`src/services/ai-review.ts` é um shim** — após a migração para `src/services/ai/`, o arquivo original virou um re-export de uma linha. Pode ser removido após confirmar que nenhum import direto sobreviveu.
3. **`src/contexts/` tem apenas um arquivo** — `SettingsDrawerContext.tsx` é o único context fora de `hooks/`. Vale decidir: contexts ficam em `contexts/` ou merged dentro de `hooks/`?
4. **`src/components/` mistura componentes de UI, layout, domínio e gamificação** — a subdivisão atual (`ui/`, `layout/`, `home/`, `lesson/`, `editor/`, `gamification/`) está razoável, mas pode ser auditada.
5. **`src/lib/utils.ts`** — contém apenas `cn()`. Se outras utilities forem adicionadas, a estrutura de `lib/` deve estar pronta.
6. **`src/engine/`** — concentra tipos, lógica de XP e persistência. A linha entre `engine/` e `services/` pode ficar confusa à medida que o projeto cresce.

A revisão deve olhar para o estado atual, identificar o que precisa mudar e executar as correções — sem refatorações desnecessárias, apenas o que tem impacto real.

---

## Escopo

### Etapa 1 — Audit completo

Percorra `src/` inteiro e classifique cada item como:

- ✅ OK — está no lugar certo, sem ação necessária
- ⚠️ Atenção — pode melhorar, mas não urgente
- ❌ Problema — inconsistência clara que deve ser corrigida

Foque especialmente em:

- Arquivos em lugares errados (ex: lógica de negócio dentro de componente)
- Diretórios vazios ou com propósito mal definido
- Imports cruzados que indicam acoplamento indevido
- Arquivos duplicados ou obsoletos

**Critério de sucesso:** lista documentada de problemas com prioridade.

---

### Etapa 2 — Remover `src/layouts/` (se vazio)

Confirmar que o diretório está mesmo vazio e não há planos de uso imediato. Se sim, deletar.

**Critério de sucesso:** sem diretórios vazios em `src/`.

---

### Etapa 3 — Remover shim `src/services/ai-review.ts`

Verificar que **nenhum arquivo** ainda importa de `@/services/ai-review`. Se zero importadores restarem, deletar o arquivo.

Comandos para verificar:

```bash
grep -r "ai-review" src/
```

**Critério de sucesso:** `src/services/ai-review.ts` deletado, zero referências restantes.

---

### Etapa 4 — Decidir sobre `src/contexts/`

**Opção A:** manter `contexts/` como diretório próprio para qualquer Context que não seja um hook composto (apenas estado simples de UI).

**Opção B:** mover `SettingsDrawerContext.tsx` para `hooks/` e remover o diretório `contexts/`.

A decisão deve ser documentada no `CLAUDE.md` para guiar adições futuras.

**Critério de sucesso:** convenção decidida, documentada e aplicada.

---

### Etapa 5 — Clarificar a fronteira `engine/` vs `services/`

Escrever uma convenção clara sobre o que vai em cada um:

| Diretório   | O que pertence aqui                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `engine/`   | Tipos TypeScript centralizados, lógica de negócio pura (sem I/O), cálculos de XP, migrations de estado |
| `services/` | Integrações com APIs externas (Anthropic, OpenAI, OpenRouter) e qualquer I/O externo                   |

Verificar se algum arquivo atual viola essa fronteira e mover se necessário.

**Critério de sucesso:** convenção documentada no `CLAUDE.md`.

---

### Etapa 6 — Atualizar `CLAUDE.md` (seção Architecture)

Após as correções, atualizar a tabela "Key Directories" do `CLAUDE.md` para refletir:

- Remoção de `src/layouts/`
- Nova estrutura `src/services/ai/`
- Decisão tomada sobre `contexts/` vs `hooks/`
- Convenção `engine/` vs `services/`

**Critério de sucesso:** `CLAUDE.md` reflete com precisão o estado atual do projeto.

---

## Questões a responder

- `src/contexts/` permanece ou mergeia com `hooks/`?
- Existe intenção de usar `src/layouts/` no futuro (ex: layouts de página diferenciados)?
- A separação `engine/` vs `services/` está clara para todos os colaboradores do projeto?

---

## Entregável

- `src/layouts/` removido (se confirmado vazio)
- `src/services/ai-review.ts` removido (após confirmar zero importadores)
- Convenção `contexts/` vs `hooks/` decidida e aplicada
- `CLAUDE.md` atualizado com estrutura de diretórios correta e convenções claras
