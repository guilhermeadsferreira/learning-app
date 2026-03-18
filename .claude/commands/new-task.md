# New Task — Criar Task de Projeto

Crie uma nova task de projeto com base no contexto abaixo.

**Contexto:** $ARGUMENTS

---

## 1. Classificar a task

A partir de `$ARGUMENTS`, determine a **categoria** da task. Use a tabela abaixo como guia:

| Categoria         | Quando usar                                                | Artefato de saída esperado                                                                            |
| ----------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `feature`         | Nova funcionalidade de produto                             | Código implementado                                                                                   |
| `refactor`        | Melhoria interna sem mudança de comportamento              | Código refatorado                                                                                     |
| `conteúdo`        | Criação de curso ou lição                                  | JSON em `src/courses/`                                                                                |
| `decisão-técnica` | Pesquisa + decisão arquitetural sem implementação imediata | ADR em `documents/tech/adrs/`                                                                         |
| `auditoria`       | Revisão de qualidade (código, conteúdo, arquitetura)       | Relatório + correções                                                                                 |
| `produto`         | Estratégia, identidade, PRD, backlog                       | Documento em `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/docs/` |
| `infra`           | Deploy, build, CI/CD, configuração de ambiente             | Config + documentação                                                                                 |

Se o contexto for vago, infira a categoria e confirme com o usuário antes de prosseguir.

---

## 2. Destrinchar a task

Expanda o contexto em uma task completa, incluindo:

### Objetivo

Uma frase clara sobre o que deve ser alcançado.

### Contexto

Explique o cenário atual, por que essa task é necessária e como ela se encaixa no projeto. Consulte a arquitetura e documentação do projeto quando relevante:

- `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/PRD.md`
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

Descreva o resultado concreto esperado com base na categoria:

- `feature` / `refactor` / `infra` → arquivos de código criados/modificados
- `conteúdo` → diretório do curso em `src/courses/`
- `decisão-técnica` → `documents/tech/adrs/ADR-NNN-titulo.md`
- `auditoria` → relatório inline ou arquivo em `documents/`
- `produto` → arquivo em `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/docs/`

---

## 3. Gerar o arquivo

Crie o arquivo em:

```
/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/backlog/{nome-da-task}.md
```

Onde `{nome-da-task}` é o título em kebab-case (ex: `deploy-gratuito`, `sistema-de-achievements`).

Após criar o arquivo, adicione uma entrada em `/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/backlog.md`.

### Formato do arquivo

```markdown
# {Título da Task}

**Status:** pendente
**Categoria:** {feature | refactor | conteúdo | decisão-técnica | auditoria | produto | infra}
**Artefato:** {descrição do entregável concreto}

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
Categoria: {categoria}
Artefato: {entregável}
Arquivo: pm-agent/projects/study-app/tasks/backlog/{nome-da-task}.md
Escopo: {n} etapas
```

Pergunte se o usuário quer ajustar algo antes de finalizar.
