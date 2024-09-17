# Implantar

AI Short é um projeto de código aberto, você pode modificar o nome e a descrição do site livremente.

- Para alterar o nome da página, edite o arquivo `docusaurus.config.js`.
- Para modificar as instruções, vá para o diretório `docs`.
- Para modificar as palavras do prompt, você pode encontrá-las em `src/data/prompt.json`. Se você só precisa modificar um único idioma, como chinês, você pode editar diretamente `src/data/prompt_zh.json`.
- Atualmente, o backend do usuário está conectado a um sistema de backend comum. Se necessário, você pode construir seu próprio backend, e a interface relevante está localizada no arquivo `src/api.js`.

`CodeUpdateHandler.py` é um script para processamento em lote de implantação multilíngue. Após concluir a modificação, execute `python CodeUpdateHandler.py`, que dividirá `prompt.json` em vários idiomas de acordo com as regras e sincronizará o código da página principal de cada idioma e o código da página independente das palavras de prompt selecionadas.

## Implantação

### Implantar com Vercel

Clique no botão abaixo para implantar o ChatGPT-Shortcut na plataforma Vercel com um clique:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

Com o Vercel, você pode hospedar seu projeto rapidamente e manipular automaticamente compilações e implantações, o que é adequado para usuários que não têm requisitos complexos de configuração de servidor.

### Implantação local

Certifique-se de ter instalado o [Node.js](https://nodejs.org/).

```shell
# Instalação
yarn

# Desenvolvimento local
yarn start

# Build: Este comando gera conteúdo estático no diretório `build`
yarn build

# Atualize o `defaultLocale` no arquivo `docusaurus.config.js` e execute uma compilação para o idioma desejado.
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

# Implantar para vários idiomas
yarn build --locale zh && yarn build --locale en
```

### Implantação do Docker

Se você estiver familiarizado com o Docker, poderá implantar rapidamente com o seguinte comando:

```shell
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternativamente, você pode usar `docker-compose`:

```yml
version: "3.8"

services:
docsify:
container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: unless-stopped
```

## Atualizações sincronizadas

Se você implantou seu próprio projeto no Vercel com um único clique, pode encontrar um problema em que as atualizações são consistentemente indicadas. Isso surge do comportamento padrão do Vercel de criar um novo projeto para você em vez de bifurcar o projeto atual, impedindo assim a detecção adequada de atualizações. É recomendável seguir as etapas subsequentes para a reimplantação:

1. Remova o repositório anterior.
2. Utilize o botão "fork" localizado no canto superior direito da página para bifurcar o projeto atual.
3. Na [página Vercel New Project](https://vercel.com/new), selecione o projeto bifurcado recentemente na seção Import Git Repository e prossiga com a implantação.

### Atualizações Automáticas

> No caso de encontrar um erro durante a execução do Upstream Sync, execute manualmente um único Sync Fork.

Depois de bifurcar o projeto, devido às restrições do GitHub, é necessário habilitar manualmente os Workflows na página Actions do seu projeto bifurcado e ativar a Upstream Sync Action. Após a ativação, as atualizações serão executadas automaticamente diariamente.

![Atualizações automáticas](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitando atualizações automáticas](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Atualizações manuais

Se você deseja atualizar manualmente imediatamente, pode consultar a [documentação do GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para aprender como sincronizar o projeto bifurcado com o código upstream.

Sinta-se à vontade para mostrar apoio a este projeto dando uma estrela/seguindo, ou seguindo o autor, para se manter informado sobre notificações oportunas sobre novas atualizações de recursos.
