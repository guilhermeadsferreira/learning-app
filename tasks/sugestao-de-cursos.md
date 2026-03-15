# Área de Sugestões de Cursos

**Status:** pendente

---

## Objetivo

Criar uma área onde usuários possam sugerir novos cursos que gostariam de ver na plataforma, permitindo que a equipe priorize o roadmap de conteúdo com base em demanda real.

## Contexto

O projeto está além do MVP e já possui um curso completo de React (16 módulos, 65 lições). O PRD §16 lista novos cursos como próximo passo (Python, TypeScript, Next.js, Node.js, Docker), mas não há mecanismo para entender quais cursos os usuários mais desejam.

Uma área de sugestões resolve dois problemas:

1. **Produto**: priorizar o roadmap de novos cursos com base em demanda real, não em suposições
2. **Engajamento**: o usuário se sente parte da construção da plataforma, o que aumenta retenção e pertencimento

Por ser uma plataforma sem backend por enquanto (persistência em localStorage), a solução deve considerar uma abordagem simples mas funcional — como um formulário que envia os dados para um destino acessível (e-mail, Notion, Airtable, Google Sheets via webhook, etc.).

## Escopo

### 1. Definir destino das sugestões

Decidir onde as sugestões serão armazenadas e como serão acessadas:

- **Opção A — Google Forms embed**: formulário externo embutido em iframe (zero infra, zero manutenção)
- **Opção B — Formulário próprio + webhook**: form interno enviando para Make/Zapier → Google Sheets ou Notion
- **Opção C — Formulário próprio + e-mail**: form interno enviando via EmailJS ou Formspree
- **Opção D — Airtable embed**: formulário público do Airtable embutido

Critérios de decisão: simplicidade de implementação, facilidade de visualizar as respostas, custo zero.

Recomendação inicial: **Opção C (Formspree)** — formulário próprio com visual integrado ao design da plataforma, sem necessidade de backend. Formspree oferece tier gratuito suficiente para volume inicial.

### 2. Criar a página de sugestões

Nova rota: `/sugestoes` (ou `/suggest`)

Conteúdo da página:

- Título e contexto explicando o propósito
- Lista de cursos já planejados (pode ser estática) para evitar sugestões duplicadas
- Formulário com campos:
  - **Curso sugerido** (texto livre, obrigatório)
  - **Por que você quer aprender isso?** (textarea, opcional)
  - **Seu nível atual** (select: iniciante / intermediário / avançado, opcional)
- Feedback de envio (estado de sucesso e erro)

### 3. Adicionar acesso à área

- Link na **HomePage** (seção de cursos) — ex: card "Não encontrou o que procura? Sugira um curso"
- Possível link no **footer** ou **header** da aplicação

### 4. Curadoria e visualização interna

- Definir como as sugestões serão revisadas (planilha, Notion, inbox de e-mail)
- (Aspiracional) Criar uma visualização pública de cursos mais votados/sugeridos

## Questões a responder

- Qual destino de sugestões será usado (Formspree, Google Forms, outro)?
- A rota deve ser `/sugestoes` (pt-BR) ou `/suggest` (en para consistência com o código)?
- As sugestões devem ser anônimas ou deve haver campo de e-mail opcional?
- Mostrar lista pública de "cursos mais pedidos" no futuro?

## Entregável

- Nova página `/sugestoes` integrada ao design dark mode da plataforma
- Formulário funcional enviando dados para o destino escolhido
- Ponto de entrada visível na HomePage
- Rota registrada no `createBrowserRouter`
