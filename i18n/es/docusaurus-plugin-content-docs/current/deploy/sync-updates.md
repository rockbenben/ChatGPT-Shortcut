---
sidebar_label: Mantener tu Fork Actualizado
title: Actualización Sincronizada de AI Short | Fork que sigue automáticamente al repositorio original
description: Haz que tu fork de AI Short siga automáticamente las actualizaciones del repositorio original — resuelve el problema de que el despliegue en Vercel no detecta actualizaciones y activa la sincronización automática con GitHub Actions.
---

# Mantener tu Fork Actualizado

Un despliegue con un clic en Vercel puede seguir mostrando un aviso de "actualización disponible" — porque Vercel crea un nuevo proyecto en lugar de un fork, por lo que no puede detectar actualizaciones del repositorio original. Para solucionarlo:

1. Elimina el repositorio original
2. Usa el botón **Fork** en la esquina superior derecha de la página para forkear este proyecto
3. En la [página de nuevo proyecto de Vercel](https://vercel.com/new), vuelve a importar el repositorio forkeado en Import Git Repository y despliega

## Activar Actualización Automática

> Si encuentras un error de Upstream Sync, ¡ejecuta Sync Fork manualmente una vez!

Tras forkear, habilita manualmente los Workflows en la página Actions y ejecuta la acción Upstream Sync una vez. Una vez habilitada, el proyecto se sincroniza automáticamente cada día:

![Actualización Automática](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitar Actualización Automática](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Actualización Manual

¿Quieres actualizar inmediatamente a mano? Consulta la [documentación de sincronización de forks de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

También puedes darle una estrella (star) / seguir (watch) a este proyecto para recibir notificaciones de nuevas funciones.
