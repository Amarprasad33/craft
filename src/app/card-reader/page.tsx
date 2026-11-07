import type { Metadata } from "next";
import { CardReaderDemo } from "./card-reader";

export const metadata: Metadata = {
  title: "Card reader — Craft",
  description: "A card slides into a reader that checks it, row by row.",
};

export default function CardReaderPage() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center overflow-hidden bg-[#ECE9E3] px-4 py-4 sm:px-12">
      <CardReaderDemo />
    </main>
  );
}
