---
sidebar_label: Versión Offline (intranet corporativa)
title: Despliegue Offline de AI Short | Intranet corporativa sin servidores externos
description: La versión offline de AI Short está pensada para empresas y equipos que no pueden acceder a internet. Sin backend, sin registro de cuentas, los datos se almacenan localmente en el navegador. Listo para usar.
---

# Despliegue en Versión Offline

> **Audiencia objetivo**: administradores de TI o responsables técnicos encargados del despliegue. Los usuarios finales solo necesitan acceder a la dirección interna que el administrador haya desplegado; no necesitan leer este documento.

**Escenarios de uso**: intranets corporativas, redes del sector gobierno, entornos clasificados, sectores regulados (banca, salud, seguros), redes universitarias y cualquier otro entorno en el que **no se pueda o no convenga acceder a internet**.

Sin backend, sin registro: todos los datos se guardan localmente en el navegador. Una vez desplegado, el equipo solo tiene que abrir el navegador en la red interna para empezar a usarlo.

## Cómo lo usa el equipo

La versión offline es un sitio estático puro. Tras desplegarlo en un servidor de la intranet, los miembros del equipo acceden a la dirección interna desde su navegador:

1. El **administrador** despliega la versión offline en un servidor de la intranet (por ejemplo, `http://192.168.1.100:3000`)
2. Los **miembros del equipo** abren esa dirección en su navegador y pueden explorar, buscar y copiar prompts
3. Los **favoritos y prompts personalizados de cada persona se guardan en su propio navegador**, sin interferir entre sí
4. No hace falta registrarse ni instalar ningún software: se abre y se usa

```
Servidor de la intranet (versión offline desplegada)
   ├── Biblioteca de prompts (compartida por todos, desde JSON estático)
   │
   ├── Navegador del usuario A → localStorage (favoritos y prompts personalizados de A)
   ├── Navegador del usuario B → localStorage (favoritos y prompts personalizados de B)
   └── Navegador del usuario C → localStorage (favoritos y prompts personalizados de C)
```

:::tip Nota
La biblioteca de prompts (prompts curados) son datos estáticos empaquetados en tiempo de compilación, por lo que todos los usuarios ven el mismo contenido. Los favoritos, prompts personalizados, orden y etiquetas de cada usuario se guardan en el localStorage de su propio navegador y son completamente independientes.
:::

## Diferencias con la versión online

| Función | Versión online | Versión offline |
| ------- | -------------- | --------------- |
| Explorar/buscar/filtrar prompts | ✅ | ✅ |
| Copiar prompts | ✅ | ✅ |
| Gestión de favoritos | Servidor | Navegador local |
| Prompts personalizados | Servidor | Navegador local |
| Mi Colección (arrastrar para ordenar, etiquetas) | ✅ | ✅ |
| Soporte multilingüe (18 idiomas) | ✅ | ✅ |
| Importación/exportación de datos | ✅ | ✅ (formatos compatibles) |
| Página de detalle del prompt | ✅ | ✅ (datos estáticos, sin comentarios) |
| Registro/inicio de sesión | ✅ | ❌ (sin cuentas) |
| Listado/votación de prompts de la comunidad | ✅ | ❌ |
| Comentarios y feedback | ✅ | ❌ |

## Almacenamiento de datos

Los datos de cada usuario se guardan en el localStorage de **su propio navegador**, sin relación con el servidor:

| Datos | Clave de almacenamiento | Descripción |
| ----- | ----------------------- | ----------- |
| Lista de favoritos | `local_favorites` | Array con los IDs de los prompts favoritos |
| Prompts personalizados | `local_user_prompts` | Datos de los prompts creados por el usuario |
| Orden de presentación | `local_myspace_order` | Orden de las tarjetas en Mi Colección |
| Etiquetas personalizadas | `local_custom_tags` | Definición de etiquetas y sus asignaciones |

:::caution Atención
- El almacenamiento local del navegador tiene un límite de aproximadamente 5 MB, suficiente para el uso diario.
- Borrar los datos del navegador implica perder los datos personales — se recomienda hacer copia de seguridad periódica desde "Ajustes > Exportar datos".
- Al cambiar de equipo o de navegador será necesario reimportar los datos.
:::

## Despliegue

La versión offline se basa en la rama `offline`. Una vez que el administrador haya hecho el despliegue, los miembros del equipo no tendrán que hacer absolutamente nada para empezar a usarlo.

### Despliegue con Docker (recomendado)

Es la forma más sencilla: una sola línea de comando para levantarlo en un servidor de la intranet:

```bash
# Usando la imagen offline preconstruida
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# O desde Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Tras el despliegue, los miembros del equipo acceden desde `http://<IP-del-servidor>:3000`.

Con `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Construcción desde el código fuente

Si necesita personalizar el contenido de los prompts o modificar la configuración:

```bash
# Clonar la rama offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Instalar dependencias
yarn

# Desarrollo local
yarn start

# Construir una sola versión de idioma (español)
yarn build --locale es

# Construir todos los idiomas
yarn build
```

El resultado de la construcción queda en el directorio `build/` y puede desplegarse en cualquier servidor de archivos estáticos (Nginx, Apache, Caddy, etc.).

### Ejemplo de configuración de Nginx

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Despliegue en plataformas

Al desplegar en Vercel, Cloudflare Pages u otras plataformas, basta con seleccionar la rama `offline`; el resto de los pasos coincide con el despliegue de la versión online, descrito en [Despliegue del proyecto](../deploy).

## Importación y exportación de datos

### Exportar

Acceda a "Ajustes > Exportar datos" para exportar sus favoritos y prompts personalizados a un archivo JSON.

### Importar

Se admite la importación de archivos JSON en los siguientes formatos:

- **Archivos exportados desde la versión offline**: restauración completa de favoritos, prompts, orden y etiquetas
- **Archivos exportados desde la versión online**: compatibilidad automática
  - Prompts de usuario → se fusionan localmente (deduplicación por título)
  - Favoritos curados (card) → se fusionan con los favoritos locales
  - Favoritos de la comunidad (community) → se convierten automáticamente en prompts personalizados locales
  - Orden de MySpace → se restaura localmente
  - Etiquetas personalizadas → se añaden sin sobrescribir las existentes

### Migración desde la versión online

1. En la versión online (aishort.top), exporte sus datos desde la página "Mi Cuenta"
2. En la versión offline, importe ese archivo JSON desde la página "Ajustes"
3. Los favoritos de la comunidad se convierten automáticamente en prompts locales y los favoritos curados se sincronizan con normalidad

## Preguntas frecuentes

### Tras el despliegue, ¿cómo lo usa el equipo?

Una vez que el administrador haya desplegado la aplicación en un servidor de la intranet, basta con comunicar a los miembros del equipo la dirección de acceso (por ejemplo, `http://192.168.1.100:3000`). Cada persona la abre en su navegador, sin instalación ni registro.

### ¿Los datos de unos usuarios afectan a los de otros?

No. Los favoritos y prompts personalizados de cada usuario se guardan en el localStorage de su propio navegador y son completamente independientes. En el servidor solo reside la biblioteca de prompts compartida (de solo lectura).

### ¿Se pueden perder los datos?

Las siguientes acciones provocan la pérdida de datos personales:

- Borrar los datos o la caché del navegador
- Navegar en modo incógnito/privado
- Cambiar de equipo o de navegador

Se recomienda hacer copia de seguridad periódica de los datos importantes en un archivo JSON desde "Ajustes > Exportar datos".

### ¿Se pueden compartir prompts personalizados dentro del equipo?

Sí. Una persona exporta el archivo JSON y el resto del equipo lo importa desde "Ajustes > Importar datos"; la deduplicación es automática.

### ¿Cómo se actualiza la biblioteca de prompts?

La biblioteca de prompts son datos estáticos empaquetados en tiempo de compilación. Para actualizarla:

1. El administrador descarga el código más reciente de la rama `offline`
2. Reconstruye y despliega (o descarga la imagen Docker más reciente)
3. Los miembros del equipo solo tienen que refrescar el navegador para ver el contenido nuevo (sus datos personales no se ven afectados)

### ¿El formato de datos de la versión offline es compatible con el de la versión online?

Sí, son compatibles. El formato JSON exportado es el mismo y los archivos se pueden importar en ambas versiones. Los IDs de los prompts difieren (la versión online usa IDs de servidor y la offline usa IDs basados en marca de tiempo), pero la importación deduplica por título, por lo que no hay conflictos.
