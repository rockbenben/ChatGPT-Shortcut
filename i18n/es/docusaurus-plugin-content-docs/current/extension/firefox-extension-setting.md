---
sidebar_label: Configuración de Extensión de Firefox
title: Configuración Firefox - Barra lateral nativa y atajos
description: Configura AI Short en Firefox. Desde la v4.4.0 es igual que en Chrome, con barra lateral nativa sin permisos por sitio y Alt+Shift+D para alternarla.
---

# Configuración de Extensión de Firefox

Desde la v4.4.0, la versión de Firefox está alineada con la de Chrome: los mismos tres modos de visualización — **barra lateral, ventana emergente y ventana independiente** — con la biblioteca de prompts empaquetada dentro de la extensión.

La extensión solo solicita el permiso `storage`: no lee ni modifica las páginas que visitas, así que **no hace falta autorizarla sitio por sitio**.

> Las versiones antiguas (v4.3 y anteriores) inyectaban la barra lateral en la página de ChatGPT mediante un content script, por lo que había que hacer clic derecho en el icono y elegir «Permitir siempre en \*\*\*». Ese mecanismo ya no existe; tras actualizar puedes saltarte este paso.

## Atajos de teclado

- `Alt + Shift + S`: abre la extensión en el modo de visualización actual
- `Alt + Shift + D`: alterna la barra lateral nativa de Firefox

Puedes personalizarlos en `about:addons` → icono de engranaje → «Administrar atajos de extensiones».

## Página de configuración

Ancla AI Short a la barra de herramientas de Firefox y abre sus «Opciones» desde la página de extensiones para cambiar el idioma, el modo de visualización y el modo oscuro.

Consulta la [guía de uso](./usage) para saber qué hace cada opción.
