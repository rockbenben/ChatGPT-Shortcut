---
sidebar_label: Prompts Personalizados
title: Prompts Personalizados AI Short | Criar, Editar e Compartilhar
description: Crie prompts de IA exclusivos, salve em sua conta para acesso a qualquer momento. Compartilhe na comunidade ou mantenha privado, com backup de dados em um clique.
---

# Prompts Personalizados

Após o login, você pode criar seus próprios prompts e salvá-los na conta para acesso a qualquer momento. Os prompts personalizados aparecem na visualização "Minha Coleção".

## Criar Prompt

1. Clique no botão "Adicionar" no canto superior direito
2. Preencha o formulário na janela "Criar Prompt":
   - **Nome do prompt** (obrigatório): dê um nome ao prompt
   - **Conteúdo do prompt** (obrigatório): o texto principal do prompt
   - **Uso** (opcional): descrição breve do que o prompt faz
   - **Observações** (opcional): origem, versões em outros idiomas ou notas adicionais
3. Na parte inferior, o controle "Deseja compartilhar este prompt na página pública?" vem ativado por padrão — desative para deixá-lo visível apenas para você
4. Clique em "Criar Prompt" para enviar

![Janela de Criar Prompt](/img/docs/user-prompts-create.png)

> 💡 **Exemplo de preenchimento** — um prompt "Assistente de atas de reunião":
> - **Nome do prompt**: Assistente de atas de reunião
> - **Conteúdo do prompt**: Você é um assistente profissional de redação corporativa. Com base na transcrição abaixo, gere a ata da reunião em português, organizada nos tópicos: pauta, decisões tomadas, responsáveis e prazos. Use linguagem clara e objetiva: [transcrição ou anotações da reunião]
> - **Uso**: Transformar transcrições e anotações soltas em uma ata estruturada, pronta para enviar à equipe
> - **Observações**: Funciona bem com transcrições do Google Meet, Zoom ou Teams

## Editar Prompt

Na visualização Minha Coleção, clique no cartão de um prompt que você criou para abrir a janela "Editar Prompt", onde você pode:

- Alterar nome, conteúdo, uso e observações
- Alternar status de compartilhamento (público/privado)
- Clicar em "Salvar" para atualizar

![Interface de Edição de Prompt](/img/docs/user-prompts-edit.png)

## Excluir Prompt

Clique em "Excluir" na janela de edição. A exclusão é irreversível — confirme com atenção antes de prosseguir.

## Compartilhar na Comunidade

Ao criar ou editar, o controle "Deseja compartilhar este prompt na página pública?" na parte inferior controla a visibilidade:

- **Ativado (padrão)**: o prompt aparece na página de [Prompts da Comunidade](./community), onde outros usuários podem vê-lo e favoritá-lo
- **Desativado**: prompt privado, visível apenas para você

O status de compartilhamento pode ser alterado a qualquer momento.

## Exportar Backup

1. Vá para "Minha Conta" → encontre a seção "Gerenciamento de Dados → Exportar Prompts"
2. Clique no botão "Exportar Dados"
3. O sistema gera um arquivo JSON e baixa automaticamente

O conteúdo exportado inclui:

- Nome, conteúdo, uso e observações dos prompts
- Datas de criação e atualização
- Status de compartilhamento

Recomenda-se exportar backups regularmente para evitar perda de dados.

## Importar Prompts

Importe prompts e favoritos de um arquivo JSON:

1. Vá para "Minha Conta" → encontre a seção "Gerenciamento de Dados → Importar Prompts"
2. Clique no botão "Importar Dados"
3. Selecione um arquivo JSON
4. O sistema mescla os dados automaticamente (deduplicação por título; prompts com IDs de outros usuários são automaticamente marcados como privados)

### Colaboração em Equipe

Fluxo recomendado para compartilhar prompts dentro de uma equipe:

1. **Filtrar e compartilhar**: após exportar, remova manualmente a lista de favoritos ou filtre os prompts que deseja compartilhar e envie o arquivo aos membros da equipe para importação
2. **Proteção de privacidade**: prompts importados de outras pessoas (IDs que não pertencem à conta atual) são automaticamente marcados como **privados**, garantindo que os dados de cada membro não se misturem

## Documentação Relacionada

- [Minha Coleção](./my-collection) - Gerenciamento de favoritos e tags
- [Prompts da Comunidade](./community) - Compartilhamento e votação
- [Gerenciamento de Conta](./account) - Login e configurações
