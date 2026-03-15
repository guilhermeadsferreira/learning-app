# Deploy gratuito da aplicação

**Status:** concluído

**URL:** https://learning-app-delta-kohl.vercel.app/

---

## Objetivo

Investigar e implementar o deploy gratuito do projeto (SPA React + Vite).

## Decisão

**Plataforma escolhida: Vercel**

Justificativa:

- Zero configuração para Vite — conecta o repo e funciona
- SPA routing automático (sem hacks de 404.html)
- Tier gratuito generoso: 100 GB bandwidth, 6000 min de build/mês
- Preview deploys automáticos por branch/PR
- Edge network global, sem cold start

Alternativas consideradas:

- **Netlify**: bom, mas limite de build menor (300 min/mês) e precisa de `_redirects` manual
- **Cloudflare Pages**: bandwidth ilimitado, mas setup inicial menos intuitivo
- **GitHub Pages**: SPA routing problemático (hack via 404.html)
- **Render**: builds mais lentos, menos automatizado

## Configuração

- `vercel.json` na raiz com rewrite rules para SPA routing
- Deploy automático a cada push na branch `main`
- Env vars de API (IA) não configuradas na Vercel — chaves são gerenciadas pelo usuário via UI
