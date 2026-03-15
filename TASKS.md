# Tasks

## 1. Deploy gratuito da aplicação

Investigar e implementar o deploy gratuito do projeto (SPA React + Vite).

**Contexto:** A aplicação é um SPA estático (sem backend próprio). Precisa de uma solução de hospedagem gratuita que suporte roteamento client-side (React Router).

**Comparar opções:**

- Vercel
- Render
- Outras alternativas relevantes (Netlify, GitHub Pages, etc.)

**Critérios de decisão:**

- Facilidade de configuração (ideal: conectar repo e funcionar)
- Suporte a SPA com client-side routing
- Custo zero no tier gratuito
- Tempo de cold start / performance
- Limites do plano gratuito (bandwidth, builds, etc.)

**Entregável:** Escolher a melhor opção, justificar, e configurar o deploy.

---

## 2. PRD de futuras melhorias (roadmap público)

Criar um documento de produto (PRD) voltado para o futuro da plataforma, com foco em abertura para colaboração e feedback de outros alunos.

**Contexto:** A plataforma hoje tem um curso de React. A ideia é evoluir para algo maior — com mais cursos, mais features e contribuição da comunidade.

**O documento deve cobrir:**

- **Novos cursos:** quais temas poderiam ser adicionados (TypeScript, Node, CSS, Git, etc.)
- **Novas features:** ideias como ranking, achievements, modo multiplayer, compartilhamento de progresso, etc.
- **Novas metodologias:** formatos de exercício diferentes, projetos guiados, pair programming simulado, etc.
- **Canal de feedback:** como outros alunos poderiam sugerir melhorias (formulário, GitHub Issues, enquetes, etc.)
- **Priorização:** critérios para decidir o que implementar primeiro (impacto pedagógico, viabilidade técnica, demanda)

**Entregável:** Documento `documents/product/future-roadmap.md` com visão, ideias categorizadas e proposta de coleta de feedback.

---

## 3. Modelo mínimo de persistência para autenticação

Projetar o modelo de dados mínimo necessário caso a plataforma precisasse de login e persistência de estado por usuário.

**Contexto:** Hoje tudo roda no client (localStorage). Se quiséssemos que o usuário fizesse login e mantivesse seus dados entre dispositivos, o que precisaríamos persistir no mínimo?

**Entidades a considerar:**

- **Usuário:** id, nome, email, avatar, data de criação
- **Autenticação:** método (OAuth? email/senha? magic link?), tokens, sessões
- **Configurações do usuário:** provider de AI review (Claude / ChatGPT), modelo preferido, tema visual
- **Progresso:** lições completadas, status por módulo, porcentagem de conclusão por curso
- **XP:** total acumulado, histórico de ganhos (por lição, por dia)
- **Cursos:** quais cursos o usuário está inscrito, qual está ativo

**Questões a responder:**

- Qual o schema mínimo viável (tabelas/coleções)?
- Qual stack de persistência seria adequada para um projeto gratuito/low-cost? (Supabase, Firebase, PlanetScale, etc.)
- O que pode continuar no localStorage vs. o que precisa ir pro servidor?
- Como migrar dados existentes do localStorage para o backend?

**Entregável:** Documento `documents/tech/persistence-model.md` com diagrama de entidades, justificativa da stack e plano de migração.
