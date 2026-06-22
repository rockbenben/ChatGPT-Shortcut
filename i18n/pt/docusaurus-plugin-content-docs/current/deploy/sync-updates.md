---
sidebar_label: Mantendo Seu Fork Atualizado
title: Atualização Automática do AI Short | Fork Acompanhando o Upstream
description: Faça seu fork do AI Short acompanhar automaticamente as atualizações upstream — resolva o problema do aviso de atualização na implantação Vercel e ative a sincronização automática via GitHub Actions.
---

# Mantendo Seu Fork Atualizado

Uma implantação Vercel com um clique pode continuar exibindo um aviso de "atualização disponível" — porque a Vercel cria um novo projeto em vez de um fork, portanto não consegue detectar atualizações upstream. Para corrigir isso:

1. Exclua o repositório original
2. Use o botão **Fork** no canto superior direito da página para fazer um fork deste projeto
3. Na [página de novo projeto da Vercel](https://vercel.com/new), reimporte o repositório forkado em Import Git Repository e implante

## Ativar Atualização Automática

> Se encontrar um erro de Upstream Sync, execute o Sync Fork manualmente uma vez!

Após fazer o fork, habilite manualmente os Workflows na página Actions e execute a Upstream Sync Action uma vez. Uma vez ativado, o projeto sincroniza automaticamente todos os dias:

![Atualização Automática](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Ativar Atualização Automática](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Atualização Manual

Quer atualizar imediatamente de forma manual? Consulte a [documentação de sincronização de forks do GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Você também pode dar uma estrela / acompanhar este projeto para ser notificado sobre novas funcionalidades.
