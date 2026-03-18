# Git Commit — Commit Semântico com Pré-Revisão

Execute o fluxo abaixo.

## 1. Analisar mudanças

Execute `git status` e `git diff` para entender o que mudou. Liste os arquivos alterados e o tipo de alteração.

## 2. Pré-revisão crítica

Verifique nos arquivos editados:

| Verificação                                                                                                   | Ação se falhar                           |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Erros de lint/TypeScript                                                                                      | **Crítico** — pausar e alertar o usuário |
| Imports quebrados ou não resolvidos                                                                           | **Crítico** — pausar e alertar o usuário |
| JSON de lições: campos obrigatórios ausentes (`id`, `courseId`, `moduleId`, `title`, `type`, `xp`, `content`) | **Crítico** — pausar e alertar o usuário |
| Lição `challenge` sem `instructions`, `starterCode`, `solution`, `tests`                                      | **Crítico** — pausar e alertar o usuário |
| Lição `quiz` sem `quiz` array com `question` e `options`                                                      | **Crítico** — pausar e alertar o usuário |
| Formatação inconsistente (ex: trailing commas)                                                                | **Menor** — corrigir automaticamente     |
| Console.log esquecido em produção                                                                             | **Menor** — corrigir ou alertar          |

**Se algum ponto crítico for detectado**: pare, liste os problemas e pergunte ao usuário se deseja que você corrija ou se ele prefere resolver manualmente.

**Se apenas pontos menores**: corrija automaticamente e prossiga.

## 3. Gerar mensagem semântica

Use Conventional Commits:

| Tipo     | Uso                                     |
| -------- | --------------------------------------- |
| feat     | Nova funcionalidade                     |
| fix      | Correção de bug                         |
| refactor | Refatoração sem mudar comportamento     |
| docs     | Apenas documentação                     |
| style    | Formatação, espaços (não altera lógica) |
| chore    | Tarefas de manutenção, deps             |
| test     | Testes                                  |

**Formato**: `tipo(escopo): descrição curta em PT-BR`

Exemplos:

- `feat(lessons): adiciona lição sobre useReducer`
- `fix(editor): corrige preview que não atualizava`
- `docs(content-generation): generaliza para gestão e ferramentas`

## 4. Mover tasks concluídas

Antes de commitar, verifique se há tasks em `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/` com **Status: done** ou **Status: concluído** que ainda não foram movidas para `tasks/done/`. Tasks no pm-agent são movidas diretamente (não via `git mv` do study-app).

## 5. Executar commit

Com a mensagem gerada, execute diretamente (sem perguntar): `git add . && git commit -m "mensagem"`

## 6. Push

Após o commit, execute `git push` para enviar as alterações ao remoto.
