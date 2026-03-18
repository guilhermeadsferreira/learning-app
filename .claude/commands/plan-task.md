# Plan Task — Planejar Execução de uma Task

Planeje a execução da task indicada abaixo.

**Task:** $ARGUMENTS

**IMPORTANTE: Entre no modo Plan antes de fazer qualquer coisa.**

---

## 1. Localizar a task

Procure o arquivo correspondente em `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/`. O argumento pode ser:

- O nome exato do arquivo (ex: `deploy-gratuito`)
- Um trecho do título (ex: `deploy`, `persistência`)

Se não encontrar correspondência, liste as tasks disponíveis em `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/` e pergunte qual o usuário quis dizer.

---

## 2. Analisar a task

Leia o arquivo da task e identifique:

- Objetivo
- **Categoria** (campo `Categoria:` no arquivo — se ausente, infira a partir do conteúdo)
- Escopo e etapas
- Questões em aberto
- Entregável esperado

---

## 3. Coletar contexto do projeto

Antes de planejar, explore o estado atual do projeto para embasar o plano:

- Leia arquivos relevantes em `src/`, `documents/`, configurações
- Entenda o que já existe e o que precisa ser criado
- Identifique dependências, riscos e decisões arquiteturais

---

## 4. Elaborar o plano de execução

O conteúdo e a profundidade do plano dependem da **categoria da task**:

### Se `decisão-técnica`

O entregável é um ADR — não há implementação de código nesta task.

O plano deve incluir:

- Mapeamento do estado atual relevante
- Opções a avaliar (mínimo 2, máximo 4)
- Critérios de decisão
- Próximo número de ADR disponível em `documents/tech/adrs/` (verificar ADRs existentes)
- Etapa final: criar `documents/tech/adrs/ADR-NNN-titulo-descritivo.md` usando o template em `_template.md`
- Atualizar `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/docs/PRODUCT_STATUS.md` se a decisão impactar o roadmap
- Marcar task como `Status: concluído` e mover para `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/done/`

**Após apresentar o plano:** perguntar se o usuário quer que a pesquisa e a escrita do ADR sejam feitas imediatamente.

---

### Se `feature` ou `refactor`

O plano deve incluir:

**Visão geral** — resumo em 2-3 frases da abordagem.

**Decisões técnicas** — opções com prós/contras e recomendação.

**Etapas de execução** — ordenadas, com:

- O que será feito
- Quais arquivos serão criados ou modificados
- Dependências com outras etapas

**Última etapa obrigatória:** marcar a task como `Status: concluído` e mover para `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/done/`.

**Riscos e pontos de atenção.**

**Após apresentar o plano:** perguntar se o usuário quer iniciar a implementação imediatamente ou prefere revisar o plano primeiro.

---

### Se `conteúdo`

Redirecionar para `/new-course` ou `/new-content` conforme o escopo. O plano deve:

- Identificar se é um curso novo ou lição em curso existente
- Listar os módulos/lições a criar
- Confirmar o courseId e a estrutura de arquivos

**Após apresentar o plano:** perguntar se o usuário quer iniciar a criação do conteúdo imediatamente.

---

### Se `auditoria`

O plano deve incluir:

- Escopo da auditoria (quais arquivos, quais critérios)
- Metodologia (o que será verificado e como)
- Entregável: relatório inline ou arquivo em `documents/`
- Se houver correções, listar como etapas separadas pós-auditoria

**Após apresentar o plano:** perguntar se o usuário quer executar a auditoria imediatamente.

---

### Se `produto` ou `infra`

O plano segue o formato padrão (visão geral → etapas → riscos), adaptado ao tipo de entregável.

**Após apresentar o plano:** perguntar se o usuário quer prosseguir.

---

## 5. Validar com o usuário

Apresente o plano completo e pergunte:

- O plano faz sentido?
- Alguma etapa precisa ser ajustada?
- Alguma decisão técnica precisa de mais discussão?

Aguarde aprovação antes de iniciar qualquer execução.
