"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    src: "/assets/moodboard.jpeg",
    alt: "Moodboard de la escapada con experiencias destacadas",
    width: 1280,
    height: 1600,
  },
  {
    src: "/assets/polaroid_yoga.jpeg",
    alt: "Polaroid de reconexión y descanso durante el viaje",
    width: 1280,
    height: 1600,
  },
  {
    src: "/assets/collage_viaje.jpeg",
    alt: "Collage de amigas y viaje compartido en ruta",
    width: 1280,
    height: 1600,
  },
  {
    src: "/assets/sunset_copas.jpeg",
    alt: "Composición visual del atardecer y espíritu de escapada",
    width: 1280,
    height: 1600,
  },
];

export default function Galeria() {
  const plugins = useMemo(() => [Autoplay({ delay: 3500, stopOnInteraction: true })], []);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: false, slidesToScroll: 1 },
    plugins,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.plugins().autoplay?.play();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % slides.length : 0);
      if (e.key === "ArrowLeft") setLightbox(i => i !== null ? (i - 1 + slides.length) % slides.length : 0);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <section className="galeria-section">
        <div className="galeria-heading text-center">
          <h2 className="section-title">Momentos</h2>
          <p className="section-subtitle not-italic mt-3" style={{ fontFamily: "var(--font-body)" }}>
            Una selección de momentos que lo dicen todo.
          </p>
        </div>

        <div ref={emblaRef} className="galeria-embla">
          <div className="galeria-track">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="embla__slide"
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setLightbox(i)}
                aria-label={`Ver imagen: ${slide.alt}`}
                style={{ cursor: "zoom-in" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  sizes="(max-width: 767px) 85vw, (max-width: 1023px) 50vw, 33vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="galeria-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="galeria-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="galeria-dot"
              data-active={selectedIndex === i ? "true" : "false"}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="galeria-controls">
          <button type="button" onClick={scrollPrev} className="galeria-control-btn">←</button>
          <button type="button" onClick={scrollNext} className="galeria-control-btn">→</button>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox-img-wrap"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={slides[lightbox].src}
                alt={slides[lightbox].alt}
                width={slides[lightbox].width}
                height={slides[lightbox].height}
                className="lightbox-img"
                priority
              />
            </motion.div>

            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + slides.length) % slides.length : 0); }}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              className="lightbox-nav lightbox-next"
              onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % slides.length : 0); }}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
