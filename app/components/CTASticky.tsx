"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/34678728944?text=Hola!%20Me%20interesa%20la%20Escapada%20Vol%20I%20%F0%9F%8D%83";

export default function CTASticky() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const variants = useMemo(
    () => ({
      hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 },
      visible: reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 },
    }),
    [reduceMotion],
  );

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-sticky"
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: "easeOut" }}
      aria-label="Reservar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.11 17.42c-.27-.14-1.61-.8-1.86-.9-.25-.09-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.31.2-.58.07-.27-.14-1.13-.41-2.15-1.31-.79-.7-1.33-1.56-1.48-1.82-.16-.27-.02-.41.12-.55.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.47.07-.72.34s-.95.93-.95 2.28.97 2.66 1.11 2.85c.14.18 1.9 2.9 4.59 4.06.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.61-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.06-.11-.25-.18-.52-.32z"
        />
        <path
          fill="currentColor"
          d="M16.03 3.2C8.88 3.2 3.1 8.98 3.1 16.13c0 2.3.6 4.54 1.74 6.52L3 29l6.52-1.7a12.89 12.89 0 0 0 6.51 1.78h.01c7.15 0 12.93-5.78 12.93-12.93S23.18 3.2 16.03 3.2zm0 23.7h-.01c-2.02 0-4-.55-5.72-1.6l-.41-.24-3.87 1.01 1.03-3.78-.27-.43a10.73 10.73 0 0 1-1.65-5.73c0-5.95 4.84-10.79 10.8-10.79 2.88 0 5.58 1.12 7.62 3.16a10.7 10.7 0 0 1 3.16 7.63c0 5.95-4.84 10.78-10.78 10.78z"
        />
      </svg>
      <span>Reservar</span>
    </motion.a>
  );
}
