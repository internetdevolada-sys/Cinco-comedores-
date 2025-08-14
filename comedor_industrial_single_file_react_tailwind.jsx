import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Menu as MenuIcon, UtensilsCrossed, Building2, ShieldCheck, Phone, Mail, MapPin, Clock, Leaf, Truck, Salad, ChefHat, CheckCircle } from "lucide-react";

// Single-file React component for an interactive corporate site
// Palette: orange (#f97316), amber/yellow (#f59e0b), red (#ef4444)
// Tailwind CSS recommended. Animations via Framer Motion. Icons via lucide-react.

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "menu", label: "Menú" },
  { id: "nosotros", label: "Nosotros" },
  { id: "contacto", label: "Contacto" },
];

const SERVICES = [
  {
    icon: <ChefHat className="w-6 h-6" aria-hidden />,
    title: "Comedor industrial",
    text: "Operación integral en sitio con menús balanceados, rutas de servicio y control de porciones.",
  },
  {
    icon: <Truck className="w-6 h-6" aria-hidden />,
    title: "Catering corporativo",
    text: "Entrega puntual de desayunos, comidas y box lunch para juntas, turnos y eventos.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    title: "Inocuidad y calidad",
    text: "Procesos basados en BPM, APPCC/HACCP y trazabilidad con checklists digitales.",
  },
  {
    icon: <Leaf className="w-6 h-6" aria-hidden />,
    title: "Opciones especiales",
    text: "Menús vegetarianos, bajos en sodio y adaptaciones por requerimiento nutricional.",
  },
];

const CATEGORIES = ["Todos", "Desayunos", "Comidas", "Vegetariano", "Especiales"];

const MENU_ITEMS = [
  { id: 1, name: "Huevos a la mexicana", cat: "Desayunos", kcal: 420, price: 55, tags: ["alto en proteína"], img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, name: "Pechuga a la plancha", cat: "Comidas", kcal: 520, price: 85, tags: ["balanceado"], img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, name: "Ensalada de quinoa", cat: "Vegetariano", kcal: 360, price: 75, tags: ["fibra"], img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, name: "Tacos de guisado", cat: "Comidas", kcal: 640, price: 70, tags: ["casero"], img: "https://images.unsplash.com/photo-1601050690493-8c037c5f8810?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, name: "Avena con fruta", cat: "Desayunos", kcal: 320, price: 45, tags: ["bajo en grasa"], img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, name: "Box lunch ejecutivo", cat: "Especiales", kcal: 700, price: 110, tags: ["evento"], img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop" },
];

const STATS = [
  { label: "Comidas diarias", value: "2,500+" },
  { label: "Clientes corporativos", value: "80+" },
  { label: "Años de experiencia", value: "15" },
  { label: "Satisfacción", value: "98%" },
];

const steps = [
  { title: "Diagnóstico", text: "Levantamiento de necesidades por turno, aforo y layout." },
  { title: "Propuesta", text: "Menús, costos y SLAs alineados a tus indicadores." },
  { title: "Implementación", text: "Puesta en marcha, personal y comisariado sanitario." },
  { title: "Mejora continua", text: "Auditorías, encuestas y panel de indicadores." },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium border-amber-500/50 text-amber-800 bg-amber-50">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10">
      {eyebrow && (
        <div className="mb-2 font-semibold tracking-widest uppercase text-amber-600">{eyebrow}</div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}

export default function ComedorIndustrial() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState("relevancia"); // precio-asc, precio-desc, kcal-asc

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const filteredMenu = useMemo(() => {
    let list = MENU_ITEMS.filter((i) =>
      (cat === "Todos" || i.cat === cat) &&
      (i.name.toLowerCase().includes(query.toLowerCase()) || i.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
    );
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "kcal-asc") list = [...list].sort((a, b) => a.kcal - b.kcal);
    return list;
  }, [query, cat, sort]);

  const navLink = (item) => (
    <a key={item.id} href={`#${item.id}`} className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-neutral-100">
      {item.label}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-neutral-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#inicio" className="flex items-center gap-2">
              <div className="h-9 w-9 grid place-items-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-red-500 text-white shadow">
                <UtensilsCrossed className="h-5 w-5" aria-hidden />
              </div>
              <span className="font-extrabold tracking-tight text-lg">Comedor<span className="text-orange-600">Pro</span></span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map(navLink)}
            </nav>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/5210000000000" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-500 to-red-500 shadow hover:opacity-95">
                Cotizar ahora
                <ChevronRight className="w-4 h-4" aria-hidden />
              </a>
              <button className="md:hidden p-2 rounded-xl border" onClick={() => setOpen(!open)} aria-label="Abrir menú">
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-neutral-100">
                  {n.label}
                </a>
              ))}
              <a href="https://wa.me/5210000000000" className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-500 to-red-500">
                Cotizar ahora
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-orange-400" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-red-400" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-amber-700 bg-amber-100 px-3 py-1 rounded-full text-xs font-semibold">
              <Building2 className="w-4 h-4" /> Soluciones para plantas y oficinas
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Alimentación corporativa <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-red-500">eficiente y deliciosa</span>
            </h1>
            <p className="mt-4 text-neutral-700 max-w-xl">
              Operamos comedores industriales con estándares de inocuidad y menús diseñados por nutriólogos. Enfocados en productividad, bienestar y costo total.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#contacto" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-500 to-red-500 shadow hover:opacity-95">
                Solicitar propuesta <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100">
                Ver menú
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border bg-white/70 backdrop-blur px-4 py-3 text-center">
                  <div className="text-2xl font-extrabold">{s.value}</div>
                  <div className="text-xs text-neutral-600">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-neutral-200">
              {/* Placeholder image — reemplázala por foto real */}
              <img src="https://images.unsplash.com/photo-1556911073-52527ac437e9?q=80&w=1600&auto=format&fit=crop" alt="Comedor industrial" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow p-3 ring-1 ring-neutral-200 hidden sm:flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" /><span className="text-sm font-medium">Certificación HACCP</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Servicios" title="Cobertura de punta a punta" subtitle="Desde la planeación hasta la operación diaria y la mejora continua." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="group rounded-3xl border bg-white p-5 shadow-sm hover:shadow-md ring-1 ring-neutral-200/60">
                <div className="h-10 w-10 grid place-items-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-red-500 text-white shadow">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
              </motion.div>
            ))}
          </div>
          {/* Steps */}
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div key={st.title} className="rounded-3xl border bg-white p-5 ring-1 ring-neutral-200/60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-orange-600 text-white font-bold">{i + 1}</span>
                  <h4 className="font-semibold">{st.title}</h4>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menú */}
      <section id="menu" className="py-16 md:py-20 bg-gradient-to-br from-white via-amber-50/50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Menú" title="Opciones destacadas" subtitle="Filtra por categoría, busca por nombre o etiqueta y ordena por precio/calorías." />

          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-2xl px-3 py-1.5 text-sm border ${cat === c ? "bg-orange-600 text-white border-orange-600" : "bg-white border-neutral-300 hover:bg-neutral-50"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar platillo o etiqueta…" className="w-full md:w-72 rounded-2xl border px-3 py-2 text-sm ring-0 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="relevancia">Orden: Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="kcal-asc">Calorías: menor a mayor</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="group overflow-hidden rounded-3xl border bg-white ring-1 ring-neutral-200/60 shadow-sm hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Reemplaza src por tu foto real */}
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 space-x-1">
                    <Badge>{item.cat}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="text-right">
                      <div className="font-extrabold">${item.price}</div>
                      <div className="text-xs text-neutral-500">{item.kcal} kcal</div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Nosotros" title="Experiencia y enfoque en seguridad alimentaria" subtitle="Equipo capacitado, proveedores certificados y auditorías constantes." />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-600 mt-1" />
                <p className="text-neutral-700">Protocolos basados en BPM y HACCP, con registros diarios de temperatura y sanitización.</p>
              </div>
              <div className="flex items-start gap-3">
                <Salad className="w-5 h-5 text-orange-600 mt-1" />
                <p className="text-neutral-700">Diseño de menús por nutriólogos: balance, sabor y costo controlado.</p>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-orange-600 mt-1" />
                <p className="text-neutral-700">Implementación en plantas, naves y corporativos, con indicadores de servicio y satisfacción.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop" alt="Operación de cocina" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop" alt="Platos servidos" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" alt="Equipo en acción" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200">
                <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop" alt="Ingredientes frescos" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Contacto" title="Hablemos de tu comedor" subtitle="Cuéntanos tu aforo, número de turnos y metas de servicio." />

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border ring-1 ring-neutral-200/60 bg-white p-6 shadow-sm">
              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nombre</label>
                    <input className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Empresa</label>
                    <input className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Nombre de la empresa" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Correo</label>
                    <input type="email" className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="correo@empresa.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">WhatsApp</label>
                    <input className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="+52 55 0000 0000" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Mensaje</label>
                  <textarea rows={4} className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Aforo, número de turnos, requerimientos especiales…" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock className="w-4 h-4" /> Lunes a sábado 6:00–18:00
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-500 to-red-500 shadow hover:opacity-95">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border ring-1 ring-neutral-200/60 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <a href="tel:+525500000000" className="font-medium">+52 55 0000 0000</a>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <a href="mailto:ventas@comedorpro.mx" className="font-medium">ventas@comedorpro.mx</a>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">CDMX y Área Metropolitana</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border ring-1 ring-neutral-200/60 bg-white shadow-sm">
                {/* Mapa embebido: actualiza el parámetro q con tu dirección */}
                <iframe
                  title="Mapa"
                  src="https://www.google.com/maps?q=Mexico%20City&output=embed"
                  className="w-full h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 grid place-items-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-red-500 text-white shadow">
                <UtensilsCrossed className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <div className="font-extrabold tracking-tight">Comedor<span className="text-orange-600">Pro</span></div>
                <div className="text-xs text-neutral-500">Alimentación corporativa que impulsa resultados.</div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
              <div>
                <div className="font-semibold mb-2">Sitio</div>
                <ul className="space-y-1 text-neutral-600">
                  {NAV.map((n) => (
                    <li key={n.id}><a href={`#${n.id}`} className="hover:text-neutral-900">{n.label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Servicios</div>
                <ul className="space-y-1 text-neutral-600">
                  <li>Comedor in situ</li>
                  <li>Catering</li>
                  <li>Box lunch</li>
                  <li>Eventos</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Cumplimiento</div>
                <ul className="space-y-1 text-neutral-600">
                  <li>BPM</li>
                  <li>HACCP</li>
                  <li>Normatividad local</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Contacto</div>
                <ul className="space-y-1 text-neutral-600">
                  <li>+52 55 0000 0000</li>
                  <li>ventas@comedorpro.mx</li>
                  <li>CDMX y alrededores</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-neutral-500 text-center">© {new Date().getFullYear()} ComedorPro. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
