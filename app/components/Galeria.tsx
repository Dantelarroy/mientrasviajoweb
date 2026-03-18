"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  { src: "/assets/sunset_copas.jpeg", alt: "Atardecer y buenas copas" },
  { src: "/assets/slide_0.jpeg", alt: "Gastro chill bodega casa rural" },
  { src: "/assets/polaroid_yoga.jpeg", alt: "Re-conectar y descansar" },
  { src: "/assets/collage_viaje.jpeg", alt: "Conocer amigas viaje en auto" },
  { src: "/assets/WhatsApp Image 2026-03-18 at 12.00.12 AM.jpeg", alt: "Paisaje de escapada" },
];

export default function Galeria() {
  const plugins = useMemo(() => [Autoplay({ delay: 3500, stopOnInteraction: true })], []);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false, slidesToScroll: 1 },
    plugins,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.plugins().autoplay?.play();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section style={{ background: "var(--color-bg-alt)", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-titles)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-coral-dark)",
            marginBottom: "0.5rem",
          }}
        >
          Las fotos
        </p>
        <h2
          style={{
            fontFamily: "var(--font-titles)",
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 900,
            color: "var(--color-text-primary)",
            marginBottom: "2.5rem",
          }}
        >
          Momentos
        </h2>
      </div>

      <div ref={emblaRef} style={{ overflow: "hidden", cursor: "grab" }}>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            userSelect: "none",
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="embla__slide">
              <img
                src={slide.src}
                alt={slide.alt}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "1.5rem" }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--color-coral)",
              border: "none",
              cursor: "pointer",
              opacity: selectedIndex === i ? 1 : 0.4,
            }}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "1rem" }}>
        <button
          type="button"
          onClick={scrollPrev}
          style={{
            border: "1px solid var(--color-border-strong)",
            background: "transparent",
            borderRadius: "9999px",
            padding: "0.4rem 0.85rem",
            fontFamily: "var(--font-titles)",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <button
          type="button"
          onClick={scrollNext}
          style={{
            border: "1px solid var(--color-border-strong)",
            background: "transparent",
            borderRadius: "9999px",
            padding: "0.4rem 0.85rem",
            fontFamily: "var(--font-titles)",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>
    </section>
  );
}
