---
sidebar_label: Implantação
title: Guia de Implantação e Personalização | Configure o AI Short com Facilidade
description: Aprenda a implantar e personalizar rapidamente seu projeto AI Short. Este guia aborda a implantação com Vercel, Cloudflare, Docker e localmente, além de como editar conteúdo e habilitar atualizações automáticas.
---

# Implantação do Projeto

## Configuração e Personalização

O AI Short é um projeto de código aberto, e você pode modificar livremente o título do site, a descrição, os prompts e muito mais. Abaixo estão as opções comuns de personalização:

- **Editar o título e a descrição do site**  
    Atualize o arquivo `docusaurus.config.js`.

- **Editar instruções de uso e documentos**  
    Todos os arquivos de documentação estão localizados no diretório `docs`. Abra e modifique o arquivo relevante conforme necessário.

- **Editar prompts da página inicial**  
    Os prompts da página inicial são armazenados em `src/data/prompt.json`.  
    Para idiomas específicos (por exemplo, chinês), edite `src/data/prompt_zh.json`.  
    Formato de exemplo para um novo prompt:

`json
  {
    "zh": {
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
  `

**Nota**: Use `id >= 500` para novos prompts. Eles não terão páginas ou comentários dedicados.
Se você quiser uma página dedicada, copie um arquivo de modelo de `src/data/pages/prompt` e modifique-o.

- **Backend personalizado**
    O projeto está atualmente vinculado a um backend compartilhado.
    Para configurar o seu próprio, verifique os detalhes da API em `src/api.js`.

- **Suporte a vários idiomas**
    Após atualizar os arquivos de idioma, execute o script `CodeUpdateHandler.py` para processamento em lote:

`bash
  python CodeUpdateHandler.py
  `

Este script dividirá o `prompt.json` e sincronizará as atualizações com as páginas de prompts principais e em destaque de cada idioma.

## Guia de Implantação

**Requisitos do sistema**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (incluindo WSL) ou Linux

### Implantação Local

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

```bash
# Instalar dependências
yarn

# Desenvolvimento local
yarn start

# Construir arquivos estáticos
yarn build

# Construir para múltiplos locais
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# Exemplo: construir para dois idiomas
yarn build --locale zh && yarn build --locale en
```

### Implantação com Vercel

Clique abaixo para implantar o ChatGPT-Shortcut na Vercel com um clique:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Nota**: O plano gratuito da Vercel pode ficar sem memória. Nesse caso, implante apenas um único idioma.

Passos:

1.  Vá para o seu projeto implantado na Vercel → **Settings**.
2.  Em **Build & Deployment**, encontre **Build Command** → clique em **Override**.
3.  Defina o comando de construção, por exemplo:

- Para chinês: `yarn build --locale zh`
   - Para português: `yarn build --locale pt`

### Implantação com Cloudflare Pages

👉 [Faça um fork do repositório](https://github.com/rockbenben/ChatGPT-Shortcut/fork), em seguida, implante via Cloudflare Pages:

1.  Faça login no [Cloudflare Pages](https://pages.cloudflare.com/) e escolha **Create a project**.
2.  Conecte seu repositório forkado.
3.  Configure as definições de compilação:

- **Build command**: `yarn build --locale zh` (ou outro idioma)
   - **Output directory**: `build`

4.  Implante e aguarde a conclusão da compilação.

O Cloudflare Pages será reimplantado automaticamente quando você enviar novos commits.

### Implantação com Docker

Execute com o Docker:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Ou com `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Habilitar Atualização Automática

Se você usou a implantação de um clique da Vercel, pode ver "atualizações disponíveis" com frequência.
Isso ocorre porque a Vercel cria um novo repositório em vez de um fork, quebrando a sincronização.

**Correção:**

1.  Exclua o repositório antigo.
2.  Faça um fork deste projeto diretamente (use o botão de fork).
3.  Reimplante a partir do seu fork através da [página de novo projeto do Vercel](https://vercel.com/new).

### Atualizações Automáticas

> Se você vir erros com **Upstream Sync**, execute **Sync Fork** manualmente uma vez.

Após fazer o fork, o GitHub exige que você habilite os fluxos de trabalho manualmente:

- Vá para **Actions** no seu fork
- Habilite os fluxos de trabalho, especialmente o **Upstream Sync Action**.

Isso será executado diariamente para buscar as atualizações do upstream.

### Atualizações Manuais

Para atualizações imediatas, verifique a [documentação do GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) sobre como sincronizar forks.

⭐ Dê uma estrela / 👀 Acompanhe este projeto ou siga o autor para ser notificado sobre novos recursos.
