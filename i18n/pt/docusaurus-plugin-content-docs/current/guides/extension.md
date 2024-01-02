# Extensão do Navegador

A extensão AiShort (ChatGPT Shortcut) é compatível com os navegadores Chrome, Edge, Firefox e outros navegadores baseados no Chromium. Esta extensão não apenas oferece as funcionalidades da versão web do ChatGPT, mas também adiciona recursos exclusivos, como uma barra lateral e ativação automática de janelas. A extensão pode ser iniciada automaticamente com o ChatGPT ou páginas personalizadas, e também suporta ativação manual por meio do atalho `Alt+Shift+S`. Abaixo estão os canais de download:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

Além disso, fornecemos um script do Greasemonkey chamado [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), que permite aos usuários personalizar os domínios correspondentes e usar a barra lateral do AiShort em qualquer site. No entanto, observe que, devido às restrições de injeção de scripts nas páginas do ChatGPT, a função de barra lateral do script é ativada por meio de uma janela pop-up nas páginas do ChatGPT.

## Opções de Idioma

O ChatGPT Shortcut suporta 13 idiomas principais, e o idioma da extensão será automaticamente definido com base no ambiente do seu navegador. O idioma das páginas integradas do ChatGPT e da barra lateral também seguirá essa configuração. Por favor, note que, para evitar alertas de permissões de sites de terceiros, evite mudar o idioma diretamente em páginas incorporadas.

![Seleção de Idioma](https://img.newzone.top/2023-12-23-12-04-29.png?imageMogr2/format/webp)

## Configurações de Exibição

### Barra Lateral do AiShort

Quando a barra lateral do AiShort está ativada, ela será automaticamente ativada ao visitar páginas específicas. Você também pode ativá-la manualmente clicando no ícone verde no canto inferior direito da página. Atualmente, a barra lateral é suportada nos seguintes sites: ChatGPT, Bard, Claude, Wenxin Yiyan.

![Barra Lateral do AiShort](https://img.newzone.top/2023-12-23-04-16-15.gif?imageMogr2/format/webp)

Se você deseja usar a barra lateral do AiShort em outros sites, instale o script [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere). Observe que o script ChatGPT Shortcut Anywhere não funcionará nos sites suportados por padrão pela extensão, a fim de evitar conflitos de funcionalidade e possíveis conflitos.

### Página Integrada

Quando a opção de página integrada está ativada, um botão de página integrada do AiShort aparecerá no canto superior esquerdo da versão web do ChatGPT. Ao clicar nele, a página do AiShort substituirá a interface do aplicativo do ChatGPT.

![Página Integrada](https://img.newzone.top/ai/2023-12-22-19-40-15.png?imageMogr2/format/webp)

## Modo de Janela Independente

Ao ativar o modo de janela independente, a interface da extensão será exibida de forma persistente em uma janela separada, facilitando a realização de multitarefas. Você pode configurar quais sites ativam automaticamente a janela do AiShort nas configurações da extensão.

![Modo de Janela Independente](https://img.newzone.top/2023-12-23-12-07-09.png?imageMogr2/format/webp)

### Ativação Automática de Sites

Nas configurações da extensão, você pode especificar quais sites ativam automaticamente a janela independente do AiShort.

![Ativação Automática de Sites](https://img.newzone.top/2023-12-23-12-09-51.png?imageMogr2/format/webp)

### Atalho de Teclado para Ativação

Use o atalho `Alt+Shift+S` para ativar diretamente a janela do AiShort, seja no modo de pop-up ou no modo de janela independente.

## Problemas de Login

### Restrições de Página Incorporada do ChatGPT

O ChatGPT tem várias restrições em relação às páginas incorporadas, incluindo a falta de suporte para login via autorização do Google. Os usuários só podem fazer login com um nome de usuário e senha. Se sua conta foi criada usando a autorização do Google, você pode usar a função "Esqueci minha senha" para configurar uma senha.

### Mensagem de Conteúdo Bloqueado

Após fazer login com nome de usuário e senha, às vezes a página pode exibir uma mensagem informando que "este conteúdo foi bloqueado". Nesse caso, uma simples atualização da página geralmente resolve o problema e restaura o estado normal após o login.

## Configurações no Firefox

As configurações no navegador Firefox podem ser um pouco mais complexas. Aqui estão dois passos principais:

### 1. Fixar a Extensão e Configurar o Acesso

Primeiro, na barra de ferramentas do Firefox, escolha "Fixar ChatGPT Shortcut" (Pin to Toolbar) e, em seguida, vá para o centro de extensões e clique em "Opções" (Options) na entrada da extensão ChatGPT Shortcut para acessar as configurações da extensão. Os passos específicos estão ilustrados na imagem a seguir:

![Configurações no Firefox](https://img.newzone.top/2023-12-25-05-51-47.png?imageMogr2/format/webp)

### 2. Autorizar a Execução da Extensão

Em segundo lugar, para garantir que a extensão funcione corretamente em sites como ChatGPT, Bard, entre outros, você precisará clicar com o botão direito do mouse no ícone da extensão nesses sites e selecionar "Permitir sempre neste site" (Always allow on ***). Isso concede à extensão permissão para modificar o conteúdo e adicionar uma barra lateral em sites específicos.

![Permissão da Extensão no Firefox](https://img.newzone.top/2023-12-25-05-59-48.png?imageMogr2/format/webp)