# New Task — Criar Task de Projeto

Crie uma nova task de projeto com base no contexto abaixo.

**Contexto:** $ARGUMENTS

---

## 1. Classificar a task

A partir de `$ARGUMENTS`, determine a **categoria** da task:

| Categoria         | Quando usar                                                | Artefato esperado                                      |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| `feature`         | Nova funcionalidade de produto                             | Código implementado                                    |
| `refactor`        | Melhoria interna sem mudança de comportamento              | Código refatorado                                      |
| `conteúdo`        | Criação de curso ou lição                                  | JSON em `src/courses/`                                 |
| `decisão-técnica` | Pesquisa + decisão arquitetural sem implementação imediata | ADR em `documents/tech/adrs/`                          |
| `auditoria`       | Revisão de qualidade (código, conteúdo, arquitetura)       | Relatório + correções                                  |
| `produto`         | Estratégia, identidade, PRD, backlog                       | Documento em `pm-agent/projects/study-app/docs/`       |
| `infra`           | Deploy, build, CI/CD, configuração de ambiente             | Config + documentação                                  |

Se o contexto for vago, infira a categoria e confirme com o usuário antes de prosseguir.

---

## 2. Entender a task (formato write-task)

Aplique o mesmo fluxo do `/write-task` do pm-agent:

Se a task não estiver clara, pergunte:
- Para quem é essa task? (papel do usuário ou stakeholder)
- Qual o objetivo? (o que a pessoa quer fazer ou conseguir)
- Como saberemos que está pronto? (critério de aceite principal)

Se o contexto já for suficiente, infira as respostas a partir dele.

---

## 3. Gerar o arquivo

Crie o arquivo em:

```
/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/backlog/{nome-da-task}.md
```

Onde `{nome-da-task}` é o título em kebab-case (ex: `daily-streak`, `curso-postgresql`).

### Formato do arquivo

```markdown
# {Título da Task}

**Status:** pendente
**Categoria:** {categoria}
**Artefato:** {descrição do entregável concreto}
**Esforço:** {P / M / G}

---

**User story:** Como {papel}, quero {ação}, para {benefício}.

**Critérios de aceite:**
- [ ] {critério 1}
- [ ] {critério 2}
- [ ] {critério 3}

**Notas técnicas:** {contexto arquitetural relevante — paths, decisões, dependências. Omitir se não houver.}
```

Após criar o arquivo, adicione uma entrada em:
```
/Users/guilhermeaugusto/Documents/workspace-projects/pm-agent/projects/study-app/tasks/backlog.md
```

---

## 4. Confirmar

Apresente um resumo da task criada:

```
Task criada: {título}
Categoria:   {categoria}
Esforço:     {P / M / G}
Artefato:    {entregável}
Arquivo:     pm-agent/projects/study-app/tasks/backlog/{nome-da-task}.md
```

Pergunte se o usuário quer ajustar algo antes de finalizar.
