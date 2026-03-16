---
sidebar_label: Version Offline (Intranet Corporativa)
title: Despliegue Offline de AI Short | Intranet Corporativa sin Servidor Externo
description: La version offline de AI Short esta disenada para empresas y equipos sin acceso a red externa. Sin servidor backend, sin registro necesario, datos almacenados localmente en el navegador, listo para usar.
---

# Version de Despliegue Offline

**Escenarios aplicables**: Intranets corporativas, redes gubernamentales, entornos clasificados, redes de campus y otros escenarios donde **el acceso a la red externa no esta disponible o es inconveniente**.

La version offline de AI Short no requiere servidor backend ni registro de usuario. Todos los datos se almacenan localmente en el navegador. Una vez desplegada, puede ser utilizada directamente por los equipos en la intranet.

## Uso en Equipo

La version offline es un sitio web puramente estatico. Despues de desplegarlo en un servidor de intranet, los miembros del equipo simplemente necesitan abrir la direccion de la intranet en su navegador:

1. El **administrador** despliega la version offline en un servidor de intranet (ej: `http://192.168.1.100:3000`)
2. Los **miembros del equipo** abren la direccion en su navegador para buscar, explorar y copiar prompts
3. Los **favoritos y prompts personalizados de cada persona se guardan en su propio navegador**, independientes entre si
4. Sin registro necesario, sin instalacion de software, listo para usar inmediatamente

```
Servidor de intranet (version offline desplegada)
   ├── Datos de la biblioteca de prompts (compartidos por todos, desde JSON estatico)
   │
   ├── Navegador del usuario A → localStorage (favoritos y prompts personalizados de A)
   ├── Navegador del usuario B → localStorage (favoritos y prompts personalizados de B)
   └── Navegador del usuario C → localStorage (favoritos y prompts personalizados de C)
```

:::tip Nota
El contenido de la biblioteca de prompts (prompts seleccionados) son datos estaticos empaquetados en tiempo de construccion, y todos los usuarios ven el mismo contenido. Los favoritos, prompts personalizados, ordenamiento y etiquetas de cada usuario se guardan en el localStorage de su propio navegador, completamente independientes entre si.
:::

## Diferencias con la Version en Linea

| Funcionalidad | Version en Linea | Version Offline |
| ---- | ------ | ------ |
| Navegacion/busqueda/filtrado de prompts | ✅ | ✅ |
| Copia de prompts | ✅ | ✅ |
| Gestion de favoritos | Almacenamiento en servidor | Almacenamiento local del navegador |
| Prompts personalizados | Almacenamiento en servidor | Almacenamiento local del navegador |
| Mi Coleccion (ordenar arrastrando, etiquetas) | ✅ | ✅ |
| Soporte multilingue (18 idiomas) | ✅ | ✅ |
| Importacion/exportacion de datos | ✅ | ✅ (formato compatible) |
| Paginas de detalle de prompts | ✅ | ✅ (datos estaticos, sin comentarios) |
| Registro/inicio de sesion de usuario | ✅ | ❌ (sin cuenta necesaria) |
| Lista de prompts comunitarios/votacion | ✅ | ❌ |
| Retroalimentacion por comentarios | ✅ | ❌ |

## Almacenamiento de Datos

Los datos de cada usuario se guardan en el localStorage de **su propio navegador**, independiente del servidor:

| Datos | Clave de almacenamiento | Descripcion |
| ---- | ------ | ---- |
| Lista de favoritos | `local_favorites` | Array de IDs de prompts favoritos |
| Prompts personalizados | `local_user_prompts` | Datos de prompts creados por el usuario |
| Orden de clasificacion | `local_myspace_order` | Ordenamiento de tarjetas en Mi Coleccion |
| Etiquetas personalizadas | `local_custom_tags` | Definiciones y asignaciones de etiquetas |

:::caution Advertencia
- El almacenamiento local del navegador tiene un limite de capacidad de aproximadamente 5 MB, lo cual es mas que suficiente para el uso diario.
- Borrar los datos del navegador causara la perdida de datos personales. Se recomienda hacer copias de seguridad regularmente a traves de "Configuracion > Exportar datos".
- Los datos deben ser reimportados despues de cambiar de computadora o navegador.
:::

## Despliegue

La version offline se basa en la rama `offline`. Una vez que el administrador completa el despliegue, los miembros del equipo pueden usarla sin pasos adicionales.

### Despliegue con Docker (Recomendado)

El metodo de despliegue mas simple -- un solo comando para ejecutar en su servidor de intranet:

```bash
# Usar la imagen offline pre-construida
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# O usar Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Despues del despliegue, los miembros del equipo pueden acceder a `http://<IP-del-servidor>:3000`.

Usando `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Construccion desde Codigo Fuente

Si necesita personalizar el contenido de prompts o modificar configuraciones:

```bash
# Clonar la rama offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Instalar dependencias
yarn

# Desarrollo local
yarn start

# Construir version de un solo idioma (chino)
yarn build --locale zh-Hans

# Construir todos los idiomas
yarn build
```

El resultado de la construccion esta en el directorio `build/` y puede ser desplegado en cualquier servidor de archivos estaticos (Nginx, Apache, Caddy, etc.).

### Ejemplo de Configuracion Nginx

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

### Despliegue en Plataformas

Al desplegar en plataformas como Vercel o Cloudflare Pages, seleccione la rama `offline`. Todos los demas pasos son iguales a la version en linea. Consulte [Despliegue del Proyecto](../deploy) para mas detalles.

## Importacion y Exportacion de Datos

### Exportar

Vaya a "Configuracion > Exportar datos" para exportar sus favoritos personales y prompts personalizados como un archivo JSON.

### Importar

Se admiten los siguientes formatos de archivos JSON para importacion:

- **Archivos exportados desde la version offline**: Restauracion completa de favoritos, prompts, ordenamiento y etiquetas
- **Archivos exportados desde la version en linea**: Procesamiento automatico de compatibilidad
  - Prompts de usuario → Fusionados en almacenamiento local (deduplicados por titulo)
  - Favoritos seleccionados (card) → Fusionados en favoritos locales
  - Favoritos comunitarios (community) → Convertidos automaticamente en prompts personalizados locales
  - Ordenamiento MySpace → Restaurado en almacenamiento local
  - Etiquetas personalizadas → Anadidas y fusionadas (no sobrescriben las existentes)

### Migracion desde la Version en Linea

1. Exporte datos desde la pagina "Mi Cuenta" de la version en linea (aishort.top)
2. Importe el archivo JSON en la pagina "Configuracion" de la version offline
3. Los favoritos comunitarios se convertiran automaticamente en prompts locales, y los favoritos seleccionados se sincronizaran normalmente

## Preguntas Frecuentes

### Como usa el equipo despues del despliegue?

Despues de que el administrador lo despliegue en un servidor de intranet, simplemente comparta la URL de acceso (ej: `http://192.168.1.100:3000`) con los miembros del equipo. Cada uno lo abre en su navegador -- sin instalacion, sin registro necesario.

### Se afectan mutuamente los datos de diferentes usuarios?

No. Los favoritos y prompts personalizados de cada persona se guardan en el localStorage de su propio navegador, completamente independientes. El servidor solo aloja la biblioteca de prompts compartida (solo lectura).

### Se pueden perder los datos?

Las siguientes acciones causaran la perdida de datos personales:

- Borrar datos/cache del navegador
- Navegar en modo privado/incognito
- Cambiar de computadora o navegador

Se recomienda hacer copias de seguridad de datos importantes regularmente a traves de "Configuracion > Exportar datos" como un archivo JSON.

### Se pueden compartir prompts personalizados entre miembros del equipo?

Si. Una persona exporta el archivo JSON, y los demas miembros lo importan a traves de "Configuracion > Importar datos". Los duplicados se eliminan automaticamente durante la importacion.

### Como actualizar la biblioteca de prompts?

La biblioteca de prompts son datos estaticos empaquetados en tiempo de construccion. Para actualizar:

1. El administrador obtiene el codigo mas reciente de la rama `offline`
2. Reconstruir y redesplegar (o descargar la imagen Docker mas reciente)
3. Los miembros del equipo actualizan la pagina del navegador para ver el nuevo contenido (los datos personales no se ven afectados)

### Es compatible el formato de datos de la version offline con la version en linea?

Si. El formato JSON exportado es identico y puede ser importado entre ambas versiones. Los IDs de prompts difieren entre las dos versiones (la version en linea usa IDs del servidor, la version offline usa IDs de marca de tiempo), pero la deduplicacion se realiza por titulo durante la importacion, por lo que no hay conflictos.
