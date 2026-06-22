---
sidebar_label: Implantação
title: Implantação do AI Short - Guia Vercel, Docker e Cloudflare
description: Implante o AI Short facilmente - Suporte a Vercel, Docker e Cloudflare. Guia de configuração e atualizações automáticas.
---

# Implantação do Projeto

> **Para quem é este guia**: desenvolvedores que desejam hospedar ou personalizar o AiShort. Usuários comuns podem simplesmente usar o [aishort.top](https://www.aishort.top) — não é necessário ler este documento.

## Escolha um Modelo de Implantação

Escolha o modelo que melhor se adapta às suas necessidades:

| Modelo                            | Backend                                          | Observações                                                                                                                                                                                                 |
| --------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Padrão** (recomendado)          | Reutiliza o backend compartilhado oficial        | Após fazer o fork, você pode personalizar o nome do site, descrição, prompts, etc. (consulte [Configuração](./deploy/configuration)); login, favoritos, comunidade e sincronização funcionam de imediato |
| **Edição Offline**                | Sem backend; dados armazenados localmente no navegador | Redes corporativas ou governamentais isoladas; nenhuma conta necessária                                                                                                                                     |
| **Backend totalmente auto-hospedado** | Seu próprio backend independente            | Quando você precisa de um sistema de contas independente, total propriedade dos dados e uma comunidade privada                                                                                               |

Os dois primeiros modelos são abordados neste guia. Para o terceiro, como o serviço de backend não é de código aberto, por favor [envie um e-mail ao desenvolvedor](mailto:qingwhat@gmail.com) com uma breve descrição do seu caso de uso e escala para obter um plano de implantação e suporte.

## Documentação de Implantação

Dividida nas seções a seguir conforme o fluxo de implantação; consulte conforme a necessidade:

- **[Implantação Padrão](./deploy/standard)** — reutiliza o backend compartilhado oficial, com suporte a build local, Vercel, Cloudflare Pages e Docker.
- **[Versão Offline (Intranet Corporativa)](./deploy/offline)** — solução offline para ambientes isolados como intranets corporativas ou redes governamentais, sem backend nem contas.
- **[Configuração e Personalização](./deploy/configuration)** — modifique o título e a descrição do site, os prompts e conecte um backend personalizado.
- **[Mantendo Seu Fork Atualizado](./deploy/sync-updates)** — faça seu fork acompanhar automaticamente as atualizações upstream e evite ficar para trás.
