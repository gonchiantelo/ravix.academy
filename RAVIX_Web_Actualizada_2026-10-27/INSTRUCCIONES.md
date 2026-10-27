# RAVIX Academy — sitio actualizado

Versión preparada el 27 de octubre de 2026 sobre el HTML existente. No se publicó en Render.

## Contenido del paquete

- `index.html`: página completa, estilos y JavaScript incluidos.
- `assets/`: logo, fotografías del equipo, video real de entrenamiento, imagen de portada y presentación PDF.

Conservar la carpeta `assets` junto a `index.html`. Subir únicamente el HTML deja sin imágenes, video y PDF a la página.

## Para integrar con Antigravity en el sitio existente

1. Revisar primero la estructura actual del repositorio y cómo Render sirve el sitio.
2. Incorporar este HTML en la página principal y copiar los recursos de `assets` a la ruta pública correspondiente. Si el sitio utiliza plantillas o un servidor, adaptar las rutas a esa estructura.
3. Mantener el servicio de Render y su configuración actual. No crear otro sitio ni modificar comandos de inicio sin comprobar que sea necesario.
4. Antes de publicar, comprobar navegación, menú móvil, enlaces a WhatsApp, reproducción del video y acceso al PDF en el entorno del proyecto.
5. Publicar usando el procedimiento habitual del repositorio y verificar la URL real de Render.

## Información comercial aplicada

- Core: $3.990 UYU mensuales; una sesión semanal de 60 minutos.
- Pro: $6.490 UYU mensuales; ocho sesiones mensuales: seis en cancha y dos de táctica/videoanálisis.
- Elite: $10.990 UYU mensuales; doce sesiones mensuales de 60 minutos. No se inventó una distribución entre cancha y táctica.
- Contratación mínima: tres meses. Los importes publicados son mensuales.
- Evaluación inicial: $1.300 UYU, abonados antes de la sesión. Incluye evaluación en cancha, resultados y devolución. Se descuentan de la primera mensualidad si se contrata un plan.
- Instagram: @ravix.academy.
- WhatsApp: +598 92 105 554.
- Correo: ravix.training@gmail.com.

## Video e Instagram

Se incluyó un fragmento de 35 segundos de una grabación real de entrenamiento compartida previamente. Tiene controles, sin reproducción automática. El archivo original completo no está incluido para evitar un paquete innecesariamente pesado.

La página enlaza al perfil de Instagram. No se inventó un enlace a un reel. Para incorporar un reel concreto, buscar `const instagramReelUrl` dentro de `index.html` y asignarle su URL pública canónica de Instagram. Esa opción agrega un botón que carga el reel dentro de la página cuando el visitante lo solicita; depende de que Instagram permita su inserción.

## Presentación

Está incluida la presentación existente `RAVIX_Planes_y_Metodo_2026.pdf`, accesible desde la página para verla y descargarla.

## Diseño y comprobaciones

Diseño oscuro con verde lima, tipografía Anton y Barlow, fotografías y recursos reales. Las fuentes utilizan Google Fonts con alternativas locales. No requiere instalar dependencias para servir estos archivos estáticos.

Se revisaron visualmente la versión de escritorio y la de celular, el menú móvil, la ausencia de desbordamiento horizontal, los enlaces internos y las rutas de los recursos. Se comprobó la sintaxis de JavaScript y la reproducción del video en navegador. El PDF incluido se verificó como archivo local; la descarga del PDF desde el navegador no quedó confirmada en esta revisión.

La puesta en producción y su revisión sobre el dominio definitivo quedan pendientes de la integración en el proyecto existente.
