---
sidebar_label: Prompts Personalizados
title: Prompts Personalizados de AI Short | Crear, Editar y Compartir
description: Crea tus propios prompts de IA y guárdalos en tu cuenta para acceder a ellos al instante. Compártelos con la comunidad o mantenlos privados, y exporta copias de seguridad con un clic.
---

# Prompts Personalizados

Tras iniciar sesión, puedes crear tus propios prompts y guardarlos en tu cuenta para acceder a ellos fácilmente más adelante. Los prompts personalizados aparecen en la vista "Mi Colección".

## Crear Prompt

1. Tras iniciar sesión, haz clic en el botón "**Crear prompt**" en la parte superior de la página
2. Rellena el diálogo "Crear Prompt":
   - **Nombre del prompt** (obligatorio): un nombre para el prompt
   - **Contenido del prompt** (obligatorio): el cuerpo del prompt; el texto entre corchetes `[...]` se resalta como marcador de posición al mostrarse
   - **Uso** (opcional): una descripción breve de lo que hace el prompt
   - **Notas** (opcional): origen, versiones en otros idiomas o notas complementarias
3. El interruptor "¿Te gustaría compartir este prompt en la página pública?" en la parte inferior está activado por defecto — desactívalo para mantener el prompt privado
4. Haz clic en "Crear Prompt" para enviar

![Diálogo Crear Prompt](/img/docs/user-prompts-create.png)

> 💡 **Ejemplo** — un prompt "Generador de Actualizaciones de Standup":
> - **Nombre del prompt**: Generador de Actualizaciones de Standup
> - **Contenido del prompt**: Eres un asistente de comunicación conciso. Convierte las siguientes notas en una actualización de standup diario con tres secciones — Ayer, Hoy, Bloqueadores. Mantén cada punto corto y centrado en los resultados: [mis notas en bruto]
> - **Uso**: convierte notas desordenadas en una actualización de standup clara
> - **Notas**: ejecutar antes del standup matutino

## Editar Prompt

En la vista Mi Colección, haz clic en el botón de edición (lápiz) de una tarjeta de prompt que hayas creado para abrir el diálogo "Editar Prompt". Puedes:

- Modificar el nombre, contenido, uso y notas
- Alternar el estado de compartir (público / privado)
- Hacer clic en "Guardar" para actualizar

![Interfaz de Edición de Prompt](/img/docs/user-prompts-edit.png)

## Eliminar Prompt

Haz clic en "Eliminar" en el diálogo de edición. La eliminación no se puede deshacer — procede con precaución.

## Compartir con la Comunidad

Al crear o editar, el interruptor "¿Te gustaría compartir este prompt en la página pública?" en la parte inferior controla la visibilidad:

- **Activado (por defecto)**: el prompt aparece en la página de [Prompts de la Comunidad](./community), donde otros usuarios pueden verlo y coleccionarlo
- **Desactivado**: privado — visible solo para ti

El estado de compartir se puede alternar en cualquier momento.

## Exportar Prompts

1. Ve a "Mi Cuenta" y busca la sección "Gestión de Datos → Exportar prompts"
2. Haz clic en el botón "Exportar Datos"
3. El sistema genera un archivo JSON y lo descarga automáticamente

El contenido exportado incluye:

- Nombre, contenido, uso y notas del prompt
- Estado de compartir
- Tus colecciones, el orden de las colecciones y las etiquetas personalizadas

Se recomiendan exportaciones periódicas para evitar la pérdida de datos.

## Importar Prompts

Importa prompts y colecciones desde un archivo JSON:

1. Ve a "Mi Cuenta" y busca la sección "Gestión de Datos → Importar prompts"
2. Haz clic en el botón "Importar datos"
3. Selecciona un archivo JSON
4. El sistema combina los datos automáticamente (deduplica por título; los prompts cuyos IDs pertenecen a otra cuenta se establecen como privados)

### Colaboración en Equipo

Flujo de trabajo recomendado para compartir prompts dentro de un equipo:

1. **Filtrar y compartir**: tras exportar, elimina manualmente tu lista de colección o filtra los prompts que quieres compartir, y envía el archivo a los miembros del equipo para que lo importen
2. **Protección de privacidad**: los prompts importados propiedad de otros (cuyos IDs no pertenecen a la cuenta actual) se establecen automáticamente como **privados**, manteniendo los datos de cada miembro separados

## Documentación Relacionada

- [Mi Colección](./my-collection) - Gestión de colecciones y etiquetas
- [Prompts de la Comunidad](./community) - Compartir y votar
- [Gestión de Cuenta](./account) - Inicio de sesión y configuración
