"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className="faq-indicator">{isOpen ? "–" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="faq-content"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="faq-answer">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
