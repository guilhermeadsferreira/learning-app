import type { AIReviewContext, AIReviewRequest, ChallengeStyle } from '@/engine/types'

/** Fallbacks por courseId quando o curso não define aiReviewContext */
const FALLBACK_CONTEXT: Record<string, AIReviewContext> = {
  react: {
    subject: 'React',
    expertise: 'React, hooks, componentes, JSX, Tailwind, ecossistema',
    codeLanguage: 'jsx',
    challengeStyle: 'code',
  },
}

export function resolveAIReviewContext(
  courseId: string,
  aiReviewContext?: AIReviewContext
): AIReviewContext {
  if (aiReviewContext?.subject) return aiReviewContext
  const fallback = FALLBACK_CONTEXT[courseId]
  if (fallback) return fallback
  return {
    subject: courseId,
    expertise: 'programação',
    codeLanguage: 'text',
    challengeStyle: 'code',
  }
}

const REVIEW_ROLE: Record<ChallengeStyle, string> = {
  code: 'REVISAR o código do aluno em desafios práticos',
  query: 'REVISAR a query do aluno em desafios de banco de dados',
  scenario: 'AVALIAR a resposta do aluno em cenários práticos de gestão e decisão',
  written: 'AVALIAR a resposta escrita do aluno em atividades de análise e documentação',
}

const REVIEW_CRITERIA: Record<ChallengeStyle, string> = {
  code: `1. Se o código resolve o desafio, isCorrect = true, mesmo que não seja idêntico à solução modelo
2. Valorize soluções criativas que vão além do pedido
3. Para erros, explique a causa e dê a correção, nunca apenas "está errado"
4. Se o aluno está travado (código vazio ou muito incompleto), dê um empurrão gentil sem entregar a resposta
5. Avalie boas práticas: legibilidade, nomenclatura, estrutura`,

  query: `1. Se a query retorna o resultado correto, isCorrect = true, mesmo que a sintaxe difira da solução modelo
2. Avalie corretude lógica: joins, filtros, agrupamentos, ordenação
3. Avalie boas práticas: uso de índices, evitar SELECT *, aliases claros
4. Para erros de sintaxe, explique a regra do SQL e corrija com exemplo
5. Aponte problemas de performance quando relevante (N+1, full table scan)`,

  scenario: `1. Se a resposta demonstra raciocínio alinhado com boas práticas, isCorrect = true
2. Não existe resposta única correta — valorize coerência e justificativa
3. Avalie: clareza do raciocínio, consideração das partes envolvidas, aplicabilidade prática
4. Para respostas incompletas, indique o que está faltando de forma construtiva
5. Relacione a resposta com frameworks e metodologias do domínio`,

  written: `1. Se a resposta demonstra compreensão do conceito e atende ao pedido, isCorrect = true
2. Avalie: clareza, estrutura, profundidade, precisão técnica
3. Para respostas vagas, peça mais especificidade com exemplos do que seria esperado
4. Valorize exemplos concretos e analogias usadas pelo aluno
5. Sugira como expandir ou aprofundar a resposta`,
}

const ANSWER_LABEL: Record<ChallengeStyle, string> = {
  code: 'Código do aluno (para revisar)',
  query: 'Query do aluno (para revisar)',
  scenario: 'Resposta do aluno (para avaliar)',
  written: 'Resposta escrita do aluno (para avaliar)',
}

const SOLUTION_LABEL: Record<ChallengeStyle, string> = {
  code: 'Solução esperada (referência)',
  query: 'Query de referência',
  scenario: 'Resposta de referência',
  written: 'Resposta de referência',
}

export function buildReviewSystemPrompt(context: AIReviewContext): string {
  const expertise = context.expertise ?? context.subject
  const style = context.challengeStyle ?? 'code'
  const role = REVIEW_ROLE[style]
  const criteria = REVIEW_CRITERIA[style]

  return `Você é um professor sênior de ${context.subject} com 10+ anos de experiência, especializado em ${expertise} e em ensinar pessoas que querem evoluir na carreira.

Seu papel é ${role}, de forma:
- Encorajadora e positiva (nunca humilhe ou seja sarcástico)
- Didática (explique o "porquê", não só o "o quê")
- Prática (dê exemplos concretos quando sugerir melhorias)
- Progressiva (elogie o que está certo antes de apontar erros)

FORMATO DA RESPOSTA (JSON):
{
  "feedback": "Análise detalhada da resposta do aluno em 2-4 parágrafos. Comece reconhecendo o que está correto. Depois aponte erros ou oportunidades de melhoria com explicações claras. Use linguagem acessível.",
  "isCorrect": true/false,
  "encouragement": "Mensagem motivacional curta e genuína (1-2 frases). Não seja genérico — relate ao que o aluno fez.",
  "suggestions": ["Sugestão prática 1", "Sugestão prática 2"],
  "nextStepHint": "Uma dica sobre o que explorar a seguir ou como evoluir a solução (opcional, 1-2 frases)"
}

CRITÉRIOS DE AVALIAÇÃO:
${criteria}

REGRAS GERAIS:
- Use analogias do dia a dia quando explicar conceitos
- Responda SEMPRE em português brasileiro
- Retorne APENAS o JSON, sem markdown ou texto extra`
}

export function buildQuestionSystemPrompt(context: AIReviewContext, lessonTitle: string): string {
  const style = context.challengeStyle ?? 'code'
  const hasCode = style === 'code' || style === 'query'

  return `Você é um professor sênior de ${context.subject}, paciente e didático. O aluno está na lição "${lessonTitle}" e precisa de ajuda.

REGRAS:
- Responda em português brasileiro
- Seja encorajador e nunca entregue a resposta completa diretamente
- Use analogias para explicar conceitos
- Se o aluno perguntar a resposta, dê dicas progressivas em vez de entregar pronta
- Seja conciso (2-4 parágrafos)${hasCode ? '\n- Referência o código/query do aluno quando relevante' : ''}`
}

export function buildReviewUserMessage(request: AIReviewRequest): string {
  const lang = request.aiReviewContext?.codeLanguage ?? 'text'
  const style = request.aiReviewContext?.challengeStyle ?? 'code'
  const solutionLabel = SOLUTION_LABEL[style]
  const answerLabel = ANSWER_LABEL[style]
  const hasCode = style === 'code' || style === 'query'

  const solutionBlock = hasCode ? `\`\`\`${lang}\n${request.solution}\n\`\`\`` : request.solution
  const studentBlock = hasCode
    ? `\`\`\`${lang}\n${request.studentCode}\n\`\`\``
    : request.studentCode

  return `## Contexto da Lição
**Título:** ${request.lessonTitle}
**Instruções do desafio:** ${request.challengeInstructions}

## ${solutionLabel}
${solutionBlock}

${request.hint ? `## Dica disponível para o aluno\n${request.hint}\n` : ''}${request.lessonContext ? `## Contexto adicional\n${request.lessonContext}\n` : ''}## ${answerLabel}
${studentBlock}`
}
