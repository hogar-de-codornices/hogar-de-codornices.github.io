import { useState, useEffect } from "react";

const PRODUCTS = [
  {
    id: "huevos",
    name: "Huevos de Codorniz",
    desc: "Frescos, ricos y saludables. Ideales para consumo diario y gastronomía artesanal.",
    unit: "caja de 12 u.",
    unitShort: "caja",
    unitPlural: "cajas",
    price: 4500,
    img: "https://images.unsplash.com/photo-1645218167710-356801f89a7b?w=600&h=480&fit=crop&auto=format",
    alt: "Nido con huevos de codorniz frescos",
  },
  {
    id: "hembras",
    name: "Codornices Hembras",
    desc: "Ponedoras activas y saludables, listas para tu criadero o consumo familiar.",
    unit: "unidad",
    unitShort: "unidad",
    unitPlural: "unidades",
    price: 9000,
    img: "https://images.unsplash.com/photo-1781674459525-0b893b38f1eb?w=600&h=480&fit=crop&auto=format",
    alt: "Codorniz hembra en su entorno natural",
  },
  {
    id: "machos",
    name: "Codornices Machos",
    desc: "Reproductores fuertes y sanos, ideales para cría y reproducción controlada.",
    unit: "unidad",
    unitShort: "unidad",
    unitPlural: "unidades",
    price: 5000,
    img: "https://images.unsplash.com/photo-1748929170058-2277f819ceeb?w=600&h=480&fit=crop&auto=format",
    alt: "Codorniz macho posada en una rama",
  },
];

const WA = "5491156916710";

function fmt(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

function buildMsg(cart: Record<string, number>) {
  const lines = PRODUCTS.filter((p) => (cart[p.id] || 0) > 0).map((p) => {
    const qty = cart[p.id];
    const u = qty === 1 ? p.unitShort : p.unitPlural;
    return `• ${qty} ${u} de ${p.name} — ${fmt(p.price * qty)}`;
  });
  const total = PRODUCTS.reduce((s, p) => s + p.price * (cart[p.id] || 0), 0);
  return encodeURIComponent(
    [
      "¡Hola! Quiero hacer el siguiente pedido desde la web del Hogar de Codornices:",
      "",
      ...lines,
      "",
      `Total estimado: ${fmt(total)}`,
      "",
      "¿Podemos coordinar la entrega en Buenos Aires? ¡Gracias! 🥚",
    ].join("\n")
  );
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({ huevos: 0, hembras: 0, machos: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const total = PRODUCTS.reduce((s, p) => s + p.price * (cart[p.id] || 0), 0);
  const hasItems = total > 0;
  const waOrder = `https://wa.me/${WA}?text=${buildMsg(cart)}`;
  const waSimple = `https://wa.me/${WA}`;

  const adjust = (id: string, d: number) =>
    setCart((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + d) }));

  return (
    <div style={{ backgroundColor: "#f8ebdb", color: "#2c1a0e", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          backgroundColor: (scrolled || menuAbierto) ? "rgba(248,235,219,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          paddingTop: scrolled ? "14px" : "22px",
          paddingBottom: scrolled ? "14px" : "22px",
          borderBottom: scrolled ? "1px solid rgba(113,77,37,0.1)" : "none",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <a href="#" className="font-serif" style={{ gridColumn: 1, justifySelf: "start", fontSize: "1.25rem", color: "#714d25", textDecoration: "none", letterSpacing: "-0.01em" }}>
            Hogar de <em>Codornices</em>
          </a>
          <nav className="nav-desktop" style={{ gridColumn: 2, justifySelf: "center", display: "flex", alignItems: "center", gap: "32px" }}>
            {["#productos|Productos", "#pedido|Mi pedido", "#contacto|Contacto"].map((item) => {
              const [href, label] = item.split("|");
              return (
                <a key={href} href={href} className="nav-link">{label}</a>
              );
            })}
            <a href="https://www.instagram.com/hogar_de_codornices/" target="_blank" rel="noopener" className="nav-link">
              Instagram
            </a>
          </nav>
          <button className={`nav-toggle${menuAbierto ? " open" : ""}`} onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú" aria-expanded={menuAbierto} style={{ gridColumn: 2, justifySelf: "center" }}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a href={waSimple} target="_blank" rel="noopener"
            style={{ gridColumn: 3, justifySelf: "end", backgroundColor: "#714d25", color: "#f8ebdb", textDecoration: "none", fontSize: "0.8125rem", fontWeight: 600, padding: "9px 20px", borderRadius: "999px", letterSpacing: "0.02em", transition: "opacity 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            WhatsApp ↗
          </a>
        </div>
        {menuAbierto && (
          <div className="nav-mobile">
            {["#productos|Productos", "#pedido|Mi pedido", "#contacto|Contacto"].map((item) => {
              const [href, label] = item.split("|");
              return (
                <a key={href} href={href} onClick={() => setMenuAbierto(false)}>{label}</a>
              );
            })}
            <a href="https://www.instagram.com/hogar_de_codornices/" target="_blank" rel="noopener" onClick={() => setMenuAbierto(false)}>Instagram</a>
            <a href={waSimple} target="_blank" rel="noopener" className="nav-mobile-wa" onClick={() => setMenuAbierto(false)}>WhatsApp ↗</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "96px", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="grid-hero" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", width: "100%" }}>

          <div className="hero-text">
            <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8682f", marginBottom: "24px" }}>
              Granja familiar · Buenos Aires
            </p>
            <h1 className="font-serif" style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)", lineHeight: 1.04, color: "#2c1a0e", marginBottom: "28px", letterSpacing: "-0.02em" }}>
              Huevos y<br />codornices<br /><em style={{ color: "#714d25" }}>del hogar.</em>
            </h1>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "#5a3a1a", opacity: 0.82, marginBottom: "44px", maxWidth: "420px" }}>
              Producción artesanal con cuidado familiar. Pedidos directos por WhatsApp, entrega coordinada en Buenos Aires.
            </p>
            <div className="hero-actions-inline" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#productos"
                style={{ backgroundColor: "#714d25", color: "#f8ebdb", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", padding: "14px 28px", borderRadius: "999px", letterSpacing: "0.02em", transition: "opacity 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Ver productos
              </a>
              <a href={waSimple} target="_blank" rel="noopener"
                style={{ backgroundColor: "transparent", color: "#714d25", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", padding: "13px 28px", borderRadius: "999px", letterSpacing: "0.02em", border: "2px solid #714d25", transition: "opacity 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-media" style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, top: "16px", borderRadius: "2.5rem", overflow: "hidden", backgroundColor: "#e8d5bc" }}>
              <img
                src="https://images.unsplash.com/photo-1641070260526-6b91c010b6d6?w=800&h=900&fit=crop&auto=format"
                alt="Huevos de codorniz frescos"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,26,14,0.35) 0%, transparent 55%)" }} />
            </div>
            <div style={{ position: "absolute", bottom: "28px", left: "28px", zIndex: 10, backgroundColor: "#f8ebdb", borderRadius: "1.25rem", padding: "18px 22px", boxShadow: "0 8px 32px rgba(44,26,14,0.18)" }}>
              <p className="font-serif" style={{ fontSize: "1.75rem", fontWeight: 700, color: "#714d25", lineHeight: 1 }}>100%</p>
              <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a3a1a", marginTop: "4px" }}>Natural & Fresco</p>
            </div>
            <div className="hero-badge-zona" style={{ position: "absolute", top: "36px", zIndex: 10, backgroundColor: "#714d25", borderRadius: "1rem", padding: "14px 18px", boxShadow: "0 8px 24px rgba(44,26,14,0.25)" }}>
              <p className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8d5bc", marginBottom: "4px" }}>Zona de entrega</p>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f8ebdb" }}>Buenos Aires</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="productos" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "64px" }}>
            <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8682f", marginBottom: "16px" }}>
              01 — Catálogo
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", color: "#2c1a0e", marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Nuestros productos
            </h2>
            <p style={{ fontSize: "1rem", color: "#5a3a1a", opacity: 0.75, maxWidth: "480px", lineHeight: 1.65 }}>
              Elegí la cantidad, armá tu pedido y envialo por WhatsApp. Coordinamos la entrega directamente con vos.
            </p>
          </div>

          <div className="grid-productos">
            {PRODUCTS.map((p) => (
              <article key={p.id}
                style={{ backgroundColor: "#fff", borderRadius: "2rem", overflow: "hidden", boxShadow: "0 2px 16px rgba(44,26,14,0.07)", transition: "box-shadow 0.3s, transform 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(44,26,14,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(44,26,14,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div className="card-media" style={{ overflow: "hidden", backgroundColor: "#e8d5bc" }}>
                  <img src={p.img} alt={p.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
                <div className="card-padding">
                  <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "#2c1a0e", marginBottom: "8px" }}>{p.name}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#5a3a1a", opacity: 0.72, lineHeight: 1.6, marginBottom: "20px" }}>{p.desc}</p>
                  <p className="font-serif" style={{ fontSize: "2rem", fontWeight: 700, color: "#714d25", lineHeight: 1 }}>{fmt(p.price)}</p>
                  <p className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#a8682f", marginTop: "4px", marginBottom: "24px" }}>
                    por {p.unit}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "18px", backgroundColor: "#f8ebdb", borderRadius: "999px", padding: "8px 20px" }}>
                      <button onClick={() => adjust(p.id, -1)}
                        style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "none", color: "#714d25", fontSize: "1.25rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                        −
                      </button>
                      <span style={{ minWidth: "20px", textAlign: "center", fontWeight: 600, fontSize: "1rem", color: "#2c1a0e" }}>
                        {cart[p.id] || 0}
                      </span>
                      <button onClick={() => adjust(p.id, 1)}
                        style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "none", color: "#714d25", fontSize: "1.25rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                        +
                      </button>
                    </div>
                    {(cart[p.id] || 0) > 0 && (
                      <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#714d25", transition: "opacity 0.2s" }}>
                        {fmt(p.price * (cart[p.id] || 0))}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER SUMMARY ── */}
      <section id="pedido" style={{ padding: "96px 0", backgroundColor: "#2c1a0e" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "56px" }}>
            <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8682f", marginBottom: "16px" }}>
              02 — Resumen
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", color: "#f8ebdb", letterSpacing: "-0.02em" }}>
              Tu pedido
            </h2>
          </div>

          <div className="grid-resumen">
            <div>
              {!hasItems ? (
                <p style={{ fontSize: "1rem", color: "#e8d5bc", opacity: 0.5, fontStyle: "italic" }}>
                  Todavía no agregaste productos. Elegí arriba y volvé acá.
                </p>
              ) : (
                <div>
                  {PRODUCTS.filter((p) => (cart[p.id] || 0) > 0).map((p, i, arr) => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(248,235,219,0.1)" : "none" }}>
                      <div>
                        <p style={{ fontWeight: 600, color: "#f8ebdb", marginBottom: "4px" }}>{p.name}</p>
                        <p style={{ fontSize: "0.8125rem", color: "#e8d5bc", opacity: 0.55 }}>
                          {cart[p.id]} × {fmt(p.price)}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <span className="font-serif" style={{ fontSize: "1.375rem", fontWeight: 700, color: "#f8ebdb" }}>
                          {fmt(p.price * (cart[p.id] || 0))}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(248,235,219,0.1)", borderRadius: "999px", padding: "6px 14px" }}>
                          <button onClick={() => adjust(p.id, -1)}
                            style={{ border: "none", background: "none", color: "#f8ebdb", fontWeight: 700, fontSize: "1rem", cursor: "pointer", padding: "0", lineHeight: 1, opacity: 0.8, transition: "opacity 0.15s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}>
                            −
                          </button>
                          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f8ebdb", minWidth: "16px", textAlign: "center" }}>{cart[p.id]}</span>
                          <button onClick={() => adjust(p.id, 1)}
                            style={{ border: "none", background: "none", color: "#f8ebdb", fontWeight: 700, fontSize: "1rem", cursor: "pointer", padding: "0", lineHeight: 1, opacity: 0.8, transition: "opacity 0.15s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "32px", marginTop: "8px", borderTop: "1px solid rgba(248,235,219,0.2)" }}>
                    <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#e8d5bc", opacity: 0.55 }}>
                      Total estimado
                    </p>
                    <p className="font-serif resumen-total" style={{ fontWeight: 700, color: "#f8ebdb", letterSpacing: "-0.02em" }}>
                      {fmt(total)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="resumen-card-caja" style={{ backgroundColor: "rgba(248,235,219,0.07)", borderRadius: "2rem", border: "1px solid rgba(248,235,219,0.1)" }}>
              <div style={{ marginBottom: "32px" }}>
                <p className="font-serif" style={{ fontSize: "1.375rem", color: "#f8ebdb", marginBottom: "12px" }}>
                  ¿Listo para pedir?
                </p>
                <p style={{ fontSize: "0.9rem", color: "#e8d5bc", opacity: 0.65, lineHeight: 1.65 }}>
                  El pedido se envía como mensaje pre-armado. Después acordamos el pago y coordinamos la entrega según tu zona.
                </p>
              </div>
              <a
                href={hasItems ? waOrder : "#productos"}
                target={hasItems ? "_blank" : "_self"}
                rel="noopener"
                onClick={!hasItems ? (e) => e.preventDefault() : undefined}
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  backgroundColor: hasItems ? "#f8ebdb" : "rgba(248,235,219,0.2)",
                  color: hasItems ? "#714d25" : "rgba(248,235,219,0.4)",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  padding: "16px 24px",
                  borderRadius: "999px",
                  letterSpacing: "0.02em",
                  cursor: hasItems ? "pointer" : "not-allowed",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { if (hasItems) { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {hasItems ? "Enviar pedido por WhatsApp →" : "Agregá productos primero"}
              </a>
              {hasItems && (
                <p style={{ fontSize: "0.75rem", textAlign: "center", color: "#e8d5bc", opacity: 0.4, marginTop: "14px" }}>
                  Abre WhatsApp con el resumen ya redactado
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "56px" }}>
            <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#a8682f", marginBottom: "16px" }}>
              03 — Contacto
            </p>
            <h2 className="font-serif" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", color: "#2c1a0e", letterSpacing: "-0.02em" }}>
              Contacto y entrega
            </h2>
          </div>

          <div className="grid-contacto">
            <div>
              {[
                { label: "Negocio", value: "Hogar de Codornices", href: undefined },
                { label: "Zona de entrega", value: "Buenos Aires y alrededores", href: undefined },
                { label: "WhatsApp", value: "+54 9 11 5691-6710", href: waSimple },
                { label: "Instagram", value: "@hogar_de_codornices", href: "https://www.instagram.com/hogar_de_codornices/" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "32px", alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid rgba(113,77,37,0.12)" }}>
                  <p className="font-mono" style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#a8682f", width: "110px", flexShrink: 0, paddingTop: "2px" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener" style={{ color: "#2c1a0e", fontWeight: 500, textDecoration: "none", fontSize: "0.9375rem", transition: "opacity 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: "#2c1a0e", fontWeight: 500, fontSize: "0.9375rem" }}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="contacto-media" style={{ position: "relative", borderRadius: "2.5rem", overflow: "hidden", backgroundColor: "#e8d5bc" }}>
              <img
                src="https://images.unsplash.com/photo-1711714096280-1fd5d63b9ebe?w=700&h=500&fit=crop&auto=format"
                alt="Codornices del Hogar de Codornices"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,26,14,0.75) 0%, rgba(44,26,14,0.1) 55%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "36px" }}>
                <p className="font-serif" style={{ fontSize: "1.625rem", color: "#fff", marginBottom: "8px" }}>¿Tenés dudas?</p>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", marginBottom: "24px", lineHeight: 1.55 }}>
                  Escribinos por WhatsApp, te respondemos a la brevedad.
                </p>
                <a href={waSimple} target="_blank" rel="noopener"
                  style={{ display: "inline-block", textAlign: "center", backgroundColor: "#f8ebdb", color: "#714d25", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", padding: "13px 24px", borderRadius: "999px", letterSpacing: "0.02em", transition: "opacity 0.2s, transform 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(113,77,37,0.15)", padding: "36px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <p className="font-serif" style={{ fontSize: "1.125rem", fontStyle: "italic", color: "#714d25" }}>Hogar de Codornices</p>
          <p style={{ fontSize: "0.8125rem", color: "#5a3a1a", opacity: 0.55 }}>Buenos Aires, Argentina</p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "Instagram", href: "https://www.instagram.com/hogar_de_codornices/" },
              { label: "WhatsApp", href: waSimple },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener"
                style={{ color: "#714d25", textDecoration: "none", fontSize: "0.8125rem", fontWeight: 500, opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── FLOATING WA ── */}
      <a href={waSimple} target="_blank" rel="noopener" aria-label="Consultar por WhatsApp"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.55)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.4)"; }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
