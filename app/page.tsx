import Image from "next/image";

const landingData = {
  hero: {
    bannerImage: "/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM.jpeg",
    logoAlt: "Mientras Viajo Logo",
    title: "ESCAPADA VOL I 🍃🧘‍♀️🥂 15 - 17 de Mayo",
    subtitle:
      "Viaje con mujeres, viaje para re-conectar, viaje para disfrutar y trabajar la creatividad. Salir un ratito de la ciudad, y respirar aire.",
  },
  content: {
    sectionTitle: "💛 Experiencia Mientras Viajo",
    paragraphs: [
      "Un finde para salir un ratito de la ciudad y regalarnos un espacio para recolectar con lo simple.",
      "Nos imaginamos despertarnos tempranito en el medio de la naturaleza, movernos un poco, disfrutar un buen desayuno con unos mates o un cafecito.",
      "Durante el dia nos vamos a relajar en la pileta, disfrutaremos de una Gran Experiencia gastronómica para reírnos, y terminar de relajar.",
      "Bonus Track? Cami nos va a regalar una sesión de Art & Wine para trabajar la creatividad desde la intención. Porque la vida es mas linda en colorrrrr!",
      "Y el resto del viaje se trata de charlar, de comer rico, de regalarnos un poco de presencia y conocer un grupo de amigas espectacula",
    ],
  },
  gallery: [
    {
      src: "/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (1).jpeg",
      alt: "Moodboard Escapada Vol I - Gastro, chill, bodega, casa rural",
    },
    {
      src: "/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (2).jpeg",
      alt: "Polaroid: Reconectar y descansar",
    },
    {
      src: "/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (3).jpeg",
      alt: "Collage: Viaje en auto, conocer amigas",
    },
    {
      src: "/assets/WhatsApp Image 2026-03-18 at 12.00.12 AM (1).jpeg",
      alt: "Atardecer con copas de vino",
    },
  ],
};

const carouselImages = [...landingData.gallery, ...landingData.gallery];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      <div className="background-glow" aria-hidden="true" />
      <div className="relative z-10">
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-5 sm:px-6 lg:px-10 lg:pt-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/30 shadow-2xl backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/25" />
          <Image
            src={encodeURI(landingData.hero.bannerImage)}
            alt={landingData.hero.logoAlt}
            width={1600}
            height={400}
            priority
            className="h-[220px] w-full object-cover object-center sm:h-[290px] lg:h-[360px]"
          />

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/80">
              Mientras Viajo
            </p>
            <h1 className="font-display text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {landingData.hero.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-white/85 sm:text-base lg:text-lg">
              {landingData.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-10 sm:px-7">
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          {landingData.content.sectionTitle}
        </h2>
        <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
          {landingData.content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto mb-6 flex max-w-6xl items-end justify-between px-5 sm:px-7 lg:px-10">
          <h3 className="font-display text-2xl text-white sm:text-3xl">Moodboard de la Escapada</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">Autoplay + Loop</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-canvas to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-canvas to-transparent" />

          <div className="carousel-shell">
            <div className="carousel-track" role="list" aria-label="Galería de imágenes">
              {carouselImages.map((image, index) => (
                <article className="carousel-slide" key={`${image.src}-${index}`} role="listitem">
                  <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                    <Image
                      src={encodeURI(image.src)}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <p className="mt-3 text-sm text-white/75">{image.alt}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
