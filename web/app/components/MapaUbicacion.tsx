"use client";

import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import type { GeoJSONSource } from "maplibre-gl";

const BCN  = { lng: 2.1734, lat: 41.3851 };
const GERB = { lng: 0.9367, lat: 41.9589 };
const ROUTE_STEPS = 90;
const STEP_MS     = 28; // ~2.5s total

function buildRoute(steps: number): [number, number][] {
  const midLng = (BCN.lng + GERB.lng) / 2;
  const midLat = (BCN.lat + GERB.lat) / 2 + 0.32;
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push([
      (1 - t) ** 2 * BCN.lng + 2 * (1 - t) * t * midLng + t ** 2 * GERB.lng,
      (1 - t) ** 2 * BCN.lat + 2 * (1 - t) * t * midLat + t ** 2 * GERB.lat,
    ]);
  }
  return pts;
}

const ROUTE = buildRoute(ROUTE_STEPS);

function makeDestEl(): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText = "position:relative;width:20px;height:20px;cursor:pointer;";
  const pulse = document.createElement("div");
  pulse.style.cssText =
    "position:absolute;inset:-8px;border-radius:50%;background:rgba(192,80,42,0.22);animation:mapa-pulse 2s ease-out infinite;";
  const dot = document.createElement("div");
  dot.style.cssText =
    "position:absolute;inset:0;border-radius:50%;background:#c0502a;border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);";
  el.appendChild(pulse);
  el.appendChild(dot);
  return el;
}

function makeTravelerEl(): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText = "width:13px;height:13px;border-radius:50%;background:#fff;border:2.5px solid #c0502a;box-shadow:0 2px 8px rgba(0,0,0,0.22);";
  return el;
}

export default function MapaUbicacion() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<MapLibreMap | null>(null);
  const destRef       = useRef<Marker | null>(null);
  const travelerRef   = useRef<Marker | null>(null);
  const intervalRef   = useRef<ReturnType<typeof setInterval>  | null>(null);
  const timeoutRef    = useRef<ReturnType<typeof setTimeout>   | null>(null);
  const resizeObsRef  = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const container = containerRef.current;

    const cleanup = () => {
      if (intervalRef.current)  clearInterval(intervalRef.current);
      if (timeoutRef.current)   clearTimeout(timeoutRef.current);
      resizeObsRef.current?.disconnect();
      travelerRef.current?.remove();
      destRef.current?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };

    const doInit = () => {
      if (!container || mapRef.current) return;

      import("maplibre-gl").then((ml) => {
        if (!container || mapRef.current) return;
        const maplibregl = ml.default;

        const map = new maplibregl.Map({
          container,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center: [1.55, 41.67],
          zoom: 8.2,
          minZoom: 6,
          maxZoom: 15,
          attributionControl: false,
          dragRotate: false,
        });

        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
        map.scrollZoom.disable();
        mapRef.current = map;

        // Detecta cambios de tamaño del contenedor y recalcula el canvas GL
        resizeObsRef.current = new ResizeObserver(() => {
          mapRef.current?.resize();
        });
        resizeObsRef.current.observe(container);

        // ── Marcador destino (DOM) ───────────────────────────
        const destEl = makeDestEl();
        destRef.current = new maplibregl.Marker({ element: destEl, anchor: "center" })
          .setLngLat([GERB.lng, GERB.lat])
          .addTo(map);

        const popup = new maplibregl.Popup({
          offset: 20, closeButton: false, className: "mapa-popup",
        }).setHTML(`<strong>Torre Graells · Gerb</strong><span>Lleida · 2h de Barcelona</span>`);
        destEl.addEventListener("click", () =>
          popup.setLngLat([GERB.lng, GERB.lat]).addTo(map)
        );

        // ── Marcador viajero (DOM) ──
        travelerRef.current = new maplibregl.Marker({ element: makeTravelerEl(), anchor: "center" })
          .setLngLat([BCN.lng, BCN.lat])
          .addTo(map);

        map.on("load", () => {
          // El contenedor ya tiene tamaño real — sincronizar canvas
          map.resize();

          // Línea de ruta (GL layer)
          map.addSource("route", {
            type: "geojson",
            data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } },
          });
          map.addLayer({
            id: "route-shadow",
            type: "line",
            source: "route",
            layout: { "line-cap": "round", "line-join": "round" },
            paint: { "line-color": "#c0502a", "line-width": 7, "line-opacity": 0.1, "line-blur": 5 },
          });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-cap": "round", "line-join": "round" },
            paint: { "line-color": "#c0502a", "line-width": 2.5, "line-opacity": 0.9, "line-dasharray": [2, 3] },
          });

          // Cámara arranca en Barcelona y sigue el recorrido hasta Gerb
          map.jumpTo({ center: [BCN.lng, BCN.lat], zoom: 8.5 });
          map.easeTo({
            center: [GERB.lng, GERB.lat],
            zoom: 8.5,
            duration: ROUTE_STEPS * STEP_MS,
            essential: true,
          });

          let step = 0;
          intervalRef.current = setInterval(() => {
            if (!mapRef.current) { clearInterval(intervalRef.current!); return; }

            step++;
            const drawn = ROUTE.slice(0, step + 1);
            (map.getSource("route") as GeoJSONSource).setData({
              type: "Feature", properties: {},
              geometry: { type: "LineString", coordinates: drawn },
            });

            const pos = ROUTE[Math.min(step, ROUTE_STEPS)];
            travelerRef.current?.setLngLat(pos);

            if (step >= ROUTE_STEPS) {
              clearInterval(intervalRef.current!);
              timeoutRef.current = setTimeout(() => {
                if (!mapRef.current) return;
                travelerRef.current?.remove();
                travelerRef.current = null;
                map.flyTo({ center: [GERB.lng, GERB.lat], zoom: 12.5, speed: 0.6, curve: 1.6 });
              }, 350);
            }
          }, STEP_MS);
        });
      });
    };

    // Si el contenedor aún no tiene altura (accordion animándose), esperar
    if (container.clientHeight === 0) {
      const waitObs = new ResizeObserver(() => {
        if (container.clientHeight > 0) {
          waitObs.disconnect();
          doInit();
        }
      });
      waitObs.observe(container);
      return () => {
        waitObs.disconnect();
        cleanup();
      };
    }

    doInit();
    return cleanup;
  }, []);

  return (
    <div className="mapa-ubicacion-wrap">
      <div ref={containerRef} className="mapa-ubicacion-canvas" />
      <div className="mapa-ubicacion-badge">
        <span className="mapa-ubicacion-badge-dot" />
        <span>Gerb, Lleida · 2h de Barcelona</span>
      </div>
    </div>
  );
}
