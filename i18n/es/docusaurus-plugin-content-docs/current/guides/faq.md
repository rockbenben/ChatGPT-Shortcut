---
sidebar_label: Preguntas Frecuentes
title: AI Short Preguntas Frecuentes | Uso, Optimización, Uso Comercial y Privacidad
description: ¿AiShort es gratis? ¿Los prompts son multi-modelo? ¿Uso comercial permitido? Esta guía responde 13 preguntas sobre uso, optimización, uso comercial y privacidad de datos.
---

# Preguntas Frecuentes

## ¿AiShort es un generador de prompts de IA?

No. AiShort es una biblioteca de plantillas de prompts **seleccionadas y organizadas manualmente** por escenario, no una herramienta que genere prompts automáticamente con un LLM. Cada prompt está filtrado y clasificado por etiquetas: solo cópialo y pégalo en cualquier herramienta de IA como ChatGPT, Claude, Gemini o DeepSeek. Si lo que buscas es una herramienta que «genere prompts a partir de tu necesidad», PromptPerfect o el ChatGPT prompt generator son otro tipo de producto.

## ¿AiShort es gratis? ¿Necesito una API Key?

Completamente gratis, **sin API Key y sin registro**. Navegar, buscar y copiar prompts no requiere ninguna cuenta.

Tras registrarte se desbloquean funciones adicionales como favoritos con ordenamiento por arrastrar y soltar, etiquetas personalizadas, creación y gestión de prompts privados, compartir y votar en la comunidad, exportación de datos en JSON y sincronización entre dispositivos — y siguen siendo gratis. Todo el código está disponible en [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

Nota: AiShort solo proporciona los prompts. **El coste de usar el modelo de IA en sí depende del servicio de IA que utilices** (por ejemplo, la versión gratuita o de pago de ChatGPT, la facturación por API, etc.).

## ¿Cuántos prompts? ¿Qué escenarios cubren?

AiShort aloja **5000+ prompts en total**, organizados en dos bibliotecas:

- **Biblioteca curada** —— seleccionados manualmente, clasificados por 25+ etiquetas de escenarios, totalmente traducidos a 18 idiomas. Etiquetas: asistencia de escritura, IT/programación, artículos/informes, SEO/marketing, funciones empresariales, académicos/profesores, educación/estudiantes, idioma/traducción, psicología/social, entrenamiento mental, herramientas de productividad, terminal/intérprete, debate/discurso, reseña/crítica, ciencia divertida, enciclopedia vital, salud médica, asesor financiero, música/arte, filosofía/religión, texto/palabras, juegos divertidos, asesor profesional, etc.
- **[Biblioteca de la comunidad](./community)** —— la gran mayoría, contribuida continuamente por los usuarios, ordenable por popularidad o fecha con búsqueda completa; cubre escenarios más finos y amplios que la curada.

Si no encuentras lo que buscas en la curada, prueba en la comunidad.

## ¿Qué modelos de IA son compatibles? ¿Los prompts funcionan en distintos modelos?

Los prompts de AiShort son universales: **funcionan en cualquier escenario de IA en el que introduzcas un prompt**, no solo en páginas de chat, sino también en herramientas de programación como Cursor, llamadas a la API, agentes de IA, etc. Estos son los modelos de chat más habituales:

- Internacionales: ChatGPT, Gemini, Claude, Grok
- China continental: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, ChatGLM, iFLYTEK Spark, Tencent Yuanbao
- Plataformas API: OpenRouter, SiliconFlow, Groq

Consulta la lista completa en [Inicio Rápido → Modelos de IA Comunes](./getting-started#modelos-de-ia-comunes).

**Compatibilidad entre modelos**: la gran mayoría de los prompts de texto funcionan en todos los modelos — escritura, traducción, programación y preguntas-respuestas son tareas universales y un mismo prompt produce buenos resultados en los principales LLM. Por eso ninguno de los prompts de AiShort está atado a un modelo concreto. Pero **el rendimiento varía**: para escritura, Claude suele dar más detalle y matiz, y ChatGPT-5 sigue mejor las instrucciones; para programación, GPT-5, Gemini Pro y DeepSeek destacan en distintas áreas; en razonamiento intenso, Claude Opus, Gemini Deep Thinking o los modelos serie o suelen ser más estables. Los prompts para generación de imágenes (Midjourney, Stable Diffusion, DALL·E) no son intercambiables: hay que adaptarlos a la sintaxis de cada uno.

## ¿Por qué los prompts están en inglés?

Los modelos de IA entienden mejor el inglés y producen resultados más estables. Los prompts en español también funcionan, pero al repetir varias veces la misma consulta en español los resultados varían más. Para escenarios importantes se recomienda usar inglés.

> 💡 ¿Quieres la respuesta en español? Añade `respond in Spanish` al final del prompt.

## ¿Tengo que introducir el prompt cada vez?

**Uso vía API**: configura el prompt como `system prompt` y se aplicará automáticamente a todas las conversaciones siguientes.

**Versión web**: mientras no cambies de conversación, ChatGPT recordará el prompt actual. Cuando la respuesta empiece a desviarse, significa que lo ha «olvidado» — basta con volver a pegarlo.

**Consejo**: guarda las conversaciones que uses con frecuencia como marcadores del navegador para abrirlas directamente la próxima vez.

## ¿Cómo elijo el prompt adecuado?

Busca al revés a partir de lo que quieres obtener: para escribir un artículo, usa la etiqueta [`write`](/?tags=write) o [`article`](/?tags=article); para programar, [`code`](/?tags=code) o [`interpreter`](/?tags=interpreter); para traducir, [`language`](/?tags=language); para rol, [`games`](/?tags=games); y si no conoces bien las etiquetas, busca directamente por palabra clave. Cada tarjeta de prompt muestra su popularidad (número de copias) — los más copiados suelen ofrecer calidad más estable.

## ¿Por qué no encuentro prompts relacionados?

La búsqueda de la página de inicio cubre la **biblioteca de prompts seleccionados** (más tus prompts personales tras iniciar sesión), pero **no incluye** los prompts compartidos por la comunidad.

Si no encuentras resultados con palabras clave cortas en la página de inicio, vuelve a buscar en la página de [Prompts de la Comunidad](./community) — allí hay más contenido compartido por los usuarios.

## ¿Qué hago si la IA da información falsa?

La IA a veces «alucina», generando información que parece plausible pero que en realidad es incorrecta. Cómo manejarlo:

1. **Verifica la información clave**: especialmente datos, citas, código, etc.
2. **Optimización en varias rondas**: pide a la IA que revise y mejore su propia respuesta.
3. **Verificación cruzada**: usa distintos prompts o modelos para validar las conclusiones importantes.

Un prompt adecuado puede reducir las alucinaciones de la IA.

## El prompt no da buenos resultados — ¿cómo lo ajusto?

No cambies el prompt directamente; ajusta antes en estas direcciones:

1. **Haz más específicos los `[marcadores]` entre corchetes**: añade detalles como estilo, longitud, ámbito, perfil del lector, etc.
2. **Pide optimización a la IA**: ante una respuesta poco satisfactoria, indícale «hazlo más X» o «reescríbelo con el estilo Y». La IA suele acercarse al objetivo en una o dos iteraciones. También puedes pedirle que puntúe su propia respuesta y la mejore.
3. **Compara entre modelos**: el mismo prompt puede dar resultados muy distintos en Claude Sonnet / ChatGPT / Gemini / DeepSeek — en escritura, Claude suele dar más matiz; en programación, GPT-5 / DeepSeek son más estables.
4. **Prueba en la comunidad**: en [Prompts de la Comunidad](./community) puede haber una versión más adecuada — y también puedes compartir allí los tuyos.
5. **Envía sugerencias**: ¿problemas o ideas de mejora? Comparte tus [comentarios](/feedback).

## ¿Cómo hago una copia de seguridad de mis prompts?

1. Ve a «Mi Cuenta» → busca la fila «Gestión de Datos → Exportar Prompts»
2. Haz clic en el botón «Exportar Datos»
3. El sistema genera y descarga automáticamente un archivo JSON

Se recomienda hacer copias de seguridad periódicamente para evitar la pérdida de datos.

## ¿Puedo usar los prompts de AiShort en proyectos comerciales?

Sí, aunque las condiciones dependen de la licencia:

1. El contenido procedente de [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) está bajo **CC0 dominio público**, sin ninguna restricción.
2. El contenido propio de AiShort y las contribuciones de la comunidad se publican por defecto bajo **CC BY-SA 4.0** — se permite uso comercial, redistribución y adaptación, siempre que se mantenga la atribución a AiShort / autor original y que las obras derivadas se compartan en condiciones igualmente abiertas.
3. El **contenido generado por la IA a partir del prompt** pertenece según los términos del proveedor de IA que utilices (OpenAI, Anthropic, Google, etc.); en la mayoría de los casos te pertenece a ti.
4. Quedan excluidas las pocas tarjetas que indiquen explícitamente «solo uso personal» en su descripción.

## ¿Copiar un prompt expone mis datos?

No. Los prompts de AiShort se empaquetan en el sitio como JSON estático, y **la acción de copiar se realiza en el portapapeles local de tu navegador**.

**Lo que rellenes en los marcadores entre corchetes y las respuestas que la IA te devuelva** se transmiten directamente entre tu navegador y la plataforma de IA que elijas (ChatGPT / Claude / Gemini / DeepSeek, etc.); AiShort no los ve.

A tener en cuenta: al copiar se envía al backend un **evento de conteo anónimo** (POST `/cards/<id>/copy`), usado únicamente para registrar la popularidad de cada prompt (el número de copias que aparece en la tarjeta). **Solo se envía el ID de la tarjeta**, no incluye el contenido que rellenes, no incluye información personal y no se asocia a tu identidad.

**Tras iniciar sesión**, la lista de favoritos, los prompts personalizados y las contribuciones a la comunidad sí se sincronizan con el backend para la sincronización entre dispositivos, con exportación a JSON y eliminación total de los datos disponibles en cualquier momento.

## Documentación Relacionada

- [Inicio Rápido](./getting-started) - Métodos básicos de uso
- [Mi Colección](./my-collection) - Gestión de colecciones y etiquetas
- [Prompts de la Comunidad](./community) - Descubrir y compartir
