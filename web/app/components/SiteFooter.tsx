import Link from "next/link";
import TrackedLink from "./TrackedLink";
import { INSTAGRAM_URL, WHATSAPP_URL, supportLinks } from "../lib/site";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-8">
      <div className="container flex flex-col gap-5 text-sm text-[var(--color-text-muted)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© {currentYear} Mientras Viajo</p>
          <div className="flex items-center gap-5">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-social text-[var(--color-coral)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
            <TrackedLink
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              trackingLabel="Footer WhatsApp"
              className="footer-link footer-social text-[var(--color-coral)]"
            >
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M19.11 17.42c-.27-.14-1.61-.8-1.86-.9-.25-.09-.43-.14-.61.14-.18.27-.7.89-.86 1.07-.16.18-.31.2-.58.07-.27-.14-1.13-.41-2.15-1.31-.79-.7-1.33-1.56-1.48-1.82-.16-.27-.02-.41.12-.55.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.47.07-.72.34s-.95.93-.95 2.28.97 2.66 1.11 2.85c.14.18 1.9 2.9 4.59 4.06.64.28 1.14.45 1.53.58.64.2 1.22.17 1.68.1.51-.08 1.61-.66 1.84-1.3.23-.64.23-1.19.16-1.3-.06-.11-.25-.18-.52-.32z" />
                <path d="M16.03 3.2C8.88 3.2 3.1 8.98 3.1 16.13c0 2.3.6 4.54 1.74 6.52L3 29l6.52-1.7a12.89 12.89 0 0 0 6.51 1.78h.01c7.15 0 12.93-5.78 12.93-12.93S23.18 3.2 16.03 3.2zm0 23.7h-.01c-2.02 0-4-.55-5.72-1.6l-.41-.24-3.87 1.01 1.03-3.78-.27-.43a10.73 10.73 0 0 1-1.65-5.73c0-5.95 4.84-10.79 10.8-10.79 2.88 0 5.58 1.12 7.62 3.16a10.7 10.7 0 0 1 3.16 7.63c0 5.95-4.84 10.78-10.78 10.78z" />
              </svg>
              WhatsApp
            </TrackedLink>
          </div>
        </div>
        <nav
          aria-label="Enlaces informativos"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[var(--color-text-secondary)]"
        >
          <Link href="/" className="hover:text-[var(--color-coral-dark)]">
            Inicio
          </Link>
          {supportLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--color-coral-dark)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
