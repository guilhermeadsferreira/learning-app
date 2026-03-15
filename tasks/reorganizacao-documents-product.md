# Reorganização de documents/product/

**Status:** done

---

## Objetivo

Reestruturar o diretório `documents/product/` em subpastas temáticas para separar metodologia pedagógica, schemas de conteúdo, documentos estratégicos (PRD e pitch) e sistemas de suporte, melhorando a navegabilidade e manutenção da documentação.

## Contexto

Atualmente `documents/product/` contém 8 arquivos soltos em um único nível:

```
documents/product/
├── prd.md
├── pitch.md
├── pedagogy.md
├── AI_SYSTEM.md
├── content_generation.md
├── course_schema.md
├── lesson_schema.md
└── AUDIT.md
```

Com o crescimento do projeto, essa estrutura plana dificulta localizar documentos por propósito. A reorganização visa agrupar arquivos por responsabilidade:

- **Metodologia pedagógica** (`methodology/`): documentos que definem como o conteúdo é estruturado, aprendido e avaliado
- **Estratégia de produto** (`strategy/`): PRD, pitch e visão do produto — documentos voltados a decisores e stakeholders
- **Sistemas de suporte** (`systems/`): documentação técnica de sistemas transversais (IA, auditoria)

O impacto se estende ao `CLAUDE.md`, que referencia caminhos de documentos diretamente, e a qualquer task ou arquivo que aponte para `documents/product/`.

## Escopo

### Etapa 1 — Definir estrutura de destino

Decidir a nova hierarquia de subpastas. Proposta inicial:

```
documents/product/
├── methodology/
│   ├── pedagogy.md
│   ├── content_generation.md
│   ├── course_schema.md
│   └── lesson_schema.md
├── strategy/
│   ├── prd.md           # versão atual
│   └── pitch.md
└── systems/
    ├── AI_SYSTEM.md
    └── AUDIT.md
```

**Critério de sucesso:** estrutura validada antes de mover qualquer arquivo.

**Pontos de atenção:**
- Avaliar se `AUDIT.md` pertence a `systems/` ou se cabe melhor em `strategy/` (é uma auditoria pedagógica ou de produto?)
- Discutir se PRD merece versionamento com subpasta própria (`strategy/prd/`) para arquivar versões antigas

### Etapa 2 — Criar subpastas e mover arquivos

Criar as subpastas e mover cada arquivo para seu destino, sem alterar o conteúdo dos arquivos.

**Critério de sucesso:** todos os arquivos no novo local, sem duplicatas.

### Etapa 3 — Atualizar referências no CLAUDE.md

O `CLAUDE.md` referencia caminhos de documentos em duas seções:

- `documents/product/course_schema.md` e `documents/product/lesson_schema.md` (seção Content Layer)
- `documents/product/prd.md` e tabela de curadoria código × documentação

Atualizar todos os caminhos para refletir a nova estrutura.

**Critério de sucesso:** nenhum caminho quebrado no `CLAUDE.md`.

### Etapa 4 — Verificar referências em tasks/ e outros arquivos

Fazer busca por `documents/product/` em todo o repositório e corrigir referências encontradas.

**Arquivos a verificar:**
- Todos os arquivos em `tasks/*.md`
- Qualquer referência em `src/` (improvável, mas verificar)

**Critério de sucesso:** `grep -r "documents/product/" .` retorna apenas caminhos válidos.

### Etapa 5 — Atualizar conteúdo interno dos documentos (se necessário)

Alguns documentos referenciam outros documentos internamente (ex: `prd.md` pode linkar `pedagogy.md`). Verificar links relativos internos e corrigir.

**Critério de sucesso:** nenhum link relativo quebrado entre documentos.

## Questões a responder

- `AUDIT.md` é uma auditoria de produto ou pedagógica? Isso define se vai em `systems/` ou `strategy/`.
- O PRD deve ter versionamento explícito (ex: `prd-v1.md`, `prd-v2.md`) ou apenas um arquivo `prd.md` vivo?
- Há planos de adicionar mais versões do pitch? Se sim, `strategy/pitch/` pode fazer sentido no futuro.

## Entregável

- Diretório `documents/product/` reestruturado com subpastas `methodology/`, `strategy/` e `systems/`
- `CLAUDE.md` atualizado com os novos caminhos
- Todas as referências a `documents/product/` em `tasks/` e outros arquivos corrigidas
- Nenhum link relativo quebrado entre documentos
