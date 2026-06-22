---
sidebar_label: Configuración y Personalización
title: Configuración y Personalización de AI Short | Modificar título, prompts, backend personalizado
description: Personaliza AI Short — modifica el título y la descripción del sitio, añade prompts a la página de inicio y conecta un backend personalizado, con explicación de la estructura del módulo API y el mecanismo de caché.
---

# Configuración y Personalización

AI Short es de código abierto — puedes modificar libremente el título del sitio, la descripción, los prompts y más.

## Título y descripción del sitio

Edita `docusaurus.config.js`.

## Documentación y guías

Edita los archivos correspondientes en `docs/`.

## Prompts de la página de inicio

Los datos fuente se encuentran en `src/data/prompt.json` — un array donde cada objeto almacena todas las versiones de idioma indexadas por código de idioma (`zh` / `en` / `ja`, etc.). El formato para agregar un prompt:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "website": null,
  "tags": ["music"],
  "id": 500,
  "weight": 1
}
```

Tras editar, ejecuta `python CodeUpdateHandler.py`. El script divide `prompt.json` en archivos `prompt_<locale>.json` por idioma y actualiza la página de inicio y las páginas de prompts destacados de cada idioma.

![Flujo de datos: el archivo maestro prompt.json procesado por python CodeUpdateHandler.py — dividido por idioma en archivos de prompts por configuración regional, generando el JSON de tarjeta y la página de detalle de cada id, con conversión de chino simplificado a tradicional mediante OpenCC](/img/docs/data-pipeline.svg)

> **Nota**: establece `id` en 500 o superior para evitar conflictos de ID con los prompts existentes o el contenido de la comunidad. Ejecutar `python CodeUpdateHandler.py` genera automáticamente los datos de tarjeta y la página de detalle de cada prompt (incluidos los nuevos), sin necesidad de crear archivos de página manualmente; los prompts personalizados simplemente no tienen, de forma predeterminada, una meta descripción curada ni datos de comentarios.

## Backend personalizado

De forma predeterminada el proyecto se conecta a un backend compartido (el inicio de sesión, favoritos, comunidad, comentarios y la sincronización entre dispositivos dependen de él), y `src/api` documenta el contrato completo de la interfaz como referencia. El servicio backend en sí no es de código abierto; para un **despliegue completamente autoalojado con su propio backend**, consulta [Elige un Modelo de Despliegue](../deploy#elige-un-modelo-de-despliegue) más arriba.

Estructura del módulo API:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Caché: los datos de la API se almacenan en caché de forma inteligente mediante `lscache` más ETag — cuando el servidor devuelve 304 Not Modified, se reutiliza la caché local para reducir la transferencia de datos.
