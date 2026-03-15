# Curso AWS Cloud Practitioner

**Status:** pendente

---

## Objetivo

Criar um curso completo de preparação para a certificação **AWS Certified Cloud Practitioner (CLF-C02)** usando o comando `/new-course`, cobrindo todos os domínios do exame com foco em compreensão conceitual e prática de cenários.

## Contexto

A AWS Cloud Practitioner é a certificação de entrada da AWS, voltada a quem quer comprovar conhecimento geral sobre a nuvem AWS sem necessariamente ser técnico. É amplamente exigida no mercado e serve como base para certificações mais avançadas.

O curso se encaixa na plataforma como um curso **conceitual/ferramentas** (não de programação), seguindo o padrão de outros cursos de gestão e ferramentas: lições do tipo `explanation` e `quiz`, sem `challenge` (o Sandpack é voltado a código). O `challengeStyle` deve ser `scenario`.

O exame CLF-C02 é dividido em 4 domínios oficiais:

1. **Cloud Concepts** (24%) — o que é cloud, modelo de responsabilidade, benefícios AWS
2. **Security and Compliance** (30%) — IAM, Shield, WAF, modelo shared responsibility
3. **Cloud Technology and Services** (34%) — EC2, S3, RDS, Lambda, VPC, CloudFront, etc.
4. **Billing, Pricing and Support** (12%) — planos de suporte, calculadora de custos, Cost Explorer

## Escopo

### Etapa 1 — Planejamento com `/new-course`

Executar o comando `/new-course` com o tema "AWS Cloud Practitioner (CLF-C02)", que irá:

- Definir metadados do curso (`courseId: aws-cloud-practitioner`)
- Planejar módulos alinhados aos 4 domínios do exame
- Apresentar a estrutura completa para aprovação antes de gerar qualquer arquivo

**Critérios de sucesso:** plano aprovado com 5–8 módulos e 25–40 lições totais.

**Decisões a tomar:**

- Granularidade dos módulos (por domínio do exame ou por serviço AWS?)
- Incluir módulo introdutório sobre o exame e estratégia de prova?
- Lições de simulado no formato quiz ao final de cada módulo?

### Etapa 2 — Geração do `course.json`

Criar `src/courses/aws-cloud-practitioner/course.json` com:

- `id`, `title`, `description`, `icon` (sugestão: ☁️)
- `tags`: `["cloud", "aws", "certificação", "infraestrutura"]`
- `aiReviewContext`: subject AWS, expertise em serviços cloud, challengeStyle `scenario`
- Array de módulos com IDs das lições

### Etapa 3 — Geração das lições por módulo

Gerar todas as lições JSON em `src/courses/aws-cloud-practitioner/lessons/`.

Proporção esperada por módulo:

- ~50% `explanation` (xp: 10) — conceitos, serviços, definições
- ~50% `quiz` (xp: 10) — perguntas no estilo do exame real

Cada lição deve incluir:

- `analogy` conectando o serviço AWS a algo do mundo real
- `keyTakeaways` com os pontos que caem no exame
- `commonMistakes` com confusões comuns entre serviços similares
- `realWorldExample` de caso de uso empresarial

**Atenção especial:**

- Perguntas de quiz devem simular o estilo real do exame CLF-C02
- Diferenciar serviços similares (ex: CloudWatch vs CloudTrail, SQS vs SNS)
- Cobrir siglas e termos que o exame usa (AZ, Region, Edge Location, etc.)

### Etapa 4 — Verificação final

Conferir integridade do curso:

- Todos os `lesson-id` do `course.json` têm arquivo JSON correspondente
- `courseId` e `moduleId` consistentes em todas as lições
- XP correto (10 para explanation/quiz)
- Cobertura dos 4 domínios do exame

## Questões a responder

- Incluir um módulo "Estratégia de prova" com dicas de como fazer o exame?
- Criar lições de "simulado" com 4+ perguntas por quiz para replicar o formato real?
- Cobrir serviços "aspiracionais" da AWS que aparecem no exame mas raramente são usados (ex: Outposts, Local Zones)?
- Usar nomes de serviços em inglês (S3, EC2) ou traduzir os conceitos?

## Entregável

```
src/courses/aws-cloud-practitioner/
  course.json
  lessons/
    *.json  (25–40 arquivos de lição)
```

Curso disponível na home da plataforma, cobrindo os 4 domínios do CLF-C02 com ~250–400 XP total.
