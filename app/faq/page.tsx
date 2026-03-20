import type { Metadata } from "next";
import FaqAccordion from "../components/FaqAccordion";
import InfoPageLayout from "../components/InfoPageLayout";
import { faqItems, createPageMetadata } from "../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ | Escapada Vol I | Mientras Viajo",
  description:
    "Preguntas frecuentes sobre la escapada: que incluye, como se reserva, como se coordina el transporte y que pasa si necesitas cancelar.",
  path: "/faq",
});

export default function FaqPage() {
  const faqSchema = {
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
  };

  return (
    <InfoPageLayout
      eyebrow="Informacion util"
      title="Preguntas frecuentes"
      intro="Esta pagina resume las dudas mas habituales antes de reservar. Si necesitas una respuesta puntual, tambien podes escribir por WhatsApp."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-6 shadow-[0_16px_40px_var(--color-shadow)]">
        <FaqAccordion items={faqItems} />
      </div>
    </InfoPageLayout>
  );
}
