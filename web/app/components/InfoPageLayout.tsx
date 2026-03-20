import Link from "next/link";
import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";

type InfoPageLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export default function InfoPageLayout({
  eyebrow,
  title,
  intro,
  children,
}: InfoPageLayoutProps) {
  return (
    <main>
      <section className="section">
        <div className="container max-w-[860px]">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-coral-dark)]"
          >
            ← Volver a la escapada
          </Link>
          <p className="label mt-8">{eyebrow}</p>
          <h1 className="section-title mt-2">{title}</h1>
          <p className="body-large mt-5 max-w-[760px]">{intro}</p>
          <div className="mt-10 space-y-8 text-[1.05rem] leading-8 text-[var(--color-text-secondary)]">
            {children}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
