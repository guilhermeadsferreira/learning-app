# Plan Task — Planejar Execução de uma Task

Planeje a execução da task indicada abaixo.

**Task:** {{input}}

**IMPORTANTE: Mude para o modo Plan antes de fazer qualquer coisa.**

---

## 1. Localizar a task

Procure o arquivo correspondente em `tasks/`. O `{{input}}` pode ser:

- O nome exato do arquivo (ex: `deploy-gratuito`)
- Um trecho do título (ex: `deploy`, `persistência`)

Se não encontrar correspondência, liste as tasks disponíveis em `tasks/` e pergunte qual o usuário quis dizer.

---

## 2. Analisar a task

Leia o arquivo da task e entenda:

- Objetivo
- Contexto
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

Apresente um plano claro e acionável com:

### Visão geral

Resumo em 2-3 frases do que será feito e qual a abordagem escolhida.

### Decisões técnicas

Liste decisões que precisam ser tomadas (ex: qual lib usar, qual abordagem seguir) com prós e contras para cada opção. Apresente sua recomendação.

### Etapas de execução

Quebre o trabalho em etapas ordenadas. Para cada etapa:

- O que será feito
- Quais arquivos serão criados ou modificados
- Dependências com outras etapas

**Última etapa obrigatória em todo plano:** ao concluir a implementação, marcar a task como `Status: concluído` e movê-la para `tasks/done/`.

### Riscos e pontos de atenção

Identifique potenciais problemas, trade-offs e decisões que podem impactar o projeto.

---

## 5. Validar com o usuário

Apresente o plano completo e pergunte:

- O plano faz sentido?
- Alguma etapa precisa ser ajustada?
- Alguma decisão técnica precisa de mais discussão?

Aguarde aprovação antes de sugerir início da implementação.
