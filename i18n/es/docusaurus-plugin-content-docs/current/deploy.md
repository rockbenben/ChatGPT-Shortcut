# Implementar

AI Short es un proyecto de código abierto, puedes modificar el nombre y la descripción del sitio web libremente.

- Para cambiar el nombre de la página, edita el archivo `docusaurus.config.js`.
- Para modificar las instrucciones, ve al directorio `docs`.
- Para modificar las palabras de aviso, puedes encontrarlas en `src/data/prompt.json`. Si solo necesitas modificar un solo idioma, como el chino, puedes editar directamente `src/data/prompt_zh.json`.
- Actualmente, el backend del usuario está conectado a un sistema backend común. Si es necesario, puedes crear tu propio backend, y la interfaz relevante se encuentra en el archivo `src/api.js`.

`CodeUpdateHandler.py` es un script para el procesamiento por lotes de la implementación en varios idiomas. Después de completar la modificación, ejecute `python CodeUpdateHandler.py`, que dividirá `prompt.json` en varios idiomas de acuerdo con las reglas y sincronizará el código de la página principal de cada idioma y el código de la página independiente de las palabras de solicitud seleccionadas.

## Implementación

### Implementar con Vercel

Haga clic en el botón a continuación para implementar ChatGPT-Shortcut en la plataforma Vercel con un solo clic:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

Con Vercel, puede alojar rápidamente su proyecto y manejar automáticamente compilaciones e implementaciones, lo que es adecuado para usuarios que no tienen requisitos complejos de configuración del servidor.

### Implementación local

Asegúrese de haber instalado [Node.js](https://nodejs.org/).

```shell
# Instalación
yarn

# Desarrollo local
yarn start

# Compilación: este comando genera contenido estático en el directorio `build`
yarn build

# Actualice `defaultLocale` en el archivo `docusaurus.config.js` y luego realice una compilación para el idioma deseado.
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

# Implementación para varios idiomas
yarn build --locale zh && yarn build --locale en
```

### Implementación de Docker

Si está familiarizado con Docker, puede implementar rápidamente con el siguiente comando:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

Alternativamente, puede usar `docker-compose`:

```yml
version: "3.8"

services:
docsify:
Container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: less-stopped
```

## Actualizaciones sincronizadas

Si ha implementado su propio proyecto en Vercel con un solo clic, puede encontrar un problema en el que las actualizaciones se indican de manera constante. Esto surge del comportamiento predeterminado de Vercel de crear un nuevo proyecto para usted en lugar de bifurcar el proyecto actual, lo que impide la detección adecuada de actualizaciones. Se recomienda seguir los pasos subsiguientes para volver a implementar:

1. Elimine el repositorio anterior.
2. Utilice el botón "bifurcar" ubicado en la esquina superior derecha de la página para bifurcar el proyecto actual.
3. En la [página Nuevo proyecto de Vercel](https://vercel.com/new), seleccione el proyecto recientemente bifurcado en la sección Importar repositorio de Git y continúe con la implementación.

### Actualizaciones automáticas

> En caso de que se produzca un error durante la ejecución de Upstream Sync, realice manualmente una única bifurcación de sincronización.

Una vez que haya bifurcado el proyecto, debido a las restricciones de GitHub, es necesario habilitar manualmente los flujos de trabajo en la página Acciones de su proyecto bifurcado y activar la acción Upstream Sync. Tras la activación, las actualizaciones se ejecutarán automáticamente a diario.

![Actualizaciones automáticas](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitación de actualizaciones automáticas](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Actualizaciones manuales

Si desea realizar una actualización manual de inmediato, puede consultar la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para aprender a sincronizar el proyecto bifurcado con el código original.

No dude en mostrar su apoyo a este proyecto dándole una estrella o siguiéndolo, o siguiendo al autor, para mantenerse informado sobre las notificaciones oportunas sobre las nuevas actualizaciones de funciones.
