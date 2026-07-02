"use client";
import { motion } from "motion/react";

export default function IphonePage() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
        <CardsDemo />
      </div>
    </>
  );
}

type CardItem = {
  title: string;
  description: React.ReactNode;
  image: string;
};

export const CardsDemo = () => {
  const items: CardItem[] = [
    {
      title: "Apple Trade In",
      description: "Save on a new iPhone with a trade‑in.",
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/trade_in__d4dobu5egm0y_large_2x.jpg",
    },
    {
      title: "Ways to Buy",
      description: (
        <>
          Pay over time,
          <br />
          interest‑free.
        </>
      ),
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/buy__gdo4oaj4ekmm_large_2x.jpg",
    },
    {
      title: "Carroer Deals at Apple",
      description: "Get up to $800⁠–⁠$1100 in credit on a new iPhone after trade‑in.",
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/carrier__dllu07ktiuaa_large_2x.jpg",
    },
    {
      title: "Personal Setup",
      description: "Meet your new iPhone with Personal Setup.",
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/setup__d177om0fsqs2_large_2x.jpg",
    },
    {
      title: "Delivery and Pickup",
      description: "Get flexible delivery and easy pickup.",
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/deliver__by32yxmh41ma_large_2x.jpg",
    },
    {
      title: "Guided Shopping",
      description: "Shop live with a Specialist.",
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/specialist__bxk6m5pp2k3m_large_2x.jpg",
    },
    {
      title: "Apple Store App",
      description: "Explore a shopping experience designed around you.",
      image:
        "https://www.apple.com/v/iphone/home/cj/images/overview/incentive/app__evu5fxqoamye_large_2x.jpg",
    },
  ];

  const startEndInset =
    "pl-[max(1rem,calc((100vw-72rem)/2+0.5rem))] " +
    "pr-[max(1rem,calc((100vw-72rem)/2+0.5rem))] " +
    "scroll-pl-[max(1rem,calc((100vw-72rem)/2+0.5rem))]";

  const CARD_HOVER_TRANSITION = {
    type: "spring" as const,
    stiffness: 120,
    damping: 15,
  };

  return (
    <div className="w-full min-h-screen overflow-hidden py-32 bg-[#F5F5F7]">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-5xl font-semibold tracking-tight">
          Get to know your iPhone.
        </h2>
      </div>

      <div
        className={`mt-8 flex gap-4 py-6 w-full min-w-0 overflow-x-auto overscroll-x-contain no-scrollbar snap-x snap-mandatory ${startEndInset}`}
      >
        {items.map((item) => (
          <motion.div
            whileHover={{ scale: 1.018 }}
            transition={CARD_HOVER_TRANSITION}
            key={item.title}
            className="relative snap-start h-140 w-[336px] shrink-0 overflow-hidden rounded-3xl bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute bottom-0 w-full object-cover"
            />

            <div className="p-8 flex flex-col gap-3">
              <h2 className="text-[17px] font-semibold text-black">{item.title}</h2>
              <p className="text-2xl font-semibold text-black text-balance">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
  inspo-url: https://www.apple.com/iphone/

 */
