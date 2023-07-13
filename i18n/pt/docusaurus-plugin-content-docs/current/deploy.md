# Implantação

## Implantação com Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Instalação

```shell
# Instalação
yarn

# Desenvolvimento Local
yarn start

# Build: Esse comando gera o conteúdo estático no diretório `build`
yarn build
```

## Atualizações Sincronizadas

Se você implantou seu próprio projeto no Vercel com um único clique, pode encontrar um problema em que as atualizações são consistentemente indicadas. Isso ocorre devido ao comportamento padrão do Vercel de criar um novo projeto para você em vez de fazer um fork do projeto atual, o que impede a detecção adequada de atualizações. Recomenda-se seguir as etapas subsequentes para reimplantação:

1. Remova o repositório anterior.
2. Utilize o botão "fork" localizado no canto superior direito da página para fazer um fork do projeto atual.
3. Na página [Vercel New Project](https://vercel.com/new), selecione o projeto recém-forked na seção Importar Repositório Git e prossiga com a implantação.

### Atualizações Automáticas

> No caso de encontrar um erro durante a execução do Upstream Sync, execute manualmente um único Sync Fork.

Depois de fazer o fork do projeto, devido às restrições do GitHub, é necessário habilitar manualmente os Workflows na página de Ações do seu projeto forked e ativar a ação Upstream Sync. Após a ativação, as atualizações serão executadas automaticamente diariamente.

![Atualizações Automáticas](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitando Atualizações Automáticas](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Atualizações Manuais

Se você deseja atualizar manualmente imediatamente, pode consultar a [documentação do GitHub](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para aprender como sincronizar o projeto forked com o código upstream.

Sinta-se à vontade para mostrar apoio a este projeto dando uma estrela/seguindo, ou seguindo o autor, para se manter informado sobre notificações oportunas sobre novas atualizações de recursos.
