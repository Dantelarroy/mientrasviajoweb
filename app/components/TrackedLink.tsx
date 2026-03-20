"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackWhatsappConversion } from "../lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  trackingLabel?: string;
};

export default function TrackedLink({ children, trackingLabel, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (trackingLabel) trackWhatsappConversion(trackingLabel);
      }}
    >
      {children}
    </a>
  );
}
