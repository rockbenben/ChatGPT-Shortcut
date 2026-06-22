---
sidebar_label: Configuração e Personalização
title: Configuração e Personalização do AI Short | Modificar Título, Prompts, Backend Personalizado
description: Personalize o AI Short — modifique o título e a descrição do site, adicione prompts à página inicial e conecte um backend personalizado, com explicação da estrutura dos módulos de API e do mecanismo de cache.
---

# Configuração e Personalização

O AI Short é de código aberto — você pode modificar livremente o título do site, descrição, prompts e muito mais.

## Título e descrição do site

Edite `docusaurus.config.js`.

## Documentação e guias

Edite os arquivos correspondentes em `docs/`.

## Prompts da página inicial

Os dados de origem estão em `src/data/prompt.json` — um array onde cada objeto armazena todas as versões de idioma indexadas pelo código do idioma (`zh` / `en` / `ja`, etc.). O formato para adicionar um prompt:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "website": null,
  "tags": ["music"],
  "id": 500,
  "weight": 1
}
```

Após editar, execute `python CodeUpdateHandler.py`. O script divide o `prompt.json` em arquivos `prompt_<locale>.json` por idioma e atualiza a página inicial e as páginas de prompts em destaque de cada idioma.

![Pipeline de dados: o prompt.json mestre é processado pelo python CodeUpdateHandler.py — dividido por idioma em arquivos de prompt por localidade, gerando o JSON do cartão e a página de detalhes de cada id, com conversão de Chinês Simplificado para Tradicional via OpenCC](/img/docs/data-pipeline.svg)

> **Nota**: recomenda-se definir o `id` como 500 ou superior, para evitar conflitos de ID com prompts existentes ou conteúdo da comunidade. Executar `python CodeUpdateHandler.py` gera automaticamente os dados do cartão e a página de detalhes de cada prompt (incluindo os novos), sem necessidade de criar arquivos de página manualmente; prompts personalizados, por padrão, apenas não têm meta descrição selecionada nem dados de comentários.

## Backend personalizado

Por padrão, o projeto se conecta a um backend compartilhado (login, favoritos, comunidade, comentários e sincronização entre dispositivos dependem dele), e `src/api` documenta o contrato completo da interface como referência. O serviço de backend em si não é de código aberto; para uma **implantação totalmente auto-hospedada com backend próprio**, consulte [Escolha um Modelo de Implantação](../deploy#escolha-um-modelo-de-implantação) acima.

Estrutura do módulo de API:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Cache: os dados da API são armazenados em cache de forma inteligente via `lscache` combinado com ETag — quando o servidor retorna 304 Not Modified, o cache local é reutilizado para reduzir a transferência de dados.
