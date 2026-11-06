import Link from "next/link";
import CatAnimation from "@/app/(animated-icons)/cat/page";
import FactoryPage from "@/app/(animated-icons)/factory/page";
import WeatherPage from "@/app/(animated-icons)/weather/page";

// Each icon page wraps itself in a full-screen centering div.
// Neutralise that wrapper so the icon only takes its own size.
const unwrap =
  "[&>div]:min-h-0 [&>div]:w-auto [&>div]:overflow-visible [&>div]:bg-transparent";

const works = [
  {
    href: "/showcase",
    title: "Animated icons",
    subtitle: "Small icons with idle, hover and click states, built in motion.",
    preview: <IconsArtwork />,
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col pb-24 sm:pb-32">
      <header className="flex w-full items-center justify-between px-4 pt-6 sm:px-12 sm:pt-8">
        <Logo />
        <Link
          href="/reference"
          className="text-[15px] leading-[18px] text-zinc-400 transition-colors hover:text-white"
        >
          Reference
        </Link>
      </header>
      <section className="px-4 pt-12 sm:px-12 sm:pt-16">
        <div className="mx-auto flex w-full max-w-[1098px] flex-col gap-8 sm:gap-12">
          <SectionPill label="Design Craft" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
            {works.map((work) => (
              <Card key={work.href} {...work} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

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

function Logo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="size-12 shrink-0 sm:size-14"
      fill="none"
      stroke={GOLD}
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label="Craft"
    >
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
    </svg>
  );
}

function SectionPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center self-start rounded-full border border-[#242424] bg-[#161616] px-[18px] py-2">
      <span className="text-[15px] leading-[18px] text-white">{label}</span>
    </div>
  );
}

function Card({
  href,
  preview,
  title,
  subtitle,
}: {
  href: string;
  preview: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-5 rounded-[14px] outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A]"
    >
      <div className="relative aspect-[349/270] overflow-hidden rounded-[14px] transition-transform duration-300 ease-out group-hover:scale-[1.015] group-active:scale-[0.99]">
        {preview}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="flex items-center gap-2 text-[20px] leading-[26px] font-semibold tracking-[-0.015em] text-white">
          {title}
          <span
            aria-hidden
            className="text-zinc-500 transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </h3>
        <p className="text-[15px] leading-[22px] text-zinc-400">{subtitle}</p>
      </div>
    </Link>
  );
}

// A static-feeling cut of the showcase: the icons run their idle loops,
// but pointer events are off so the whole card reads as one link.
function IconsArtwork() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-white">
      <div className="absolute left-[24%] top-[30%] -translate-x-1/2 -translate-y-1/2">
        <div className={`${unwrap} scale-[0.6]`}>
          <WeatherPage />
        </div>
      </div>
      <div className="absolute left-[74%] top-[34%] -translate-x-1/2 -translate-y-1/2">
        <div className={`${unwrap} scale-[1.05]`}>
          <CatAnimation />
        </div>
      </div>
      <div className="absolute left-[42%] top-[74%] -translate-x-1/2 -translate-y-1/2">
        <div className={`${unwrap} scale-[0.55]`}>
          <FactoryPage />
        </div>
      </div>
    </div>
  );
}
