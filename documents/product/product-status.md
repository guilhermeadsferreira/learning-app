# Product Status — Learning Engine

**Última atualização:** 2026-03-15

---

## O que existe hoje

### Cursos disponíveis

| Curso | Status | Módulos | Lições |
|-------|--------|---------|--------|
| React: Do Iniciante ao Avançado | ✅ Completo (estrutura) | 16 | ~94 slots (alguns parcialmente implementados) |
| Claude Code: Do Iniciante ao Avançado | ✅ Completo | 10 | 43 |
| Arquitetura de Software: Do Dev ao Arquiteto | ✅ Completo (estrutura) | 11 | ~50 slots |

> **Nota sobre React:** módulos de testing, performance e advanced têm lições referenciadas no `course.json` que podem não ter arquivos `.json` correspondentes ainda. Verificar antes de publicar como "completo".

### Features ativas

| Feature | Status | Notas |
|---------|--------|-------|
| Gamificação (XP) | ✅ Ativo | 10 XP para explanation/quiz, 25 XP para challenge |
| Professor IA (AI Review) | ✅ Ativo | Suporta Claude (Anthropic), OpenAI e OpenRouter |
| Busca e filtro por tags | ✅ Ativo | Na HomePage, via `useCourseFilter` |
| Quiz interativo | ✅ Ativo | Tipo `quiz` com retrieval practice |
| Challenges com Sandpack | ✅ Ativo | Execução de código in-browser via `@codesandbox/sandpack-react` |
| Progresso persistido | ✅ Ativo | `localStorage` — chave `learning-engine-progress` |
| Sidebar de curso | ✅ Ativo | Navegação por módulos e lições com progresso visual |
| Dark mode | ✅ Ativo | Via classe Tailwind |
| Navegação prev/next | ✅ Ativo | Via `useLessonNavigation` |
| Settings drawer | ✅ Ativo | Configuração de provider e API key de IA |

### Stack atual

- **Runtime:** React 18 + TypeScript + Vite (SPA client-side only)
- **Estilo:** Tailwind CSS v3 + shadcn/ui (base-nova) + Lucide icons
- **Roteamento:** React Router v7
- **Persistência:** 100% `localStorage` — sem backend, sem auth
- **Execução de código:** Sandpack (`@codesandbox/sandpack-react`)
- **Notificações:** Sonner
- **Integrações de IA:** Anthropic, OpenAI, OpenRouter (via `src/services/ai/`)

---

## O que está funcionando bem (hipóteses)

- **Currículo denso e progressivo:** o curso de React cobre do ecossistema básico até padrões avançados, com uma progressão lógica bem estruturada
- **AI Review integrado ao fluxo de aprendizado:** o Professor IA está disponível diretamente nas lições, sem fricção de troca de contexto
- **Zero configuração de infraestrutura:** sendo 100% client-side, não há preocupações com deploys, banco de dados ou autenticação para o usuário final
- **Conteúdo declarativo e extensível:** adicionar um novo curso não exige código — só criar arquivos JSON, o que acelera a produção de conteúdo
- **Sandpack para challenges:** execução de código in-browser sem configuração de ambiente é um diferencial significativo para iniciantes

---

## Gaps e limitações conhecidas

### Funcionais
- **Sem autenticação:** progresso é local ao dispositivo/browser — troca de dispositivo perde tudo
- **Sem persistência multi-device:** dependência total do `localStorage` é um teto para retenção de longo prazo
- **Sem mini projetos integrados aos módulos** *(aspiracional — não implementado ainda)*
- **Sem spaced repetition** *(aspiracional — não implementado ainda)*
- **Sem trilha de aprendizado guiada:** usuário começa por qualquer curso/lição sem onboarding ou recomendação de sequência

### Conteúdo
- Cursos de React e Arquitetura: auditoria completa de lições pendente (campos pedagógicos ausentes identificados no `/review-course`)
- Curso de Claude Code: mais recente — qualidade pedagógica ainda não auditada sistematicamente
- Nenhum curso voltado a bancos de dados (SQL Server, PostgreSQL, MongoDB estão no backlog)
- Nenhum curso de cloud (AWS Cloud Practitioner no backlog)

### Experiência
- **Identidade da plataforma indefinida:** sem nome, sem tagline, sem identidade visual própria além do shadcn base
- **Homepage genérica:** catálogo de cursos sem personalização, sem indicação de "por onde começar"
- **Sem certificado ou marco de conclusão:** sem sinalização de progresso significativo além do XP

---

## Próximas evoluções em radar

> Esta seção não é um backlog formal — é o que está sendo considerado. Para backlog priorizado, ver `tasks/`.

| Evolução | Impacto estimado | Complexidade |
|----------|-----------------|--------------|
| Identidade da plataforma (nome, marca, pitch) | Alto — ancora posicionamento | Baixa (decisão + texto) |
| Mini projetos por módulo | Alto — aumenta retenção e aplicação prática | Alta |
| Autenticação + persistência multi-device | Alto — remove atrito de troca de dispositivo | Muito alta |
| Novos cursos (SQL, MongoDB, AWS, System Design) | Alto — amplia público-alvo | Média por curso |
| Spaced repetition | Médio — diferencial pedagógico | Alta |
| Projeto final de Arquitetura | Médio — ancora o curso mais avançado | Média |

---

## Slash commands disponíveis para gestão de produto

| Comando | Uso |
|---------|-----|
| `/product-review` | Ativa persona de PM para análise do produto e priorização de backlog |
| `/review-course [courseId]` | Audita e melhora um curso específico |
| `/new-course [tema]` | Cria curso completo do zero |
| `/new-content [contexto]` | Adiciona lição a curso existente |
