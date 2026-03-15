# Alinhar Cards da Home — Altura Uniforme e Botão Fixo

**Status:** concluído

---

## Objetivo

Garantir que todos os cards de curso na HomePage tenham a mesma altura, com o botão "Começar" sempre alinhado na parte inferior, e descrições longas truncadas com ellipsis.

## Contexto

A HomePage (`src/pages/HomePage.tsx`) exibe cursos em cards usando shadcn/ui (`Card`, `CardHeader`, `CardContent`). Quando descrições têm tamanhos diferentes (ex: Claude Code vs React), os cards ficam com alturas distintas e o botão "Começar" desalinha entre eles.

O problema é puramente de layout CSS — não requer mudanças de lógica ou dados.

### Problema visual (screenshot fornecido pelo usuário)

- Card "Claude Code" tem descrição longa → botão fica mais abaixo
- Card "React" tem descrição mais curta → botão fica mais acima
- Cards com alturas diferentes quebram o alinhamento visual do grid

## Escopo

### Etapa 1 — Cards com altura uniforme

Aplicar `flex flex-col` no `Card` e `mt-auto` no `CardContent` para que:

- O grid force todos os cards à mesma altura (já é comportamento padrão do CSS Grid)
- O botão seja empurrado para o fundo do card

### Etapa 2 — Truncar descrições longas

Aplicar `line-clamp-3` na `CardDescription` para limitar a descrição a 3 linhas com ellipsis (`...`).

### Etapa 3 — Validar responsividade

Verificar que o alinhamento se mantém nos breakpoints:

- Mobile (1 coluna)
- Tablet (2 colunas)
- Desktop (3 colunas)

## Entregável

Cards da HomePage com altura uniforme, botão alinhado e descrições truncadas — visual consistente independente do tamanho do conteúdo.
