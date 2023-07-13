# Implementación

## Implementar con Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Instalación

```shell
# Instalación
yarn

# Desarrollo local
yarn start

# Build: Este comando genera el contenido estático en el directorio `build`
yarn build
```

## Actualizaciones sincronizadas

Si has implementado tu propio proyecto en Vercel con un solo clic, es posible que te encuentres con un problema en el que las actualizaciones se indican constantemente. Esto se debe al comportamiento predeterminado de Vercel de crear un nuevo proyecto en lugar de bifurcar el proyecto actual, lo que dificulta la detección adecuada de las actualizaciones. Se recomienda seguir los siguientes pasos para volver a implementar:

1. Elimina el repositorio anterior.
2. Utiliza el botón "fork" ubicado en la esquina superior derecha de la página para bifurcar el proyecto actual.
3. En la [página de nuevo proyecto de Vercel](https://vercel.com/new), selecciona el proyecto bifurcado recientemente en la sección de Importar Repositorio Git y procede con la implementación.

### Actualizaciones automáticas

> En caso de encontrar un error durante la ejecución de la Sincronización Ascendente, realiza manualmente una única Sincronización de Bifurcación.

Una vez que hayas bifurcado el proyecto, debido a las restricciones de GitHub, es necesario habilitar manualmente los Flujos de trabajo en la página de Acciones de tu proyecto bifurcado y activar la Acción de Sincronización Ascendente. Una vez activada, las actualizaciones se ejecutarán automáticamente a diario.

![Actualizaciones automáticas](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitar actualizaciones automáticas](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Actualizaciones manuales

Si deseas actualizar manualmente de inmediato, puedes consultar la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para aprender cómo sincronizar el proyecto bifurcado con el código principal.

Siéntete libre de mostrar tu apoyo a este proyecto dándole una estrella/seguimiento, o siguiendo al autor, para mantenerte informado sobre notificaciones oportunas sobre nuevas actualizaciones de funciones.
