---
sidebar_label: Despliegue
title: Despliegue AI Short - Vercel/Docker Fácil
description: Despliega tu propia biblioteca de prompts AI. Guía para Vercel/Docker y actualizaciones automáticas.
---

# Despliegue del Proyecto

> **Para quién es esto**: desarrolladores que quieren autoalojar o personalizar AiShort. Los usuarios habituales pueden simplemente usar [aishort.top](https://www.aishort.top) — no es necesario leer esto.

## Elige un Modelo de Despliegue

Elige el modelo que se adapte a tus necesidades:

| Modelo                              | Backend                                          | Notas                                                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Estándar** (predeterminado)       | Reutiliza el backend compartido oficial          | Tras hacer un fork puedes personalizar el nombre del sitio, descripción, prompts, etc. (ver [Configuración](./deploy/configuration)); el inicio de sesión, favoritos, comunidad y sincronización funcionan de inmediato |
| **Edición Sin Conexión**            | Sin backend, datos almacenados localmente en el navegador | Redes empresariales o gubernamentales sin acceso a internet; no se necesita cuenta                                                                                                           |
| **Backend completamente autoalojado** | Tu propio backend independiente               | Cuando necesitas un sistema de cuentas independiente, propiedad total de los datos y una comunidad privada                                                                                    |

Los dos primeros están cubiertos en esta guía. Para el tercero, dado que el servicio backend no es de código abierto, por favor [envía un correo al desarrollador](mailto:qingwhat@gmail.com) con una breve descripción de tu caso de uso y escala para obtener un plan de despliegue y soporte.

## Documentación de Despliegue

Dividida en las siguientes secciones según el flujo de despliegue, consulta según necesites:

- **[Despliegue Estándar](./deploy/standard)** — Reutiliza el backend compartido oficial; admite construcción local, Vercel, Cloudflare Pages y Docker.
- **[Edición Sin Conexión](./deploy/offline)** — Solución sin conexión para intranets empresariales, redes gubernamentales y otros entornos sin acceso a internet, sin backend ni cuentas.
- **[Configuración y Personalización](./deploy/configuration)** — Modifica el título del sitio, la descripción y los prompts, y conecta un backend personalizado.
- **[Mantener tu Fork Actualizado](./deploy/sync-updates)** — Haz que tu fork siga automáticamente las actualizaciones del repositorio original para no quedarte atrás.
