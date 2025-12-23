---
sidebar_label: Implantação
title: Implantação do AI Short - Guia Vercel, Docker e Cloudflare
description: Implante o AI Short facilmente - Suporte a Vercel, Docker e Cloudflare. Guia de configuração e atualizações automáticas.
---

# Implantação do Projeto

## Configuração e Personalização

O AI Short é um projeto de código aberto, permitindo que você modifique o título, descrição e prompts do site conforme suas necessidades. Abaixo estão as opções de modificação e instruções comuns:

- **Modificar Título e Descrição do Site**
  Para alterar o título e a descrição do site, edite o arquivo de configuração `docusaurus.config.js`.

- **Modificar Instruções e Introdução do Projeto**
  As instruções de uso e arquivos de introdução do projeto estão localizados no diretório `docs`. Abra os arquivos relevantes neste diretório para fazer as alterações necessárias.

- **Modificar Prompts da Página Inicial**
  Os prompts da página inicial são armazenados no arquivo `src/data/prompt.json`. Se precisar modificar prompts para um idioma específico, como Português, você pode editar diretamente o arquivo `src/data/prompt_pt.json` (crie se não existir, ou edite o json principal). Ao adicionar novos prompts, o formato é o seguinte:

  ```json
  {
    "pt": {
      "title": "prompt personalizado",
      "prompt": "prompt personalizado",
      "description": "descrição personalizada",
      "remark": "marcação personalizada"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  ```

  **Nota**: Recomenda-se definir o `id` acima de 500. Novos prompts não terão uma página dedicada e seção de comentários. Se precisar adicionar uma página dedicada para o prompt, você pode copiar o arquivo de modelo no diretório `src/data/pages/prompt` e modificá-lo.

- **Backend Personalizado**
  O projeto atual está conectado a um sistema de backend compartilhado. Se deseja configurar seu próprio backend, consulte as instruções de interface na pasta `src/api`.

  Estrutura do Módulo API:

  ```
  src/api/
  ├── index.ts       # Entrada de exportação unificada
  ├── config.ts      # Configuração da URL da API
  ├── client.ts      # Cliente Axios (com interceptores de autenticação)
  ├── auth.ts        # API de Autenticação (Login/Registro/OAuth)
  ├── prompts.ts     # CRUD de Prompts + Busca + Votação
  ├── favorites.ts   # Operações de Favoritos
  ├── myspace.ts     # Dados do Meu Espaço (fonte de dados principal)
  ├── comments.ts    # Sistema de Comentários
  └── user.ts        # Informações do Usuário
  ```

  **Mecanismo de Cache**: O projeto usa `lscache` combinado com ETag para cache inteligente. Quando o servidor retorna 304 Not Modified, os dados em cache local são reutilizados diretamente, reduzindo a transmissão de dados.

- **Suporte Multilíngue e Implantação**
  Após concluir as modificações multilíngues, você pode usar o script `CodeUpdateHandler.py` para processamento em lote. Execute o seguinte comando:

  ```bash
  python CodeUpdateHandler.py
  ```

  Este script dividirá o arquivo `prompt.json` de acordo com regras predefinidas e sincronizará as atualizações para a página principal e páginas de prompts em destaque para cada versão de idioma.

## Instruções de Implantação

Requisitos do Sistema:

- [Node.js 20.0](https://nodejs.org/) ou superior.
- macOS, Windows (incluindo WSL) e Linux são suportados.

### Implantação Local

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

```shell
# Instalação
yarn

# Desenvolvimento Local
yarn start

# Build: Este comando gera conteúdo estático no diretório `build`
yarn build

# Atualize o `defaultLocale` no arquivo `docusaurus.config.js`, depois execute um build para o idioma desejado.
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

# Implantar para múltiplos idiomas
yarn build --locale zh && yarn build --locale en
```

### Implantação Vercel

Clique no botão abaixo para implantar o ChatGPT-Shortcut na plataforma Vercel com um clique:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Nota**: A versão gratuita da Vercel pode falhar devido à memória insuficiente. Se encontrar essa situação, você pode optar pela implantação de idioma único. As operações específicas são as seguintes:

1. Entre no projeto Vercel recém-implantado e abra **Settings** (Configurações).
2. Na seção **Build & Deployment** (Construção e Implantação), encontre **Build Command** (Comando de Construção) e clique em **Override** (Substituir) à direita.
3. Modifique o comando de implantação. Por exemplo, se precisar implantar a versão em Chinês, use `yarn build --locale zh`; se precisar implantar a versão em Português, use `yarn build --locale pt`.

### Implantação Cloudflare Pages

Clique no botão ou link abaixo, faça um Fork deste projeto e siga as instruções para implantar no Cloudflare Pages:

👉 [Fork deste projeto](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Passos de Implantação:

1. Faça login no [Cloudflare Pages](https://pages.cloudflare.com/) e selecione **"Create a project"** (Criar um projeto).
2. Vincule o repositório que você acabou de fazer o Fork.
3. Configure o comando de construção:
   - **Build command**: `yarn build --locale zh` (escolha o locale apropriado de acordo com o idioma a ser implantado, ex: para Português use `yarn build --locale pt`).
   - **Output directory**: `build`.
4. Clique em **Deploy** (Implantar) e aguarde o Cloudflare Pages concluir a construção e implantação.

O Cloudflare Pages também acionará automaticamente a construção e implantação sempre que você enviar um novo código.

### Implantação Docker

Se você está familiarizado com Docker, pode implantar rapidamente usando os seguintes comandos:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Ou você pode usar o `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Habilitar Atualizações Automáticas

Se você implantou seu próprio projeto na Vercel com um clique, pode encontrar um problema em que ele sempre avisa que há atualizações. Isso ocorre porque a Vercel cria um novo projeto para você por padrão, em vez de fazer um fork deste projeto, o que impede a detecção correta de atualizações. Recomenda-se reimplantar seguindo estes passos:

1. Exclua o repositório original;
2. Use o botão fork no canto superior direito da página para fazer um fork deste projeto;
3. Na [página de Novo Projeto da Vercel](https://vercel.com/new), selecione novamente o projeto que você acabou de fazer o fork na seção Import Git Repository e implante.

### Ativar Atualização Automática

> Se encontrar erro na execução do Upstream Sync, execute manualmente o Sync Fork uma vez!

Depois de fazer o fork do projeto, devido às restrições do GitHub, você precisa habilitar manualmente os Workflows na página Actions do seu projeto forkado e ativar a Upstream Sync Action. Uma vez ativado, as atualizações serão executadas automaticamente todos os dias:

![Atualização Automática](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Ativar Atualização Automática](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Atualização Manual do Código

Se quiser atualizar manualmente imediatamente, pode verificar a [documentação do GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para entender como sincronizar o projeto forkado com o código upstream.

Você pode dar uma estrela (star)/assistir (watch) neste projeto, ou seguir o autor para receber notificações de atualizações de novas funcionalidades em tempo hábil.
