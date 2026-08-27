---
sidebar_label: Prompts Personalizados
title: Prompts Personalizados AI Short | Criar, Editar e Compartilhar
description: Crie prompts de IA exclusivos, salve em sua conta para acesso a qualquer momento. Compartilhe na comunidade ou mantenha privado, com backup de dados em um clique.
---

# Prompts Personalizados

Após o login, você pode criar seus próprios prompts e salvá-los na conta para acesso rápido posterior. Os prompts personalizados aparecem na visualização "Minha Coleção".

## Criar Prompt

1. Após o login, clique no botão "**Criar prompt**" no topo da página
2. Preencha o diálogo "Criar Prompt":
   - **Nome do prompt** (obrigatório): um nome para o prompt
   - **Conteúdo do prompt** (obrigatório): o corpo do prompt; texto entre colchetes `[...]` é destacado como marcador de posição na exibição
   - **Uso** (opcional): uma descrição breve do que o prompt faz
   - **Observações** (opcional): origem, versões em outros idiomas ou notas complementares
3. O interruptor de compartilhamento na parte inferior vem ativado — desative-o para manter o prompt privado
4. Clique em "Criar Prompt" para enviar

![Janela de Criar Prompt](/img/docs/user-prompts-create.png)

> 💡 **Exemplo** — um prompt "Gerador de Atualização de Standup":
> - **Nome do prompt**: Gerador de Atualização de Standup
> - **Conteúdo do prompt**: Você é um assistente de comunicação conciso. Transforme as notas a seguir em uma atualização diária de standup com três seções — Ontem, Hoje, Bloqueios. Mantenha cada tópico curto e focado em resultados: [minhas anotações brutas]
> - **Uso**: Converte anotações desorganizadas em uma atualização de standup limpa
> - **Observações**: Execute antes do standup matinal

## Editar Prompt

Na visualização Minha Coleção, clique no botão de edição (lápis) em um cartão de prompt que você criou para abrir o diálogo "Editar Prompt". Você pode:

- Modificar nome, conteúdo, uso e observações
- Alternar o status de compartilhamento (público / privado)
- Clicar em "Salvar" para atualizar

![Interface de Edição de Prompt](/img/docs/user-prompts-edit.png)

## Excluir Prompt

Em "Minha coleção", clique no botão excluir (lixeira) no card do seu prompt e confirme. A exclusão não pode ser desfeita — prossiga com cuidado.

## Compartilhar na Comunidade

Ao criar ou editar, o interruptor de compartilhamento na parte inferior controla a visibilidade:

- **Ativado (padrão)**: o prompt aparece na página de [Prompts da Comunidade](./community), onde outros usuários podem vê-lo e coletá-lo
- **Desativado**: privado — visível apenas para você

O status de compartilhamento pode ser alterado a qualquer momento.

## Exportar Prompts

1. Vá para "Minha Conta" e localize a seção "Gerenciamento de Dados → Exportar prompts"
2. Clique no botão "Exportar Dados"
3. O sistema gera um arquivo JSON e baixa automaticamente

O conteúdo exportado inclui:

- Nome, conteúdo, uso e observações dos prompts
- Status de compartilhamento
- Seus favoritos, a ordenação dos favoritos e as tags personalizadas

Recomenda-se exportar regularmente para evitar perda de dados.

## Importar Prompts

Importe prompts e coleções de um arquivo JSON:

1. Vá para "Minha Conta" e localize a seção "Gerenciamento de Dados → Importar prompts"
2. Clique no botão "Importar dados"
3. Selecione um arquivo JSON
4. O sistema mescla os dados automaticamente (correspondência por ID: prompts com o mesmo ID que os seus são atualizados, ou ignorados se o conteúdo for idêntico; os sem ID ou com ID de outra conta entram como novos registros, estes últimos forçados a privado)

### Colaboração em Equipe

Fluxo recomendado para compartilhar prompts dentro de uma equipe:

1. **Filtrar e compartilhar**: após exportar, remova manualmente sua lista de coleção ou filtre os prompts que deseja compartilhar e envie o arquivo aos membros da equipe para importação
2. **Proteção de privacidade**: prompts importados de outros usuários (IDs que não pertencem à conta atual) são automaticamente marcados como **privados**, para que os dados de cada membro permaneçam separados

## Documentação Relacionada

- [Minha Coleção](./my-collection) - Gerenciamento de coleção e tags
- [Prompts da Comunidade](./community) - Compartilhamento e votação
- [Gerenciamento de Conta](./account) - Login e configurações
