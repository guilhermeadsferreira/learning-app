# MgrCockpit — PRD + Estudo Técnico

**Status:** Rascunho inicial
**Data:** 2026-03-15
**Tipo:** App desktop (Electron) — projeto independente

---

## 1. Visão do Produto

**MgrCockpit** é um segundo cérebro para gestores e coordenadores de tecnologia. Ele ingere artefatos brutos de gestão (1:1, reuniões, dailies, plannings, retros), entende quem são as pessoas envolvidas, e constrói progressivamente um cockpit vivo de cada liderado — identificando padrões, oportunidades, riscos, ações pendentes e insumos para ciclos de avaliação.

O problema central que resolve: as informações sobre pessoas e cerimônias ficam espalhadas em Notion, Drive, e-mail e memória — e nunca viram insumo real de gestão. Cada reunião existe de forma isolada, sem acumular inteligência. O MgrCockpit fecha esse loop: quanto mais o gestor usa, mais contexto a IA tem, e mais útil ela se torna.

**Princípio central:** cada ingestão retroalimenta o sistema. A IA de hoje sabe mais do que a de ontem porque leu o que aconteceu antes.

---

## 2. Público-alvo

| Perfil | Dor principal |
|--------|--------------|
| Gerente de engenharia (3–15 reports) | Perda de contexto entre 1:1s, dificuldade de preparar PDIs |
| Coordenador tech (5–10 reports) | Sem histórico consolidado para avaliações de desempenho |
| Tech Lead com reports | Falta de visão longitudinal da evolução de cada pessoa |

**Non-goals (v1):** múltiplos usuários, sync em nuvem, app mobile.

---

## 3. Conceitos Centrais

### Artefatos suportados (v1)

| Tipo | Descrição | Exemplos de entrada |
|------|-----------|-------------------|
| `1:1` | Reunião individual com liderado | Notas em .md, .txt, .docx |
| `reuniao` | Reunião de time ou stakeholders | Ata, transcrição |
| `daily` | Registro de stand-up | Bloco de notas, texto livre |
| `planning` | Sprint/ciclo planning | Documento de planejamento |
| `retro` | Retrospectiva | Miro export, texto |

### Entidades

- **Pessoa** — membro do time com configuração manual (quem é, qual papel, qual relação) e perfil evolutivo construído pela IA ao longo das ingestões
- **Artefato** — documento ingerido, classificado e enriquecido com contexto do time
- **Insight** — extração gerada pela IA: ação comprometida, ponto de atenção, elogio, tema recorrente, risco
- **Pauta** — agenda gerada pela IA para o próximo 1:1, baseada no histórico acumulado da pessoa

---

## 4. Fluxos Principais

### 4.1 Ingestão de Artefato (Happy Path)

```
Usuário arrasta arquivo no Inbox
         ↓
App carrega contexto do time (People Registry)
  • Quem são os liderados, pares e gestores
  • Perfis atuais das pessoas mencionáveis
         ↓
Claude analisa com contexto completo:
  • Classifica o tipo de artefato
  • Identifica pessoas (com desambiguação via People Registry)
  • Extrai insights, ações, pontos de atenção, elogios
  • Atualiza resumo e temas recorrentes da pessoa
         ↓
App organiza artefato em pasta temática
         ↓
App atualiza perfil de cada pessoa mencionada
         ↓
Dashboard exibe cards e alertas atualizados
```

### 4.2 Geração de Pauta para 1:1

```
Gestor clica "Gerar pauta" no cockpit de um liderado
         ↓
App monta contexto completo da pessoa:
  • Config (cargo, área, tempo na empresa)
  • Ações pendentes
  • Pontos de atenção ativos
  • Temas recorrentes
  • Último 1:1 (data + resumo)
  • Conquistas recentes
         ↓
Claude gera pauta estruturada com:
  • Follow-ups de ações anteriores
  • Temas a aprofundar
  • Perguntas sugeridas
  • Alertas de atenção
         ↓
Pauta exibida no app + opção de exportar em Markdown
```

### 4.3 Relatório de Ciclo (Avaliação de Desempenho)

```
Gestor seleciona pessoa + período (ex: Q1 2026)
         ↓
App agrega todos os artefatos do período
         ↓
Claude sintetiza:
  • Linha do tempo de entregas e conquistas
  • Padrões de comportamento identificados
  • Pontos de desenvolvimento mencionados
  • Evolução ao longo do período
  • Sugestão de narrativa para avaliação
         ↓
Relatório gerado em Markdown + opção de export
```

---

## 5. Funcionalidades por Área

### 5.1 People Registry (Configuração do Time)

**Ponto de entrada do sistema.** Antes de qualquer ingestão, o gestor configura quem são as pessoas do seu contexto. Essa configuração é o que permite à IA entender quem é quem nos documentos.

#### Campos por pessoa

| Campo | Tipo | Exemplos |
|-------|------|---------|
| `nome` | texto | João Silva |
| `slug` | auto (kebab) | joao-silva |
| `cargo` | texto | Engenheiro Sênior |
| `nivel` | enum | júnior / pleno / sênior / staff / principal |
| `relacao` | enum | **liderado** / par / gestor / stakeholder |
| `area` | texto | Produto / Plataforma / Data |
| `squad` | texto | Checkout / Core / Infra |
| `empresa` | texto | (para contexto multi-empresa no futuro) |
| `inicio_na_funcao` | data | 2024-06-01 |
| `notas_manuais` | texto livre | observações que o gestor quer que a IA sempre considere |

#### Como funciona

1. **People Settings** é uma view dedicada no app — lista de cards com o time
2. Gestor adiciona/edita pessoas via formulário simples
3. Configuração salva em `pessoas/{slug}/config.yaml`
4. A cada ingestão, o app carrega **todo o People Registry** e injeta como contexto no prompt da IA

#### Impacto na IA

```
SEM People Registry:
  "João fez a entrega" → IA não sabe quem é João

COM People Registry:
  "João fez a entrega" → IA sabe que é João Silva, Engenheiro Sênior,
  seu liderado direto, na squad Checkout — e atualiza o perfil correto
```

#### config.yaml

```yaml
# pessoas/joao-silva/config.yaml
nome: João Silva
slug: joao-silva
cargo: Engenheiro Sênior
nivel: senior
relacao: liderado
area: Produto
squad: Checkout
inicio_na_funcao: 2024-06-01
notas_manuais: |
  Está em processo de transição para Tech Lead.
  Tem interesse em arquitetura de sistemas.
  Prefere feedback direto e objetivo.
```

### 5.2 Inbox

- Drop zone visual (arrastar arquivo ou clicar para selecionar)
- Formatos suportados v1: `.md`, `.txt`, `.pdf` (texto extraível)
- Feedback visual com etapas visíveis:
  - "Lendo arquivo..." → "Carregando contexto do time..." → "Processando com IA..." → "Salvando..."
- Fila de processamento: múltiplos arquivos em sequência
- Log de erros se processamento falhar

### 5.3 Processamento com IA (contexto-enriquecido)

A IA recebe **três camadas de contexto** em cada ingestão:

1. **People Registry completo** — quem são todas as pessoas configuradas (cargo, relação, área, notas manuais)
2. **Perfil atual** da pessoa principal identificada — o histórico acumulado até agora
3. **Conteúdo do artefato** — o documento bruto

Com esse contexto, a IA pode:
- Desambiguar nomes com confiança ("João" → João Silva, liderado, squad Checkout)
- Extrair insights **em relação ao histórico** ("João menciona sobrecarga pela segunda vez em 30 dias")
- Detectar padrões emergentes ("terceiro 1:1 consecutivo com tema de comunicação com produto")
- Atualizar o resumo evolutivo da pessoa com consciência do que já aconteceu antes

**Extrações por artefato:**
- Ações comprometidas (quem / o quê / prazo se mencionado)
- Pontos de atenção (riscos, bloqueios, preocupações)
- Elogios e conquistas mencionados
- Temas recorrentes detectados
- Alertas de padrão (algo que aparece pela 2ª/3ª vez)

### 5.4 Armazenamento em Arquivo

Toda persistência é em arquivos locais Markdown + YAML. Sem banco de dados — qualquer arquivo pode ser aberto num editor, versionado com Git, e backupeado pelo Time Machine.

```
~/MgrCockpit/
  inbox/                     ← drop zone (monitorada)
  artefatos/
    1on1/
      2026-03-10-joao-silva.md
    reuniao/
    daily/
    planning/
    retro/
  pessoas/
    joao-silva/
      config.yaml            ← configuração manual (quem é, cargo, relação)
      perfil.md              ← cockpit vivo (atualizado pela IA a cada ingestão)
      historico/
        2026-03-10-1on1.md
        2026-02-20-planning.md
      pautas/
        2026-03-17-pauta-1on1.md   ← pautas geradas
  exports/                   ← relatórios de ciclo gerados
```

### 5.5 Perfil de Pessoa (cockpit vivo)

`pessoas/joao-silva/perfil.md` é gerado e atualizado pela IA a cada ingestão. A IA não apenas appenda — ela **reescreve o resumo e consolida os temas** com base em tudo que aconteceu.

```markdown
---
nome: João Silva
cargo: Engenheiro Sênior
relacao: liderado
criado_em: 2026-01-15
ultima_atualizacao: 2026-03-10
total_artefatos: 12
ultimo_1on1: 2026-03-10
---

## Resumo Atual
João está em boa fase de entrega, mas sinaliza sobrecarga há dois ciclos consecutivos.
Demonstra interesse crescente em arquitetura — vale avaliar oportunidades de exposição.

## Alertas Ativos
- ⚠️ [RECORRENTE] Sobrecarga mencionada em 3 dos últimos 4 1:1s
- ℹ️ Interesse em Tech Lead sem plano formal de desenvolvimento ainda

## Pontos de Atenção
- [2026-03-10] Sobrecarga com projeto X — sem prazo de alívio definido
- [2026-02-15] Atrito pontual com PM do squad — aparentemente resolvido

## Conquistas e Elogios
- [2026-03-01] Entregou refatoração do módulo de pagamentos no prazo
- [2026-01-20] Reconhecido pelo time na retro por suporte técnico

## Ações Pendentes (do gestor)
- [ ] Alinhar plano de desenvolvimento para Tech Lead (prometido no 1:1 de março)
- [ ] Verificar com squad se sobrecarga tem solução no curto prazo

## Temas Recorrentes
- Sobrecarga / distribuição de trabalho (4 menções)
- Interesse em arquitetura e Tech Lead (3 menções)
- Comunicação com time de produto (2 menções)

## Histórico de Artefatos
| Data | Tipo | Arquivo |
|------|------|---------|
| 2026-03-10 | 1:1 | [ver](historico/2026-03-10-1on1.md) |
| 2026-02-20 | planning | [ver](historico/2026-02-20-planning.md) |
```

### 5.6 Dashboard

**Visão do time** — cards por pessoa com sinais de saúde:

| Indicador | Descrição |
|-----------|-----------|
| 🟢 / 🟡 / 🔴 | Saúde geral inferida pelo padrão dos últimos artefatos |
| Dias desde último contato | Alerta se > 14 dias sem artefato de um liderado |
| Ações pendentes | Contador de checkboxes em aberto no perfil |
| Alertas ativos | Pontos recorrentes ou riscos sinalizados |

**Painel de insights globais** — visão cruzada do time:
- "3 liderados mencionaram sobrecarga no último mês"
- "Nenhum 1:1 registrado com Maria há 21 dias"
- "Retro da sprint 42 gerou 7 ações — 4 ainda abertas"

**Ações rápidas por pessoa:**
- Gerar pauta para o próximo 1:1
- Ver cockpit completo
- Exportar relatório de ciclo

---

## 6. Estudo Técnico

### 6.1 Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Runtime | **Electron** + Node.js 20 | Desktop nativo, acesso a FS, sem servidor |
| UI | **React 18** + **TypeScript** | Ecossistema maduro, tipagem forte |
| Estilo | **Tailwind CSS** + shadcn/ui | Produtividade alta, dark mode fácil |
| IA | **Claude Code CLI** (`claude -p`) | Usa subscription existente, sem API key extra |
| Armazenamento | **Sistema de arquivos** (Markdown + YAML) | Transparente, portável, editável |
| File watching | **Chokidar** | Watch robusto de diretórios no Electron |
| PDF parsing | **pdf-parse** | Extrai texto de PDFs simples |
| Build | **electron-builder** | Empacotamento para macOS/Windows/Linux |

### 6.2 Arquitetura Electron

```
Main Process (Node.js)
├── FileWatcher (chokidar) — monitora inbox/
├── IngestionPipeline — orquestra o processamento
│   ├── FileReader — lê e normaliza o conteúdo
│   ├── ClaudeRunner — spawn do CLI headless
│   └── ArtifactWriter — escreve arquivos resultado
├── PersonRegistry — gerencia perfis de pessoas
└── IPC Handlers — expõe ações ao Renderer

Renderer Process (React)
├── InboxView — drop zone + fila de processamento
├── DashboardView — cards de pessoas
├── PersonView — cockpit individual
└── ArtifactView — visualização de artefato processado

IPC Bridge (preload.ts)
└── contextBridge — expõe API segura ao Renderer
```

### 6.3 Pipeline de Ingestão com Claude Code CLI

A escolha pelo **CLI headless** (`claude -p`) em vez do Agent SDK significa:
- Usa a subscription Claude Code existente (Pro/Max) — **sem custo extra**
- Subprocess puro via `child_process.spawn`
- Output em JSON estruturado via `--output-format json`

#### Fluxo técnico

```typescript
// main/ingestion/ClaudeRunner.ts

import { spawn } from 'child_process';
import { readFileSync } from 'fs';

interface IngestionResult {
  tipoArtefato: 'one-on-one' | 'reuniao' | 'daily' | 'planning' | 'retro';
  dataArtefato: string;          // ISO 8601
  pessoas: string[];             // nomes identificados
  acoes: Array<{ responsavel: string; descricao: string }>;
  pontosAtencao: string[];
  elogios: string[];
  resumo: string;
  slug: string;                  // ex: "joao-silva"
}

export async function processWithClaude(filePath: string): Promise<IngestionResult> {
  const content = readFileSync(filePath, 'utf-8');

  const prompt = buildPrompt(content);

  return new Promise((resolve, reject) => {
    const proc = spawn('claude', [
      '-p', prompt,
      '--output-format', 'json',
      '--allowedTools',  'none',   // só raciocínio, sem ferramentas de FS
    ]);

    let output = '';
    proc.stdout.on('data', (d) => output += d.toString());
    proc.stderr.on('data', (d) => console.error('[claude]', d.toString()));

    proc.on('close', (code) => {
      if (code !== 0) return reject(new Error(`Claude exited with code ${code}`));
      try {
        const parsed = JSON.parse(output);
        resolve(JSON.parse(parsed.result)); // result é string JSON
      } catch (e) {
        reject(new Error('Falha ao parsear resposta do Claude'));
      }
    });
  });
}

interface PromptContext {
  content: string;
  peopleRegistry: PersonConfig[];   // todos do People Registry
  currentProfile?: string;          // perfil.md atual da pessoa principal (se existir)
}

function buildPrompt({ content, peopleRegistry, currentProfile }: PromptContext): string {
  const teamContext = peopleRegistry
    .map(p => `- ${p.nome} | ${p.cargo} | ${p.relacao} | Área: ${p.area}${p.squad ? ` / ${p.squad}` : ''}${p.notas_manuais ? ` | Nota: ${p.notas_manuais.trim()}` : ''}`)
    .join('\n');

  const profileSection = currentProfile
    ? `\nPERFIL ATUAL DA PESSOA PRINCIPAL (use como contexto acumulado):\n---\n${currentProfile}\n---\n`
    : '';

  return `
Você é um assistente especializado em gestão de pessoas e times de tecnologia.
Analise o documento abaixo com o contexto completo do time.

CONTEXTO DO TIME (quem é quem — use para desambiguar nomes):
${teamContext}
${profileSection}
DOCUMENTO A ANALISAR:
---
${content}
---

Retorne APENAS um JSON válido (sem markdown, sem explicações) com esta estrutura:
{
  "tipoArtefato": "one-on-one" | "reuniao" | "daily" | "planning" | "retro",
  "dataArtefato": "YYYY-MM-DD ou null",
  "slugPrincipal": "slug do liderado principal (para 1:1) ou null",
  "pessoas": [{ "nome": "Nome Sobrenome", "slug": "slug-kebab", "relacao": "liderado|par|gestor" }],
  "acoes": [{ "responsavel": "Nome", "slug": "slug", "descricao": "o que fazer", "prazo": "YYYY-MM-DD ou null" }],
  "pontosAtencao": [{ "descricao": "texto", "recorrente": true|false }],
  "elogios": ["descrição"],
  "alertas": ["texto de alerta quando algo se repete ou é preocupante"],
  "temasDetectados": ["tema identificado"],
  "resumo": "2-3 frases com contexto e principais saídas, considerando o histórico anterior da pessoa",
  "resumoEvolutivo": "1 parágrafo atualizando o estado geral da pessoa com base em tudo que se sabe agora"
}

Regras:
- Use o contexto do time para resolver nomes ambíguos ("João" → use o slug correto)
- Em resumoEvolutivo, considere o perfil atual (se fornecido) e sinalize padrões
- Marque pontosAtencao.recorrente=true se o tema já apareceu no perfil atual
- Se for 1:1, slugPrincipal = slug do liderado na conversa
`.trim();
}
```

#### Tratamento de erros e retry

```typescript
export async function processWithRetry(
  filePath: string,
  maxAttempts = 2
): Promise<IngestionResult> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await processWithClaude(filePath);
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      await sleep(2000 * attempt);
    }
  }
  throw new Error('Unreachable');
}
```

### 6.4 PersonRegistry — Gerenciamento de Perfis

```typescript
// main/registry/PersonRegistry.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter'; // parse de YAML frontmatter

export class PersonRegistry {
  constructor(private rootPath: string) {}

  upsertPerson(slug: string, artifact: ProcessedArtifact): void {
    const personDir = join(this.rootPath, 'pessoas', slug);
    const profilePath = join(personDir, 'perfil.md');

    mkdirSync(join(personDir, 'historico'), { recursive: true });

    if (!existsSync(profilePath)) {
      this.createProfile(profilePath, slug, artifact);
    } else {
      this.updateProfile(profilePath, artifact);
    }

    this.appendToHistory(personDir, artifact);
  }

  private createProfile(path: string, slug: string, artifact: ProcessedArtifact): void {
    const content = `---
nome: ${artifact.pessoas[0]}
slug: ${slug}
criado_em: ${new Date().toISOString().split('T')[0]}
ultima_atualizacao: ${new Date().toISOString().split('T')[0]}
total_artefatos: 1
---

## Resumo Atual
${artifact.resumo}

## Pontos de Atenção Ativos
${artifact.pontosAtencao.map(p => `- [${artifact.dataArtefato}] ${p}`).join('\n')}

## Conquistas e Elogios
${artifact.elogios.map(e => `- [${artifact.dataArtefato}] ${e}`).join('\n')}

## Ações Pendentes
${artifact.acoes.map(a => `- [ ] ${a.descricao} (${a.responsavel})`).join('\n')}

## Temas Recorrentes
*(gerado após múltiplas ingestões)*

## Histórico de Artefatos
| Data | Tipo | Arquivo |
|------|------|---------|
| ${artifact.dataArtefato} | ${artifact.tipoArtefato} | [ver](historico/${artifact.filename}) |
`;
    writeFileSync(path, content, 'utf-8');
  }

  private updateProfile(path: string, artifact: ProcessedArtifact): void {
    // Lê perfil existente, atualiza seções, incrementa contadores
    // Usa gray-matter para manipular frontmatter
    const raw = readFileSync(path, 'utf-8');
    const parsed = matter(raw);
    parsed.data.ultima_atualizacao = new Date().toISOString().split('T')[0];
    parsed.data.total_artefatos = (parsed.data.total_artefatos || 0) + 1;
    // ... append to sections
    writeFileSync(path, matter.stringify(parsed.content, parsed.data), 'utf-8');
  }
}
```

### 6.5 FileWatcher — Monitoramento do Inbox

```typescript
// main/watcher/InboxWatcher.ts

import chokidar from 'chokidar';
import { BrowserWindow } from 'electron';
import { IngestionPipeline } from '../ingestion/IngestionPipeline';

const SUPPORTED_EXTENSIONS = ['.md', '.txt', '.pdf'];

export function startInboxWatcher(inboxPath: string, win: BrowserWindow) {
  const watcher = chokidar.watch(inboxPath, {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 500 },
  });

  watcher.on('add', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.includes(ext)) return;

    win.webContents.send('ingestion:started', { filePath });

    try {
      const result = await IngestionPipeline.run(filePath);
      win.webContents.send('ingestion:completed', result);
    } catch (err) {
      win.webContents.send('ingestion:failed', { filePath, error: err.message });
    }
  });
}
```

### 6.6 IPC Bridge

```typescript
// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('mgr', {
  onIngestionStarted:   (cb) => ipcRenderer.on('ingestion:started', (_, d) => cb(d)),
  onIngestionCompleted: (cb) => ipcRenderer.on('ingestion:completed', (_, d) => cb(d)),
  onIngestionFailed:    (cb) => ipcRenderer.on('ingestion:failed', (_, d) => cb(d)),
  getPeople:            () => ipcRenderer.invoke('people:list'),
  getPerson:            (slug) => ipcRenderer.invoke('people:get', slug),
  getArtifacts:         (slug) => ipcRenderer.invoke('artifacts:list', slug),
  openInEditor:         (path) => ipcRenderer.invoke('shell:open', path),
});
```

### 6.7 Estrutura de Pastas do Projeto

```
mgr-cockpit/
├── electron/
│   ├── main.ts               ← entry point Electron
│   ├── preload.ts
│   └── ipc/
│       ├── people.ipc.ts
│       └── artifacts.ipc.ts
├── src/                      ← React app (renderer)
│   ├── views/
│   │   ├── InboxView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── PersonView.tsx
│   │   └── ArtifactView.tsx
│   ├── components/
│   └── hooks/
├── main/                     ← lógica do main process
│   ├── ingestion/
│   │   ├── ClaudeRunner.ts
│   │   ├── IngestionPipeline.ts
│   │   └── FileReader.ts     ← txt/md/pdf → string
│   ├── registry/
│   │   ├── PersonRegistry.ts
│   │   └── ArtifactWriter.ts
│   └── watcher/
│       └── InboxWatcher.ts
├── electron-builder.config.js
├── vite.config.ts
└── package.json
```

### 6.8 Dependências Principais

```json
{
  "dependencies": {
    "electron": "^30.0.0",
    "react": "^18.3.0",
    "chokidar": "^3.6.0",
    "gray-matter": "^4.0.3",
    "pdf-parse": "^1.1.1",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "electron-builder": "^24.0.0",
    "vite": "^5.0.0",
    "electron-vite": "^2.3.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**Template recomendado:** [`electron-vite`](https://electron-vite.org/) — Vite + Electron + React + TypeScript já integrados.

---

## 7. Decisões Técnicas e Trade-offs

### 7.1 Por que arquivos Markdown em vez de banco de dados?

| Critério | Markdown | SQLite |
|----------|----------|--------|
| Portabilidade | ✅ Abre em qualquer editor | ❌ Precisa do app |
| Legibilidade humana | ✅ | ❌ |
| Queries complexas | ❌ Lento | ✅ |
| Backup simples | ✅ Git ou Time Machine | ⚠️ Binário |
| Edição manual | ✅ | ❌ |

**Decisão:** Markdown para v1. Se queries agregadas ficarem lentas (>500 artefatos), adicionar SQLite como índice de busca — mas os arquivos Markdown permanecem como source of truth.

### 7.2 Por que Claude Code CLI e não Anthropic API direta?

- Sem custo extra de API (usa subscription existente)
- Subprocess isolado — crash do Claude não derruba o app
- Desvantagem: requer Claude Code CLI instalado no sistema
- Mitigação: verificar presença do CLI na inicialização do app e guiar instalação

### 7.3 Por que não Notion, Obsidian plugin, ou extensão VS Code?

- **Notion:** depende de nuvem, sem processamento local de IA com subscription
- **Obsidian plugin:** viável, mas limita UX (sem drop zone nativa, sem IPC rico)
- **Extensão VS Code:** fora do contexto de gestão — gestor não vive no editor
- **Electron:** UX dedicada, controle total, app standalone que o gestor instala e usa

---

## 8. MVP — Escopo v1

### Incluído no MVP

- [x] **People Registry** — configurar pessoas (nome, cargo, relação, área, notas manuais)
- [x] Inbox com drag-and-drop
- [x] Processamento de `.md` e `.txt` com Claude Code CLI **com contexto do time**
- [x] Classificação de tipo de artefato
- [x] Criação e atualização de perfil de pessoa (com `resumoEvolutivo`)
- [x] Detecção de temas recorrentes e alertas de padrão
- [x] Dashboard com lista de pessoas + indicadores de saúde
- [x] Geração de pauta para próximo 1:1
- [x] Visualização de perfil individual (cockpit vivo)
- [x] Armazenamento em arquivos locais (config.yaml + perfil.md)

### Fora do MVP (backlog)

- [ ] Suporte a `.pdf` (extração de texto)
- [ ] Suporte a `.docx`
- [ ] Relatório de ciclo (avaliação de desempenho por período)
- [ ] Timeline visual por pessoa
- [ ] Busca full-text nos artefatos
- [ ] Export do cockpit para PDF
- [ ] Notificações proativas ("Faz 21 dias sem 1:1 com João")
- [ ] Painel de insights cruzados do time ("3 liderados sinalizaram sobrecarga")
- [ ] Workspace multi-empresa
- [ ] Sync com calendário

---

## 9. Questões Abertas

1. **Nome do app**: MgrCockpit, LeadMap, PeopleLens, outro?
2. **Onboarding**: fluxo de primeiro uso — configurar People Registry antes de qualquer ingestão? Ou permitir ingestão e depois vincular pessoas?
3. **Aprovação de processamento**: mostrar preview do que o Claude extraiu antes de salvar, ou salvar automaticamente? *(Recomendação: automático por padrão, com log revisável)*
4. **Notas manuais no People Registry**: campo livre ou estruturado (ex: checkboxes de "prefere feedback escrito", "em processo de promoção")?
5. **Escopo da IA no resumoEvolutivo**: a IA reescreve o resumo inteiro a cada ingestão ou apenas appenda? *(Recomendação: reescreve — mais coeso, mas consome mais tokens)*
6. **Privacidade**: documentar explicitamente que nada sai do computador além do prompt enviado ao Claude Code CLI local

---

## 10. Próximos Passos

1. Resolver questões abertas (nome, onboarding, aprovação de processamento)
2. Inicializar projeto com `electron-vite` + React + TypeScript
3. Construir **People Registry** — view de configuração + leitura de `config.yaml`
4. Implementar **ClaudeRunner** com prompt context-enriquecido (People Registry + perfil atual)
5. Implementar **FileWatcher** + pipeline de ingestão end-to-end
6. Construir **InboxView** com drop zone e feedback de etapas
7. Construir **PersonRegistry** — criar/atualizar `perfil.md` com `resumoEvolutivo`
8. **Dashboard** básico com cards de pessoas + indicadores
9. **Gerador de pauta** de 1:1
10. Primeira ingestão completa funcionando com contexto real
