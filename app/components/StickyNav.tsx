"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trackWhatsappConversion } from "../lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/34678728944?text=Hola!%20Me%20interesa%20la%20Escapada%20Vol%20I%20%F0%9F%8D%83";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 480);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      className="sticky-nav"
      initial={{ y: -72, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -72, opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
      aria-hidden={!visible}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="sticky-nav-inner container">
        <Image
          src="/assets/logo.png"
          alt="Mientras Viajo"
          width={34}
          height={34}
          className="sticky-nav-logo"
        />
        <span className="sticky-nav-title">Escapada Vol I</span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-nav-cta"
          onClick={() => trackWhatsappConversion("Escapada Vol I - StickyNav")}
          tabIndex={visible ? 0 : -1}
        >
          Reservar
        </a>
      </div>
    </motion.nav>
  );
}
