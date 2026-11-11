import Link from "next/link";
import { Logo } from "./logo";
import CatAnimation from "@/app/(animated-icons)/cat/page";
import FactoryPage from "@/app/(animated-icons)/factory/page";
import WeatherPage from "@/app/(animated-icons)/weather/page";
import { CardReaderFrame } from "@/app/card-reader/card-reader";

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
  {
    href: "/card-reader",
    title: "Card reader",
    subtitle: "A card slides into a reader that checks it, row by row.",
    preview: <CardReaderArtwork />,
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col pb-24 sm:pb-32">
      <header className="flex w-full items-center px-4 pt-6 sm:px-12 sm:pt-8">
        <Logo />
      </header>
      <section className="px-4 pt-12 sm:px-12 sm:pt-16">
        <div className="mx-auto flex w-full max-w-[1098px] flex-col gap-8 sm:gap-12">
          <SectionPill label="Experiments" />
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

// The reader scene, scaled up and cropped to the card and the screen.
function CardReaderArtwork() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center bg-[#ECE9E3]">
      <div className="w-full origin-[42%_50%] scale-[1.34]">
        <CardReaderFrame />
      </div>
    </div>
  );
}
