import type { Metadata } from "next";
import InfoPageLayout from "../components/InfoPageLayout";
import {
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
  createPageMetadata,
} from "../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Sobre ${SITE_NAME} | Escapadas para mujeres`,
  description:
    "Conoce quien esta detras de Mientras Viajo, que tipo de experiencias organiza y como contactar para resolver dudas sobre la escapada.",
  path: "/sobre-mientras-viajo",
});

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [INSTAGRAM_URL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservas",
        url: WHATSAPP_URL,
        availableLanguage: ["es"],
      },
    ],
  };

  return (
    <InfoPageLayout
      eyebrow="Sobre la marca"
      title={`Sobre ${SITE_NAME}`}
      intro="Mientras Viajo organiza experiencias de fin de semana pensadas para salir de la rutina, conectar con la naturaleza y vivir momentos compartidos con otras mujeres."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Que hacemos</h2>
        <p>
          Diseñamos escapadas chicas, cuidadas y con foco en la experiencia humana. Priorizamos
          el descanso, la creatividad, la conversacion, la comida rica y el tiempo real fuera del
          ritmo de la ciudad.
        </p>
      </section>
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Para quien es</h2>
        <p>
          Para mujeres que buscan una escapada de fin de semana en un entorno natural, con una
          propuesta relajada y grupal. No hace falta experiencia previa en yoga, arte o dinamicas
          creativas.
        </p>
      </section>
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Como contactar</h2>
        <ul className="list-disc pl-6">
          <li>
            WhatsApp para reservas y consultas:{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-coral-dark)]">
              abrir chat
            </a>
          </li>
          <li>
            Instagram oficial:{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-coral-dark)]">
              @mientrasviajo_
            </a>
          </li>
        </ul>
      </section>
    </InfoPageLayout>
  );
}
