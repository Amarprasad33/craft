"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

// Everything is drawn in a 100×100 box centred on (50, 50).
const C = 50;
export const GOLD = "#E3C397";
const BG = "#0A0A0A";

const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;
};

// A pointed petal from `base` to `tip`, `spread` degrees either side.
// `pinch` controls the tip: low = needle sharp, high = round and full.
// `belly` controls how far the sides bulge out before curving in.
const petal = (deg: number, base: number, tip: number, spread: number, pinch: number, belly = 1.1) => {
  const len = tip - base;
  return (
    `M${polar(base, deg - spread)}` +
    `C${polar(base + len * 0.55, deg - spread * belly)} ${polar(tip - len * 0.25, deg - spread * pinch)} ${polar(tip, deg)}` +
    `C${polar(tip - len * 0.25, deg + spread * pinch)} ${polar(base + len * 0.55, deg + spread * belly)} ${polar(base, deg + spread)}`
  );
};

const each = <T,>(count: number, offset: number, fn: (deg: number) => T) =>
  Array.from({ length: count }, (_, i) => fn(offset + (i * 360) / count));

export type PetalRing = {
  count: number;
  base: number;
  tip: number;
  /** Fraction of the slot each petal fills (1 = petals touch). */
  width?: number;
  pinch?: number;
  belly?: number;
};

export type MandalaConfig = {
  outer: PetalRing;
  /** Second star layer peeking between the outer petals. */
  back?: boolean;
  /** Nested outlines inside each outer petal (0 = none). */
  outerOutlines?: number;
  /** Centre line + bead inside each outer petal. */
  veins?: boolean;
  /** Ring of small dots between the outer star and the lotus. */
  beads?: number;
  lotus: PetalRing;
  /** A second, smaller lotus layer offset between the first. */
  doubleLotus?: boolean;
  rays: number;
  pupil: number;
};

function ringPath({ count, base, tip, width = 1, pinch = 0.2, belly }: PetalRing, offset = 0, inset = 0) {
  const spread = (180 / count) * width;
  const shrink = 1 - inset * 0.32;
  return each(count, offset, (deg) =>
    petal(deg, base + inset * 2, tip - inset * 4, spread * shrink, pinch, belly),
  ).join("");
}

export function MandalaMark({ config }: { config: MandalaConfig }) {
  const { outer, lotus, rays, pupil } = config;
  const half = 180 / outer.count;
  const lotusSpread = (180 / lotus.count) * (lotus.width ?? 1);

  return (
    <g fill="none" stroke={GOLD} strokeLinejoin="round" strokeLinecap="round">
      {config.back && (
        <path
          d={ringPath({ ...outer, tip: outer.tip - 5, base: outer.base - 1 }, half)}
          fill={BG}
          strokeWidth="1.1"
          opacity="0.75"
        />
      )}
      <path d={ringPath(outer)} fill={BG} strokeWidth="1.4" />
      {Array.from({ length: config.outerOutlines ?? 0 }, (_, i) => (
        <path key={i} d={ringPath(outer, 0, i + 1)} strokeWidth="0.7" opacity={0.65 - i * 0.15} />
      ))}
      {config.veins &&
        each(outer.count, 0, (deg) => (
          <g key={deg}>
            <path d={`M${polar(outer.base + 3, deg)}L${polar(outer.tip - 7, deg)}`} strokeWidth="0.7" opacity="0.8" />
            <circle cx={polar(outer.tip - 4.5, deg).split(" ")[0]} cy={polar(outer.tip - 4.5, deg).split(" ")[1]} r="0.9" fill={GOLD} stroke="none" />
          </g>
        ))}
      <circle cx={C} cy={C} r={lotus.tip + 1} fill={BG} strokeWidth="0.8" opacity="0.6" />
      {config.beads &&
        each(config.beads, 0, (deg) => {
          const [x, y] = polar(lotus.tip + 1, deg).split(" ");
          return <circle key={deg} cx={x} cy={y} r="0.95" fill={GOLD} stroke="none" />;
        })}
      {config.doubleLotus && (
        <path
          d={each(lotus.count, 180 / lotus.count, (deg) =>
            petal(deg, lotus.base - 0.5, lotus.tip - 2.5, lotusSpread * 0.8, lotus.pinch ?? 0.2),
          ).join("")}
          fill={BG}
          strokeWidth="0.8"
          opacity="0.7"
        />
      )}
      <path
        d={each(lotus.count, 0, (deg) => petal(deg, lotus.base, lotus.tip, lotusSpread, lotus.pinch ?? 0.2, lotus.belly)).join("")}
        fill={BG}
        strokeWidth="1.1"
      />
      <path
        d={each(lotus.count, 0, (deg) =>
          petal(deg, lotus.base + 1, lotus.tip - 1.5, lotusSpread * 0.4, lotus.pinch ?? 0.2),
        ).join("")}
        strokeWidth="0.6"
        opacity="0.7"
      />
      <circle cx={C} cy={C} r={lotus.base - 0.5} strokeWidth="0.9" />
      <path
        d={each(rays, 0, (deg) => {
          const long = Math.round((deg * rays) / 360) % 2 === 0;
          return `M${polar(pupil + 0.5, deg)}L${polar(lotus.base - (long ? 1.5 : 3.5), deg)}`;
        }).join("")}
        strokeWidth="0.6"
        opacity="0.85"
      />
      <circle cx={C} cy={C} r={pupil} fill="#000" strokeWidth="1.2" />
      <circle cx={C} cy={C} r="1.8" fill={GOLD} stroke="none" />
    </g>
  );
}

// Dotted vertical line through the centre, like the axis in the reference.
// It sits outside the rotating group so it always stays vertical.
function Axis() {
  return (
    <g fill={GOLD}>
      {Array.from({ length: 49 }, (_, i) => {
        const y = -40 + i * 3.75;
        if (y > 0 && y < 100) return null;
        const fade = 1 - (Math.abs(y - C) - 50) / 45;
        return <circle key={y} cx={C} cy={y} r={i % 4 === 0 ? 1.2 : 0.6} opacity={fade} />;
      })}
    </g>
  );
}

export type Motion = {
  /** Degrees per second while idle. */
  speed: number;
  /** Degrees per second while hovered. */
  hoverSpeed: number;
  hoverScale: number;
};

export const DEFAULT_MOTION: Motion = { speed: 6, hoverSpeed: 2, hoverScale: 1.08 };

export function Mandala({
  config,
  axis = false,
  motion: { speed, hoverSpeed, hoverScale } = DEFAULT_MOTION,
  className,
}: {
  config: MandalaConfig;
  axis?: boolean;
  motion?: Motion;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rotate = useMotionValue(0);
  const target = useRef(speed);
  const current = useRef(speed);

  // Ease the speed towards its target so hovering glides into the slowdown.
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    current.current += (target.current - current.current) * Math.min(1, delta / 350);
    rotate.set((rotate.get() + (current.current * delta) / 1000) % 360);
  });

  return (
    <motion.svg
      viewBox="0 0 100 100"
      overflow="visible"
      className={className}
      role="img"
      aria-label="Craft mark"
      whileHover={{ scale: hoverScale }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onHoverStart={() => (target.current = hoverSpeed)}
      onHoverEnd={() => (target.current = speed)}
    >
      {axis && <Axis />}
      <motion.g style={{ rotate, originX: "50%", originY: "50%" }}>
        <MandalaMark config={config} />
      </motion.g>
    </motion.svg>
  );
}
