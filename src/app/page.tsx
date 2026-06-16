export default function Home() {
  return (
    <main className="flex flex-col flex-1 pb-32">
      <Nav />
      <section className="px-12 pt-16">
        <div className="mx-auto w-full max-w-[1098px] flex flex-col gap-12">
          <SectionPill label="Design Craft" />
          <div className="flex flex-col gap-12">
            <Row>
              <CardLinear />
              <CardStripePress />
              <CardEasing />
            </Row>
            <Row>
              <CardPhone />
              <CardEditor />
              <CardQuote />
            </Row>
          </div>
        </div>
      </section>
    </main>
  );
}

function Nav() {
  return (
    <nav className="flex items-center justify-between w-full pt-8 px-12">
      <Logo />
      <ul className="flex items-center gap-9 text-[15px] leading-[18px] text-white">
        <li>amar.md</li>
        <li>Discord</li>
        <li className="font-semibold">Lessons</li>
        <li>Interviews</li>
        <li>Vault</li>
        <li className="flex items-center gap-1.5">
          Account
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <div
      className="flex items-center justify-center size-14 rounded-[10px] shrink-0"
      style={{
        background: "linear-gradient(180deg, #FACC15 0%, #EAB308 100%)",
        boxShadow:
          "inset 0 -3px 0 rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      <div
        className="w-[34px] h-[42px] rounded-[3px] bg-white"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.12)" }}
      />
    </div>
  );
}

function SectionPill({ label }: { label: string }) {
  return (
    <div className="inline-flex self-start items-center rounded-full px-[18px] py-2 bg-[#161616] border border-[#242424]">
      <span className="text-[15px] leading-[18px] text-white">{label}</span>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-6">{children}</div>;
}

function Card({
  preview,
  title,
  subtitle,
}: {
  preview: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <article className="flex flex-col gap-5 w-[349px] shrink-0">
      <div className="relative h-[270px] rounded-[14px] overflow-hidden">
        {preview}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[20px] leading-[26px] font-semibold tracking-[-0.015em] text-white">
          {title}
        </h3>
        <p className="text-[15px] leading-[22px] text-zinc-400">{subtitle}</p>
      </div>
    </article>
  );
}

function CardLinear() {
  return (
    <Card
      title="Linear, faithfully"
      subtitle="A pixel-honest take on Linear's interface motion."
      preview={
        <div className="absolute inset-0 bg-[#F4F4F5] p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#5E6AD2]" />
              <span className="font-mono text-[12px] text-[#5E6AD2] font-medium">
                LIN-204
              </span>
            </div>
            <h4 className="text-[17px] leading-[22px] font-semibold text-[#0A0A0A] tracking-[-0.01em]">
              Fix easing on quick-action menu
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-[#FEE2D5] text-[#B4470A] text-[11px] font-medium">
              In Progress
            </span>
            <span className="px-2 py-1 rounded-md border border-[#E4E4E7] text-[#52525B] text-[11px] font-medium">
              Motion
            </span>
          </div>
        </div>
      }
    />
  );
}

function CardStripePress() {
  return (
    <Card
      title="Stripe Press study"
      subtitle="Editorial typography for screens that breathe."
      preview={
        <div className="absolute inset-0 bg-[#F4EFE6] p-6 flex flex-col justify-between">
          <span className="text-[11px] font-medium tracking-[0.14em] text-[#6B6358] uppercase">
            Stripe Press
          </span>
          <div className="flex flex-col gap-4">
            <h4
              className="text-[34px] leading-[38px] font-bold text-[#1A1A1A] tracking-[-0.02em]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Ideas for
              <br />
              progress.
            </h4>
            <div className="flex gap-2">
              <span className="size-5 bg-[#C84B31]" />
              <span className="size-5 bg-[#2D5F3F]" />
              <span className="size-5 bg-[#E8C547]" />
              <span className="size-5 bg-[#1A1A1A]" />
            </div>
          </div>
        </div>
      }
    />
  );
}

function CardEasing() {
  return (
    <Card
      title="Easing curves, plotted"
      subtitle="A small library of springs and curves I reach for daily."
      preview={
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 349 270"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* grid */}
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
              <line x1="0" y1="67" x2="349" y2="67" />
              <line x1="0" y1="135" x2="349" y2="135" />
              <line x1="0" y1="202" x2="349" y2="202" />
              <line x1="87" y1="0" x2="87" y2="270" />
              <line x1="174" y1="0" x2="174" y2="270" />
              <line x1="261" y1="0" x2="261" y2="270" />
            </g>
            {/* curve */}
            <path
              d="M 30 220 C 120 220, 180 60, 320 50"
              stroke="#FACC15"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="320" cy="50" r="5" fill="#FACC15" />
          </svg>
        </div>
      }
    />
  );
}

function CardPhone() {
  return (
    <Card
      title="A music app, reimagined"
      subtitle="Color, blur, and gesture as the interface."
      preview={
        <div className="absolute inset-0 bg-[#F4F4F5] flex items-end justify-center pt-8">
          <div
            className="w-[180px] h-[240px] rounded-t-[28px] relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, #C7A6D9 0%, #E48BA8 50%, #F39B7A 100%)",
              boxShadow: "0 -8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[9px] font-medium tracking-[0.16em] opacity-80">
                NOW PLAYING
              </p>
              <p className="text-[15px] font-semibold mt-1 leading-tight">
                Slow Dancing
              </p>
              <p className="text-[11px] opacity-85 mt-0.5">V. Mortensen</p>
              <div className="mt-3 h-[2px] bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

function CardEditor() {
  return (
    <Card
      title="Code-to-design pipeline"
      subtitle="Translating React components into Paper artboards."
      preview={
        <div className="absolute inset-0 bg-[#F4F4F5] p-5 flex items-start justify-center pt-6">
          <div className="w-full max-w-[280px] bg-white rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-zinc-100">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[10px] text-zinc-500">
                portfolio.tsx
              </span>
            </div>
            <pre className="font-mono text-[10px] leading-[16px] px-3 py-2 text-zinc-800">
              <code>
                <span className="text-zinc-400">1</span>{" "}
                <span className="text-[#A855F7]">export</span>{" "}
                <span className="text-[#A855F7]">function</span>{" "}
                <span className="text-[#2563EB]">Craft</span>() {"{"}
                {"\n"}
                <span className="text-zinc-400">2</span>{" "}
                <span className="text-[#A855F7]">return</span>{" "}
                <span className="text-zinc-700">&lt;</span>
                <span className="text-[#16A34A]">Grid</span>{" "}
                <span className="text-[#0891B2]">cols</span>=
                <span className="text-zinc-700">{"{3}"}</span>
                <span className="text-zinc-700">&gt;</span>
                {"\n"}
                <span className="text-zinc-400">3</span>{" "}
                {"{projects.map(p => ("}
                {"\n"}
                <span className="text-zinc-400">4</span>{" "}
                <span className="text-zinc-700">&lt;</span>
                <span className="text-[#16A34A]">Card</span>{" "}
                <span className="text-[#0891B2]">key</span>=
                <span className="text-zinc-700">{"{p.id}"}</span>{" "}
                <span className="text-zinc-700">/&gt;</span>
                {"\n"}
                <span className="text-zinc-400">5</span> {"))}"}
                {"\n"}
                <span className="text-zinc-400">6</span>{" "}
                <span className="text-zinc-700">&lt;/</span>
                <span className="text-[#16A34A]">Grid</span>
                <span className="text-zinc-700">&gt;</span>
                {"\n"}
                <span className="text-zinc-400">7</span> {"}"}
              </code>
            </pre>
          </div>
        </div>
      }
    />
  );
}

function CardQuote() {
  return (
    <Card
      title="Restraint"
      subtitle="The case for fewer elements, more intention."
      preview={
        <div className="absolute inset-0 bg-[#F4EFE6] flex flex-col items-center justify-center px-8 text-center">
          <p
            className="text-[22px] leading-[30px] text-[#1A1A1A] font-medium"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A design is finished
            <br />
            when nothing else can
            <br />
            be taken away.
          </p>
          <p className="mt-5 text-[10px] tracking-[0.18em] text-[#6B6358] font-medium">
            — ANTOINE DE SAINT-EXUPÉRY
          </p>
        </div>
      }
    />
  );
}
