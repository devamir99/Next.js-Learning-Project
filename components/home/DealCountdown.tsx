"use client";

import { useEffect, useState } from "react";

type DealCountdownProps = {
  endsAt: string;
  labels: {
    hours: string;
    minutes: string;
    seconds: string;
  };
};

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(endsAt: string): TimeLeft {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function DealCountdown({ endsAt, labels }: DealCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endsAt));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(endsAt));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [endsAt]);

  const units = [
    { value: timeLeft.hours, label: labels.hours },
    { value: timeLeft.minutes, label: labels.minutes },
    { value: timeLeft.seconds, label: labels.seconds },
  ];

  return (
    <div className="flex items-center gap-1.5" aria-live="polite">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-1.5">
          <div className="flex min-w-[2.75rem] flex-col items-center rounded-lg bg-white/15 px-2 py-1.5 backdrop-blur-sm">
            <span className="text-lg font-bold leading-none text-white">
              {pad(unit.value)}
            </span>
            <span className="mt-1 text-[10px] text-white/80">{unit.label}</span>
          </div>
          {index < units.length - 1 ? (
            <span className="text-sm font-bold text-white/70">:</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
