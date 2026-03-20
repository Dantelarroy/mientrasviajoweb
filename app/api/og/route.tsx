import { ImageResponse } from "@vercel/og";
import { BG_IMAGE } from "./bgImage";

export const runtime = "edge";

const TARGET_DATE = new Date("2026-05-15T00:00:00");
function getPhraseByHour(hour: number): string {
  if (hour >= 7 && hour <= 11) {
    return "podrías estar desayunando con mates ☀️";
  }

  if (hour >= 12 && hour <= 17) {
    return "podrías estar en clase de yoga en la naturaleza 🧘";
  }

  if (hour >= 18 && hour <= 21) {
    return "podrías estar brindando en la bodega 🍷";
  }

  return "podrías estar riendo bajo las estrellas 🌙";
}

function getDaysUntilTarget(now: Date): number {
  const diff = TARGET_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export async function GET() {
  const now = new Date();
  const hour = now.getHours();
  const daysUntil = getDaysUntilTarget(now);
  const phrase = getPhraseByHour(hour);

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          backgroundColor: "#F4846A",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={BG_IMAGE}
          alt="Escapada Vol I — Fondo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.08) 46%, rgba(0,0,0,0.24) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "26px",
            left: "26px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "999px",
              padding: "10px 18px",
              background: "rgba(0,0,0,0.62)",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#FFFFFF",
                fontSize: "30px",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              En {daysUntil} días, a esta hora
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderRadius: "18px",
              padding: "12px 16px",
              background: "rgba(0,0,0,0.62)",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#FFFFFF",
                fontSize: "52px",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                lineHeight: 1.04,
                textWrap: "balance",
              }}
            >
              {phrase}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "26px",
            right: "26px",
            bottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              padding: "10px 16px",
              fontSize: "38px",
              color: "#1A1A18",
              fontWeight: 800,
              letterSpacing: "-0.01em",
            }}
          >
            Escapada Vol I · 15 Mayo
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "#25D366",
              color: "#FFFFFF",
              fontSize: "34px",
              fontWeight: 700,
              padding: "10px 24px",
            }}
          >
            Reservar 🍃
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    },
  );
  return image;
}
