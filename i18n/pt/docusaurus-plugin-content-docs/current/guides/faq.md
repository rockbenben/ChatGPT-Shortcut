# Perguntas Frequentes

## Por que as palavras sugeridas estão em inglês?

O AiShort foi criado para facilitar o uso do ChatGPT por falantes não nativos de inglês. No entanto, todas as palavras sugeridas estão em inglês. Isso ocorre porque o ChatGPT tem uma compreensão melhor do inglês em comparação com outros idiomas. Mesmo o MOSS, o primeiro modelo de linguagem de diálogo em chinês em grande escala, reconhece que suas respostas em inglês são superiores às respostas em chinês. Portanto, é recomendado usar palavras sugeridas em inglês. (O MOSS não está mais disponível)

Embora o uso de palavras sugeridas em outros idiomas possa resultar em bons resultados, os resultados podem variar significativamente quando você insere as mesmas sugestões em outro idioma novamente. Como a compreensão do ChatGPT em relação a sugestões em outros idiomas varia a cada vez, é aconselhável usar sugestões em inglês para sugestões orientadas à produtividade, a fim de garantir a saída desejada. Além disso, as respostas geradas por sugestões em inglês provavelmente estarão em inglês. Você pode especificar o idioma de resposta como chinês adicionando "responder em chinês" ao final da sugestão. Se seu idioma nativo for diferente, substitua "chinês" pelo seu próprio idioma nativo.

## Preciso inserir a sugestão toda vez?

Na API, você pode definir a sugestão como "sugestão do sistema", para que você não precise inserir a sugestão cada vez. O ChatGPT seguirá as instruções com base na sugestão do sistema.

Na versão web do ChatGPT, se você não tiver alterado a sugestão principal, basta colocar o conteúdo da resposta subsequente entre aspas, eliminando a necessidade de inserir a sugestão a cada vez. Quando a resposta gerada não estiver de acordo com os requisitos da sugestão, significa que o ChatGPT esqueceu da sugestão e, nesses casos, você precisará inserir novamente a sugestão para realinhá-lo. Além disso, cada link de conversa é único e você pode salvar as conversas frequentemente usadas como favoritos para uso futuro.

## Atraso na pesquisa do método de entrada

A função de pesquisa é baseada na vitrine do Docusaurus e apresenta um problema com a perda de foco do método de entrada no lado do PC. Após relatar o problema ao Docusaurus, eles mencionaram que tentariam corrigi-lo, mas até o momento o problema continua sem solução, com o comentário "FWIW, você não deveria usar chinês de qualquer forma, já que a vitrine não é localizada". Portanto, categorizei o componente de pesquisa em dois tipos: móvel e PC. A lógica de pesquisa para dispositivos móveis permanece inalterada, enquanto para navegação em PC com uma largura de tela acima de 768 pixels, introduzi a função "debounce" para resolver o problema do método de entrada. No entanto, isso introduz dois problemas no lado do PC: a entrada não em inglês precisa ser concluída dentro de 800 milissegundos e a atualização da pesquisa no PC passa de instantânea para um atraso de 800 milissegundos. Se você tiver uma solução melhor, por favor, forneça feedback.

## Emissão de informações falsas

Embora o ChatGPT seja muito poderoso, ele não é infalível. Às vezes, pode fornecer informações falsas. Por exemplo, quando precisei inserir centenas de informações no AiShort, usei o ChatGPT para converter os dados em um formato específico. No entanto, durante o processo de conversão, percebi que o ChatGPT havia escrito algumas informações de forma imprecisa. Por exemplo, um rótulo no texto era "crítico de cinema", mas o ChatGPT o alterou para "crítico de filmes". Embora isso possa não ter impacto no texto em si, pode causar um erro ao ser usado no código. Portanto, ao usar o ChatGPT, é essencial revisar sua saída.

## Os prompts são ineficazes?

Se você estiver envolvido na tarefa de resumir, poderá utilizar o GPT para refinar e aprimorar suas respostas iniciais, elevando assim a precisão de suas respostas. Além disso, os prompts não são benéficos apenas para a produção de trabalho; mais importante ainda, eles servem como catalisadores para a estimulação intelectual. Eles ajudam a ampliar sua perspectiva, permitindo que você contemple questões de vários ângulos e aborde possíveis erros que geralmente ocorrem durante o processo de pensamento.

Todos os prompts utilizados pelo AI Short são obtidos da Internet e estão sujeitos a atualizações regulares em nosso repositório de prompts. Embora cada prompt seja submetido a testes extensivos, sua eficácia pode variar de acordo com as necessidades individuais do usuário. Se você encontrar alguma imprecisão, conceber ideias inovadoras ou se deparar com prompts úteis, é recomendável que nos informe por meio de [feedback](/feedback) ou compartilhe suas descobertas em nossa comunidade.
