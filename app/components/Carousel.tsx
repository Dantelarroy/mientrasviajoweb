"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export type CarouselSlide = {
  src: string;
  caption: string;
  rotation: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
};

export default function Carousel({ slides }: CarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplay.current],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    // Ensure autoplay starts and resumes after user interactions.
    autoplay.current.play();
    const onPointerDown = () => autoplay.current.stop();
    const onPointerUp = () => autoplay.current.play();
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.src}>
              <article className="polaroid" style={{ rotate: slide.rotation }}>
                <div className="polaroid-media">
                  <Image
                    src={slide.src}
                    alt={slide.caption}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <p className="polaroid-caption">{slide.caption}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots" aria-label="Paginación de galería">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            className={`embla__dot ${selectedIndex === index ? "is-active" : ""}`}
            aria-label={`Ir al slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
