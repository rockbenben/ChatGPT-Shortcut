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

AiShort proporciona una lista concisa y fácil de usar de instrucciones de IA. Incluso sin entender las solicitudes, puedes encontrar fácilmente las solicitudes adecuadas para diversos escenarios a través de filtrado y búsqueda, mejorando así tu productividad.

🚀 **Solicitudes de un solo clic**: Con solo un clic, puedes obtener una variedad de solicitudes seleccionadas cuidadosamente por expertos. Envíalas a modelos de lenguaje AI como ChatGPT y puedes obtener la salida esperada.

💻 **Impulsa la productividad**: Al usar solicitudes optimizadas, puedes obtener comentarios más precisos y prácticos, mejorando así de manera efectiva tu eficiencia laboral.

🌍 **Optimización para idiomas que no son el inglés**: Proporcionamos traducciones para las solicitudes en inglés en 12 de los principales idiomas globales y soportamos respuestas predeterminadas en tu lengua materna, lo que es conveniente para los hablantes de idiomas que no son el inglés para entender y usar.

💾 **Guarda solicitudes**: Recopila, edita y gestiona convenientemente tus solicitudes favoritas para uso futuro.

🌐 **Compartir solicitudes**: Comparte tus solicitudes favoritas, colabora con otros e inspira más ideas.

🗳️ **Sistema de votación comunitaria**: Similar a Product Hunt o Reddit, la plataforma es impulsada por la comunidad. Las mejores solicitudes serán promovidas a la página principal.

📦 **Listo para usar**: Simplemente visita https://www.aishort.top/es/ para comenzar a usar.

La fuente de las solicitudes de AiShort incluye selecciones de internet, compartidas por la comunidad, y [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Actualizaremos regularmente para proporcionarte nuevas solicitudes e inspiración. Para entender cómo usar AiShort, por favor consulta el [manual de usuario](https://www.aishort.top/es/docs/guides/getting-started).

Te invitamos a unirte a nuestra comunidad en Discord para intercambiar ideas y comentarios.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## Extensión de navegador

AiShort (ChatGPT Shortcut) es una extensión versátil compatible con Chrome, Edge, Firefox y otros navegadores basados ​​en Chromium. Esta extensión no solo cuenta con la funcionalidad de la versión web de ChatGPT Shortcut, sino que también agrega características únicas como una barra lateral y activación automática de ventanas. La extensión puede iniciarse automáticamente con ChatGPT o páginas personalizadas y también puede activarse manualmente usando el atajo `Alt+Shift+S`. Estos son los canales de descarga:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Complementos de Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [COMPLEMENTOS del navegador Firefox](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [Versión de GitHub](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

Además, ofrecemos el script Tampermonkey: [**Acceso directo a ChatGPT En cualquier lugar**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), lo que permite a los usuarios personalizar los nombres de dominio coincidentes y usar la barra lateral de AiShort en cualquier sitio web. Sin embargo, debido a las restricciones de inyección de contenido de scripts en la página ChatGPT, la funcionalidad de la barra lateral del script se activa a través de una ventana emergente en la página ChatGPT.

## Implementación

Para conocer los pasos detallados sobre la implementación a través de Vercel, el entorno local, Docker y la modificación del proyecto, consulte la [Guía de implementación del acceso directo de ChatGPT](https://www.aishort.top/es/docs/deploy).

## Actualizaciones sincronizadas

Si ha implementado su propio proyecto en Vercel con un solo clic, es posible que encuentre un problema en el que las actualizaciones se indiquen de manera constante. Esto surge del comportamiento predeterminado de Vercel de crear un nuevo proyecto para usted en lugar de bifurcar el proyecto actual, lo que impide la detección adecuada de actualizaciones. Se recomienda seguir los pasos siguientes para volver a implementar:

1. Eliminar el repositorio anterior.
2. Utilizar el botón "fork" ubicado en la esquina superior derecha de la página para bifurcar el proyecto actual.
3. En la [página Nuevo proyecto de Vercel](https://vercel.com/new), seleccionar el proyecto recientemente bifurcado en la sección Importar repositorio de Git y continuar con la implementación.

### Actualizaciones automáticas

> En caso de encontrar un error durante la ejecución de Upstream Sync, realice manualmente una única bifurcación de sincronización.

Una vez que haya bifurcado el proyecto, debido a las restricciones de GitHub, es necesario habilitar manualmente los flujos de trabajo en la página Acciones de su proyecto bifurcado y activar la acción Upstream Sync. Tras la activación, las actualizaciones se ejecutarán automáticamente a diario.

![Actualizaciones automáticas](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Habilitación de actualizaciones automáticas](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Actualizaciones manuales

Si desea realizar una actualización manual de inmediato, puede consultar la [documentación de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) para aprender a sincronizar el proyecto bifurcado con el código original.

No dude en mostrar su apoyo a este proyecto dándole una estrella o siguiéndolo, o siguiendo al autor, para mantenerse informado sobre las notificaciones oportunas sobre las nuevas actualizaciones de funciones.
