"use client";

import { useEffect, useRef, useState } from "react";

const EVENT = new Date("2026-05-15T00:00:00");

function getTime() {
  const diff = EVENT.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getTime>>(null);
  const [bumpKeys, setBumpKeys] = useState<Set<string>>(new Set());
  const prevValues = useRef<Record<string, string>>({});

  useEffect(() => {
    setTime(getTime());
    const t = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!time) return;
    const units = [
      { key: "dias", v: time.days },
      { key: "horas", v: time.hours },
      { key: "min", v: time.minutes },
      { key: "seg", v: time.seconds },
    ];
    const changed = new Set<string>();
    for (const unit of units) {
      const current = String(unit.v).padStart(2, "0");
      if (prevValues.current[unit.key] && prevValues.current[unit.key] !== current) {
        changed.add(unit.key);
      }
      prevValues.current[unit.key] = current;
    }
    if (changed.size > 0) {
      setBumpKeys(changed);
      const t = setTimeout(() => setBumpKeys(new Set()), 280);
      return () => clearTimeout(t);
    }
  }, [time]);

  if (!time) return null;

  const units = [
    { key: "dias", v: time.days, l: "días" },
    { key: "horas", v: time.hours, l: "horas" },
    { key: "min", v: time.minutes, l: "min" },
    { key: "seg", v: time.seconds, l: "seg" },
  ];

  return (
    <div className="countdown-wrap" aria-label="Tiempo para la escapada">
      <p className="countdown-lead">Quedan</p>
      <div className="countdown">
        {units.map(({ key, v, l }) => (
          <div key={key} className={`countdown-unit ${key === "seg" ? "seconds-wrap" : ""}`}>
            <div className="countdown-card">
              <span className={`countdown-value ${key === "seg" ? "is-accent" : ""} ${bumpKeys.has(key) ? "bump" : ""}`}>
                {String(v).padStart(2, "0")}
              </span>
            </div>
            <span className="countdown-label">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
