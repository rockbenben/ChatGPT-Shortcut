---
sidebar_label: Instalar Extensión del Navegador
title: Extensión AI Short | Barra lateral de ChatGPT/Gemini/Claude · Instalación en Chrome/Edge/Firefox
description: Usa los prompts de AiShort directamente desde la barra lateral en páginas de chat de IA como ChatGPT, Gemini, Claude y Doubao, sin cambiar de pestaña para copiar y pegar. Instalación con un clic en Chrome, Edge y Firefox.
---

# Instalar Extensión del Navegador

La extensión AiShort (ChatGPT Shortcut) incrusta la biblioteca de prompts directamente en la barra lateral de páginas de chat de IA como ChatGPT, Gemini, Claude y Doubao, para que no tengas que volver a aishort.top a copiar y pegar. Compatible con Chrome, Edge y Firefox, e invocable rápidamente con `Alt + Shift + S`.

## Instalación

### 1. Tienda de aplicaciones (recomendado, instalación con un clic)

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/) (después de instalar necesitas hacer una [configuración de permisos](./firefox-extension-setting), o la barra lateral no aparecerá en ChatGPT)

### 2. ¿No puedes abrir la tienda? Paquete de instalación local

Descarga desde los siguientes canales y luego sigue el tutorial correspondiente para instalar:

- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

> 📖 Guías de instalación: [Archivo CRX](./manual-chrome-extension) · [Archivo ZIP](./manual-chrome-extension-zip)

## Después de instalar

Presiona `Alt + Shift + S` para invocar, o haz clic en el icono de la barra de herramientas. Para más detalles, consulta la [guía de uso](./usage).

## Script de Tampermonkey

Además del formato de extensión, también proporcionamos el [**Script de Tampermonkey ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere).
Tampermonkey es una extensión de navegador que permite a los usuarios ejecutar scripts personalizados para mejorar las funciones de las páginas web.

Con este script, puedes invocar la barra lateral de AiShort en cualquier sitio web.
Sin embargo, debido a las restricciones de la página oficial de ChatGPT sobre la inyección de scripts, en esa página el script se ejecutará como una **ventana emergente** en lugar de una barra lateral.

Una vez activada la barra lateral de AiShort, verás un icono verde de interruptor en la esquina inferior derecha de las páginas compatibles. Haz clic en este icono para abrir o cerrar la barra lateral. Actualmente, se admiten por defecto ChatGPT, Gemini, Claude, Doubao, entre otros.

![](/img/docs/extension-sidebar.webp)
