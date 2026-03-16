---
sidebar_label: Versao Offline (Intranet Corporativa)
title: Implantacao Offline do AI Short | Intranet Corporativa sem Servidor Externo
description: A versao offline do AI Short e projetada para empresas e equipes sem acesso a rede externa. Sem servidor backend, sem registro necessario, dados armazenados localmente no navegador, pronto para uso.
---

# Versao de Implantacao Offline

**Cenarios aplicaveis**: Intranets corporativas, redes governamentais, ambientes classificados, redes de campus e outros cenarios onde **o acesso a rede externa nao esta disponivel ou e inconveniente**.

A versao offline do AI Short nao requer servidor backend nem registro de usuario. Todos os dados sao armazenados localmente no navegador. Uma vez implantada, pode ser usada diretamente pelas equipes na intranet.

## Uso em Equipe

A versao offline e um site puramente estatico. Apos implantar em um servidor de intranet, os membros da equipe simplesmente precisam abrir o endereco da intranet no navegador:

1. O **administrador** implanta a versao offline em um servidor de intranet (ex: `http://192.168.1.100:3000`)
2. Os **membros da equipe** abrem o endereco no navegador para navegar, pesquisar e copiar prompts
3. Os **favoritos e prompts personalizados de cada pessoa sao salvos em seu proprio navegador**, independentes entre si
4. Sem registro necessario, sem instalacao de software, pronto para uso imediato

```
Servidor de intranet (versao offline implantada)
   ├── Dados da biblioteca de prompts (compartilhados por todos, do JSON estatico)
   │
   ├── Navegador do usuario A → localStorage (favoritos e prompts personalizados de A)
   ├── Navegador do usuario B → localStorage (favoritos e prompts personalizados de B)
   └── Navegador do usuario C → localStorage (favoritos e prompts personalizados de C)
```

:::tip Observacao
O conteudo da biblioteca de prompts (prompts selecionados) sao dados estaticos empacotados no momento da construcao, e todos os usuarios veem o mesmo conteudo. Os favoritos, prompts personalizados, ordenacao e tags de cada usuario sao salvos no localStorage de seu proprio navegador, completamente independentes entre si.
:::

## Diferencas da Versao Online

| Funcionalidade | Versao Online | Versao Offline |
| ---- | ------ | ------ |
| Navegacao/pesquisa/filtragem de prompts | ✅ | ✅ |
| Copia de prompts | ✅ | ✅ |
| Gerenciamento de favoritos | Armazenamento no servidor | Armazenamento local do navegador |
| Prompts personalizados | Armazenamento no servidor | Armazenamento local do navegador |
| Minha Colecao (ordenar arrastando, tags) | ✅ | ✅ |
| Suporte multilingue (18 idiomas) | ✅ | ✅ |
| Importacao/exportacao de dados | ✅ | ✅ (formato compativel) |
| Paginas de detalhe de prompts | ✅ | ✅ (dados estaticos, sem comentarios) |
| Registro/login de usuario | ✅ | ❌ (sem conta necessaria) |
| Lista de prompts da comunidade/votacao | ✅ | ❌ |
| Feedback por comentarios | ✅ | ❌ |

## Armazenamento de Dados

Os dados de cada usuario sao salvos no localStorage do **seu proprio navegador**, independente do servidor:

| Dados | Chave de armazenamento | Descricao |
| ---- | ------ | ---- |
| Lista de favoritos | `local_favorites` | Array de IDs de prompts favoritos |
| Prompts personalizados | `local_user_prompts` | Dados de prompts criados pelo usuario |
| Ordem de classificacao | `local_myspace_order` | Ordenacao de cartoes em Minha Colecao |
| Tags personalizadas | `local_custom_tags` | Definicoes e atribuicoes de tags |

:::caution Aviso
- O armazenamento local do navegador tem um limite de capacidade de aproximadamente 5 MB, que e mais do que suficiente para uso diario.
- Limpar os dados do navegador causara perda de dados pessoais. Recomenda-se fazer backup regularmente atraves de "Configuracoes > Exportar dados".
- Os dados devem ser reimportados apos trocar de computador ou navegador.
:::

## Implantacao

A versao offline e baseada na branch `offline`. Uma vez que o administrador complete a implantacao, os membros da equipe podem usa-la sem passos adicionais.

### Implantacao Docker (Recomendado)

O metodo de implantacao mais simples -- um unico comando para executar no seu servidor de intranet:

```bash
# Usar a imagem offline pre-construida
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Ou usar Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Apos a implantacao, os membros da equipe podem acessar `http://<IP-do-servidor>:3000`.

Usando `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Construir a partir do Codigo Fonte

Se voce precisa personalizar o conteudo de prompts ou modificar configuracoes:

```bash
# Clonar a branch offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Instalar dependencias
yarn

# Desenvolvimento local
yarn start

# Construir versao de idioma unico (chines)
yarn build --locale zh-Hans

# Construir todos os idiomas
yarn build
```

O resultado da construcao esta no diretorio `build/` e pode ser implantado em qualquer servidor de arquivos estaticos (Nginx, Apache, Caddy, etc.).

### Exemplo de Configuracao Nginx

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

### Implantacao em Plataformas

Ao implantar em plataformas como Vercel ou Cloudflare Pages, selecione a branch `offline`. Todos os outros passos sao iguais a versao online. Consulte [Implantacao do Projeto](../deploy) para mais detalhes.

## Importacao e Exportacao de Dados

### Exportar

Va em "Configuracoes > Exportar dados" para exportar seus favoritos pessoais e prompts personalizados como um arquivo JSON.

### Importar

Os seguintes formatos de arquivo JSON sao suportados para importacao:

- **Arquivos exportados da versao offline**: Restauracao completa de favoritos, prompts, ordenacao e tags
- **Arquivos exportados da versao online**: Processamento automatico de compatibilidade
  - Prompts do usuario → Mesclados no armazenamento local (deduplicados por titulo)
  - Favoritos selecionados (card) → Mesclados nos favoritos locais
  - Favoritos da comunidade (community) → Convertidos automaticamente em prompts personalizados locais
  - Ordenacao MySpace → Restaurada no armazenamento local
  - Tags personalizadas → Adicionadas e mescladas (nao sobrescreve as existentes)

### Migrar da Versao Online

1. Exporte dados da pagina "Minha Conta" na versao online (aishort.top)
2. Importe o arquivo JSON na pagina "Configuracoes" da versao offline
3. Os favoritos da comunidade serao automaticamente convertidos em prompts locais, e os favoritos selecionados sincronizarao normalmente

## Perguntas Frequentes

### Como a equipe usa apos a implantacao?

Apos o administrador implantar em um servidor de intranet, basta compartilhar a URL de acesso (ex: `http://192.168.1.100:3000`) com os membros da equipe. Cada um abre no navegador -- sem instalacao, sem registro necessario.

### Os dados de diferentes usuarios se afetam mutuamente?

Nao. Os favoritos e prompts personalizados de cada pessoa sao salvos no localStorage de seu proprio navegador, completamente independentes. O servidor apenas hospeda a biblioteca de prompts compartilhada (somente leitura).

### Os dados podem ser perdidos?

As seguintes acoes causarao perda de dados pessoais:

- Limpar dados/cache do navegador
- Navegar em modo privado/anonimo
- Trocar de computador ou navegador

Recomenda-se fazer backup regularmente de dados importantes atraves de "Configuracoes > Exportar dados" como um arquivo JSON.

### Prompts personalizados podem ser compartilhados entre membros da equipe?

Sim. Uma pessoa exporta o arquivo JSON, e os outros membros importam atraves de "Configuracoes > Importar dados". Duplicatas sao removidas automaticamente durante a importacao.

### Como atualizar a biblioteca de prompts?

A biblioteca de prompts sao dados estaticos empacotados no momento da construcao. Para atualizar:

1. O administrador obtem o codigo mais recente da branch `offline`
2. Reconstroi e reimplanta (ou baixa a imagem Docker mais recente)
3. Os membros da equipe atualizam a pagina do navegador para ver o novo conteudo (dados pessoais nao sao afetados)

### O formato de dados da versao offline e compativel com a versao online?

Sim. O formato JSON exportado e identico e pode ser importado entre as duas versoes. Os IDs de prompts diferem entre as versoes (a versao online usa IDs do servidor, a versao offline usa IDs de timestamp), mas a deduplicacao e feita por titulo durante a importacao, portanto nao ha conflitos.
