"use client";

import { useEffect, useState } from "react";

const festeasySlides = [
  {
    src: "/projects/festeasy-client-dashboard.jpeg",
    alt: "Panel de cliente de FestEasy con reservaciones y solicitudes",
    label: "Panel de cliente",
  },
  {
    src: "/projects/festeasy-web-builder.jpeg",
    alt: "Constructor de página web para proveedores dentro de FestEasy",
    label: "Constructor de sitio",
  },
];

type LightboxImage = { src: string; alt: string } | null;

export default function Home() {
  const [festSlide, setFestSlide] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxImage>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (!lightbox) return;
      if (event.key === "ArrowRight") {
        setFestSlide((current) => (current + 1) % festeasySlides.length);
      }
      if (event.key === "ArrowLeft") {
        setFestSlide(
          (current) =>
            (current - 1 + festeasySlides.length) % festeasySlides.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -11% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const openImage = (src: string, alt: string) => setLightbox({ src, alt });

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">KV</span>
          <span className="brand-copy">
            <strong>Kevin Vargas</strong>
            <small>Software Developer</small>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a className="nav-secondary" href="#perfil">
            Perfil
          </a>
          <a href="#proyectos">Proyectos</a>
          <a className="nav-secondary" href="#capacidades">
            Capacidades
          </a>
          <a className="nav-secondary" href="#contacto">
            Contacto
          </a>
          <a href="/downloads/cv-kevin-vargas.pdf" download>
            Descargar CV <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <div className="hero-copy reveal">
          <p className="eyebrow">
            <span className="status-dot" /> Disponible para nuevos retos
          </p>
          <h1>
            Construyo software que convierte procesos reales en
            <span> soluciones claras.</span>
          </h1>
          <p className="hero-lead">
            Soy <strong>Kevin Aarón Vargas Guzmán</strong>, desarrollador de
            software multiplataforma enfocado en aplicaciones web y móviles,
            automatización e inteligencia artificial.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              Explorar proyectos <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-secondary" href="mailto:kevin.36137@gmail.com">
              Hablemos
            </a>
          </div>
          <div className="hero-meta" aria-label="Áreas profesionales">
            <span>Web & backend</span>
            <span>Apps móviles</span>
            <span>Automatización & IA</span>
          </div>
        </div>

        <div className="portrait-stage reveal reveal-delay">
          <div className="portrait-card">
            <div className="portrait-frame">
              <img
                src="/profile/kevin-vargas.jpg"
                alt="Retrato profesional de Kevin Aarón Vargas Guzmán"
              />
            </div>
            <div className="portrait-caption">
              <span>Perfil</span>
              <strong>Junior avanzado</strong>
            </div>
          </div>
          <div className="floating-card floating-card-top">
            <span className="card-index">01</span>
            <strong>Producto digital</strong>
            <small>De la necesidad a la solución</small>
          </div>
          <div className="floating-card floating-card-bottom">
            <span className="pulse" />
            <strong>Aprendizaje constante</strong>
          </div>
        </div>

        <div className="scroll-cue">
          <span>Trabajo seleccionado</span>
          <span aria-hidden="true">↓</span>
        </div>
      </section>

      <section className="projects-section" id="proyectos">
        <div className="section-heading" data-reveal="up">
          <div>
            <p className="eyebrow eyebrow-dark">Proyectos seleccionados</p>
            <h2>Soluciones creadas para necesidades concretas.</h2>
          </div>
          <p>
            Cada proyecto combina análisis, lógica de negocio y una interfaz
            pensada para que las personas puedan trabajar con claridad.
          </p>
        </div>

        <article className="project project-legal" data-reveal="scale">
          <div className="project-copy">
            <div className="project-number">01 / Sistema legal</div>
            <p className="project-kicker">CECANI · Gestión de expedientes</p>
            <h3>Un flujo legal conectado, desde el cliente hasta su seguimiento.</h3>
            <p className="project-summary">
              Plataforma con perfiles para dirección, abogadas y clientes. La
              documentación se recibe, revisa y convierte en un expediente
              organizado antes de generar el contrato y asignar el caso.
            </p>
            <ul className="feature-list">
              <li>Recepción y verificación de documentos del cliente</li>
              <li>Generación y administración de contratos</li>
              <li>Asignación de abogadas y seguimiento del proceso legal</li>
              <li>Agenda, tareas, alertas y expedientes compartidos</li>
            </ul>
            <div className="project-links">
              <a
                className="text-link"
                href="https://sistema-cecani.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visitar proyecto <span aria-hidden="true">↗</span>
              </a>
              <span className="tag">Roles y permisos</span>
              <span className="tag">Flujo documental</span>
            </div>
          </div>
          <button
            className="project-image image-button"
            type="button"
            onClick={() =>
              openImage(
                "/projects/cecani-legal-dashboard.png",
                "Dashboard legal de CECANI",
              )
            }
            aria-label="Ampliar dashboard legal de CECANI"
          >
            <span className="image-topbar">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Panel legal</span>
              <span className="expand-label">Ampliar ↗</span>
            </span>
            <img
              src="/projects/cecani-legal-dashboard.png"
              alt="Dashboard azul oscuro del sistema legal CECANI"
            />
          </button>
        </article>

        <article className="project project-fest" data-reveal="scale">
          <div className="project-copy">
            <div className="project-number">02 / Plataforma SaaS</div>
            <p className="project-kicker">FestEasy · Operación de eventos</p>
            <h3>El negocio completo de un proveedor de fiestas, en un solo lugar.</h3>
            <p className="project-summary">
              Sistema para administrar servicios, inventario, agenda, paquetes,
              pedidos y finanzas. También permite publicar una página propia y
              acercar clientes a proveedores según su ubicación.
            </p>
            <div className="project-stat-grid">
              <div>
                <strong>3</strong>
                <span>perfiles conectados</span>
              </div>
              <div>
                <strong>360°</strong>
                <span>gestión del negocio</span>
              </div>
            </div>
            <div className="project-links">
              <a
                className="text-link"
                href="https://festeasy.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visitar proyecto <span aria-hidden="true">↗</span>
              </a>
              <span className="tag">Marketplace local</span>
              <span className="tag">Dashboard</span>
            </div>
          </div>

          <div className="slider-shell">
            <div className="slider-toolbar">
              <div>
                <span className="live-dot" />
                <strong>{festeasySlides[festSlide].label}</strong>
              </div>
              <div className="slider-count">
                0{festSlide + 1} / 0{festeasySlides.length}
              </div>
            </div>
            <button
              className="slider-image image-button"
              type="button"
              onClick={() =>
                openImage(
                  festeasySlides[festSlide].src,
                  festeasySlides[festSlide].alt,
                )
              }
              aria-label={`Ampliar ${festeasySlides[festSlide].label}`}
            >
              <img
                key={festeasySlides[festSlide].src}
                className="slide-enter"
                src={festeasySlides[festSlide].src}
                alt={festeasySlides[festSlide].alt}
              />
              <span className="image-zoom">Ver en grande ↗</span>
            </button>
            <div className="slider-controls">
              <div className="slider-dots" aria-label="Seleccionar captura">
                {festeasySlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    className={index === festSlide ? "active" : ""}
                    type="button"
                    onClick={() => setFestSlide(index)}
                    aria-label={`Mostrar ${slide.label}`}
                    aria-pressed={index === festSlide}
                  />
                ))}
              </div>
              <div className="arrow-controls">
                <button
                  type="button"
                  onClick={() =>
                    setFestSlide(
                      (festSlide - 1 + festeasySlides.length) %
                        festeasySlides.length,
                    )
                  }
                  aria-label="Captura anterior"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFestSlide((festSlide + 1) % festeasySlides.length)
                  }
                  aria-label="Captura siguiente"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="project-grid">
          <article className="compact-project diploma-project" data-reveal="left">
            <div className="compact-copy">
              <div className="project-number">03 / Automatización</div>
              <div className="diploma-label">CECANI · Pagos y certificaciones</div>
              <h3>Emisión automática de diplomas</h3>
              <p>
                Sistema para crear enlaces de pago de cursos, webinars y
                diplomados. Al confirmar la compra, genera el diploma oficial
                con los datos de cada persona, lo envía por correo y permite
                descargarlo de inmediato.
              </p>
              <ul className="mini-points">
                <li>Enlaces de pago</li>
                <li>Diploma personalizado</li>
                <li>Entrega por correo</li>
              </ul>
            </div>
            <button
              className="compact-image diploma-system-image image-button"
              type="button"
              onClick={() =>
                openImage(
                  "/projects/cecani-diplomas.png",
                  "Panel de CECANI para crear enlaces de pago y certificación",
                )
              }
              aria-label="Ampliar sistema de pagos y diplomas de CECANI"
            >
              <img
                src="/projects/cecani-diplomas.png"
                alt="Panel de CECANI para configurar pagos de cursos y generar diplomas"
              />
              <span className="image-zoom">Ver sistema en grande ↗</span>
            </button>
          </article>

          <article
            className="compact-project compact-dark"
            data-reveal="right"
            data-reveal-delay="1"
          >
            <div className="compact-copy">
              <div className="project-number">04 / Marca tecnológica</div>
              <h3>CODIA</h3>
              <p>
                Presencia digital para un negocio de software, diseñada para
                comunicar capacidades, confianza y una visión tecnológica clara.
              </p>
              <a
                className="text-link text-link-light"
                href="https://codia-landingpage.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visitar proyecto <span aria-hidden="true">↗</span>
              </a>
            </div>
            <button
              className="compact-image image-button"
              type="button"
              onClick={() =>
                openImage("/projects/codia-home.png", "Página principal de CODIA")
              }
              aria-label="Ampliar página principal de CODIA"
            >
              <img
                src="/projects/codia-home.png"
                alt="Página de CODIA con fondo negro y formas azules"
              />
            </button>
          </article>

          <article className="compact-project compact-wide" data-reveal="up">
            <div className="compact-copy">
              <div className="project-number">05 / Comercio local</div>
              <h3>Sunglass Shop</h3>
              <p>
                Sitio para una óptica yucateca que combina catálogo, servicios,
                beneficios y contacto directo con una experiencia visual premium.
              </p>
              <a
                className="text-link"
                href="https://sunglass-shop-optica.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visitar proyecto <span aria-hidden="true">↗</span>
              </a>
            </div>
            <button
              className="compact-image image-button"
              type="button"
              onClick={() =>
                openImage(
                  "/projects/sunglass-shop.png",
                  "Catálogo de Sunglass Shop",
                )
              }
              aria-label="Ampliar catálogo de Sunglass Shop"
            >
              <img
                src="/projects/sunglass-shop.png"
                alt="Catálogo en blanco y negro de Sunglass Shop"
              />
            </button>
          </article>
        </div>
      </section>

      <section className="profile-section" id="perfil">
        <div className="profile-intro" data-reveal="up">
          <p className="eyebrow eyebrow-dark">Perfil profesional</p>
          <h2>
            Tecnología con propósito.
            <span> Trabajo con valores.</span>
          </h2>
        </div>

        <div className="profile-content">
          <div className="profile-statement" data-reveal="left">
            <p className="statement-lead">
              Me interesa construir soluciones útiles: entender el proceso,
              identificar lo que puede mejorar y convertirlo en una experiencia
              digital funcional.
            </p>
            <p>
              Combino desarrollo tradicional, herramientas low-code e
              inteligencia artificial. Aprendo con autonomía, documento el
              trabajo y colaboro para que cada entrega sea más clara, mantenible
              y valiosa que la anterior.
            </p>
            <blockquote>
              “La calidad del resultado también depende de cómo se trabaja con
              las personas.”
            </blockquote>
          </div>

          <div className="values-grid">
            <article data-reveal="up">
              <span>01</span>
              <h3>Responsabilidad</h3>
              <p>Cuidar los compromisos, los detalles y la calidad de cada entrega.</p>
            </article>
            <article data-reveal="up" data-reveal-delay="1">
              <span>02</span>
              <h3>Trabajo en equipo</h3>
              <p>Escuchar, compartir contexto y construir acuerdos para avanzar.</p>
            </article>
            <article data-reveal="up" data-reveal-delay="2">
              <span>03</span>
              <h3>Adaptabilidad</h3>
              <p>Aprender herramientas y enfoques nuevos según el reto real.</p>
            </article>
            <article data-reveal="up" data-reveal-delay="3">
              <span>04</span>
              <h3>Mejora continua</h3>
              <p>Revisar, medir y convertir cada experiencia en una mejor práctica.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="capabilities-section" id="capacidades">
        <div className="section-heading capabilities-heading" data-reveal="up">
          <div>
            <p className="eyebrow">Conocimientos</p>
            <h2>Capacidades para construir de principio a fin.</h2>
          </div>
          <p>
            Una base multidisciplinaria que conecta interfaces, lógica,
            automatización, datos y operación.
          </p>
        </div>

        <div className="capability-grid">
          <article className="capability-card capability-primary" data-reveal="up">
            <span className="capability-index">01 / Desarrollo web</span>
            <h3>Frontend, backend e integraciones</h3>
            <p>
              Creación de funcionalidades web, organización de lógica de negocio,
              diseño y consumo de servicios API.
            </p>
            <div className="tech-list">
              <span>Laravel</span>
              <span>Express.js</span>
              <span>Angular</span>
              <span>API RESTful</span>
              <span>Eloquent ORM</span>
            </div>
          </article>

          <article className="capability-card" data-reveal="up" data-reveal-delay="1">
            <span className="capability-index">02 / Móvil</span>
            <h3>Aplicaciones multiplataforma</h3>
            <p>
              Interfaces y funcionalidades para distintos dispositivos,
              conectadas con servicios backend y fuentes de datos.
            </p>
            <div className="tech-list">
              <span>Dart</span>
              <span>Flutter</span>
              <span>Git / GitHub</span>
            </div>
          </article>

          <article
            className="capability-card capability-accent"
            data-reveal="up"
            data-reveal-delay="1"
          >
            <span className="capability-index">03 / Automatización</span>
            <h3>Procesos y agentes de IA</h3>
            <p>
              Flujos de varios pasos que reducen tareas manuales, procesan
              información y conectan canales digitales.
            </p>
            <div className="tech-list">
              <span>Make</span>
              <span>IA generativa</span>
              <span>Agentes de IA</span>
              <span>WhatsApp</span>
            </div>
          </article>

          <article className="capability-card" data-reveal="up" data-reveal-delay="2">
            <span className="capability-index">04 / Datos</span>
            <h3>Modelado y arquitectura lógica</h3>
            <p>
              Organización de información, relaciones y reglas para que una
              solución pueda crecer sin perder claridad.
            </p>
            <div className="tech-list">
              <span>Bases de datos</span>
              <span>API</span>
              <span>Control de versiones</span>
            </div>
          </article>

          <article className="capability-card capability-wide" data-reveal="scale">
            <div>
              <span className="capability-index">05 / Conectividad y productividad</span>
              <h3>Herramientas que apoyan la operación.</h3>
            </div>
            <div className="wide-capability-columns">
              <p>
                Google Workspace, mensajería y redes sociales para organizar
                flujos de comunicación y trabajo.
              </p>
              <p>
                Fundamentos de redes, conmutación, enrutamiento y redes
                inalámbricas con Cisco Packet Tracer.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="journey-section" id="trayectoria">
        <div className="journey-heading" data-reveal="up">
          <p className="eyebrow eyebrow-dark">Formación y experiencia</p>
          <h2>Una trayectoria construida con curiosidad, práctica y disciplina.</h2>
        </div>

        <div className="journey-layout">
          <div className="timeline" aria-label="Trayectoria académica">
            <article className="timeline-item featured" data-reveal="left">
              <span className="timeline-marker">01</span>
              <div>
                <p className="timeline-label">Formación profesional</p>
                <h3>Técnico Superior Universitario en Desarrollo de Software Multiplataforma</h3>
                <p>Universidad Tecnológica Metropolitana</p>
              </div>
            </article>
            <article className="timeline-item" data-reveal="left" data-reveal-delay="1">
              <span className="timeline-marker">02</span>
              <div>
                <p className="timeline-label">Programa académico destacado</p>
                <h3>PROFEAR · Estudiantes de Alto Rendimiento</h3>
                <p>
                  Excelencia académica, movilidad internacional, proyectos
                  independientes y habilidades interpersonales.
                </p>
              </div>
            </article>
            <article className="timeline-item" data-reveal="left" data-reveal-delay="2">
              <span className="timeline-marker">03</span>
              <div>
                <p className="timeline-label">Formación complementaria</p>
                <h3>DELF B1 en francés · Redes Cisco · Desarrollo web y móvil</h3>
                <p>
                  Español nativo, francés B1 y formación práctica en las
                  tecnologías que sostienen este portafolio.
                </p>
              </div>
            </article>
          </div>

          <aside className="experience-card" data-reveal="right">
            <span className="experience-label">Experiencia que suma</span>
            <h3>Gestión operativa y liderazgo</h3>
            <p>
              La experiencia como encargado de tienda fortaleció capacidades
              que también aplico al desarrollo: organización, coordinación de
              personas, atención al cliente y resolución de incidencias.
            </p>
            <ul>
              <li>Administración de recursos y suministros</li>
              <li>Coordinación y supervisión de personal</li>
              <li>Seguimiento de actividades y prioridades</li>
              <li>Resolución de problemas operativos</li>
            </ul>
            <div className="role-cloud" aria-label="Perfiles profesionales objetivo">
              <span>Full stack junior</span>
              <span>Flutter junior</span>
              <span>Automatización e IA</span>
              <span>Junior avanzado</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-copy" data-reveal="left">
          <p className="eyebrow">Siguiente proyecto</p>
          <h2>¿Hay una idea, proceso o problema que podamos convertir en software?</h2>
          <p>
            Estoy listo para escuchar el reto, aprender lo necesario y colaborar
            en una solución digital bien pensada.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:kevin.36137@gmail.com">
              Escribir por correo <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-secondary" href="tel:+529994644181">
              999 464 4181
            </a>
          </div>
        </div>
        <div className="contact-card" data-reveal="right" data-reveal-delay="1">
          <div className="contact-monogram">KV</div>
          <span>Contacto directo</span>
          <a href="mailto:kevin.36137@gmail.com">kevin.36137@gmail.com</a>
          <a href="tel:+529994644181">+52 999 464 4181</a>
          <hr />
          <a className="download-link" href="/downloads/cv-kevin-vargas.pdf" download>
            Descargar CV completo <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          <span className="brand-mark">KV</span>
          <span className="brand-copy">
            <strong>Kevin Aarón Vargas Guzmán</strong>
            <small>Desarrollo · Automatización · IA</small>
          </span>
        </a>
        <p>Construido para mostrar trabajo real y una evolución constante.</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada del proyecto"
          onClick={() => setLightbox(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar imagen ampliada"
          >
            Cerrar ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
