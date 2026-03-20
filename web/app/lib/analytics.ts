export function trackWhatsappConversion(label: string) {
  if (typeof window === "undefined") return;

  const payload = {
    event_category: "CTA",
    event_label: label,
  };

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "conversion_whatsapp_click", payload);
  }

  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({
      event: "conversion_whatsapp_click",
      ...payload,
    });
  }
}
