import type { Metadata } from "next";
import InfoPageLayout from "../components/InfoPageLayout";
import { WHATSAPP_URL, createPageMetadata, eventFacts } from "../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Reservas | Escapada Vol I | Mientras Viajo",
  description:
    "Como reservar tu lugar en Escapada Vol I, que informacion recibes por WhatsApp y que pasos siguen despues de la consulta inicial.",
  path: "/reservas",
});

export default function ReservationsPage() {
  return (
    <InfoPageLayout
      eyebrow="Reserva"
      title="Como reservar"
      intro="La reserva se gestiona por WhatsApp para poder confirmar disponibilidad real, resolver dudas y compartir el detalle practico de la experiencia."
    >
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Paso a paso</h2>
        <ol className="list-decimal pl-6">
          <li>Escribis por WhatsApp para consultar disponibilidad.</li>
          <li>Recibis la informacion del evento, el detalle practico y los siguientes pasos.</li>
          <li>Si decides sumarte, se confirma tu plaza segun cupo disponible.</li>
        </ol>
      </section>
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Que vas a recibir</h2>
        <ul className="list-disc pl-6">
          <li>Fechas confirmadas: {eventFacts.dateLabel}.</li>
          <li>Resumen de lo que incluye la escapada.</li>
          <li>Indicaciones practicas para prepararte.</li>
          <li>Coordinacion posterior para llegar y organizar el viaje.</li>
        </ul>
      </section>
      <section>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-[var(--color-coral-dark)] px-6 py-3 font-titles font-bold text-white no-underline shadow-[0_4px_14px_rgba(212,84,26,0.35)]"
        >
          Reservar por WhatsApp
        </a>
      </section>
    </InfoPageLayout>
  );
}
