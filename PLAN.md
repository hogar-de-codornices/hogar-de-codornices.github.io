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

### 🔴 Sprint 3: Integración con Mercado Pago y Checkout Pro
**Objetivo:** Generar preferencia de pago e integrar los botones de cobro en la app.

- [ ] `3.1` Registrar la aplicación en el Panel de Desarrolladores de Mercado Pago y obtener credenciales (Test / Prod).
- [ ] `3.2` Configurar endpoint/función backend o Serverless Function para crear la `preference` de Mercado Pago con los items del carrito.
- [ ] `3.3` Configurar las URLs de retorno (`back_urls`): `success`, `failure`, `pending`.
- [ ] `3.4` Integrar el SDK de Mercado Pago en el frontend para abrir el checkout al hacer clic en "Pagar".
- [ ] `3.5` Realizar pruebas de pago en ambiente de Sandbox / Test.

---

### 🔵 Sprint 4: Flujo Post-Pago y Redirección con Comprobante
**Objetivo:** Confirmar el pago e instruir al cliente para enviar la confirmación final por WhatsApp.

- [ ] `4.1` Crear la vista / página de "Pago Exitoso" (`/success`).
- [ ] `4.2` Capturar parámetros de la URL devueltos por Mercado Pago (`payment_id`, `status`, `external_reference`).
- [ ] `4.3` Generar el mensaje automático de confirmación para WhatsApp que incluya:
  - 🛒 Resumen de lo comprado.
  - 🆔 ID de transacción / Comprobante de Mercado Pago.
  - 💵 Estado de la transacción ("PAGADO").
- [ ] `4.4` Diseñar el botón principal en la pantalla de éxito: *"Enviar comprobante y coordinar entrega por WhatsApp"*.
- [ ] `4.5` Probar el flujo completo de punta a punta (End-to-End).

---

### ⚪ Sprint 5: Pulido, SEO y Despliegue
**Objetivo:** Dejar la web 100% productiva en internet.

- [ ] `5.1` Optimizar imágenes y tiempos de carga.
- [ ] `5.2` Configurar OpenGraph (vista previa al compartir la web en WhatsApp/redes).
- [ ] `5.3` Desplegar el proyecto en la plataforma elegida (Netlify / Vercel).
- [ ] `5.4` Configurar credenciales de Producción de Mercado Pago.
- [ ] `5.5` Realizar prueba final en producción con una compra real de bajo monto.