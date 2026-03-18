import Image from "next/image";
import type { Metadata } from "next";
import heroBannerImage from "@/public/assets/WhatsApp_Image_2026-03-18_at_12_00_11_AM.jpeg";
import sunsetPolaroidImage from "@/public/assets/WhatsApp_Image_2026-03-18_at_12_00_12_AM__1_.jpeg";
import camiMaruImage from "@/public/assets/About Us.jpeg";
import FaqAccordion from "./components/FaqAccordion";
import Galeria from "./components/Galeria";
import MoodboardSection from "./components/MoodboardSection";
import TrackedLink from "./components/TrackedLink";
import FadeIn from "./components/FadeIn";
import CountdownTimer from "./components/CountdownTimer";
import StickyNav from "./components/StickyNav";
import ScrollProgress from "./components/ScrollProgress";
import SiteFooter from "./components/SiteFooter";
import {
  EVENT_NAME,
  INSTAGRAM_URL,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
  absoluteUrl,
  createPageMetadata,
  eventFacts,
  faqItems,
  homepageDescription,
  homepageTitle,
} from "./lib/site";

const inclusions = [
  { icon: "🏡", title: "Alojamiento", text: "2 noches en una masía típica catalana, rodeada de naturaleza a 2h de Barcelona" },
  { icon: "🚗", title: "Traslados", text: "Ida y vuelta desde Barcelona + desplazamientos durante la estancia" },
  { icon: "🧘", title: "Yoga & meditación", text: "1 clase de yoga + 2 sesiones de meditación" },
  { icon: "🥗", title: "Comidas", text: "2 desayunos saludables + 4 comidas (almuerzos y cenas)" },
  { icon: "🍷", title: "Experiencia gastronómica", text: "Visita a una bodega + cata de vinos" },
  { icon: "🎨", title: "Taller creativo", text: "Todos los materiales incluidos" },
];

const itinerary = [
  { emoji: "🌙", day: "Viernes 15", desc: "Llegada + bienvenida" },
  { emoji: "☀️", day: "Sábado 16", desc: "Día completo de experiencias" },
  { emoji: "☕", day: "Domingo 17", desc: "Sorpresitas, cierre y despedida" },
];

export async function generateMetadata(): Promise<Metadata> {
  const days = Math.max(
    0,
    Math.ceil((new Date("2026-05-15").getTime() - Date.now()) / 86400000),
  );
  const hour = new Date().getHours();
  const activity =
    hour >= 7 && hour < 12
      ? "desayunando con mates ☀️"
      : hour >= 12 && hour < 18
        ? "en clase de yoga 🧘"
        : hour >= 18 && hour < 22
          ? "brindando en la bodega 🍷"
          : "riendo bajo las estrellas 🌙";

  const dynamicDescription = `En ${days} días podrías estar ${activity} — Escapada Vol I · 15–17 de Mayo`;
  const baseMetadata = createPageMetadata({
    title: homepageTitle,
    description: homepageDescription,
    path: "/",
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      description: dynamicDescription,
    },
    twitter: {
      ...baseMetadata.twitter,
      description: dynamicDescription,
    },
  };
}

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      alternateName: ["Mientras Viajo viajes", "Mientras Viajo escapadas"],
      url: SITE_URL,
      logo: absoluteUrl("/assets/logo.png"),
      sameAs: [INSTAGRAM_URL],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "reservas",
          url: WHATSAPP_URL,
          availableLanguage: ["es"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: `${SITE_NAME} sitio oficial`,
      url: SITE_URL,
      inLanguage: "es",
      mainEntity: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: EVENT_NAME,
      description: homepageDescription,
      startDate: eventFacts.startDate,
      endDate: eventFacts.endDate,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      url: SITE_URL,
      mainEntityOfPage: SITE_URL,
      image: [OG_IMAGE_URL],
      organizer: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: {
        "@type": "Thing",
        name: "Escapada para mujeres",
      },
      audience: {
        "@type": "PeopleAudience",
        audienceType: "Mujeres adultas interesadas en una escapada de fin de semana",
      },
      location: {
        "@type": "Place",
        name: "Casa rural en entorno natural",
        address: {
          "@type": "PostalAddress",
          addressCountry: "ES",
        },
        description: eventFacts.locationSummary,
      },
      isAccessibleForFree: false,
      offers: {
        "@type": "Offer",
        url: WHATSAPP_URL,
        availability: "https://schema.org/LimitedAvailability",
        category: "Reserva por consulta directa",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <ScrollProgress />
        <StickyNav />

        {/* ── HERO ── */}
        <section className="hero-section pb-[clamp(4rem,8vw,7rem)]">
          <div className="hero-header">
            <div className="hero-banner">
              <Image
                src={heroBannerImage}
                alt="Banner Escapada Vol I"
                sizes="100vw"
                placeholder="blur"
                priority
                className="hero-banner-image"
              />
            </div>
            <div className="hero-logo-floating" aria-hidden="true">
              <Image
                src="/assets/logo.png"
                alt="Mientras Viajo"
                width={160}
                height={160}
                style={{ borderRadius: "50%", objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className="container pt-6">
            <div className="hero-content">
              <p className="sticky-note">Próxima escapada</p>
              <h1 className="hero-title mt-4">ESCAPADA VOL&nbsp;I</h1>
              <p className="hero-date not-italic">15 — 17 de Mayo</p>
              <p className="body-large hero-desc mt-5">
                Escapada de fin de semana para mujeres con naturaleza, descanso, creatividad,
                yoga, experiencia gastronómica y momentos para reconectar fuera de la ciudad.
              </p>
              <div className="hero-actions">
                <CountdownTimer />
                <a href="#reservar" className="hero-cta inline-flex items-center rounded-full px-8 py-3.5">
                  Quiero ir →
                </a>
                <p className="hero-availability">• Pocas plazas disponibles</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOODBOARD ── */}
        <MoodboardSection />

        {/* ── SOBRE NOSOTRAS ── */}
        <FadeIn>
          <section className="section bg-[var(--color-bg-alt)]">
            <div className="container experience-grid">
              <div>
                <h2 className="section-title">Detrás de<br />Mientras Viajo</h2>
                <p className="section-subtitle not-italic mt-3" style={{ fontFamily: "var(--font-body)" }}>
                  Detrás de Mientras Viajo estamos nosotras, Cami y Maru.
                </p>
                <div className="mt-6 space-y-4">
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    Dos amigas que se conocieron viajando y que, después de 10 años recorriendo
                    el mundo, decidimos crear un espacio para compartir todo lo que sabemos,
                    lo que nos gusta y también lo que no.
                  </p>
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    Mientras Viajo nació con la idea de ir más allá de la mirada mística y
                    lejana de viajar. Busca ir al reflejo más puro, más valioso.
                  </p>
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    Conectar con lo simple de un viaje, con personas, con paisajes, con lo
                    espontáneo, con aquellas experiencias que no se planifican del todo y al
                    final, son las que más grabadas se quedan.
                  </p>
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    Hoy queremos llevar esa filosofía un paso más allá: crear experiencias
                    donde nuestra comunidad también participe.
                  </p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <article className="polaroid w-full max-w-[380px] rotate-[-1.5deg]">
                  <div className="polaroid-media">
                    <Image
                      src={camiMaruImage}
                      alt="Cami y Maru, fundadoras de Mientras Viajo"
                      fill
                      sizes="(max-width: 1024px) 80vw, 38vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                  <p className="polaroid-caption">Cami &amp; Maru</p>
                </article>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── EXPERIENCIA ── */}
        <FadeIn>
          <section className="section">
            <div className="container experience-grid">
              <div>
                <h2 className="section-title">💛 La experiencia</h2>
                <p className="section-subtitle not-italic mt-3" style={{ fontFamily: "var(--font-body)" }}>
                  lo mágico de viajar está en lo más real
                </p>
                <div className="mt-6 space-y-4">
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    ¿Te imaginas un fin de semana donde todo el acelero que llevamos a diario
                    se pone en pausa?
                  </p>
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    De repente el ruido baja, el cuerpo se mueve con más consciencia, la mente
                    se calma y todo fluye, sin prisa.
                  </p>
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    Imagínate un lugar rodeado de naturaleza, lejos de la rutina, donde
                    conectar con otras mujeres que, al igual que nosotras, tienen ganas de
                    vivir algo diferente.
                  </p>
                  <p className="text-[var(--color-text-secondary)] leading-7">
                    Bueno, de eso se trata esta experiencia que hemos creado.
                  </p>
                </div>
                <div className="include-grid mt-7">
                  {inclusions.map(({ icon, title, text }) => (
                    <article key={title} className="include-card">
                      <div className="include-icon" aria-hidden="true">{icon}</div>
                      <h3 className="include-title">{title}</h3>
                      <p className="include-text">{text}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <article className="polaroid w-full max-w-[420px] rotate-[2deg]">
                  <div className="polaroid-media">
                    <Image
                      src={sunsetPolaroidImage}
                      alt="Atardecer con copas"
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                  <p className="polaroid-caption">Atardecer y brindis entre amigas</p>
                </article>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── PARA QUIÉN ES ── */}
        <FadeIn>
          <section className="section bg-[var(--color-bg-alt)]">
            <div className="container">
              <div className="mx-auto max-w-[640px]">
                <h2 className="section-title text-center">Una pausa de las que<br />de verdad hacen falta.</h2>
                <p className="section-subtitle not-italic mt-3 text-center" style={{ fontFamily: "var(--font-body)" }}>
                  Este viaje es para ti si…
                </p>
                <ul className="mt-8 space-y-3" role="list">
                  {[
                    "Sientes que necesitas una pausa de la rutina",
                    "Tienes ganas de salir de tu zona de confort",
                    "Disfrutas de los planes creativos",
                    "Te gusta la gastronomía y los pequeños rituales",
                    "Te ilusiona conocer gente nueva",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="shrink-0 font-bold leading-7 text-[var(--color-coral-dark)]"
                        aria-hidden="true"
                      >
                        –
                      </span>
                      <span className="text-[var(--color-text-secondary)] leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[var(--color-text-secondary)] leading-7">
                  No necesitas experiencia previa en absolutamente nada.{" "}
                  Lo único que cuenta es tener ganas de disfrutar, compartir y vivir un fin
                  de semana amable contigo misma.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── GALERÍA ── */}
        <Galeria />

        {/* ── TIMELINE ── */}
        <FadeIn>
          <section className="section">
            <div className="container">
              <h2 className="section-title text-center">Los 3 días</h2>
              <p className="section-subtitle not-italic mt-3 text-center" style={{ fontFamily: "var(--font-body)" }}>
                Tres días donde el tiempo pasa diferente.
              </p>
              <div className="timeline mt-10">
                {itinerary.map((item, i) => (
                  <FadeIn key={item.day} delay={i * 0.13}>
                    <article className="timeline-item">
                      <div className="timeline-dot">{item.emoji}</div>
                      <div className="timeline-card">
                        <h3 className="m-0 text-lg font-semibold text-[var(--color-text-primary)]">{item.day}</h3>
                        <p className="m-0 mt-1 text-[var(--color-text-secondary)]">{item.desc}</p>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
              <p className="mt-8 text-center text-[var(--color-text-secondary)] leading-7">
                El itinerario detallado se compartira al confirmar tu lugar :)
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ── FAQ ── */}
        <FadeIn>
          <section className="section bg-[var(--color-bg-alt)]">
            <div className="container max-w-[720px]">
              <h2 className="section-title text-center">Preguntas frecuentes</h2>
              <p className="section-subtitle not-italic mt-3 text-center" style={{ fontFamily: "var(--font-body)" }}>
                Todo lo que querés saber antes de reservar.
              </p>
              <div className="mt-7">
                <FaqAccordion items={faqItems} />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── CTA FINAL ── */}
        <FadeIn>
          <section id="reservar" className="section bg-[var(--color-coral-dark)] text-white torn-top">
            <div className="container relative text-center">
              <div className="absolute right-0 top-[-1rem] hidden md:block">
                <Image
                  src="/assets/logo.png"
                  alt="Mientras Viajo"
                  width={120}
                  height={120}
                  style={{ borderRadius: "50%", objectFit: "contain" }}
                />
              </div>
              <h2 className="font-titles text-[clamp(3rem,8vw,6rem)] leading-[0.9] m-0">¿Te sumás?</h2>
              <p className="font-body mt-3 text-xl text-white/85">
                Cupos muy limitados. Reservá tu lugar ahora.
              </p>
              <TrackedLink
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                trackingLabel="Escapada Vol I - CTA Final"
                className="cta-main-btn cta-main-btn--wa mt-8"
                style={{ width: "fit-content", maxWidth: "fit-content", padding: "10px 18px" }}
              >
                <span>Reservar</span>
              </TrackedLink>
            </div>
          </section>
        </FadeIn>
      </main>
      <SiteFooter />
    </>
  );
}
