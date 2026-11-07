"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

// Mandala mark: a dark pupil with a gold dot, a ring of fine rays,
// a ring of lotus petals and two layered 16-point stars around it.
const GOLD = "#E3C397";
const C = 50;

const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;
};

// A pointed, ogee-like petal: full at the base, pinched into a sharp tip.
const petal = (deg: number, base: number, tip: number, spread: number) => {
  const mid = base + (tip - base) * 0.55;
  return (
    `M${polar(base, deg - spread)}` +
    `C${polar(mid, deg - spread * 1.1)} ${polar(tip - (tip - base) * 0.25, deg - spread * 0.2)} ${polar(tip, deg)}` +
    `C${polar(tip - (tip - base) * 0.25, deg + spread * 0.2)} ${polar(mid, deg + spread * 1.1)} ${polar(base, deg + spread)}`
  );
};

const ring = (count: number, offset: number, base: number, tip: number, spread: number) =>
  Array.from({ length: count }, (_, i) => petal(offset + (i * 360) / count, base, tip, spread)).join("");

const OUTER_PETALS = ring(16, 0, 33, 48, 11.25);
const OUTER_PETALS_INNER = ring(16, 0, 35, 43, 5);
const BACK_PETALS = ring(16, 11.25, 32, 43, 11.25);
const LOTUS = ring(24, 7.5, 26, 33, 7.5);
const LOTUS_INNER = ring(24, 7.5, 27, 31, 3);
const RAYS = Array.from({ length: 64 }, (_, i) => `M${polar(16, i * 5.625)}L${polar(i % 2 ? 23 : 25, i * 5.625)}`).join("");

// Rotation is driven by a velocity that eases towards a target, so every
// start and stop glides. On load it gets one push and settles (~40° over
// ~1.2s), then rests. Hover sets a slow cruising speed; leaving lets it coast to a stop.
const SETTLE_TURN = 40;
const EASE_TIME = 0.35; // seconds; velocity closes ~63% of the gap per EASE_TIME
const HOVER_SPEED = 10; // degrees per second

export function Logo() {
  const reduce = useReducedMotion();
  const rotate = useMotionValue(0);
  const velocity = useRef(SETTLE_TURN / EASE_TIME);
  const target = useRef(0);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const dt = Math.min(delta, 64) / 1000;
    velocity.current += (target.current - velocity.current) * (1 - Math.exp(-dt / EASE_TIME));
    if (target.current === 0 && Math.abs(velocity.current) < 0.05) {
      velocity.current = 0;
      return;
    }
    rotate.set((rotate.get() + velocity.current * dt) % 360);
  });

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="size-12 shrink-0 sm:size-14"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onHoverStart={() => (target.current = HOVER_SPEED)}
      onHoverEnd={() => (target.current = 0)}
      fill="none"
      stroke={GOLD}
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label="Craft"
    >
      <motion.g style={{ rotate, originX: "50%", originY: "50%" }}>
        <path d={BACK_PETALS} fill="#0A0A0A" strokeWidth="1.1" opacity="0.75" />
        <path d={OUTER_PETALS} fill="#0A0A0A" strokeWidth="1.4" />
        <path d={OUTER_PETALS_INNER} strokeWidth="0.8" opacity="0.65" />
        <circle cx={C} cy={C} r="34" fill="#0A0A0A" strokeWidth="0.8" opacity="0.6" />
        <path d={LOTUS} fill="#0A0A0A" strokeWidth="1.1" />
        <path d={LOTUS_INNER} strokeWidth="0.6" opacity="0.7" />
        <circle cx={C} cy={C} r="25.5" strokeWidth="0.9" />
        <path d={RAYS} strokeWidth="0.6" opacity="0.85" />
        <circle cx={C} cy={C} r="15.5" fill="#000" strokeWidth="1.2" />
        <circle cx={C} cy={C} r="1.8" fill={GOLD} stroke="none" />
      </motion.g>
    </motion.svg>
  );
}
