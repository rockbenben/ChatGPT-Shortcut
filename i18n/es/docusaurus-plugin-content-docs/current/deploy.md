---
sidebar_label: Despliegue
title: Despliegue AI Short - Vercel/Docker Fácil
description: Despliega tu propia biblioteca de prompts AI. Guía para Vercel/Docker y actualizaciones automáticas.
---

# Despliegue del Proyecto

## Configuración y Personalización

AI Short es un proyecto de código abierto que te permite modificar libremente el título, la descripción, los prompts y otros contenidos del sitio web según tus necesidades. A continuación se muestran las opciones de modificación e instrucciones de operación comunes:

- **Modificar el Título y la Descripción del Sitio Web**
  Para cambiar el título y la descripción del sitio web, edita el archivo de configuración `docusaurus.config.js`.

- **Modificar Instrucciones de Uso e Introducción del Proyecto**
  Los archivos de instrucciones de uso e introducción del proyecto se encuentran en el directorio `docs`. Abre los archivos relevantes en ese directorio para realizar las modificaciones necesarias.

- **Modificar Prompts de la Página de Inicio**
  Los prompts de la página de inicio se almacenan en el archivo `src/data/prompt.json`. Si necesitas modificar prompts para un idioma específico, como chino, puedes editar directamente el archivo `src/data/prompt_zh.json`. Al agregar un nuevo prompt, el formato es el siguiente:

  ```json
  {
    "zh": {
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

  **Nota**: Se recomienda establecer el `id` en 500 o superior. Los prompts recién agregados no tendrán una página exclusiva ni una sección de comentarios. Si necesitas agregar una página exclusiva para un prompt, puedes copiar el archivo de plantilla en el directorio `src/data/pages/prompt` para modificarlo.

- **Backend Personalizado**
  El proyecto actual está conectado a un sistema backend compartido. Si deseas construir tu propio backend, puedes consultar las instrucciones de la interfaz en la carpeta `src/api`.

  Estructura del Módulo API:

  ```
  src/api/
  ├── index.ts       # Entrada de exportación unificada
  ├── config.ts      # Configuración de URL de la API
  ├── client.ts      # Cliente Axios (incluyendo interceptores de autenticación)
  ├── auth.ts        # API de autenticación (Inicio de sesión/Registro/OAuth)
  ├── prompts.ts     # CRUD de Prompts + Búsqueda + Votación
  ├── favorites.ts   # Operaciones de favoritos
  ├── myspace.ts     # Datos de Mi Espacio (Fuente de datos principal)
  ├── comments.ts    # Sistema de comentarios
  └── user.ts        # Información del usuario
  ```

  **Mecanismo de Caché**: El proyecto utiliza `lscache` combinado con ETags para implementar caché inteligente. Cuando el servidor devuelve 304 Not Modified, los datos en caché local se reutilizan directamente para reducir la transmisión de datos.

- **Soporte Multilingüe y Despliegue**
  Después de completar las modificaciones multilingües, puedes usar el script `CodeUpdateHandler.py` para el procesamiento por lotes. Ejecuta el siguiente comando:

  ```bash
  python CodeUpdateHandler.py
  ```

  Este script dividirá el archivo `prompt.json` según reglas preestablecidas y actualizará sincrónicamente la página principal y las páginas de prompts destacados para cada versión de idioma.

## Instrucciones de Despliegue

Requisitos del Sistema:

- [Node.js 20.0](https://nodejs.org/) o posterior.
- macOS, Windows (incluyendo WSL) y Linux son compatibles.

### Despliegue Local

Asegúrate de tener instalado [Node.js](https://nodejs.org/).

```shell
# Instalación
yarn

# Desarrollo Local
yarn start

# Construcción: Este comando genera contenido estático en el directorio `build`
yarn build

# Actualiza el `defaultLocale` en el archivo `docusaurus.config.js`, luego realiza una construcción para el idioma deseado.
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# Despliegue para múltiples idiomas
yarn build --locale zh && yarn build --locale en
```

### Despliegue en Vercel

Haz clic en el botón de abajo para desplegar ChatGPT-Shortcut en la plataforma Vercel con un clic:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Nota**: La versión gratuita de Vercel puede reportar un error debido a memoria insuficiente. Si encuentras esta situación, puedes optar por realizar un despliegue en un solo idioma. Las operaciones específicas son las siguientes:

1. Ingresa al proyecto de Vercel que acabas de desplegar y abre **Settings**.
2. En la sección **Build & Deployment**, busca **Build Command**, luego haz clic en **Override** a la derecha.
3. Modifica el comando de despliegue. Por ejemplo, si necesitas desplegar la versión en chino, puedes usar `yarn build --locale zh`; si necesitas desplegar la versión en portugués, usa `yarn build --locale pt`.

### Despliegue en Cloudflare Pages

Haz clic en el botón o enlace de abajo para hacer un Fork de este proyecto, luego sigue las instrucciones para desplegar en Cloudflare Pages:

👉 [Hacer Fork de este proyecto](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Pasos de Despliegue:

1. Inicia sesión en [Cloudflare Pages](https://pages.cloudflare.com/) y selecciona **"Create a project"**.
2. Vincula el repositorio que acabas de hacer Fork.
3. Configura los comandos de construcción:
   - **Build command**: `yarn build --locale zh` (Elige el locale apropiado según el idioma a desplegar, ej: para portugués usa `yarn build --locale pt`).
   - **Output directory**: `build`.
4. Haz clic en **Deploy** y espera a que Cloudflare Pages complete la construcción y el despliegue.

Cloudflare Pages también activará automáticamente construcciones y despliegues cada vez que envíes nuevo código.

### Despliegue con Docker

Si estás familiarizado con Docker, puedes desplegar rápidamente usando el siguiente comando:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternativamente, también puedes usar `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Habilitar Actualizaciones Sincronizadas

Si desplegaste tu propio proyecto en Vercel con un clic, podrías encontrar un problema donde siempre indica que hay actualizaciones disponibles. Esto se debe a que Vercel crea un nuevo proyecto para ti por defecto en lugar de hacer un fork de este proyecto, lo que causa que la detección de actualizaciones falle. Se recomienda volver a desplegar siguiendo estos pasos:

1. Elimina el repositorio original;
2. Usa el botón de fork en la esquina superior derecha de la página para hacer un fork de este proyecto;
3. Vuelve a seleccionar el proyecto que acabas de hacer fork en la sección Import Git Repository de la [Página de Nuevo Proyecto de Vercel](https://vercel.com/new) y despliega.

### Activar Actualizaciones Automáticas

> Si encuentras un error de ejecución de Upstream Sync, ¡ejecuta manualmente Sync Fork una vez!

Después de hacer un fork del proyecto, debido a las limitaciones de GitHub, necesitas habilitar manualmente Workflows en la página Actions de tu proyecto forked y habilitar la Acción Upstream Sync. Una vez habilitada, las actualizaciones se ejecutarán automáticamente todos los días:

![Actualización Automática](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitar Actualización Automática](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Actualización Manual de Código

Si deseas actualizar inmediatamente de forma manual, puedes ver la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para aprender cómo sincronizar un proyecto forked con el código original.

Puedes darle una estrella (star)/seguir (watch) a este proyecto, o seguir al autor para recibir notificaciones de nuevas actualizaciones de funciones a tiempo.
