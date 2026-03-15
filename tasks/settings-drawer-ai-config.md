# Settings Drawer — Configuração de IA

**Status:** pendente

---

## Objetivo

Criar um **drawer de configurações** acessível globalmente (ao lado do XP no Header), com a primeira seção dedicada à **configuração da API key de IA** — permitindo definir, atualizar, deletar a chave e trocar de provedor. Incluir também um aviso na Home quando nenhuma chave estiver configurada.

## Contexto

Hoje a configuração de API key da IA acontece via `APIKeyDialog` (`src/components/lesson/APIKeyDialog.tsx`), que é um card inline exibido dentro do fluxo de uma lição challenge. Isso tem limitações:

1. **Acoplamento com lição** — o diálogo só aparece durante um challenge, não é acessível de forma global.
2. **Sem gestão completa** — o componente atual permite apenas salvar uma chave nova, mas não visualizar (mascarada), atualizar ou deletar uma chave existente.
3. **Sem onboarding** — usuários novos não sabem que precisam configurar uma chave até tentarem usar a revisão de IA.

O serviço `src/services/ai-review.ts` já oferece toda a infraestrutura necessária:

- `getStoredApiKey()`, `setStoredApiKey()`, `removeStoredApiKey()`
- `getActiveProvider()`, `setActiveProvider()`
- `getAllProviders()`, `getProviderConfig()`

A task é criar uma **UI de settings como drawer** que consuma essas funções existentes.

### Por que Drawer e não página

O usuário pode estar no meio de um curso/lição e querer ajustar as configurações sem perder o contexto. Um drawer lateral preserva a navegação atual.

## Escopo

### 1. Componente `SettingsDrawer`

**Local:** `src/components/layout/SettingsDrawer.tsx`

Drawer lateral (direita) que abre sobre o conteúdo atual. Usar o componente `Sheet` do shadcn/ui (já que o projeto usa shadcn).

**Conteúdo:**

- Título "Configurações"
- Seção "Professor IA" com:
  - **Seletor de provedor** — tabs ou radio entre os providers disponíveis (`getAllProviders()`)
  - **Status da chave** — indicar se o provedor selecionado tem uma chave configurada (ícone verde/vermelho)
  - **Campo de API key** — `type="password"`, preenchido com máscara se já houver chave (`sk-ant-•••••••••`)
  - **Botão "Salvar"** — cria ou atualiza a chave (`setStoredApiKey`)
  - **Botão "Remover chave"** — com confirmação, remove a chave (`removeStoredApiKey`)
  - **Link "Obter API key"** — abre a URL do provedor (`config.keyUrl`)
  - Texto informativo: "Sua chave é armazenada apenas no seu navegador."

**Critérios de sucesso:**

- Exibe estado correto de cada provedor (com/sem chave)
- Salva, atualiza e remove chaves corretamente
- Troca de provedor ativo funciona
- Visual dark mode consistente com o restante do app
- Responsivo (tela cheia em mobile)

**Decisões:**

- Instalar o componente `Sheet` do shadcn/ui (`npx shadcn@latest add sheet`)
- Reutilizar funções do `ai-review.ts` — não duplicar lógica de localStorage

### 2. Botão de Settings no Header

**Local:** `src/components/layout/Header.tsx`

Adicionar um ícone de engrenagem (`Settings` do lucide-react) ao lado do `XPBadge` no Header.

**Comportamento:**

- Clique abre o `SettingsDrawer`
- Se nenhuma chave de IA estiver configurada, exibir um indicador visual sutil (dot vermelho/amarelo no ícone)

**Critérios de sucesso:**

- Ícone visível em todas as telas (Home, Course, Lesson)
- Drawer abre e fecha corretamente
- Indicador de "precisa configurar" desaparece ao salvar uma chave

### 3. Banner de configuração na Home

**Local:** `src/pages/HomePage.tsx`

Exibir um banner/callout acima dos cards de cursos quando nenhuma API key estiver configurada para nenhum provedor.

**Conteúdo sugerido:**

- Ícone de IA/lâmpada
- "Para a melhor experiência, configure seu Professor IA"
- "A revisão por IA dá feedback personalizado nos seus exercícios."
- Botão "Configurar agora" → abre o `SettingsDrawer`

**Critérios de sucesso:**

- Banner some quando qualquer provedor tiver chave configurada
- Visual integrado ao design (callout sutil, não intrusivo)
- Banner não aparece se a chave vier de variável de ambiente (`getApiKey()`)

**Ponto de atenção:**

- Verificar via `getApiKey()` (que checa env + localStorage) para não mostrar banner quando houver chave em env var

### 4. Refatorar/aposentar `APIKeyDialog`

**Local:** `src/components/lesson/APIKeyDialog.tsx`

Com o drawer global disponível, avaliar o papel do `APIKeyDialog` atual:

**Opção A — Manter:** continuar usando o dialog inline nas lições como atalho contextual, mas simplificá-lo para abrir o drawer em vez de ter lógica própria.

**Opção B — Remover:** substituir todas as referências ao `APIKeyDialog` por chamadas para abrir o drawer.

**Recomendação:** Opção A — manter como atalho contextual que abre o drawer. Isso evita que o aluno precise saber onde ficam as configurações quando está no meio de um challenge.

**Decisão a tomar com o usuário antes de implementar.**

### 5. Estado global para o drawer

Para que qualquer componente possa abrir o drawer (Header, HomePage banner, APIKeyDialog), criar um mecanismo de controle:

**Opções:**

- Estado via Context API (um `SettingsProvider`)
- Estado local no `AppShell` com prop drilling (mais simples)
- Custom event (`window.dispatchEvent`) — leve mas menos React-idiomatic

**Recomendação:** Estado local no `AppShell` com callback passado via context é o mais alinhado com a arquitetura atual do projeto.

## Questões a responder

- O `APIKeyDialog` nas lições deve continuar existindo como atalho ou ser substituído pelo drawer?
- Futuramente o drawer terá outras seções de configuração além de IA (ex: tema, idioma, notificações)?
- Deve haver feedback toast ao salvar/remover chave?
- O componente `Sheet` do shadcn já está instalado ou precisa ser adicionado?

## Entregável

- `src/components/layout/SettingsDrawer.tsx` — drawer completo com gestão de API key
- `src/components/layout/Header.tsx` — atualizado com ícone de settings + indicador
- `src/pages/HomePage.tsx` — atualizado com banner de configuração
- Componente `Sheet` do shadcn/ui instalado (se necessário)
- `APIKeyDialog.tsx` — refatorado ou removido conforme decisão
- Estado de abertura do drawer acessível globalmente
