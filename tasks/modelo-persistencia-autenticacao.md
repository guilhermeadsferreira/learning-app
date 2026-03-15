# Modelo mínimo de persistência para autenticação

**Status:** pendente

---

## Objetivo

Projetar o modelo de dados mínimo necessário caso a plataforma precisasse de login e persistência de estado por usuário.

## Contexto

Hoje tudo roda no client (localStorage). Se quiséssemos que o usuário fizesse login e mantivesse seus dados entre dispositivos, o que precisaríamos persistir no mínimo?

## Entidades a considerar

- **Usuário:** id, nome, email, avatar, data de criação
- **Autenticação:** método (OAuth? email/senha? magic link?), tokens, sessões
- **Configurações do usuário:** provider de AI review (Claude / ChatGPT), modelo preferido, tema visual
- **Progresso:** lições completadas, status por módulo, porcentagem de conclusão por curso
- **XP:** total acumulado, histórico de ganhos (por lição, por dia)
- **Cursos:** quais cursos o usuário está inscrito, qual está ativo

## Questões a responder

- Qual o schema mínimo viável (tabelas/coleções)?
- Qual stack de persistência seria adequada para um projeto gratuito/low-cost? (Supabase, Firebase, PlanetScale, etc.)
- O que pode continuar no localStorage vs. o que precisa ir pro servidor?
- Como migrar dados existentes do localStorage para o backend?

## Entregável

Documento `documents/tech/persistence-model.md` com diagrama de entidades, justificativa da stack e plano de migração.
