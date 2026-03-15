# New Task — Criar Task de Projeto

Crie uma nova task de projeto com base no contexto abaixo.

**Contexto:** {{input}}

---

## 1. Analisar o contexto

A partir do `{{input}}`, extraia:

- **Título curto** da task (usado no nome do arquivo)
- **Área** da task (feature, infra, docs, refactor, investigação, etc.)
- **Objetivo** claro e direto

Se o contexto for vago, infira o máximo possível e pergunte ao usuário apenas o que for essencial.

---

## 2. Destrinchar a task

Expanda o contexto breve em uma task completa e detalhada, incluindo:

### Objetivo

Uma frase clara sobre o que deve ser alcançado.

### Contexto

Explique o cenário atual, por que essa task é necessária e como ela se encaixa no projeto. Consulte a arquitetura e documentação do projeto quando relevante:

- `documents/product/prd.md`
- `documents/tech/`
- Estrutura atual em `src/`

### Escopo detalhado

Quebre a task em subtópicos ou etapas claras. Para cada etapa, descreva:

- O que precisa ser feito
- Critérios de sucesso
- Pontos de atenção ou decisões a tomar

### Questões a responder (se aplicável)

Liste perguntas que precisam ser respondidas durante a execução.

### Entregável

Descreva o resultado concreto esperado (arquivo, configuração, funcionalidade, documento, etc.)

---

## 3. Gerar o arquivo

Crie o arquivo em:

```
tasks/{nome-da-task}.md
```

Onde `{nome-da-task}` é o título em kebab-case (ex: `deploy-gratuito`, `sistema-de-achievements`).

### Formato do arquivo

```markdown
# {Título da Task}

**Status:** pendente

---

## Objetivo

{objetivo claro}

## Contexto

{contexto expandido e detalhado}

## Escopo

### {Etapa 1}

{descrição detalhada}

### {Etapa 2}

{descrição detalhada}

...

## Questões a responder

- {pergunta 1}
- {pergunta 2}

## Entregável

{resultado concreto esperado}
```

---

## 4. Confirmar

Apresente um resumo da task criada:

```
Task criada: {título}
Arquivo: tasks/{nome-da-task}.md
Escopo: {n} etapas
```

Pergunte se o usuário quer ajustar algo antes de finalizar.
