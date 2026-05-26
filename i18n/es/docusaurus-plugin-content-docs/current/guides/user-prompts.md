---
sidebar_label: Prompts Personalizados
title: Prompts Propios - Crea, Guarda y Comparte
description: Crea y guarda tus propios prompts. Compártelos con la comunidad o mantenlos privados. Exporta tus datos con un solo clic.
---

# Prompts Personalizados

Tras iniciar sesión, puedes crear tus propios prompts y guardarlos en tu cuenta para usarlos cuando quieras. Los prompts personalizados aparecen en la vista Mi Colección.

## Crear Prompt

1. Haz clic en el botón "Añadir" en la parte superior derecha
2. En la ventana "Crear Prompt" que se abre, rellena el formulario:
   - **Nombre del prompt** (obligatorio): da nombre a tu prompt
   - **Contenido del prompt** (obligatorio): el texto del prompt
   - **Propósito / Uso** (opcional): descripción breve de para qué sirve
   - **Notas** (opcional): origen, versiones en otros idiomas o aclaraciones
3. El interruptor "¿Quieres compartir este prompt en la página pública?" de la parte inferior está activado por defecto — si lo desactivas, el prompt será visible solo para ti
4. Haz clic en "Crear Prompt" para enviar

![Ventana Crear Prompt](/img/docs/user-prompts-create.png)

> 💡 **Ejemplo de relleno** — un prompt "Redactor de correos profesionales":
> - **Nombre del prompt**: Redactor de correos profesionales
> - **Contenido del prompt**: Eres un asistente de redacción profesional. Redacta un correo claro, cordial y conciso en español neutro a partir de las siguientes ideas, con un tono adecuado para el contexto laboral y una llamada a la acción al final: [ideas o puntos clave del correo]
> - **Propósito / Uso**: transforma notas sueltas en un correo profesional listo para enviar
> - **Notas**: ajustar el tratamiento (tú/usted) según el destinatario

## Editar Prompt

En la vista Mi Colección, haz clic en una tarjeta de prompt creada por ti para abrir la ventana "Editar Prompt", donde puedes:

- Modificar el nombre, contenido, propósito y notas
- Alternar el estado de compartir (público/privado)
- Hacer clic en "Guardar" para actualizar

![Interfaz de Edición de Prompt](/img/docs/user-prompts-edit.png)

## Eliminar Prompt

Haz clic en "Eliminar" en la ventana de edición. La eliminación no se puede deshacer — opera con precaución.

## Compartir con la Comunidad

Al crear o editar un prompt, el interruptor "¿Quieres compartir este prompt en la página pública?" controla la visibilidad:

- **Activado (por defecto)**: el prompt se muestra en la página de [Prompts de la Comunidad](./community), donde otros usuarios pueden verlo y coleccionarlo
- **Desactivado**: prompt privado, visible solo para ti

Puedes alternar el estado de compartir en cualquier momento.

## Exportar Respaldo

1. Ve a "Mi Cuenta" → busca la fila "Gestión de Datos → Exportar Prompts"
2. Haz clic en el botón "Exportar Datos"
3. El sistema genera un archivo JSON y lo descarga automáticamente

El contenido exportado incluye:

- Nombre, contenido, propósito/uso y notas del prompt
- Hora de creación y actualización
- Estado de compartir

Se recomienda exportar copias de seguridad periódicamente para evitar la pérdida de datos.

## Importar Prompts

Importa prompts y favoritos desde un archivo JSON:

1. Ve a "Mi Cuenta" → busca la fila "Gestión de Datos → Importar Prompts"
2. Haz clic en el botón "Importar Datos"
3. Selecciona un archivo JSON
4. El sistema fusiona los datos automáticamente (deduplica por título; los prompts con IDs de otros usuarios se marcan como privados)

### Colaboración en Equipo

Flujo recomendado para compartir prompts dentro de un equipo:

1. **Filtrar y compartir**: tras exportar, elimina manualmente tu lista de favoritos o filtra los prompts que quieres compartir, y envía el archivo a los miembros del equipo para que lo importen
2. **Protección de privacidad**: los prompts importados de otras personas (cuyos IDs no pertenecen a tu cuenta) se marcan automáticamente como **privados**, manteniendo aislados los datos entre miembros

## Documentación Relacionada

- [Mi Colección](./my-collection) - Gestión de colecciones y etiquetas
- [Prompts de la Comunidad](./community) - Compartir y votar
- [Gestión de Cuenta](./account) - Inicio de sesión y configuración
