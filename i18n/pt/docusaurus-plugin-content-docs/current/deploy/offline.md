---
sidebar_label: Versão Offline (Intranet Corporativa)
title: Implantação Offline do AI Short | Intranet Corporativa Sem Servidor Externo
description: A versão offline do AI Short foi projetada para empresas e equipes sem acesso à internet externa. Sem servidor de back-end, sem cadastro, dados armazenados localmente no navegador, pronto para usar.
---

# Versão de Implantação Offline

> **Público-alvo**: administradores de TI ou responsáveis técnicos pela implantação. Usuários comuns só precisam acessar o endereço da intranet preparado pelo administrador — não é necessário ler este documento.

**Cenários de uso**: intranets corporativas, redes do setor público brasileiro (órgãos federais, estaduais e municipais), ambientes que exigem conformidade com a LGPD, segmentos regulados (BACEN, ANS, ANATEL), redes acadêmicas e qualquer ambiente que **não pode ou não deve acessar a internet externa**.

Sem back-end, sem cadastro — todos os dados ficam localmente no navegador. Após a implantação, a equipe da intranet abre o navegador e já pode usar.

## Como a Equipe Usa

A versão offline é um site totalmente estático. Após implantar em um servidor da intranet, os membros acessam o endereço interno pelo navegador:

1. O **administrador** implanta a versão offline em um servidor da intranet (por exemplo, `http://192.168.1.100:3000`)
2. Os **membros da equipe** abrem esse endereço no navegador para navegar, pesquisar e copiar prompts
3. Os **favoritos e os prompts personalizados de cada pessoa ficam no próprio navegador**, sem interferência entre usuários
4. Sem necessidade de cadastro, sem instalação de software — basta abrir e usar

![Arquitetura de dados da versão offline: um servidor da intranet hospeda uma biblioteca de prompts compartilhada e somente leitura; os favoritos, prompts, ordenação e tags de cada usuário ficam no localStorage do próprio navegador — independentes, sem conta.](/img/docs/offline-architecture.svg)

:::tip[Dica]

A biblioteca de prompts (prompts selecionados) é um conjunto de dados estáticos empacotados em tempo de build — todos os usuários veem o mesmo conteúdo. Os favoritos, prompts personalizados, ordenação e tags de cada usuário ficam no localStorage do respectivo navegador, de forma totalmente independente.

:::

## Diferenças em Relação à Versão Online

| Funcionalidade | Versão Online | Versão Offline |
| ---- | ------ | ------ |
| Navegação/pesquisa/filtro de prompts | ✅ | ✅ |
| Copiar prompt | ✅ | ✅ |
| Gerenciamento de favoritos | Armazenado no servidor | Armazenado localmente no navegador |
| Prompts personalizados | Armazenado no servidor | Armazenado localmente no navegador |
| Minha Coleção (arrastar para ordenar, tags) | ✅ | ✅ |
| Suporte multilíngue (18 idiomas) | ✅ | ✅ |
| Importação/exportação de dados | ✅ | ✅ (formato compatível) |
| Página de detalhes do prompt | ✅ | ✅ (dados estáticos, sem comentários) |
| Cadastro/login de usuário | ✅ | ❌ (sem necessidade de conta) |
| Lista/votação de prompts da comunidade | ✅ | ❌ |
| Comentários e feedback | ✅ | ❌ |

## Armazenamento de Dados

Os dados de cada usuário ficam no localStorage do **próprio navegador**, sem qualquer dependência de servidor:

| Dado | Chave de armazenamento | Descrição |
| ---- | ------ | ---- |
| Lista de favoritos | `local_favorites` | Array de IDs dos prompts favoritados |
| Prompts personalizados | `local_user_prompts` | Dados dos prompts criados pelo usuário |
| Ordem de exibição | `local_myspace_order` | Ordenação dos cartões em Minha Coleção |
| Tags personalizadas | `local_custom_tags` | Definições de tags e suas atribuições |

:::caution[Atenção]

- O armazenamento local do navegador tem um limite aproximado de 5 MB, suficiente para o uso cotidiano.
- Limpar os dados do navegador apaga os dados pessoais — recomendamos backups periódicos em "Minha conta → Gerenciamento de dados → Exportar".
- Ao trocar de computador ou navegador, é necessário reimportar os dados.

:::

## Implantação

A versão offline é baseada no branch `offline`. Após uma única implantação pelo administrador, os membros da equipe não precisam fazer mais nada para começar a usar.

### Implantação com Docker (Recomendado)

A forma mais simples de implantar — uma única linha de comando é suficiente para rodar no servidor da intranet:

```bash
# Usando a imagem pré-construída da versão offline
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Ou usando o Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Após a implantação, os membros da equipe acessam `http://<IP do servidor>:3000`.

Com `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build a Partir do Código-fonte

Se você precisa personalizar o conteúdo dos prompts ou ajustar configurações:

```bash
# Clone o branch offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Instale as dependências
yarn

# Desenvolvimento local
yarn start

# Build de um único idioma (português)
yarn build --locale pt

# Build de todos os idiomas
yarn build
```

O resultado do build fica no diretório `build/` e pode ser implantado em qualquer servidor de arquivos estáticos (Nginx, Apache, Caddy etc.).

### Exemplo de Configuração Nginx

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Implantação em Plataformas

Em plataformas como Vercel e Cloudflare Pages, basta selecionar o branch `offline` na implantação — os demais passos são iguais aos da versão online. Veja [Implantação do Projeto](../deploy) para detalhes.

## Importação e Exportação de Dados

### Exportação

Acesse "Minha conta → Gerenciamento de dados → Exportar" para exportar seus favoritos e prompts personalizados em um arquivo JSON.

### Importação

Os seguintes formatos de JSON são aceitos:

- **Arquivos exportados da versão offline**: restauração completa de favoritos, prompts, ordenação e tags
- **Arquivos exportados da versão online**: compatibilidade automática
  - Prompts do usuário → mesclados localmente (deduplicação por título)
  - Favoritos selecionados (card) → mesclados aos favoritos locais
  - Favoritos da comunidade (community) → convertidos automaticamente em prompts personalizados locais
  - Ordenação de MySpace → restaurada localmente
  - Tags personalizadas → mescladas por adição (sem sobrescrever as existentes)

### Migração a Partir da Versão Online

1. Exporte os dados na página "Minha Conta" da versão online (aishort.top)
2. Importe esse arquivo JSON em "Minha conta → Gerenciamento de dados → Importar" da versão offline
3. Os favoritos da comunidade são convertidos automaticamente em prompts locais e os favoritos selecionados sincronizam normalmente

## Perguntas Frequentes

### Como a equipe usa após a implantação?

Depois que o administrador implanta no servidor da intranet, basta divulgar o endereço de acesso (por exemplo, `http://192.168.1.100:3000`) à equipe. Cada pessoa abre no navegador — sem instalação, sem cadastro.

### Os dados de uma pessoa afetam os de outra?

Não. Os favoritos e prompts personalizados de cada pessoa ficam no localStorage do próprio navegador, de forma totalmente independente. No servidor existe apenas a biblioteca compartilhada de prompts (somente leitura).

### Os dados podem se perder?

As ações a seguir provocam a perda de dados pessoais:

- Limpar os dados/cache do navegador
- Usar o modo de navegação privada/anônima
- Trocar de computador ou navegador

Recomendamos exportar os dados importantes periodicamente em "Minha conta → Gerenciamento de dados → Exportar" para um arquivo JSON.

### É possível compartilhar prompts personalizados entre membros da equipe?

Sim. Uma pessoa exporta o arquivo JSON e os outros membros importam em "Minha conta → Gerenciamento de dados → Importar" — a deduplicação é automática.

### Como atualizar a biblioteca de prompts?

A biblioteca de prompts é um conjunto de dados estáticos empacotado em tempo de build. Para atualizar:

1. O administrador faz o pull da versão mais recente do branch `offline`
2. Refaz o build e a implantação (ou baixa a imagem Docker mais recente)
3. Os membros da equipe atualizam o navegador para ver o conteúdo novo (os dados pessoais não são afetados)

### O formato de dados da versão offline é compatível com o da versão online?

Sim. O formato JSON exportado é o mesmo, e os dois podem ser importados mutuamente. Os IDs dos prompts diferem (a versão online usa IDs de servidor e a offline usa IDs por timestamp), mas, como a importação faz deduplicação por título, não há conflitos.
