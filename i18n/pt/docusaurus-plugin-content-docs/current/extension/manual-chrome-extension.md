---
sidebar_label: Guia de Instalação CRX para Chrome
title: Instalação AI Short Chrome CRX | Instalação Manual via Modo Desenvolvedor
description: Instale manualmente a extensão AI Short via arquivo CRX, com instalação por arrastar após ativar o modo desenvolvedor. Inclui solução de problemas comuns.
---

# Guia de Instalação Local de Extensão CRX para Chrome

> Este tutorial assume que você já baixou e descompactou o pacote CRX a partir da [página de instalação](./README.md) (o arquivo .crx está dentro da pasta descompactada).
>
> ⚠️ **Dois erros comuns**:
> 1. Você precisa arrastar o **arquivo `.crx`** (descompactado) para a página de extensões, não o pacote zip em si
> 2. Você precisa **arrastar** — não clique em "Carregar sem compactação" (esse botão é para a versão zip)

## Ativar Modo de Desenvolvedor

Abra a página "Gerenciar Extensões" do Chrome e ative o "Modo de desenvolvedor".

Copie o endereço abaixo e cole na barra de endereços do navegador, pressione Enter para abrir. Ative o "Modo de desenvolvedor" no canto superior direito da página.

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## Instalar Extensão

Instale a extensão ChatGPT Shortcut (Nota ⚠️: Você precisa arrastar o arquivo .crx, não clique em "Carregar sem compactação")

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

Após a instalação bem-sucedida, você pode ver o [Tutorial de Uso da Extensão](./usage.md).

## Problemas de Instalação?

1. Usuários do Windows, verifiquem se descompactaram o pacote de instalação baixado (em vez de clicar duas vezes para abrir).

2. O "Modo de desenvolvedor" está ativado? Se não, consulte o segundo passo.

3. Você arrastou o arquivo crx para a página "Extensões"? Nota ⚠️: não clique em "Carregar sem compactação", você precisa arrastar o arquivo crx.

4. O navegador não permite a instalação de arquivos crx? Tente instalar o arquivo zip! [Clique aqui para ver o tutorial de instalação zip](./manual-chrome-extension-zip.md).
