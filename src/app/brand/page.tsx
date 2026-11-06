import type { Metadata } from "next";
import Link from "next/link";
import { Mandala, type MandalaConfig } from "./mandala";

export const metadata: Metadata = {
  title: "Brand — Craft",
  description: "Experiments for the Craft mark.",
};

const variants: {
  name: string;
  note: string;
  axis?: boolean;
  config: MandalaConfig;
}[] = [
  {
    name: "A · Current",
    note: "16 points, the mark on the landing page.",
    config: {
      outer: { count: 16, base: 33, tip: 48, width: 1, pinch: 0.2 },
      back: true,
      outerOutlines: 1,
      lotus: { count: 24, base: 26, tip: 33, width: 1, pinch: 0.2 },
      rays: 64,
      pupil: 15.5,
    },
  },
  {
    name: "B · Sharp",
    note: "12 needle points, slim petals, with the dotted axis.",
    axis: true,
    config: {
      outer: { count: 12, base: 31, tip: 49, width: 0.8, pinch: 0, belly: 0.55 },
      back: true,
      outerOutlines: 1,
      lotus: { count: 18, base: 26, tip: 33, width: 0.9, pinch: 0, belly: 0.6 },
      rays: 72,
      pupil: 16,
    },
  },
  {
    name: "C · Ornate",
    note: "20 points with nested outlines, veins, beads and a double lotus.",
    config: {
      outer: { count: 20, base: 33, tip: 48, width: 1, pinch: 0.25 },
      back: true,
      outerOutlines: 2,
      veins: true,
      beads: 40,
      lotus: { count: 30, base: 25.5, tip: 32, width: 1, pinch: 0.25 },
      doubleLotus: true,
      rays: 80,
      pupil: 14.5,
    },
  },
  {
    name: "D · Soft & ornate",
    note: "24 rounded petals, double lotus and beads, with the dotted axis.",
    axis: true,
    config: {
      outer: { count: 24, base: 34, tip: 47, width: 1, pinch: 0.75, belly: 1.25 },
      back: true,
      outerOutlines: 1,
      veins: true,
      beads: 48,
      lotus: { count: 24, base: 26, tip: 33, width: 1, pinch: 0.5 },
      doubleLotus: true,
      rays: 96,
      pupil: 15,
    },
  },
];

export default function BrandPage() {
  return (
    <main className="flex flex-1 flex-col px-4 pt-6 pb-24 sm:px-12 sm:pt-8 sm:pb-32">
      <header className="mx-auto flex w-full max-w-[1098px] items-center justify-between">
        <h1 className="text-[20px] leading-[26px] font-semibold tracking-[-0.015em]">
          Brand mark
        </h1>
        <Link
          href="/"
          className="text-[15px] leading-[18px] text-zinc-400 transition-colors hover:text-white"
        >
          Home
        </Link>
      </header>
      <p className="mx-auto mt-2 w-full max-w-[1098px] text-[15px] leading-[22px] text-zinc-400">
        Always turning slowly; hover to scale up and slow down.
      </p>
      <div className="mx-auto mt-10 grid w-full max-w-[1098px] grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2">
        {variants.map(({ name, note, axis, config }) => (
          <section
            key={name}
            className="flex flex-col gap-5 rounded-[14px] border border-[#1C1C1C] bg-[#0E0E0E] p-6"
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden">
              <Mandala config={config} axis={axis} className="w-[58%]" />
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[17px] leading-[22px] font-semibold text-white">{name}</h2>
                <p className="text-[14px] leading-[20px] text-zinc-400">{note}</p>
              </div>
              {/* Logo-size previews, to check how much detail survives. */}
              <div className="flex shrink-0 items-center gap-3">
                <Mandala config={config} className="size-14" />
                <Mandala config={config} className="size-8" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
