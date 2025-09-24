---
sidebar_label: Despliegue
title: Guía de Despliegue y Personalización | Configura AI Short con Facilidad
description: Aprende a desplegar y personalizar rápidamente tu proyecto AI Short. Esta guía cubre Vercel, Cloudflare, Docker y el despliegue local, además de cómo editar contenido y habilitar las actualizaciones automáticas.
---

# Despliegue del Proyecto

## Configuración y Personalización

AI Short es un proyecto de código abierto, y puedes modificar libremente el título del sitio, la descripción, los prompts y más. A continuación se presentan las opciones de personalización más comunes:

- **Editar el título y la descripción del sitio**  
    Actualiza el archivo `docusaurus.config.js`.

- **Editar las instrucciones de uso y la documentación**  
    Todos los archivos de documentación se encuentran en el directorio `docs`. Abre y modifica el archivo correspondiente según sea necesario.

- **Editar los prompts de la página de inicio**  
    Los prompts de la página de inicio se almacenan en `src/data/prompt.json`.  
    Para idiomas específicos (por ejemplo, chino), edita `src/data/prompt_zh.json`.  
    Formato de ejemplo para un nuevo prompt:

`json
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
  `

**Nota**: Usa `id >= 500` para nuevos prompts. Estos no tendrán páginas dedicadas ni comentarios.
Si quieres una página dedicada, copia un archivo de plantilla de `src/data/pages/prompt` y modifícalo.

- **Backend personalizado**
    El proyecto está actualmente vinculado a un backend compartido.
    Para configurar el tuyo, revisa los detalles de la API en `src/api.js`.

- **Soporte multi-idioma**
    Después de actualizar los archivos de idioma, ejecuta el script `CodeUpdateHandler.py` para procesar en lote:

`bash
  python CodeUpdateHandler.py
  `

Este script dividirá `prompt.json` y sincronizará las actualizaciones en las páginas de prompts principales y destacadas de cada idioma.

## Guía de Despliegue

**Requisitos del sistema**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (incluido WSL) o Linux

### Despliegue Local

Asegúrate de tener [Node.js](https://nodejs.org/) instalado.

```bash
# Instalar dependencias
yarn

# Desarrollo local
yarn start

# Construir archivos estáticos
yarn build

# Construir para múltiples idiomas
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

# Ejemplo: construir para dos idiomas
yarn build --locale zh && yarn build --locale en
```

### Despliegue en Vercel

Haz clic a continuación para desplegar ChatGPT-Shortcut en Vercel con un solo clic:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Nota**: El plan gratuito de Vercel puede quedarse sin memoria. En ese caso, despliega un solo idioma.

Pasos:

1.  Ve a tu proyecto desplegado en Vercel → **Settings**.
2.  En **Build & Deployment**, busca **Build Command** → haz clic en **Override**.
3.  Establece el comando de construcción, por ejemplo:

- Para chino: `yarn build --locale zh`
   - Para portugués: `yarn build --locale pt`

### Despliegue en Cloudflare Pages

👉 [Haz un fork del repositorio](https://github.com/rockbenben/ChatGPT-Shortcut/fork), luego despliega a través de Cloudflare Pages:

1.  Inicia sesión en [Cloudflare Pages](https://pages.cloudflare.com/), elige **Create a project**.
2.  Conecta tu repositorio bifurcado.
3.  Configura los ajustes de construcción:

- **Build command**: `yarn build --locale zh` (u otro idioma)
   - **Output directory**: `build`

4.  Despliega y espera a que termine la construcción.

Cloudflare Pages se volverá a desplegar automáticamente cuando envíes nuevos commits.

### Despliegue con Docker

Ejecutar con Docker:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

O con `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Habilitar Actualización Automática

Si usaste el despliegue de un solo clic de Vercel, es posible que veas "actualizaciones disponibles" con frecuencia.
Esto se debe a que Vercel crea un nuevo repositorio en lugar de una bifurcación, rompiendo la sincronización.

**Solución:**

1.  Elimina el repositorio antiguo.
2.  Haz un fork de este proyecto directamente (usa el botón de fork).
3.  Vuelve a desplegar desde tu fork a través de la [página de nuevo proyecto de Vercel](https://vercel.com/new).

### Actualizaciones Automáticas

> Si ves errores con **Upstream Sync**, ejecuta **Sync Fork** manualmente una vez.

Después de hacer un fork, GitHub requiere que habilites los flujos de trabajo manualmente:

- Ve a **Actions** en tu fork.
- Habilita los flujos de trabajo, especialmente **Upstream Sync Action**.

Esto se ejecutará diariamente para obtener las actualizaciones del repositorio original.

### Actualizaciones Manuales

Para actualizaciones inmediatas, consulta la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) sobre cómo sincronizar forks.

⭐ Marca con una estrella / 👀 Observa este proyecto o sigue al autor para recibir notificaciones sobre nuevas funciones.
