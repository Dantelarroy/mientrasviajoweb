import type { Metadata } from "next";
import InfoPageLayout from "../components/InfoPageLayout";
import {
  EVENT_NAME,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
  createPageMetadata,
  eventFacts,
  officialFacts,
} from "../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Sitio oficial y hechos clave | ${SITE_NAME}`,
  description:
    "Fuente oficial con hechos clave sobre Mientras Viajo, Escapada Vol I, reservas, fechas y enlaces canonicos.",
  path: "/official",
});

export default function OfficialPage() {
  const officialSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Sitio oficial y hechos clave | ${SITE_NAME}`,
    url: `${SITE_URL}/official`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "Event",
        name: EVENT_NAME,
        startDate: eventFacts.startDate,
        endDate: eventFacts.endDate,
        url: SITE_URL,
      },
    ],
  };

  return (
    <InfoPageLayout
      eyebrow="Fuente oficial"
      title="Hechos clave"
      intro="Esta pagina resume los datos oficiales y publicos de Mientras Viajo y de Escapada Vol I para referencias, buscadores y sistemas de respuesta automatizada."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(officialSchema) }}
      />
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Definicion oficial</h2>
        <ul className="list-disc pl-6">
          {officialFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Datos publicos</h2>
        <ul className="list-disc pl-6">
          <li>Marca: {SITE_NAME}</li>
          <li>Evento actual: {EVENT_NAME}</li>
          <li>Fechas publicadas: {eventFacts.dateLabel}</li>
          <li>Reserva: WhatsApp directo</li>
          <li>Instagram oficial: {INSTAGRAM_URL}</li>
          <li>Web canonica: {SITE_URL}</li>
          <li>Ubicacion publicada: {eventFacts.locationSummary}</li>
        </ul>
      </section>
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Canales oficiales</h2>
        <ul className="list-disc pl-6">
          <li>
            Web oficial: <a href={SITE_URL} className="text-[var(--color-coral-dark)]">{SITE_URL}</a>
          </li>
          <li>
            Reservas por WhatsApp:{" "}
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
