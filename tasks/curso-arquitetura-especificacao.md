# Especificação do Curso: Arquitetura de Software

**Status:** pendente — usar Sonnet ou Opus para gerar o conteúdo

**Objetivo:** Este documento serve como blueprint completo para criar o curso de Arquitetura de Software. Ao executar a geração, use este spec como fonte de verdade.

---

## 1. Metadados do curso (course.json)

```json
{
  "id": "arquitetura-software",
  "title": "Arquitetura de Software: Do Dev ao Arquiteto",
  "description": "Curso completo de arquitetura de software: papéis (Tech Lead, Staff, Arquiteto), NFRs, padrões arquiteturais, DDD, sistemas distribuídos, integração, avaliação, segurança, documentação e liderança técnica. Do iniciante ao avançado.",
  "icon": "🏛️",
  "tags": ["arquitetura", "sistema", "tech lead", "staff engineer", "avançado", "carreira"],
  "aiReviewContext": {
    "subject": "Arquitetura de Software",
    "expertise": "padrões arquiteturais, DDD, sistemas distribuídos, NFRs, trade-offs, ADRs, liderança técnica",
    "codeLanguage": "text",
    "challengeStyle": "scenario"
  },
  "modules": [
    /* ver seção 2 */
  ]
}
```

**Regras:**

- Curso é **conceitual** — usar apenas `explanation` e `quiz`, **nunca** `challenge` com código
- XP: 10 para explanation, 10 para quiz
- Conteúdo em **português brasileiro**
- Parágrafos: máximo 6 linhas
- Cada lição deve ter: `analogy`, `keyTakeaways`, `commonMistakes` (quando aplicável), `realWorldExample`, `encouragement`

---

## 2. Estrutura de módulos e lições

### Módulo 1 — O Papel do Arquiteto

**id:** `papel-arquiteto`

| #   | lesson-id                       | title                                                  | type        | difficulty |
| --- | ------------------------------- | ------------------------------------------------------ | ----------- | ---------- |
| 1   | o-que-e-arquitetura             | O que é Arquitetura de Software?                       | explanation | beginner   |
| 2   | roles-tech-lead-staff-arquiteto | Tech Lead, Staff Engineer e Arquiteto: quem faz o quê? | explanation | beginner   |
| 3   | pensamento-sistemico            | Pensamento Sistêmico e Visão de Produto                | explanation | beginner   |
| 4   | quiz-roles-e-responsabilidades  | Quiz: Papéis e Responsabilidades                       | quiz        | beginner   |

---

### Módulo 2 — Qualidades de Sistema (NFRs e Trade-offs)

**id:** `nfr-tradeoffs`

| #   | lesson-id                        | title                                                   | type        | difficulty   |
| --- | -------------------------------- | ------------------------------------------------------- | ----------- | ------------ |
| 5   | nfr-o-que-sao                    | Requisitos Não-Funcionais: o que são e por que importam | explanation | beginner     |
| 6   | escalabilidade-disponibilidade   | Escalabilidade, Disponibilidade e Resiliência           | explanation | beginner     |
| 7   | performance-seguranca-manutencao | Performance, Segurança e Manutenibilidade               | explanation | intermediate |
| 8   | trade-offs-arquiteturais         | Trade-offs: A Arte de Escolher o Menos Pior             | explanation | intermediate |
| 9   | quiz-nfrs-trade-offs             | Quiz: Identificando NFRs e Trade-offs                   | quiz        | intermediate |

---

### Módulo 3 — Padrões Arquiteturais

**id:** `padroes-arquiteturais`

| #   | lesson-id                  | title                                                    | type        | difficulty   |
| --- | -------------------------- | -------------------------------------------------------- | ----------- | ------------ |
| 10  | arquitetura-em-camadas     | Arquitetura em Camadas (N-Tier)                          | explanation | beginner     |
| 11  | monolito-vs-microservicos  | Monolito vs. Microserviços: quando usar cada um          | explanation | intermediate |
| 12  | arquitetura-hexagonal      | Arquitetura Hexagonal (Ports & Adapters)                 | explanation | intermediate |
| 13  | event-driven-architecture  | Event-Driven Architecture: sistemas orientados a eventos | explanation | intermediate |
| 14  | quiz-padroes-arquiteturais | Quiz: Escolhendo o Padrão Certo                          | quiz        | intermediate |

---

### Módulo 4 — Arquitetura de Integração

**id:** `arquitetura-integracao`

| #   | lesson-id                   | title                                            | type        | difficulty   |
| --- | --------------------------- | ------------------------------------------------ | ----------- | ------------ |
| 15  | api-gateway                 | API Gateway: ponto único de entrada              | explanation | intermediate |
| 16  | message-broker-event-bus    | Message Broker e Event Bus                       | explanation | intermediate |
| 17  | anti-corruption-layer       | Anti-Corruption Layer: isolando sistemas legados | explanation | intermediate |
| 18  | quiz-arquitetura-integracao | Quiz: Cenários de Integração                     | quiz        | intermediate |

---

### Módulo 5 — Domain-Driven Design (DDD)

**id:** `ddd`

| #   | lesson-id                 | title                                     | type        | difficulty   |
| --- | ------------------------- | ----------------------------------------- | ----------- | ------------ |
| 19  | ddd-introducao            | Introdução ao DDD e Linguagem Ubíqua      | explanation | intermediate |
| 20  | ddd-bounded-context       | Bounded Context e Context Map             | explanation | intermediate |
| 21  | ddd-taticos-entidades-vo  | Entidades, Value Objects e Aggregates     | explanation | intermediate |
| 22  | ddd-servicos-repositorios | Domain Services, Repositories e Factories | explanation | intermediate |
| 23  | quiz-ddd                  | Quiz: Aplicando DDD na prática            | quiz        | intermediate |

---

### Módulo 6 — Sistemas Distribuídos

**id:** `sistemas-distribuidos`

| #   | lesson-id                  | title                                               | type        | difficulty   |
| --- | -------------------------- | --------------------------------------------------- | ----------- | ------------ |
| 24  | cap-theorem                | CAP Theorem e Consistência Eventual                 | explanation | intermediate |
| 25  | comunicacao-sync-async     | Comunicação entre Serviços: síncrono vs. assíncrono | explanation | intermediate |
| 26  | padroes-resiliencia        | Circuit Breaker, Retry e Bulkhead                   | explanation | intermediate |
| 27  | cqrs-event-sourcing        | CQRS e Event Sourcing                               | explanation | advanced     |
| 28  | saga-pattern               | Saga Pattern e Transações Distribuídas              | explanation | advanced     |
| 29  | quiz-sistemas-distribuidos | Quiz: Sistemas Distribuídos na Prática              | quiz        | advanced     |

---

### Módulo 7 — Arquitetura de Dados e Cloud

**id:** `dados-cloud`

| #   | lesson-id             | title                                     | type        | difficulty   |
| --- | --------------------- | ----------------------------------------- | ----------- | ------------ |
| 30  | sql-vs-nosql          | SQL vs. NoSQL: quando usar cada um        | explanation | intermediate |
| 31  | estrategias-cache     | Estratégias de Cache: onde e como aplicar | explanation | intermediate |
| 32  | cloud-native-12factor | Cloud-Native e os 12 Fatores              | explanation | intermediate |
| 33  | observabilidade       | Observabilidade: Logs, Métricas e Traces  | explanation | intermediate |
| 34  | quiz-dados-cloud      | Quiz: Dados e Cloud na Prática            | quiz        | intermediate |

---

### Módulo 8 — Avaliação de Arquitetura

**id:** `avaliacao-arquitetura`

| #   | lesson-id                  | title                                       | type        | difficulty   |
| --- | -------------------------- | ------------------------------------------- | ----------- | ------------ |
| 35  | architecture-reviews       | Architecture Reviews: como avaliar decisões | explanation | intermediate |
| 36  | atam-risk-analysis         | ATAM e análise de riscos arquiteturais      | explanation | advanced     |
| 37  | quiz-avaliacao-arquitetura | Quiz: Avaliando uma Arquitetura             | quiz        | advanced     |

---

### Módulo 9 — Arquitetura de Segurança

**id:** `arquitetura-seguranca`

| #   | lesson-id                  | title                                      | type        | difficulty   |
| --- | -------------------------- | ------------------------------------------ | ----------- | ------------ |
| 38  | threat-modeling            | Threat Modeling: identificando ameaças     | explanation | intermediate |
| 39  | zero-trust                 | Zero Trust: nunca confie, sempre verifique | explanation | advanced     |
| 40  | seguranca-microservices    | Segurança em Microserviços                 | explanation | advanced     |
| 41  | quiz-arquitetura-seguranca | Quiz: Decisões de Segurança                | quiz        | advanced     |

---

### Módulo 10 — Documentação e Governança Arquitetural

**id:** `documentacao-governanca`

| #   | lesson-id                         | title                                          | type        | difficulty   |
| --- | --------------------------------- | ---------------------------------------------- | ----------- | ------------ |
| 42  | adr-architecture-decision-records | ADRs: Registrando Decisões Arquiteturais       | explanation | intermediate |
| 43  | c4-model                          | Modelo C4: Comunicando Arquitetura Visualmente | explanation | intermediate |
| 44  | divida-tecnica                    | Dívida Técnica: Identificação e Gestão         | explanation | intermediate |
| 45  | quiz-documentacao-governanca      | Quiz: Documentação e Governança                | quiz        | intermediate |

---

### Módulo 11 — Liderança Técnica e Carreira

**id:** `lideranca-carreira`

| #   | lesson-id                    | title                                                   | type        | difficulty |
| --- | ---------------------------- | ------------------------------------------------------- | ----------- | ---------- |
| 46  | arquitetura-evolutiva        | Arquitetura Evolutiva: sistemas que mudam no tempo      | explanation | advanced   |
| 47  | lideranca-tecnica-influencia | Liderança Técnica: Influência sem Autoridade            | explanation | advanced   |
| 48  | comunicacao-stakeholders     | Comunicando Arquitetura para Stakeholders               | explanation | advanced   |
| 49  | modernizacao-migracao        | Modernização: Strangler Fig, Reescritas e Build vs. Buy | explanation | advanced   |
| 50  | quiz-lideranca-carreira      | Quiz: Decisões de Liderança e Estratégia                | quiz        | advanced   |

---

## 3. Conteúdo detalhado por lição

Para cada lição, a IA deve gerar JSON seguindo `lesson_schema.md`. Abaixo, **outlines** e **pontos-chave** para guiar a geração.

---

### Módulo 1 — O Papel do Arquiteto

#### o-que-e-arquitetura

- **Analogia sugerida:** Arquitetura de software é como a planta de um prédio: define estrutura, fluxos, onde cada coisa fica, sem detalhar cada tijolo.
- **Seções:** O que é arquitetura; decisões estruturantes vs. implementação; por que importa; diferença entre design e arquitetura.
- **Key takeaways:** Arquitetura = decisões difíceis de mudar; foca em estrutura, não em código; evolui com o produto.

#### roles-tech-lead-staff-arquiteto

- **Analogia sugerida:** Tech Lead é o capitão do barco; Staff é o navegador que traça rotas; Arquiteto é quem desenha o porto.
- **Seções:** Tech Lead (escopo: time, 30–70% código); Staff (2–4 times, padrões, mentoria); Arquiteto/Principal (organização, estratégia).
- **Key takeaways:** Escopo aumenta; menos código, mais influência; todos precisam de profundidade técnica.

#### pensamento-sistemico

- **Analogia sugerida:** Pensar em sistemas é como um médico: não trata só o sintoma, entende o corpo inteiro.
- **Seções:** Visão holística; impacto em cascata; alinhamento com negócio; perguntas que o arquiteto faz.
- **Key takeaways:** Decisões têm efeitos colaterais; contexto de negócio importa; perguntar "e se?" antes de decidir.

#### quiz-roles-e-responsabilidades

- **Perguntas sugeridas (2–4):**
  1. Quem normalmente toma decisões de arquitetura que afetam toda a organização? (Arquiteto/Principal)
  2. O que caracteriza o Tech Lead em relação ao tempo em código? (30–70% em código)
  3. Staff Engineer atua em quantos times tipicamente? (2–4 times, 50–100 engenheiros)
  4. Qual papel foca mais em estratégia de tecnologia de longo prazo? (Arquiteto)

---

### Módulo 2 — Qualidades de Sistema (NFRs)

#### nfr-o-que-sao

- **Analogia sugerida:** NFRs são como as especificações de um carro: potência, consumo, segurança — não é "ter 4 rodas", é "como" o carro se comporta.
- **Seções:** O que são NFRs; exemplos (performance, disponibilidade, segurança); por que vêm antes de padrões.
- **Key takeaways:** NFRs guiam decisões; ignorá-los gera retrabalho; priorizar conforme o contexto.

#### escalabilidade-disponibilidade

- **Analogia sugerida:** Escalabilidade é aumentar a capacidade do restaurante; disponibilidade é nunca fechar as portas.
- **Seções:** Escalabilidade vertical vs. horizontal; disponibilidade e SLAs; resiliência (recuperação após falha).
- **Key takeaways:** Escalar horizontalmente é o padrão em cloud; 99.9% = ~8,7h downtime/ano; resiliência exige design.

#### performance-seguranca-manutencao

- **Seções:** Performance (latência, throughput); segurança (confidencialidade, integridade); manutenibilidade (legibilidade, testes, dívida).
- **Key takeaways:** Trade-offs entre eles; segurança não é "depois"; manutenibilidade reduz custo de evolução.

#### trade-offs-arquiteturais

- **Analogia sugerida:** Trade-off é como escolher entre velocidade e economia no carro: não dá para maximizar os dois.
- **Seções:** O que é trade-off; exemplos (consistência vs. disponibilidade); como documentar; aceitar o "menos pior".
- **Key takeaways:** Não existe solução perfeita; documentar o porquê; revisar quando o contexto muda.

#### quiz-nfrs-trade-offs

- **Perguntas sugeridas:**
  1. O que significa 99.9% de disponibilidade em horas de downtime por ano? (~8,7h)
  2. Escalabilidade vertical vs. horizontal — qual é preferível em cloud?
  3. Por que segurança deve ser considerada desde o design?
  4. O que é um trade-off arquitetural?

---

### Módulo 3 — Padrões Arquiteturais

#### arquitetura-em-camadas

- **Analogia sugerida:** Camadas são como andares de um prédio: cada um tem uma função, e você não pula do térreo direto pro telhado.
- **Seções:** Apresentação, negócio, dados; dependência unidirecional; quando usar; limites.
- **Key takeaways:** Separação de responsabilidades; dependências de cima para baixo; monolito bem organizado.

#### monolito-vs-microservicos

- **Analogia sugerida:** Monolito é um supermercado; microserviços são lojas especializadas — cada um tem prós e contras.
- **Seções:** O que é cada um; quando começar com monolito; quando evoluir para microserviços; armadilhas.
- **Key takeaways:** Monolito primeiro na maioria dos casos; microserviços exigem maturidade operacional; não é "tudo ou nada".

#### arquitetura-hexagonal

- **Analogia sugerida:** O núcleo (domínio) no centro; portas são contratos; adaptadores conectam ao mundo externo.
- **Seções:** Ports & Adapters; domínio no centro; independência de frameworks e DBs; testes facilitados.
- **Key takeaways:** Domínio isolado; trocar DB ou API sem mudar o núcleo; inversão de dependência.

#### event-driven-architecture

- **Analogia sugerida:** Eventos são como cartas no correio: você envia e não espera resposta imediata; quem precisa reage.
- **Seções:** Publicar/assinar; desacoplamento; consistência eventual; quando usar.
- **Key takeaways:** Assíncrono por natureza; serviços independentes; debugging mais complexo.

#### quiz-padroes-arquiteturais

- **Perguntas sugeridas:**
  1. Em arquitetura em camadas, qual camada NÃO deve depender da camada de apresentação?
  2. Quando faz sentido começar com microserviços em vez de monolito?
  3. Na arquitetura hexagonal, o que são "adapters"?
  4. Qual a principal vantagem de event-driven em relação a chamadas síncronas?

---

### Módulo 4 — Arquitetura de Integração

#### api-gateway

- **Analogia sugerida:** API Gateway é a recepção do hotel: um único ponto de entrada que roteia, autentica e protege.
- **Seções:** Ponto único de entrada; autenticação, rate limiting, roteamento; BFF (Backend for Frontend); quando usar.
- **Key takeaways:** Centraliza cross-cutting; pode virar gargalo; BFF para necessidades específicas por cliente.

#### message-broker-event-bus

- **Analogia sugerida:** Message broker é a central de mensagens; event bus é o sistema de alto-falantes da empresa.
- **Seções:** Broker (Kafka, RabbitMQ) vs. bus (pub/sub); garantias de entrega; padrões de mensageria.
- **Key takeaways:** Broker persiste; bus pode ser efêmero; escolha conforme garantias necessárias.

#### anti-corruption-layer

- **Analogia sugerida:** ACL é o tradutor entre dois idiomas: protege seu sistema do "sotaque" do legado.
- **Seções:** O que é; quando usar (integração com legado); tradução de modelos; isolamento.
- **Key takeaways:** Evita poluir o domínio; traduz na borda; permite evoluir o legado sem acoplar.

#### quiz-arquitetura-integracao

- **Perguntas sugeridas:**
  1. Qual a principal função de um API Gateway?
  2. Diferença entre message broker e event bus?
  3. Quando usar Anti-Corruption Layer?
  4. O que é BFF no contexto de API Gateway?

---

### Módulo 5 — DDD

#### ddd-introducao

- **Analogia sugerida:** DDD é falar a língua do negócio — o código usa os mesmos termos que o domínio.
- **Seções:** O que é DDD; linguagem ubíqua; colaboração com especialistas de domínio; estratégico vs. tático.
- **Key takeaways:** Código reflete o domínio; linguagem compartilhada; foco na complexidade do domínio.

#### ddd-bounded-context

- **Analogia sugerida:** Bounded Context é como departamentos de uma empresa: cada um tem seu glossário e regras.
- **Seções:** O que é; Context Map; relações entre contextos (shared kernel, customer-supplier, etc.).
- **Key takeaways:** Um modelo unificado para todo o sistema não escala; limites claros; integração explícita.

#### ddd-taticos-entidades-vo

- **Seções:** Entidade (identidade); Value Object (sem identidade, imutável); Aggregate (cluster de consistência); Aggregate Root.
- **Key takeaways:** VO por valor; entidade por identidade; aggregate = unidade de consistência.

#### ddd-servicos-repositorios

- **Seções:** Domain Service (lógica que não cabe em entidade/VO); Repository (abstração de persistência); Factory (criação complexa).
- **Key takeaways:** Repository retorna aggregate; Domain Service stateless; Factory encapsula criação.

#### quiz-ddd

- **Perguntas sugeridas:**
  1. O que é linguagem ubíqua em DDD?
  2. Por que Bounded Context existe?
  3. Qual a diferença entre Entidade e Value Object?
  4. O que é um Aggregate Root?

---

### Módulo 6 — Sistemas Distribuídos

#### cap-theorem

- **Analogia sugerida:** CAP é como escolher entre rapidez, consistência e disponibilidade em uma rede — você não tem os três.
- **Seções:** Consistency, Availability, Partition tolerance; na prática, P é inevitável; PACELC; consistência eventual.
- **Key takeaways:** Em rede, P é dado; escolha entre C e A; eventual consistency é comum.

#### comunicacao-sync-async

- **Seções:** Síncrono (REST, gRPC) vs. assíncrono (mensagens); quando usar cada um; acoplamento e latência.
- **Key takeaways:** Síncrono: simples, acoplado; assíncrono: desacoplado, eventual; híbrido é comum.

#### padroes-resiliencia

- **Seções:** Circuit Breaker (evitar cascata); Retry (com backoff); Bulkhead (isolar falhas); Timeout.
- **Key takeaways:** Falhas se propagam; circuit breaker protege; retry com cuidado (idempotência).

#### cqrs-event-sourcing

- **Seções:** CQRS: separar leitura e escrita; Event Sourcing: estado como sequência de eventos; quando combinar.
- **Key takeaways:** CQRS para perfis diferentes; Event Sourcing para auditoria e replay; complexidade operacional.

#### saga-pattern

- **Seções:** Transações distribuídas; Saga: passos locais + compensação; orquestração vs. coreografia.
- **Key takeaways:** 2PC raramente usado; Saga com compensação; orquestração mais controle, coreografia mais desacoplada.

#### quiz-sistemas-distribuidos

- **Perguntas sugeridas:**
  1. No CAP, por que Partition tolerance é inevitável em sistemas distribuídos?
  2. Quando preferir comunicação assíncrona?
  3. O que faz um Circuit Breaker?
  4. Qual a diferença entre Saga orquestrada e coreografada?

---

### Módulo 7 — Dados e Cloud

#### sql-vs-nosql

- **Seções:** SQL (ACID, esquema); NoSQL (documentos, chave-valor, grafos); quando usar cada um; polyglot persistence.
- **Key takeaways:** Escolha pelo caso de uso; não há bala de prata; esquema flexível tem custo.

#### estrategias-cache

- **Seções:** Cache-aside, write-through, write-behind; onde colocar (CDN, aplicação, DB); invalidação; TTL.
- **Key takeaways:** Cache é complexidade; invalidação é o problema; TTL como fallback.

#### cloud-native-12factor

- **Seções:** Os 12 fatores (codebase, dependências, config, backing services, etc.); por que importam; containers.
- **Key takeaways:** Config em env; stateless; disposability; logs como stream.

#### observabilidade

- **Seções:** Logs, métricas, traces; os três pilares; ferramentas (Prometheus, Jaeger, etc.); correlation ID.
- **Key takeaways:** Observabilidade ≠ monitoramento; traces conectam requisições; métricas para SLOs.

#### quiz-dados-cloud

- **Perguntas sugeridas:**
  1. Quando preferir NoSQL documental em vez de SQL?
  2. O que é cache-aside?
  3. Qual fator dos 12 recomenda config via variáveis de ambiente?
  4. Qual a diferença entre logs e traces?

---

### Módulo 8 — Avaliação de Arquitetura

#### architecture-reviews

- **Seções:** O que é; quando fazer; checklist; quem participa; resultado (aprovado, condicionado, rejeitado).
- **Key takeaways:** Revisão antes de implementar; foco em riscos; documentar decisões.

#### atam-risk-analysis

- **Seções:** ATAM (Architecture Tradeoff Analysis Method); cenários; análise de sensibilidade; riscos e trade-offs.
- **Key takeaways:** ATAM estrutura a avaliação; cenários concretos; riscos explícitos.

#### quiz-avaliacao-arquitetura

- **Perguntas sugeridas:**
  1. Qual o objetivo principal de uma architecture review?
  2. O que o ATAM analisa?
  3. Quando fazer uma architecture review no ciclo de vida?

---

### Módulo 9 — Arquitetura de Segurança

#### threat-modeling

- **Seções:** O que é; STRIDE; diagrama de fluxo de dados; mitigação; quando fazer.
- **Key takeaways:** Ameaças explícitas; STRIDE como checklist; integrar no design.

#### zero-trust

- **Seções:** "Nunca confie, sempre verifique"; rede não é perímetro; identidade e least privilege; implementação gradual.
- **Key takeaways:** Assume breach; verificação contínua; identidade como perímetro.

#### seguranca-microservices

- **Seções:** Autenticação entre serviços; mTLS; secrets; API security; OWASP em microserviços.
- **Key takeaways:** Cada serviço é um vetor; mTLS para service-to-service; secrets nunca no código.

#### quiz-arquitetura-seguranca

- **Perguntas sugeridas:**
  1. O que é STRIDE em threat modeling?
  2. Princípio central do Zero Trust?
  3. Como proteger comunicação entre microserviços?

---

### Módulo 10 — Documentação e Governança

#### adr-architecture-decision-records

- **Seções:** O que é ADR; estrutura (contexto, decisão, consequências); quando escrever; versionamento.
- **Key takeaways:** Decisões imutáveis; contexto e alternativas; histórico de porquês.

#### c4-model

- **Seções:** Context, Container, Component, Code; níveis de abstração; ferramentas; quando usar.
- **Key takeaways:** C4 escala a abstração; Context para stakeholders; Component para devs.

#### divida-tecnica

- **Seções:** O que é; deliberada vs. inadvertida; quando pagar; priorização; comunicação.
- **Key takeaways:** Dívida não é sempre ruim; documentar e priorizar; evitar surpresas.

#### quiz-documentacao-governanca

- **Perguntas sugeridas:**
  1. O que um ADR deve conter?
  2. Qual nível do C4 é mais adequado para stakeholders de negócio?
  3. Dívida técnica deliberada — quando faz sentido?

---

### Módulo 11 — Liderança Técnica e Carreira

#### arquitetura-evolutiva

- **Seções:** Arquitetura não é estática; design para mudança; fitness functions; decisões reversíveis.
- **Key takeaways:** Evolução é inevitável; last responsible moment; evitar over-engineering.

#### lideranca-tecnica-influencia

- **Seções:** Influência sem autoridade; RFCs e ADRs; mentoria; exemplos; storytelling técnico.
- **Key takeaways:** Autoridade ≠ influência; documentar ajuda; construir confiança.

#### comunicacao-stakeholders

- **Seções:** Linguagem por audiência; trade-offs em termos de negócio; storytelling; quando dizer não.
- **Key takeaways:** Evitar jargão; impacto em valor; "não" com alternativas.

#### modernizacao-migracao

- **Seções:** Strangler Fig; reescrita vs. refatoração; Build vs. Buy; quando migrar.
- **Key takeaways:** Strangler para substituição gradual; reescrita é risco; Buy quando commodity.

#### quiz-lideranca-carreira

- **Perguntas sugeridas:**
  1. O que é o padrão Strangler Fig?
  2. Como um arquiteto influencia sem autoridade formal?
  3. Quando considerar Buy em vez de Build?

---

## 4. Checklist de geração

Ao gerar cada lição, verificar:

- [ ] `id`, `courseId`, `moduleId`, `title`, `type`, `xp` corretos
- [ ] `content.sections` com tipos válidos: `heading`, `paragraph`, `code` (só se houver exemplo), `list`, `callout`
- [ ] `analogy` presente e concreta
- [ ] `keyTakeaways` com 2–4 itens
- [ ] `commonMistakes` quando aplicável
- [ ] `realWorldExample` e `encouragement`
- [ ] Quiz: `question` + `options` com `id`, `text`, `isCorrect`, `explanation`
- [ ] Parágrafos com no máximo 6 linhas
- [ ] Conteúdo em português brasileiro

---

## 5. Ordem de execução

1. Criar `src/courses/arquitetura-software/course.json`
2. Criar pasta `src/courses/arquitetura-software/lessons/`
3. Gerar lições **por módulo** (lote 1: módulo 1, lote 2: módulo 2, etc.)
4. Verificar: todos os IDs do course.json têm arquivo correspondente
5. Rodar `npm run lint` antes de considerar concluído

---

## 6. Referências

- `documents/product/lesson_schema.md`
- `documents/product/course_schema.md`
- `documents/product/content_generation.md`
- `documents/product/pedagogy.md`
