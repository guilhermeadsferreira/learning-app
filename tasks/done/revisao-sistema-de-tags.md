# Revisão do Sistema de Tags dos Cursos

**Status:** concluída

---

## Objetivo

Substituir as tags atuais — granulares demais e inconsistentes — por um vocabulário controlado de tags genéricas, usadas para filtrar e descobrir cursos na HomePage.

## Contexto

A HomePage expõe um filtro de tags (`useCourseFilter`) que depende das tags definidas nos `course.json`. O conjunto atual mistura:

- **Tecnologias específicas:** `claude`, `laravel`, `php`, `framework` — únicas a um curso, inúteis como filtro cross-curso
- **Roles/senioridade:** `tech lead`, `staff engineer`, `avançado` — subjetivos e excludentes
- **Genéricos válidos:** `programação`, `frontend`, `backend`, `react`, `javascript`, `IA`, `produtividade` — corretos, mas inconsistentes (capitalização, plural, etc.)

O resultado é um menu de tags inflado que não ajuda o usuário a descobrir conteúdo. A user story é: _"quero ver todos os cursos de Frontend"_ ou _"quero ver cursos sobre IA"_ — não _"quero ver cursos para Staff Engineers"_.

Tags são `string[]` livre em `src/engine/types.ts` — sem enum de validação. A refatoração deve estabelecer um vocabulário canônico e, opcionalmente, formalizá-lo em TypeScript.

### Tags atuais por curso

| Curso | Tags atuais |
|---|---|
| claude-code | IA, ferramentas, produtividade, claude |
| react | programação, frontend, react, javascript |
| arquitetura-software | arquitetura, sistema, tech lead, staff engineer, avançado, carreira |
| laravel | programação, backend, php, laravel, framework |

## Escopo

### 1. Definir vocabulário controlado de tags

Propor e aprovar a lista canônica de tags permitidas. Ponto de partida sugerido:

| Tag | Quando usar |
|---|---|
| `IA` | Cursos sobre inteligência artificial, LLMs, ferramentas de IA |
| `Programação` | Cursos de linguagens, lógica, algoritmos |
| `Frontend` | HTML, CSS, frameworks de UI, React, Vue |
| `Backend` | Servidores, bancos de dados, APIs, frameworks server-side |
| `Arquitetura` | Design de sistemas, padrões, boas práticas de engenharia |
| `React` | Cursos específicos de React |
| `JavaScript` | Cursos específicos de JS/TS |
| `Produtividade` | Ferramentas, fluxo de trabalho, automação |

Decisões a tomar:
- Capitalização: `React` vs `react`, `IA` vs `ia`?
- Limite de tags por curso (sugestão: 2–4)
- Aceitar tags de tecnologia específica (`PHP`, `Laravel`) ou só categorias?

### 2. Reclassificar os 4 cursos existentes

Aplicar o vocabulário aprovado aos `course.json`:

| Curso | Tags propostas |
|---|---|
| claude-code | `IA`, `Produtividade` |
| react | `Frontend`, `React`, `JavaScript`, `Programação` |
| arquitetura-software | `Arquitetura`, `Programação` |
| laravel | `Backend`, `Programação` |

Critério de sucesso: nenhum curso com tag fora do vocabulário canônico.

### 3. Formalizar em TypeScript (opcional, mas recomendado)

Adicionar um tipo union ou enum em `src/engine/types.ts`:

```ts
export const COURSE_TAGS = ['IA', 'Programação', 'Frontend', 'Backend', 'Arquitetura', 'React', 'JavaScript', 'Produtividade'] as const
export type CourseTag = typeof COURSE_TAGS[number]
```

E atualizar a interface `Course`:
```ts
tags: CourseTag[]
```

Isso garante que novos cursos só usem tags aprovadas (erro de compilação caso contrário).

### 4. Validar filtro na UI

- Abrir a HomePage e confirmar que o filtro de tags exibe apenas as novas tags
- Testar que cada tag filtra corretamente os cursos esperados
- Verificar que não há tags "órfãs" (tags no filtro sem curso correspondente)

### 5. Atualizar documentação

- `documents/product/methodology/course_schema.md` — adicionar seção com vocabulário canônico e regras de uso
- `product-status.md` — registrar a mudança se relevante

## Questões a responder

- Usamos capitalização Title Case (`Frontend`) ou lowercase (`frontend`) nas tags? (impacta display e filtragem)
- Tags de tecnologia específica (`PHP`, `Laravel`, `Vue`) são permitidas, ou só categorias amplas?
- O filtro na UI deve mostrar apenas tags presentes em pelo menos um curso, ou a lista completa do vocabulário?

## Entregável

- Vocabulário canônico documentado em `course_schema.md`
- 4 arquivos `course.json` atualizados com as novas tags
- (Opcional) Tipo `CourseTag` em `src/engine/types.ts`
- HomePage funcional com filtro refletindo as novas tags
