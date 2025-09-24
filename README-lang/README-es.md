<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="/README-en.md">English</a> | <a href="/README.md">中文</a> |
Español |
<a href="./README-ja.md">日本語</a> |
<a href="./README-ko.md">한국어</a> |
<a href="./README-fr.md">Français</a> |
<a href="./README-de.md">Deutsch</a> |
<a href="./README-it.md">Italiano</a> |
<a href="./README-ru.md">Русский</a> |
<a href="./README-pt.md">Português</a> |
<a href="./README-ar.md">العربية</a> |
<a href="./README-hi.md">हिन्दी</a> |
<a href="./README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## ¿Por qué usar AiShort?

AiShort (ChatGPT Shortcut) proporciona una lista concisa y fácil de usar de prompts de IA. Está diseñado para ayudar a los usuarios a encontrar rápidamente prompts adecuados para diversos escenarios, facilitando su uso incluso para principiantes y mejorando de manera integral su eficiencia en el aprendizaje y el trabajo.

🚀 **Prompts con un solo clic**: Una selección de diversos prompts profesionales. Con solo un clic, puedes enviarlos a modelos de IA como ChatGPT y obtener rápidamente las respuestas deseadas.

💻 **Aumenta la productividad**: Utiliza prompts optimizados para obtener respuestas más precisas y prácticas, completando eficientemente tareas de aprendizaje y trabajo.

🌍 **Soporte multilingüe**: Ofrece traducciones de prompts en inglés a 12 idiomas principales y admite respuestas predeterminadas en tu idioma nativo, permitiendo que los usuarios que no hablan inglés lo usen sin barreras.

💾 **Colecciona y Edita**: Puedes coleccionar, editar y gestionar tus prompts favoritos en cualquier momento para su uso futuro.

📤 **Exporta y Respalda**: Exporta todos tus prompts con un solo clic, con soporte para formato JSON para copias de seguridad, facilitando la migración y el guardado local.

🌟 **Comparte Prompts**: Comparte tus prompts favoritos con otros para inspirar más creatividad e ideas.

🗳️ **Votación de la comunidad**: Similar a Product Hunt o Reddit, impulsado por los votos de la comunidad, los prompts excelentes serán recomendados en la página de inicio.

📦 **Listo para usar**: No se necesita una configuración compleja. Visita [aishort.top](https://www.aishort.top/es/) para comenzar a experimentarlo de inmediato.

Los prompts de AiShort (ChatGPT Shortcut) provienen de selecciones en línea, contribuciones de la comunidad y de [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Los actualizamos regularmente para ofrecerte continuamente nuevos prompts e inspiración. Para obtener instrucciones detalladas, consulta la [Guía del usuario](https://www.aishort.top/es/docs/guides/getting-started).

Te invitamos a unirte a nuestra comunidad para intercambiar ideas y comentarios:

<a href="https://t.me/aishort_top">
    <img src="https://img.shields.io/badge/Telegram-Group-blue?logo=telegram&style=for-the-badge" alt="join Telegram group" />
</a>

<a href="https://discord.gg/PZTQfJ4GjX">
    <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## Extensión para Navegador

La extensión AiShort (ChatGPT Shortcut) te ayuda a acceder a la biblioteca de prompts de AiShort en cualquier momento para mejorar tu eficiencia en el trabajo y el estudio. Es compatible con los principales navegadores como Chrome, Edge y Firefox, y cuenta con una barra lateral que se puede invocar rápidamente con el atajo `Alt + Shift + S`.

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

Además, ofrecemos el script de Tampermonkey - [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), que permite a los usuarios personalizar los nombres de dominio coincidentes y usar la barra lateral de AiShort en cualquier sitio web. Sin embargo, debido a las restricciones de inyección de contenido de script en la página de ChatGPT, la funcionalidad de la barra lateral del script se activa a través de una ventana emergente en la página de ChatGPT.

## Despliegue

Para conocer los pasos detallados sobre cómo desplegar a través de un entorno local, Vercel, Cloudflare Page, Docker y cómo modificar el proyecto, consulta la [Guía de despliegue de ChatGPT Shortcut](https://www.aishort.top/es/docs/deploy).

## Actualizaciones Sincronizadas

Si has desplegado tu propio proyecto en Vercel con un solo clic, es posible que te encuentres con un problema en el que se indican actualizaciones constantemente. Esto se debe al comportamiento predeterminado de Vercel, que crea un nuevo proyecto para ti en lugar de hacer un fork del proyecto actual, lo que impide la detección correcta de actualizaciones. Se recomienda seguir los siguientes pasos para volver a desplegar:

1. Elimina el repositorio anterior.
2. Utiliza el botón "fork" ubicado en la esquina superior derecha de la página para hacer un fork del proyecto actual.
3. En la [página de Nuevo Proyecto de Vercel](https://vercel.com/new), selecciona el proyecto recién "forkeado" de la sección "Import Git Repository" y procede con el despliegue.

### Actualizaciones Automáticas

> En caso de encontrar un error durante la ejecución de Upstream Sync, realiza manualmente un Sync Fork una sola vez.

Una vez que hayas hecho un fork del proyecto, debido a las restricciones de GitHub, es necesario habilitar manualmente los Workflows en la página de Actions de tu proyecto "forkeado" y activar la Acción Upstream Sync. Una vez activada, las actualizaciones se ejecutarán automáticamente a diario.

![Actualizaciones Automáticas](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitando Actualizaciones Automáticas](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Actualizaciones Manuales

Para actualizaciones inmediatas, consulta los [Documentos de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) sobre cómo sincronizar forks.

⭐ Marca con una estrella / 👀 Sigue este proyecto o al autor para recibir notificaciones sobre nuevas características.
