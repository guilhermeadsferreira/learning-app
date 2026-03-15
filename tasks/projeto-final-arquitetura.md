# Projeto final em curso de Arquitetura de Software

**Status:** pendente (melhoria futura)

---

## Objetivo

Adicionar uma lição de **projeto final** ao curso de Arquitetura de Software, em que o aluno propõe a arquitetura de um sistema completo (ex.: marketplace, sistema de pagamentos, plataforma de streaming) e recebe revisão da IA.

## Contexto

O curso de Arquitetura de Software cobre conceitos fundamentais até liderança técnica. Um desafio final de síntese ajudaria o aluno a integrar tudo que aprendeu em uma proposta arquitetural real.

## Proposta técnica

- **Tipo de lição:** `challenge` com `challengeStyle: written`
- **Formato:** Aluno descreve em texto a arquitetura proposta (componentes, padrões, trade-offs)
- **IA:** Professor IA revisa a proposta, discute trade-offs e sugere melhorias
- **Exemplos de cenário:** "Proponha a arquitetura de um marketplace", "Proponha a arquitetura de um sistema de pagamentos"

## Dependências

- `challengeStyle: written` deve estar suportado no fluxo de AI Review
- Verificar se o serviço `ai-review.ts` trata adequadamente respostas textuais longas

## Prioridade

Baixa — não incluir na primeira versão do curso. Registrar para evolução futura.
