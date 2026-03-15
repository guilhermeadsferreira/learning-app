# Curso: System Design

**Status:** pendente

---

## Objetivo

Planejar e criar um curso completo de **System Design** na plataforma, cobrindo desde fundamentos de protocolos e armazenamento até padrões avançados de sistemas distribuídos, com progressão pedagógica clara e exercícios práticos.

## Contexto

O projeto já possui cursos de React, Arquitetura de Software e Claude Code. System Design é um tema de alto valor para desenvolvedores que querem evoluir para papéis sênior/staff ou se preparar para entrevistas técnicas em grandes empresas.

**Referência principal:** [Descomplicando o System Design — LinuxTips (Matheus Fidelis)](https://github.com/msfidelis/linuxtips-curso-descomplicando-o-system-design)
O currículo desse curso cobre 23 aulas organizadas em blocos temáticos com 19 estudos de caso (básico, intermediário, avançado).

O curso deve seguir o schema declarativo da plataforma (`src/courses/system-design/course.json` + lessons JSON), sem alterar código da aplicação.

---

## Escopo

### Etapa 1 — Definir currículo e estrutura de módulos

Mapear os tópicos do material de referência para módulos da plataforma. Proposta inicial de módulos:

| Módulo                 | Tópicos                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| Fundamentos            | Protocolos de rede, RAID, CAP Theorem, ACID/BASE/PACELC                    |
| Dados                  | Bancos de dados, indexação, modelos de dados, caching                      |
| Arquitetura            | Monolito vs microserviços, DDD, BFF, API Gateway, Service Mesh             |
| Escalabilidade         | Scale cube, sharding, particionamento, replicação                          |
| Sistemas Distribuídos  | Concorrência, comunicação síncrona e assíncrona                            |
| Padrões Avançados      | CQRS, Event Sourcing, Saga, Bulkhead, Cell-based                           |
| Resiliência e Operação | Deployment strategies, observabilidade, capacity planning, testes de carga |
| Estudos de Caso        | Link shortener, e-commerce, sistemas financeiros, etc.                     |

**Critério de sucesso:** currículo aprovado com ~25–35 lições distribuídas nos módulos.

**Decisões a tomar:**

- Quantidade ideal de lições por módulo (evitar sobrecarga)
- Incluir estudos de caso como lições interativas ou apenas como exercícios de reflexão?
- Nível do público-alvo: generalista intermediário ou já pressupõe conhecimento de backend?

---

### Etapa 2 — Criar `course.json`

Criar o arquivo `src/courses/system-design/course.json` seguindo o schema da plataforma:

```
src/courses/system-design/
  course.json
  lessons/
    ...
```

Campos obrigatórios: `id`, `title`, `description`, `icon`, `tags`, `aiReviewContext`, `modules`.

**Critério de sucesso:** arquivo válido, curso aparece na HomePage sem erros.

---

### Etapa 3 — Criar lições dos módulos fundamentais (MVP)

Começar pelos módulos de menor dependência conceitual:

1. **Introdução** — o que é System Design, por que importa, como pensar em sistemas
2. **Fundamentos de rede** — TCP/UDP, HTTP/HTTPS, DNS, CDN
3. **CAP Theorem** — explicação + exemplos reais + quiz
4. **ACID vs BASE** — trade-offs com exemplos práticos
5. **Caching** — estratégias (write-through, write-back, eviction policies)
6. **Load Balancers** — tipos, algoritmos, quando usar

Cada lição deve ter: `content` (markdown), pelo menos 1 `quiz` com 3–4 questões, e `challenge` ou `practiceQuestions` quando aplicável.

**Critério de sucesso:** 6+ lições publicáveis, com conteúdo pedagógico sólido e quizzes funcionais.

---

### Etapa 4 — Lições intermediárias e avançadas

Após validar o MVP, expandir para os módulos restantes:

- Escalabilidade (sharding, replicação, scale cube)
- Sistemas distribuídos (mensageria, event-driven)
- Padrões avançados (CQRS, Saga, Event Sourcing)
- Resiliência (circuit breaker, bulkhead, retry)
- Observabilidade (logs, métricas, tracing)

**Critério de sucesso:** todos os módulos do currículo aprovado têm pelo menos 2 lições publicadas.

---

### Etapa 5 — Estudos de caso interativos

Criar lições de estudo de caso com o formato de reflexão guiada:

- **Link Shortener** (básico) — requisitos, estimativas, decisões de design
- **Sistema de Notificações** (intermediário) — múltiplos canais, rate limiting, filas
- **Sistema Financeiro / Ledger** (avançado) — consistência, auditoria, CQRS

Formato sugerido: `practiceQuestions` abertas + `aiReviewContext` especializado para feedback de IA.

**Critério de sucesso:** 3 estudos de caso implementados como lições, com contexto de revisão de IA configurado.

---

## Questões a responder

- Qual nível de profundidade técnica é adequado? (introdutório tipo "saiba que existe" vs aprofundado com implementação)
- Os estudos de caso devem ter diagrama/imagem ou apenas texto descritivo?
- Incluir lições com Sandpack (código executável) para algum tópico específico? (ex: simulação de cache, rate limiting)
- O `aiReviewContext` do curso deve ser genérico de "System Design" ou especializado por módulo?
- Integrar referências externas (artigos do fidelissauro.dev, papers clássicos como Dynamo, Bigtable) como `furtherReading`?

---

## Entregável

- `src/courses/system-design/course.json` — estrutura completa do curso com todos os módulos
- `src/courses/system-design/lessons/*.json` — mínimo de 6 lições MVP (fundamentos) + roadmap das demais
- Curso funcional na HomePage, navegável e com quizzes operacionais
- (Opcional) 3 estudos de caso como lições interativas com suporte a revisão de IA
