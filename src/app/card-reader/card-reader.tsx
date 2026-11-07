"use client";

import localFont from "next/font/local";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControlsWithThen,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// Replica of the "Light · 30% inserted" and "Light · 90% inserted" artboards
// from the Craft design canvas. The design exposes a single lever, `inserted`
// (0–100%), and everything else follows from it: card position, LED, screen.
// Here that lever is a motion value and a small timeline drives it.

const geistPixel = localFont({
  src: "./geist-pixel.woff2",
  display: "swap",
});

const STAGE = { w: 1200, h: 700 } as const;
const CARD_W = 400;
const READER_LEFT = 360;

// The two artboards in the design: card presented at the slot, and card read.
const PRESENTED = 0.3;
const PUSHED = 0.72;
const READ = 0.9;

type Phase = "insert" | "reading" | "ready";

// "insert" isn't in the design (it only shows a card being read or done);
// it's what the reader shows while the card waits at the slot.
const PHASES: Record<
  Phase,
  { led: string; glow: string; label: string; status: string; statusColor: string }
> = {
  insert: {
    led: "#C9C4BA",
    glow: "rgba(0,0,0,0)",
    label: "INSERT",
    status: "Insert card",
    statusColor: "rgba(235,235,245,0.62)",
  },
  reading: {
    led: "#FF9F0A",
    glow: "rgba(255,159,10,0.55)",
    label: "READING",
    status: "Reading card…",
    statusColor: "rgba(235,235,245,0.62)",
  },
  ready: {
    led: "#30D158",
    glow: "rgba(48,209,88,0.55)",
    label: "READY",
    status: "All checks passed",
    statusColor: "#30D158",
  },
};

const ROWS = [
  { label: "Identity", value: "Verified", barW: 72 },
  { label: "Access", value: "Restricted", barW: 96 },
  { label: "Data", value: "Restricted", barW: 84 },
  { label: "AI usage", value: "Limited", barW: 64 },
] as const;

type Bezier = readonly [number, number, number, number];
const EASE_PRESENT: Bezier = [0.22, 1, 0.36, 1]; // hand places the card: quick, then settles
const EASE_PUSH: Bezier = [0.5, 0, 0.2, 1]; // hand pushes it into the slot
const EASE_MOTOR: Bezier = [0.35, 0, 0.65, 1]; // reader motor: even, mechanical
const EASE_EJECT: Bezier = [0.2, 0.9, 0.3, 1]; // motor spits it out, brakes hard

const CANCELLED = Symbol("cancelled");
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// Nothing plays on its own. Hovering the device inserts and reads the card;
// leaving ejects it back to the slot. Either can interrupt the other midway,
// and each slide starts from wherever the card currently is.
function useCardReader() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhaseState] = useState<Phase>("insert");
  const [resolved, setResolved] = useState(0);

  const inserted = useMotionValue(PRESENTED);
  const cardX = useTransform(inserted, (p) => p * CARD_W);
  const runId = useRef(0);
  const phaseRef = useRef<Phase>("insert");
  const active = useRef(false);

  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);

  // A fresh run id cancels whatever sequence was in flight at its next await.
  const begin = useCallback(() => {
    const id = ++runId.current;
    const guard = async (p: Promise<unknown> | AnimationPlaybackControlsWithThen) => {
      await p;
      if (id !== runId.current) throw CANCELLED;
    };
    // Durations are for the full distance; a partial slide gets a share of it.
    const slide = (from: number, to: number, duration: number, ease: Bezier) => {
      const share = Math.abs(to - inserted.get()) / Math.abs(to - from);
      return guard(
        animate(inserted, to, {
          duration: Math.max(0.18, duration * Math.min(1, share)),
          ease: [...ease],
        }),
      );
    };
    const hold = (ms: number) => guard(wait(ms));
    return { slide, hold };
  }, [inserted]);

  const enter = useCallback(async () => {
    if (active.current) return;
    active.current = true;
    if (reduceMotion) {
      runId.current++;
      inserted.stop();
      inserted.set(READ);
      setPhase("ready");
      setResolved(ROWS.length);
      return;
    }
    const { slide, hold } = begin();
    try {
      // Pushed in by hand, then the reader's motor takes over (the 90% artboard).
      if (inserted.get() < PUSHED) {
        await slide(PRESENTED, PUSHED, 0.62, EASE_PUSH);
        await hold(160);
      }
      setPhase("reading");
      setResolved(0);
      await slide(PUSHED, READ, 0.5, EASE_MOTOR);
      await hold(380);

      // Checks resolve one at a time.
      for (let i = 1; i <= ROWS.length; i++) {
        setResolved(i);
        await hold(340);
      }
      await hold(120);
      setPhase("ready");
    } catch (e) {
      if (e !== CANCELLED) throw e;
    }
  }, [begin, inserted, reduceMotion, setPhase]);

  const leave = useCallback(async () => {
    if (!active.current) return;
    active.current = false;
    const clear = () => {
      setPhase("insert");
      setResolved(0);
    };
    if (reduceMotion) {
      runId.current++;
      inserted.stop();
      inserted.set(PRESENTED);
      clear();
      return;
    }
    const { slide } = begin();
    // An unfinished read is abandoned at once; a finished one stays on
    // screen until the card is out.
    const finished = phaseRef.current === "ready";
    if (!finished) clear();
    try {
      await slide(READ, PRESENTED, 0.6, EASE_EJECT);
      if (finished) clear();
    } catch (e) {
      if (e !== CANCELLED) throw e;
    }
  }, [begin, inserted, reduceMotion, setPhase]);

  useEffect(
    () => () => {
      runId.current++;
      inserted.stop();
    },
    [inserted],
  );

  // Mouse: hover in and out. Touch and pen have no hover, so a tap toggles.
  const pointerType = useRef("mouse");
  const deviceHandlers = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") void enter();
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") void leave();
    },
    onPointerDown: (e: React.PointerEvent) => {
      pointerType.current = e.pointerType;
    },
    onClick: () => {
      if (pointerType.current === "mouse") return;
      void (active.current ? leave() : enter());
    },
  };

  return { phase, resolved, cardX, deviceHandlers };
}

type SceneProps = ReturnType<typeof useCardReader>;

function Scene({ phase, resolved, cardX, deviceHandlers }: SceneProps) {
  return (
    <div
      data-phase={phase}
      data-resolved={resolved}
      className="relative select-none overflow-hidden bg-[#ECE9E3] text-[#F5F5F7] antialiased tracking-[-0.01em]"
      style={{
        width: STAGE.w,
        height: STAGE.h,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
      }}
    >
      {/* Slot marker above the reader */}
      <div
        aria-hidden
        className="absolute left-[430px] top-[150px] h-4 w-[76px] rounded-lg"
        style={{
          background: "linear-gradient(180deg, #F7F5F1 0%, #D8D4CC 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 0.5px rgba(0,0,0,0.08), 0 1px 2px rgba(70,60,45,0.06)",
        }}
      />

      {/* Card: sits under the reader in paint order, so it slides in behind it */}
      <motion.div
        className="absolute top-[224px] h-[252px] w-[400px] rounded-[22px]"
        style={{
          left: READER_LEFT - CARD_W,
          x: cardX,
          background:
            "linear-gradient(118deg, #0F0B0E 0%, #1E0E18 26%, #4E1032 46%, #93185A 64%, #C9287A 78%, #A01B60 88%, #5C0E37 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.08), 0 24px 48px rgba(70,12,40,0.22), 0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div className="absolute left-6 top-6 flex flex-col gap-0.5">
          <span className="text-[20px] font-semibold text-white">Arjun Mehta</span>
          <span className="text-[14px] font-medium text-white/72">Helix Quantum</span>
        </div>
        <div
          aria-hidden
          className="absolute left-6 top-[108px] h-9 w-[46px] rounded-[9px]"
          style={{
            background: "linear-gradient(135deg, #F3E3C8 0%, #D9BE92 55%, #B99A6A 100%)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
          }}
        >
          <div className="absolute left-[15px] top-0 h-9 w-px bg-black/16" />
          <div className="absolute left-[30px] top-0 h-9 w-px bg-black/16" />
          <div className="absolute left-0 top-[18px] h-px w-[46px] bg-black/16" />
        </div>
        <svg
          className="absolute right-6 top-[26px]"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M8 8.5c1.6 2.2 1.6 4.8 0 7" />
          <path d="M11.5 6c2.6 3.6 2.6 8.4 0 12" />
          <path d="M15 3.5c3.6 5 3.6 12 0 17" />
        </svg>
        <div className="absolute bottom-[22px] left-6 text-[16px] font-medium tracking-[0.08em] text-white/92 tabular-nums">
          •••• 4821
        </div>
        <div className="absolute bottom-[22px] right-6 text-[13px] font-semibold text-white/82">
          09/29
        </div>
      </motion.div>

      {/* Reader: the hover target */}
      <div
        {...deviceHandlers}
        className="absolute left-[360px] top-[160px] flex h-[380px] w-[860px] overflow-hidden rounded-[48px]"
        style={{
          background: "linear-gradient(180deg, #F6F4F0 0%, #ECE9E3 48%, #E3E0D9 100%)",
          boxShadow:
            "0 32px 64px rgba(70,60,45,0.12), 0 6px 16px rgba(70,60,45,0.08), 0 1px 2px rgba(70,60,45,0.08)",
        }}
      >
        <div
          className="flex w-[111px] shrink-0 flex-col items-center justify-between py-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 100%)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M8 5.2v13.6c0 .9 1 1.4 1.7.9l9-6.8c.6-.4.6-1.3 0-1.8l-9-6.8C9 3.8 8 4.3 8 5.2z"
              fill="#2C2C2E"
              stroke="#2C2C2E"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <Led phase={phase} />
        </div>
        <div
          aria-hidden
          className="w-[2px] shrink-0"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.07) 50%, rgba(255,255,255,0.9) 50%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)",
          }}
        />

        <div className="flex min-w-0 flex-1 gap-6 p-7">
          <Screen phase={phase} resolved={resolved} />
          <div aria-hidden className="flex min-w-0 flex-1 flex-col gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #E2DED7 0%, #EAE7E1 100%)",
                  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.85)",
                }}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[48px]"
          style={{
            boxShadow:
              "inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -1.5px 1px rgba(70,60,45,0.06), inset 0 0 0 1px rgba(70,60,45,0.07)",
          }}
        />
      </div>

      {/* The reader runs off the right edge; fade it into the ground */}
      <div
        aria-hidden
        className="absolute left-[940px] top-0 h-[700px] w-[260px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(236,233,227,0) 0%, rgba(236,233,227,0.7) 40%, #ECE9E3 78%)",
        }}
      />
    </div>
  );
}

function Led({ phase }: { phase: Phase }) {
  const s = PHASES[phase];
  const glow = `0 0 10px ${s.glow}`;
  return (
    <div className="flex flex-col items-center gap-2.5">
      <motion.div
        className="size-2.5 rounded-full"
        initial={false}
        animate={{
          backgroundColor: s.led,
          boxShadow:
            phase === "reading"
              ? [glow, "0 0 3px rgba(255,159,10,0.3)", glow] // breathes while reading
              : phase === "ready"
                ? [glow, "0 0 22px rgba(48,209,88,0.9)", glow] // one bloom on success
                : glow,
        }}
        transition={{
          backgroundColor: { duration: 0.3 },
          boxShadow:
            phase === "reading"
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6, ease: "easeOut" },
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={s.label}
          className="text-[11px] font-semibold tracking-[0.04em] text-[#67625A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {s.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Screen({ phase, resolved }: { phase: Phase; resolved: number }) {
  const s = PHASES[phase];
  return (
    <div
      className={`${geistPixel.className} relative w-[398px] shrink-0 overflow-hidden rounded-[26px] tracking-[0.01em]`}
      style={{
        background: "radial-gradient(120% 90% at 50% 45%, #121614 0%, #0A0C0B 70%, #060707 100%)",
        boxShadow:
          "inset 0 2px 8px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* phosphor dots + scanlines */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 0.8px, transparent 1.1px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div
        className="relative flex h-full flex-col gap-4 px-[26px] py-[22px]"
        style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
      >
        <div className="flex items-center justify-between border-b border-white/8 pb-3.5">
          <span className="text-[14px] text-[rgba(235,235,245,0.62)]">Access Check</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={s.status}
              className="text-[14px]"
              style={{ color: s.statusColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.45, 1] }} // a CRT-ish flicker on change
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.3, times: [0, 0.3, 0.55, 1] }}
            >
              {s.status}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {ROWS.map((row, i) => (
            <Row
              key={row.label}
              index={i}
              row={row}
              on={i < resolved}
              reading={phase === "reading"}
            />
          ))}
        </div>
      </div>

      {/* glass */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[26px]"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, rgba(255,255,255,0) 42%)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  );
}

function Row({
  row,
  index,
  on,
  reading,
}: {
  row: (typeof ROWS)[number];
  index: number;
  on: boolean;
  reading: boolean;
}) {
  return (
    <div className="flex h-9 items-center justify-between">
      <span className="text-[19px] text-[#F5F5F7]">{row.label}</span>
      <div className="relative flex h-9 items-center justify-end">
        {/* pending bar: breathes while reading, collapses toward the check when resolved */}
        <motion.div
          aria-hidden
          className="absolute right-0 h-2 rounded-[4px] bg-white/10"
          style={{ width: row.barW, originX: 1 }}
          initial={false}
          animate={
            on
              ? { opacity: 0, scaleX: 0.4 }
              : reading
                ? { opacity: [1, 0.4, 1], scaleX: 1 }
                : { opacity: 1, scaleX: 1 }
          }
          transition={
            on
              ? { duration: 0.22, ease: "easeOut" }
              : reading
                ? {
                    opacity: {
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.14,
                    },
                    scaleX: { duration: 0.2 },
                  }
                : { duration: 0.2 }
          }
        />
        <motion.div
          className="flex items-center gap-2.5"
          aria-hidden={!on}
          initial={false}
          animate={{ opacity: on ? 1 : 0, x: on ? 0 : 10 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[17px] text-[rgba(235,235,245,0.64)]">{row.value}</span>
          <motion.div
            className="flex size-5 items-center justify-center rounded-full bg-[rgba(48,209,88,0.16)]"
            initial={false}
            animate={{ scale: on ? 1 : 0.4 }}
            transition={
              on
                ? { type: "spring", stiffness: 520, damping: 24, delay: 0.08 }
                : { duration: 0.15 }
            }
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#30D158"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                initial={false}
                animate={{ pathLength: on ? 1 : 0 }}
                transition={
                  on ? { duration: 0.28, delay: 0.14, ease: "easeOut" } : { duration: 0.1 }
                }
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// The design is a fixed 1200×700 artboard. Scale it to the container's width
// without JS: tan(atan2(a, b)) is the unitless ratio a / b in CSS.
function Frame({ children, overlay }: { children: React.ReactNode; overlay?: React.ReactNode }) {
  return (
    <div
      className="@container relative w-full overflow-hidden"
      style={{ aspectRatio: `${STAGE.w} / ${STAGE.h}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: `scale(tan(atan2(100cqw, ${STAGE.w}px)))` }}
      >
        {children}
      </div>
      {overlay}
    </div>
  );
}

// Stage y of the caption: just under the device's shadow.
const CAPTION_Y = 600;

/** The scene on its own, scaled to its container's width. Used for previews. */
export function CardReaderFrame() {
  const reader = useCardReader();
  return (
    <Frame>
      <Scene {...reader} />
    </Frame>
  );
}

/**
 * The scene with a caption, sized to fit the viewport without scrolling.
 * Used by the route page.
 */
export function CardReaderDemo() {
  const reader = useCardReader();
  return (
    <div
      className="w-full"
      style={{ maxWidth: `min(${STAGE.w}px, calc((100dvh - 32px) * ${STAGE.w} / ${STAGE.h}))` }}
    >
      <Frame
        overlay={
          <p
            className="absolute inset-x-0 px-4 text-center text-[15px] leading-[22px] text-[#67625A]"
            style={{ top: `calc(100cqw * ${CAPTION_Y} / ${STAGE.w})` }}
          >
            Hover the reader to insert the card. Move away to eject it.
          </p>
        }
      >
        <Scene {...reader} />
      </Frame>
    </div>
  );
}
