# Estratégia de Reutilização de Slash Commands no Claude Code

## Como os comandos funcionam

Slash commands são arquivos `.md` em `.claude/commands/` que viram prompts ao serem invocados. Há dois escopos:

| Escopo | Localização                           | Disponibilidade   |
| ------ | ------------------------------------- | ----------------- |
| Global | `~/.claude/commands/`                 | Todos os projetos |
| Local  | `.claude/commands/` (na raiz do repo) | Só este projeto   |

**Regra de precedência:** se existir um arquivo local com o mesmo nome do global, o local **substitui completamente** o global — sem merge.

---

## Abordagem atual: copy-paste por projeto

Copiar a pasta `.claude/commands/` para cada novo projeto. Após copiar, adaptar os comandos que referenciam paths específicos (`src/courses/`, `documents/product/`, categorias de task, etc.).

**Comandos mais portáveis (menor adaptação necessária):**

- `git-commit.md` — remover verificações de JSON de lições
- `new-task.md` / `plan-task.md` — ajustar categorias e paths do projeto

**Comandos específicos deste projeto (não copiar para projetos genéricos):**

- `new-course.md`, `new-content.md`, `review-course.md`, `product-review.md`

---

## Abordagem futura: comandos globais + CLAUDE.md como complemento

### Comandos globais

Colocar os comandos genéricos em `~/.claude/commands/`. Ficam disponíveis em todos os projetos sem copiar nada.

### CLAUDE.md como complemento implícito

O `CLAUDE.md` é sempre carregado no contexto antes de qualquer comando. Isso permite "estender" um comando global com regras do projeto sem sobrescrever o arquivo global.

**Exemplo:**

`~/.claude/commands/git-commit.md` (genérico):

```markdown
1. git status + diff
2. Pré-revisão: lint, imports quebrados, console.log
3. Conventional Commits em PT-BR
4. git add . && git commit && git push
```

`CLAUDE.md` do projeto (regras adicionais lidas automaticamente):

```markdown
## Git Commit — regras adicionais

- Verificar campos obrigatórios nos JSONs de lições antes de commitar
- Mover tasks com Status: done para tasks/done/ antes do commit
```

### Quando usar um comando local de mesmo nome

Só vale substituir o global localmente quando o fluxo do projeto é radicalmente diferente do genérico.

### Quando usar um comando local com nome diferente

Se quiser encadear global + extras:

```
~/.claude/commands/git-commit.md   ← fluxo genérico
.claude/commands/commit.md         ← "execute /git-commit e também faça X"
```

---

## Recursos reutilizáveis deste projeto

Além dos comandos, a pasta `documents/tech/` contém materiais agnósticos ao projeto que valem ser reaproveitados:

| Arquivo                          | Conteúdo                                    |
| -------------------------------- | ------------------------------------------- |
| `react-best-practices.md`        | Boas práticas gerais de React               |
| `react-router-best-practices.md` | Boas práticas com React Router v7           |
| `react-router-guideline.md`      | Guia de uso do React Router v7              |
| `adrs/_template.md`              | Template para Architecture Decision Records |
