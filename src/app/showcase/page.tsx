import type { Metadata } from "next";
import LightBlubAnimation from "@/app/(animated-icons)/(emils-course-icons)/lightbulb/page";
import CatAnimation from "@/app/(animated-icons)/cat/page";
import FactoryPage from "@/app/(animated-icons)/factory/page";
import TerminalAnimation from "@/app/(animated-icons)/terminal/page";
import WeatherPage from "@/app/(animated-icons)/weather/page";
import CarWheelAnimation from "@/app/(animated-icons)/wheel/page";

export const metadata: Metadata = {
  title: "Showcase — Craft",
  description: "Animated icons, loosely scattered.",
};

// Each icon page wraps itself in a full-screen centering div.
// Neutralise that wrapper so the icon only takes its own size.
const unwrap =
  "[&>div]:min-h-0 [&>div]:w-auto [&>div]:overflow-visible [&>div]:bg-transparent";

// `slot` places the icon: a loose grid on mobile (2 cols) and tablet (3 cols),
// with nudges so rows don't line up, and absolute scatter on desktop.
// `size` scales the icon per breakpoint (layout box stays native, so cells have fixed heights).
const icons = [
  {
    name: "Lightbulb",
    Icon: LightBlubAnimation,
    slot:
      "col-start-1 row-start-1 translate-x-2 translate-y-6 sm:col-start-1 sm:row-start-1 sm:translate-x-4 sm:translate-y-2 lg:left-[29.8%] lg:top-[24.3%]",
    size: "scale-75 sm:scale-80 lg:scale-85",
  },
  {
    name: "Cat",
    Icon: CatAnimation,
    slot:
      "col-start-2 row-start-1 -translate-x-2 -translate-y-4 sm:col-start-3 sm:row-start-1 sm:-translate-x-4 sm:-translate-y-4 lg:left-[72.2%] lg:top-[19.6%]",
    size: "scale-[1.3] sm:scale-[1.4] lg:scale-[1.55]",
  },
  {
    name: "Weather",
    Icon: WeatherPage,
    slot:
      "col-span-2 col-start-1 row-start-2 translate-x-10 translate-y-0 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:translate-x-0 sm:translate-y-16 lg:left-[51.8%] lg:top-[35.7%]",
    size: "scale-75 sm:scale-80 lg:scale-85",
  },
  {
    name: "Car wheel",
    Icon: CarWheelAnimation,
    slot:
      "col-span-2 col-start-1 row-start-3 -translate-x-6 translate-y-0 sm:col-span-2 sm:col-start-1 sm:row-start-2 sm:-translate-x-6 sm:translate-y-6 lg:left-[24.2%] lg:top-[59%]",
    size: "scale-[1.4] sm:scale-[1.45] lg:scale-[1.6]",
  },
  {
    name: "Terminal",
    Icon: TerminalAnimation,
    slot:
      "col-start-1 row-start-4 translate-x-4 translate-y-0 sm:col-start-3 sm:row-start-2 sm:-translate-x-2 sm:-translate-y-6 lg:left-[75.9%] lg:top-[54.9%]",
    size: "scale-[1.3] sm:scale-[1.4] lg:scale-[1.6]",
  },
  {
    name: "Factory",
    Icon: FactoryPage,
    slot:
      "col-start-2 row-start-4 translate-x-0 translate-y-10 sm:col-start-2 sm:row-start-3 sm:translate-x-16 sm:-translate-y-16 lg:left-[51.7%] lg:top-[68.1%]",
    size: "scale-90 sm:scale-85 lg:scale-80",
  },
];

export default function ShowcasePage() {
  return (
    <main className="flex min-h-screen flex-1 items-center overflow-x-clip bg-white text-zinc-900">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-4 gap-y-6 px-4 py-16 sm:grid-cols-3 sm:gap-y-10 sm:px-10 lg:relative lg:block lg:aspect-[12/7] lg:p-0">
        {icons.map(({ name, Icon, slot, size }) => (
          <div
            key={name}
            aria-label={name}
            className={`flex h-40 min-w-0 items-center justify-center sm:h-52 lg:absolute lg:h-auto lg:-translate-x-1/2 lg:-translate-y-1/2 ${slot}`}
          >
            <div className={`${unwrap} ${size}`}>
              <Icon />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
