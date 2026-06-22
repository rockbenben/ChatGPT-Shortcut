---
sidebar_label: Perguntas Frequentes
title: AI Short FAQ | Uso, Otimização, Uso Comercial e Privacidade
description: AiShort é gratuito? Os prompts são multi-modelo? Uso comercial permitido? Este guia responde 13 dúvidas sobre uso, otimização, uso comercial e privacidade.
---

# Perguntas Frequentes

## AiShort é um gerador de prompts de IA?

Não. AiShort é uma biblioteca de prompts **selecionados e organizados manualmente** por cenário, e não uma ferramenta que usa LLMs para gerar prompts automaticamente. Cada prompt é filtrado e classificado por tags, pronto para copiar e colar em qualquer ferramenta de conversa com IA — ChatGPT, Claude, Gemini, DeepSeek, entre outras. Se você procura ferramentas do tipo "gerar prompt automaticamente a partir de um requisito", PromptPerfect e ChatGPT prompt generator são uma categoria diferente de produto.

## AiShort é gratuito? Precisa de API Key?

Totalmente gratuito, **sem necessidade de API Key e sem cadastro**. Navegar, pesquisar e copiar prompts não exige nenhuma conta.

Após o cadastro, você desbloqueia funcionalidades adicionais — favoritos com ordenação por arrastar e soltar, tags personalizadas, criação e gerenciamento de prompts privados, compartilhamento e votação na comunidade, exportação de dados em JSON, sincronização entre dispositivos —, e continua tudo gratuito. Todo o código é open source no [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

Observação: o AiShort fornece apenas os prompts. **O custo de uso do modelo de IA em si depende do serviço de IA que você utiliza** (por exemplo, ChatGPT versão gratuita/paga, cobrança por API, etc.).

## Quantos prompts existem? Quais cenários são cobertos?

AiShort hospeda **5000+ prompts no total**, organizados em duas bibliotecas:

- **Biblioteca curada** —— selecionados manualmente, classificados por 25+ tags de cenários, totalmente traduzidos para 18 idiomas. Tags: assistência de escrita, IT/programação, artigos/relatórios, SEO/marketing, funções empresariais, acadêmicos/professores, educação/estudantes, idioma/tradução, psicologia/social, treinamento mental, ferramentas de produtividade, terminal/interpretador, debate/discurso, crítica/avaliação, ciência divertida, enciclopédia da vida, saúde médica, conselheiro financeiro, música/arte, filosofia/religião, texto/palavras, jogos divertidos, conselheiro profissional, etc.
- **[Biblioteca da comunidade](./community)** —— a grande maioria, contribuída continuamente pelos usuários, ordenável por popularidade ou data com busca completa; cobre cenários mais finos e amplos que a curada.

Se não encontrar o que procura na curada, busque na comunidade.

## Quais modelos de IA são suportados? Os prompts são compatíveis entre modelos?

Os prompts do AiShort são universais e **funcionam em qualquer cenário em que você possa inserir um prompt** — não só páginas de chat, mas também ferramentas de programação como Cursor, chamadas de API, agentes de IA, etc. Abaixo, os modelos de conversa mais comuns:

- Internacionais: ChatGPT, Gemini, Claude, Grok
- China continental: DeepSeek, Tongyi Qianwen, ERNIE Bot, Doubao, Kimi, ChatGLM, Spark Desk, Tencent Yuanbao
- Plataformas de API: OpenRouter, SiliconFlow, Groq

Veja a lista completa em [Início Rápido → Modelos de IA Comuns](./getting-started#modelos-de-ia-comuns).

**Compatibilidade entre modelos**: a grande maioria dos prompts de texto é compatível entre modelos — tarefas gerais como escrita, tradução, programação e perguntas e respostas produzem resultados úteis com o mesmo prompt nos principais LLMs, e por padrão nenhum prompt do AiShort está atrelado a um modelo específico. A única exceção são os prompts de geração de imagem (Midjourney / Stable Diffusion / DALL·E), que precisam ser ajustados à sintaxe de cada ferramenta.

## Por que os prompts estão em inglês?

Os modelos de IA entendem melhor o inglês e produzem saídas mais estáveis. Prompts em português também funcionam, mas, ao executar o mesmo prompt em português várias vezes, os resultados podem variar bastante. Para cenários importantes, recomenda-se o uso de prompts em inglês.

> 💡 Quer a resposta em português? Adicione ao final do prompt: `respond in Portuguese` ou, equivalentemente, `responda em português brasileiro`.

## Preciso digitar o prompt toda vez?

**Uso de API**: defina o prompt como `system prompt` e ele será aplicado automaticamente nas conversas subsequentes.

**Versão Web**: se você não trocar de conversa, o ChatGPT lembrará o prompt atual. Quando a resposta começar a se desviar, significa que ele "esqueceu" o prompt — basta colar novamente.

**Dica**: salve as conversas mais usadas como favoritos do navegador para abrir diretamente da próxima vez.

## Como escolher o prompt certo?

Procure de trás para frente, a partir do que você quer obter: para escrever artigos, use as tags [`write`](/?tags=write) ou [`article`](/?tags=article); para código, [`code`](/?tags=code) ou [`interpreter`](/?tags=interpreter); para tradução, [`language`](/?tags=language); para interpretação de papéis, [`games`](/?tags=games); se não estiver familiarizado com as tags, faça uma busca direta por palavras-chave. Cada cartão de prompt exibe a popularidade (número de cópias) — prompts mais copiados tendem a ter qualidade mais consistente.

## Por que não encontro um prompt relacionado?

A pesquisa na página inicial é limitada à **biblioteca de prompts selecionados** (incluindo seus prompts pessoais após o login) e **não inclui** prompts compartilhados pela comunidade.

Se palavras-chave curtas não retornam resultados na página inicial, pesquise novamente na página [Prompts da Comunidade](./community) — lá há muito mais conteúdo compartilhado por usuários.

## O que fazer se a IA gerar informações falsas?

A IA às vezes produz "alucinações", gerando informações que parecem plausíveis mas estão factualmente incorretas. Sugestões:

1. **Verifique informações-chave**: especialmente dados, citações, código, etc.
2. **Otimização em várias rodadas**: peça à IA para revisar e otimizar a resposta novamente
3. **Validação cruzada**: use prompts ou modelos diferentes para verificar conclusões importantes

Prompts adequados ajudam a reduzir as alucinações da IA.

## O prompt não está funcionando bem — como ajustar?

Não troque o prompt de imediato. Antes, ajuste por estes ângulos:

1. **Torne os `[placeholders]` entre colchetes mais específicos** — acrescente detalhes como estilo, comprimento, área de atuação, perfil do público, etc.
2. **Peça otimizações à IA**: para respostas insatisfatórias, peça "refaça mais X" ou "reescreva no estilo Y"; em geral, uma ou duas rodadas de iteração já aproximam a saída do que você quer. Você também pode pedir à IA para autoavaliar a própria resposta e melhorá-la
3. **Compare modelos**: experimente o mesmo prompt em outro modelo (Claude / ChatGPT / Gemini / DeepSeek, etc.); cada modelo tem seus pontos fortes e os resultados podem variar bastante
4. **Experimente a comunidade**: em [Prompts da Comunidade](./community) pode haver uma versão mais adequada — você também é bem-vindo para compartilhar seus bons prompts lá
5. **Envie feedback**: encontrou problemas ou tem sugestões? Compartilhe pelo [Feedback](/feedback)

## Como faço backup dos meus prompts?

1. Vá para "Minha Conta" → encontre a seção "Gerenciamento de Dados → Exportar Prompts"
2. Clique no botão "Exportar Dados"
3. O sistema gera automaticamente um arquivo JSON para download

Recomenda-se fazer backups regulares para evitar perda de dados.

## Posso usar os prompts do AiShort em projetos comerciais?

Sim, mas o licenciamento depende da origem do conteúdo:

1. Conteúdo proveniente de [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) está em **domínio público sob CC0**, sem restrições
2. Conteúdo próprio do AiShort e contribuições da comunidade são, por padrão, licenciados sob **CC BY-SA 4.0** — uso comercial, redistribuição e adaptação são permitidos, desde que o crédito ao AiShort / autor original seja mantido e os derivados sejam disponibilizados sob a mesma licença aberta
3. O **conteúdo gerado pela IA a partir do prompt** segue os termos de uso do provedor de IA escolhido (OpenAI, Anthropic, Google, etc.); na maioria dos casos, a titularidade fica com você
4. As poucas entradas explicitamente marcadas como "somente uso pessoal" na descrição do cartão de prompt são exceção

## Copiar um prompt expõe meus dados?

Não. Os prompts do AiShort são empacotados como JSON estático no próprio site, e **a operação de cópia acontece localmente, na área de transferência do seu navegador**.

O **conteúdo que você preenche nos placeholders e a resposta que a IA devolve** trafegam diretamente entre você e a plataforma de IA escolhida (ChatGPT, Claude, Gemini, DeepSeek, etc.); o AiShort não tem acesso a isso.

Um esclarecimento: ao copiar, um **evento anônimo de contagem** é enviado ao backend (POST `/cards/<id>/copy`), usado apenas para estatísticas de popularidade de cada prompt (o "número de cópias" exibido no cartão). **Apenas o ID do cartão é enviado — não inclui** o conteúdo que você preencheu, não inclui dados pessoais e não é vinculado à sua identidade.

**Após fazer login**, sua lista de favoritos, prompts personalizados e contribuições à comunidade são sincronizados com o backend para uso entre dispositivos, com suporte para exportação em JSON a qualquer momento e remoção completa de todos os dados com um clique.

## Documentação Relacionada

- [Início Rápido](./getting-started) - Uso básico
- [Minha Coleção](./my-collection) - Gerenciamento de favoritos e tags
- [Prompts da Comunidade](./community) - Descoberta e compartilhamento
