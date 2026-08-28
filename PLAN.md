# 🥚 PLAN.md - Sistema de Venta de Codornices y Huevos

## 📌 Regla de Trabajo Principal
> **REGLA DE ORO:** Este archivo `PLAN.md` DEBE mantenerse actualizado tras completar cada tarea o al realizar modificaciones en la arquitectura, alcance o decisiones del proyecto. Marcá las casillas `[x]` a medida que avances con OpenCode.

---

## 📋 Resumen del Proyecto
Desarrollo de una landing page e-commerce interactiva para la venta de:
- Huevos de codorniz (por cajas).
- Codornices machos.
- Codornices hembras.

**Flujos principales de contacto/pago:**
1. **Contacto Directo:** Botón de consulta/pedido rápido que abre chat directo con la Administradora.
2. **Checkout Automatizado:** Botón de pago con Mercado Pago -> Redirección post-pago exitoso a WhatsApp con comprobante y resumen detallado del pedido.

**Redes y presencia:**
- **Instagram del negocio:** https://www.instagram.com/hogar_de_codornices/
- **WhatsApp de contacto:** +54 9 11 5691-6710
- **Enlace directo de WhatsApp:** https://wa.me/5491156916710

**Zona de entrega:** Ituzaingó, Buenos Aires, Argentina.

---

## 🎨 Identidad visual
- Fondo: `#f8ebdb`
- Detalles: `#714d25`
- Blancos: `#ffffff` (tarjetas y módulos)

## 💰 Precios de referencia (improvisados - a confirmar)
- Caja de huevos de codorniz (12 u.): $4.500
- Codorniz hembra (unidad): $9.000
- Codorniz macho (unidad): $5.000

## 📸 Imágenes
- Frontend visual y fotos generados por **Figma Make** (fotos reales de Unsplash de huevos y codornices).
- Fuentes en `src/App.tsx` (`PRODUCTS.img` y las del hero/contacto). Para usar fotos propias, reemplazar esas URLs o usar `assets/img/`.

---

## 🛠️ Tech Stack
- **Frontend:** React 19 + Vite 8 + TypeScript + Tailwind CSS v4 (generado por **Figma Make** e integrado al proyecto con opencode).
- **Comandos:** `npm install` · `npm run dev` (servidor local) · `npm run build` (producción en `dist/`).
- **Integración de Pago (futuro):** Mercado Pago SDK / Checkout Pro (vía Preferencias).
- **Notificaciones/Redirección:** WhatsApp (URL schemes `https://wa.me/...`).
- **Acceso a Figma:** vía el MCP `figma` configurado en opencode para leer/actualizar el diseño.

---

## 🚀 Sprints de Desarrollo

### 🟢 Sprint 1: Setup Inicial, Maquetación y Catálogo de Productos
**Objetivo:** Tener la estructura base de la web funcional, responsive y con el catálogo visual.

- [x] `1.1` Inicializar repositorio de Git y estructura de carpetas del proyecto.
- [x] `1.2` Diseñar la navegación y header con la identidad visual del negocio.
- [x] `1.3` Crear la sección Hero (portada con título, propuesta de valor y foto principal).
- [x] `1.4` Implementar la tarjeta/sección de producto: **Huevos de Codorniz** (selector de cajas/unidades).
- [x] `1.5` Implementar la tarjeta/sección de producto: **Codornices Hembras** (selector de cantidad).
- [x] `1.6` Implementar la tarjeta/sección de producto: **Codornices Machos** (selector de cantidad).
- [x] `1.7` Diseñar e implementar el carrito de compras dinámico o selector de pedido rápido.
- [x] `1.8` Crear el botón flotante / directo de "Consultar por WhatsApp" hacia el número de la Administradora.

---

### 🟡 Sprint 2: Lógica del Carrito y Mensajería de WhatsApp Directa
**Objetivo:** Que el usuario pueda armar un pedido y enviarlo pre-formateado a WhatsApp sin pagar online aún.

- [x] `2.1` Crear script en JavaScript para manejar el estado del carrito (sumar, restar, totalizar).
- [x] `2.2` Diseñar la función generadora de mensajes de WhatsApp (`buildWhatsAppMessage`).
- [x] `2.3` Formatear el texto de resumen: detalle de items, cantidades, precio estimado y datos del cliente.
- [x] `2.4` Vincular el botón de consulta rápida para abrir WhatsApp con el mensaje pre-cargado.
- [ ] `2.5` Validar comportamiento responsive en dispositivos móviles (Android / iOS). *(Responsive + menú hamburguesa ya implementados; queda validar en el celular real.)*

---

### 🟠 Sprint 3: Dejar la Web Lista (SEO + Despliegue) — EN CURSO
**Objetivo:** Web 100% productiva, indexable y compartible, preparada para dominio y publicidad.

- [x] `3.0` Migrar el repo a la org `hogar-de-codornices` + URL raíz `hogar-de-codornices.github.io` + token clásico configurado.
- [ ] `3.1` Configurar SEO en `index.html`: OpenGraph + Twitter Cards, `canonical`, `theme-color`, `og:image` absoluta (1200×630), `og:locale=es_AR`.
- [ ] `3.2` Agregar `JSON-LD LocalBusiness` (nombre, URL, zona Ituzaingó, WhatsApp, Instagram, rango de precios).
- [ ] `3.3` Crear `public/`: `favicon.svg`, `robots.txt`, `sitemap.xml`.
- [ ] `3.4` Textos de confianza: "Cómo pedir", entregas y **formas de pago** (pendiente de definir con mamá → Sprint 4).
- [ ] `3.5` Optimización de carga: `preconnect` a Unsplash/fuentes y `loading="lazy"` en imágenes.
- [ ] `3.6` Desplegar y verificar URL raíz en producción + validar en celular real (cierra tarea `2.5`).
- [ ] `3.7` Actualizar este `PLAN.md` según la Regla de Oro.

---

### 🟢 Sprint 4: Datos reales (con mamá) — PENDIENTE
**Objetivo:** Precios, fotos y datos reales del negocio.

- [ ] `4.1` Confirmar precios finales y actualizarlos en `PRODUCTS`.
- [ ] `4.2` Subir fotos reales (huevos + codornices) en `assets/img`, reemplazar Unsplash, `alt` y `og-image`.
- [ ] `4.3` Definir formas de pago, horarios y modalidad de entrega.
- [ ] `4.4` Actualizar mensaje de WhatsApp con los datos finales.
- [ ] `4.5` Redes: subir las mismas fotos a Instagram y desplegar.

---

### 🔵 Sprint 5: Presencia local en Google (gratis, alto impacto)
**Objetivo:** Que el negocio aparezca en Google y Maps de Ituzaingó sin pagar.

- [ ] `5.1` Crear **Perfil de Negocio en Google** ("Hogar de Codornices", zona Ituzaingó).
- [ ] `5.2` Completar perfil: categoría, fotos reales, horarios, teléfono, link a la web.
- [ ] `5.3` Verificar el negocio y pedir primeras reseñas a conocidos.
- [ ] `5.4` Registrar la web en **Google Search Console** + enviar `sitemap.xml`.
- [ ] `5.5` Confirmar que aparece en Google Maps de la zona.

---

### 🟣 Sprint 6: Dominio propio
**Objetivo:** Comprar y conectar un dominio sin `.github.io`.

- [ ] `6.1` Elegir y registrar dominio `.com` internacional (~US$10/año) — sin CUIT. Candidato: `hogar-de-codornices.com` (chequear disponibilidad).
- [ ] `6.2` Conectarlo a GitHub Pages (custom domain en Settings → Pages + CNAME).
- [ ] `6.3` Actualizar `canonical`/OG a la URL final y verificar HTTPS.
- [ ] `6.4` Agendar renovación anual del dominio.

---

### 🟡 Sprint 7: Publicidad digital
**Objetivo:** Campañas pagas que conviertan en mensajes de WhatsApp.

- [ ] `7.1` Definir presupuesto inicial y objetivo medible (mensajes de WhatsApp recibidos).
- [ ] `7.2` Campaña **Instagram/Facebook Ads** local (radio Ituzaingó / zona oeste) con foto real + CTA "Pedido por WhatsApp".
- [ ] `7.3` Campaña **Google Ads (Search)** con palabras de intención local + extensión de lugar/llamada (requiere Sprint 5).
- [ ] `7.4` Tracking de conversión: clic en "Enviar pedido por WhatsApp".
- [ ] `7.5` Revisión semanal: costo por mensaje, ajustar presupuesto.

---

### 🔴 Sprint 8: Pagos online (OPCIONAL / futuro)
**Objetivo:** Pago por Mercado Pago (a evaluar cuando el volumen lo justifique).

- [ ] `8.1` Registrar app en Mercado Pago y obtener credenciales (Test/Prod).
- [ ] `8.2` Crear función para generar la `preference` con los items del carrito (`back_urls`: success/failure/pending).
- [ ] `8.3` Integrar Checkout Pro en el frontend.
- [ ] `8.4` Post-pago: pantalla de éxito + envío de comprobante por WhatsApp.
- [ ] `8.5` Prueba end-to-end con compra real de bajo monto.

---

## 🗓️ Roadmap
- **Semana 1**: Sprint 3 (dejar la web lista) → después: precios/fotos con mamá (Sprint 4).
- **Semana 2-3**: Sprint 5 (Perfil de Google + Search Console) → Sprint 6 (dominio `.com`).
- **Semana 4+**: Sprint 7 (publicidad IG + Google Ads) → evaluar Sprint 8 (Mercado Pago) según demanda.

## 🔑 Palabras clave para publicidad (referencia)
`huevos de codorniz ituzaingó`, `huevos de codorniz`, `codornices a la venta zona oeste`, `codornices ponedoras buenos aires`, `comprar codornices`, `huevos de granja ituzaingó`, `codorniz para criadero`, `huevos de codorniz por mayor`.