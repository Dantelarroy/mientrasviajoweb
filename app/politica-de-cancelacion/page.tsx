import type { Metadata } from "next";
import InfoPageLayout from "../components/InfoPageLayout";
import { createPageMetadata } from "../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Politica de cancelacion | Mientras Viajo",
  description:
    "Condiciones generales para cambios, cancelaciones y consultas sobre la reserva de la escapada Mientras Viajo.",
  path: "/politica-de-cancelacion",
});

export default function CancellationPolicyPage() {
  return (
    <InfoPageLayout
      eyebrow="Condiciones"
      title="Politica de cancelacion"
      intro="La disponibilidad de plazas es limitada. Por eso cada cancelacion o cambio se revisa de manera individual segun el momento de la reserva y las opciones reales para cubrir esa plaza."
    >
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Como funciona</h2>
        <ul className="list-disc pl-6">
          <li>Las consultas de cancelacion se gestionan por WhatsApp.</li>
          <li>Cada caso se revisa segun la fecha de aviso y el estado de la reserva.</li>
          <li>Si existe posibilidad de reasignar la plaza, se comunica la alternativa disponible.</li>
          <li>No se promete una solucion automatica sin revisar el caso concreto.</li>
        </ul>
      </section>
      <section>
        <h2 className="font-titles text-2xl text-[var(--color-text-primary)]">Recomendacion</h2>
        <p>
          Si estas evaluando reservar, te recomendamos consultar cualquier duda antes de confirmar.
          Y si surge un imprevisto, cuanto antes escribas, mas opciones hay para revisar una salida.
        </p>
      </section>
    </InfoPageLayout>
  );
}
