import Image from "next/image";
import CTASticky from "./components/CTASticky";
import FaqAccordion from "./components/FaqAccordion";
import Galeria from "./components/Galeria";
import MoodboardSection from "./components/MoodboardSection";

const WHATSAPP_URL =
  "https://wa.me/34678728944?text=Hola!%20Me%20interesa%20la%20Escapada%20Vol%20I%20%F0%9F%8D%83";

const experienceParagraphs = [
  "Un finde para salir un ratito de la ciudad y regalarnos un espacio para recolectar con lo simple.",
  "Nos imaginamos despertarnos tempranito en el medio de la naturaleza, movernos un poco, disfrutar un buen desayuno con unos mates o un cafecito.",
  "Durante el dia nos vamos a relajar en la pileta, disfrutaremos de una Gran Experiencia gastronómica para reírnos, y terminar de relajar.",
  "Bonus Track? Cami nos va a regalar una sesión de Art & Wine para trabajar la creatividad desde la intención. Porque la vida es mas linda en colorrrrr!",
  "Y el resto del viaje se trata de charlar, de comer rico, de regalarnos un poco de presencia y conocer un grupo de amigas espectacula",
];

const faqItems = [
  {
    q: "¿Qué incluye la escapada?",
    a: "Próximamente — escribinos por WhatsApp para más info 💛",
  },
  {
    q: "¿Cómo es el transporte?",
    a: "Próximamente — escribinos por WhatsApp para más info 💛",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Próximamente — escribinos por WhatsApp para más info 💛",
  },
  {
    q: "¿Cuántos cupos hay disponibles?",
    a: "Próximamente — escribinos por WhatsApp para más info 💛",
  },
];

const itinerary = [
  { emoji: "🌙", day: "Viernes 15", desc: "Llegada + bienvenida" },
  { emoji: "☀️", day: "Sábado 16", desc: "Día completo de experiencias" },
  { emoji: "☕", day: "Domingo 17", desc: "Cierre y vuelta" },
];

export default function Home() {
  return (
    <main>
      <section className="pb-[clamp(4rem,8vw,7rem)]">
        <div className="hero-header">
          <div className="hero-banner">
            <Image
              src="/assets/WhatsApp_Image_2026-03-18_at_12_00_11_AM.jpeg"
              alt="Banner Escapada Vol I"
              width={1600}
              height={400}
              priority
              className="hero-banner-image h-[42vh] min-h-[260px] w-full object-cover"
            />
          </div>
        </div>

        <div className="container pt-6">
          <p className="font-hand text-2xl text-[var(--color-coral-dark)]">Mientras Viajo</p>

          <div className="mt-8 max-w-4xl">
            <p className="sticky-note">Escapada Vol I</p>
            <h1 className="hero-title mt-4">ESCAPADA VOL I</h1>
            <p className="font-titles mt-2 text-3xl text-[var(--color-coral-dark)]">
              15 — 17 de Mayo
            </p>
            <p className="body-large mt-5">
              Viaje con mujeres, viaje para re-conectar, viaje para disfrutar y trabajar la creatividad.
              Salir un ratito de la ciudad, y respirar aire.
            </p>
            <a
              href="#reservar"
              className="mt-8 inline-flex items-center rounded-full bg-[var(--color-coral)] px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_rgba(212,84,26,0.35)] transition hover:scale-[1.02] hover:bg-[var(--color-coral-dark)]"
            >
              Quiero ir →
            </a>
          </div>
        </div>
      </section>

      <MoodboardSection />

      <section className="section">
        <div className="container experience-grid">
          <div>
            <p className="label">Experiencia</p>
            <h2 className="section-title">💛 Experiencia Mientras Viajo</h2>
            <p className="section-subtitle mt-3">Salir de la ciudad para reconectar con lo simple.</p>
            <div className="mt-6 space-y-4">
              {experienceParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-[var(--color-text-secondary)] leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <article className="polaroid w-full max-w-[420px] rotate-[2deg]">
              <div className="polaroid-media">
                <Image
                  src="/assets/WhatsApp_Image_2026-03-18_at_12_00_12_AM__1_.jpeg"
                  alt="Atardecer con copas"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="polaroid-caption">Atardecer y brindis entre amigas</p>
            </article>
          </div>
        </div>
      </section>

      <Galeria />

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Los 3 días</h2>
          <div className="timeline mt-10">
            {itinerary.map((item) => (
              <article className="timeline-item" key={item.day}>
                <div className="timeline-dot">{item.emoji}</div>
                <div className="timeline-card">
                  <h3 className="m-0 text-lg font-semibold text-[var(--color-text-primary)]">{item.day}</h3>
                  <p className="m-0 mt-1 text-[var(--color-text-secondary)]">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="font-display mt-8 text-center text-lg italic text-[var(--color-text-muted)]">
            El programa detallado se comparte al confirmar tu lugar 🌿
          </p>
        </div>
      </section>

      <section className="section bg-[var(--color-bg-alt)]">
        <div className="container max-w-[720px]">
          <h2 className="section-title">Preguntas frecuentes</h2>
          <div className="mt-7">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section id="reservar" className="section bg-[var(--color-coral)] text-white torn-top">
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
          <p className="font-display mt-3 text-xl italic text-white/85">
            Cupos muy limitados. Reservá tu lugar ahora.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-base no-underline transition hover:scale-[1.02] hover:bg-[var(--color-bg)]"
            style={{
              background: "#FFFFFF",
              color: "#D4541A",
              fontFamily: "var(--font-titles)",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            Reservar mi lugar → WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-8">
        <div className="container flex flex-col gap-3 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© 2025 Mientras Viajo</p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/mientrasviajo_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-coral)]"
            >
              Instagram
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-coral)]">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      <CTASticky />
    </main>
  );
}
