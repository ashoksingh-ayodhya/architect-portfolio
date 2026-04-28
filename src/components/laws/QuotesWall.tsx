import { useState } from "react";
import InViewGate from "@/components/laws/InViewGate";

/**
 * Famous movie/TV quotes — each quote flips on click to reveal the
 * performance-marketing lesson. Click anywhere on a card to toggle.
 */
type Quote = {
  line: string;
  src: string;
  flip: string;
  tag: string;
  tone: "acid" | "warn" | "pop" | "paper";
};

const QUOTES: Quote[] = [
  {
    line: "“A.B.C. — Always Be Closing.”",
    src: "Glengarry Glen Ross (1992)",
    flip: "Always be testing. Closing is a lagging indicator of a hook that already worked.",
    tag: "creative",
    tone: "warn",
  },
  {
    line: "“I’m gonna make him an offer he can’t refuse.”",
    src: "The Godfather (1972)",
    flip: "Also known as: the landing page. Value prop in one line or the mouse moves.",
    tag: "CRO",
    tone: "paper",
  },
  {
    line: "“60% of the time, it works every time.”",
    src: "Anchorman (2004)",
    flip: "This is what agency case studies sound like without incrementality tests.",
    tag: "measurement",
    tone: "acid",
  },
  {
    line: "“I am inevitable.”",
    src: "Avengers: Endgame",
    flip: "— said the CAC, climbing quietly for 6 weeks while you A/B tested button colors.",
    tag: "CAC",
    tone: "warn",
  },
  {
    line: "“That’s what she said.”",
    src: "The Office — Michael Scott",
    flip: "What your CMO says to every attribution number over 3x. Treat accordingly.",
    tag: "attribution",
    tone: "paper",
  },
  {
    line: "“Money never sleeps, pal.”",
    src: "Wall Street (1987)",
    flip: "Neither does your auction. But your creative pipeline sleeps Fri–Sun. Fix that.",
    tag: "paid media",
    tone: "pop",
  },
  {
    line: "“I drink your milkshake.”",
    src: "There Will Be Blood (2007)",
    flip: "Brand search cannibalization, narrated by Daniel Day-Lewis.",
    tag: "paid search",
    tone: "warn",
  },
  {
    line: "“L’enfer, c’est les autres.”  /  Hell is other people.",
    src: "Sartre, via every Q4 planning meeting",
    flip: "Specifically: other teams owning the landing page you depend on.",
    tag: "ops",
    tone: "paper",
  },
  {
    line: "“You get nothing. Good day, sir.”",
    src: "Willy Wonka (1971)",
    flip: "— the iOS 14 update, to your retargeting audience, in 2021.",
    tag: "privacy",
    tone: "acid",
  },
  {
    line: "“Tell him to go and fuck himself.”",
    src: "Succession — Logan Roy",
    flip: "Healthy response to anyone promising guaranteed ROAS in a cold email.",
    tag: "agencies",
    tone: "warn",
  },
  {
    line: "“It’s always sunny… in the dashboard.”",
    src: "Always Sunny, loosely",
    flip: "Platform dashboards are mood lighting. Finance has the actual weather report.",
    tag: "blended MER",
    tone: "paper",
  },
  {
    line: "“Winter is coming.”",
    src: "Game of Thrones",
    flip: "Translation: your creative has a 14-day half-life and you made four ads this month.",
    tag: "creative decay",
    tone: "pop",
  },
  {
    line: "“We used to make things in this country.”",
    src: "The Wire — Frank Sobotka",
    flip: "We used to do holdout tests, too. Then someone bought a new dashboard.",
    tag: "measurement",
    tone: "paper",
  },
  {
    line: "“I am the one who knocks.”",
    src: "Breaking Bad — Walter White",
    flip: "Direct traffic, taking full credit for the brand spend it never paid for.",
    tag: "attribution",
    tone: "warn",
  },
  {
    line: "“Make it so.”",
    src: "Star Trek: TNG — Picard",
    flip: "What executives say about ideas that have not been scoped, staffed, or funded.",
    tag: "ops",
    tone: "acid",
  },
  {
    line: "“I don’t know what I don’t know.”",
    src: "The Big Short (2015)",
    flip: "The only honest sentence in a marketing QBR. Say it more.",
    tag: "measurement",
    tone: "paper",
  },
  {
    line: "“Believe.”",
    src: "Ted Lasso",
    flip: "Also the entire methodology behind MQL scoring. Discuss.",
    tag: "lifecycle",
    tone: "pop",
  },
  {
    line: "“Tabs vs spaces.”",
    src: "Silicon Valley (HBO)",
    flip: "CAC vs LTV. Both sides yelling, nobody’s looking at payback period.",
    tag: "unit econ",
    tone: "paper",
  },
  {
    line: "“Funny how? I mean, funny like I’m a clown? I amuse you?”",
    src: "Goodfellas (1990)",
    flip: "Your CEO, when you say a campaign with no UTMs ‘felt like it worked.’",
    tag: "measurement",
    tone: "warn",
  },
  {
    line: "“Inconceivable!” / “You keep using that word…”",
    src: "The Princess Bride (1987)",
    flip: "Translation: ‘viral,’ ‘omnichannel,’ ‘full-funnel,’ used in the same sentence.",
    tag: "buzzwords",
    tone: "acid",
  },
  {
    line: "“Looks like somebody’s got a case of the Mondays.”",
    src: "Office Space (1999)",
    flip: "Said cheerfully on the morning your iOS attribution dashboard breaks again.",
    tag: "ops",
    tone: "pop",
  },
];

const toneCls = (t: Quote["tone"]) => {
  switch (t) {
    case "acid":  return "bg-acid text-ink";
    case "warn":  return "bg-warn text-paper";
    case "pop":   return "bg-pop/15 text-ink";
    default:      return "bg-paper text-ink";
  }
};

const QuoteCard = ({ q, i }: { q: Quote; i: number }) => {
  const [open, setOpen] = useState(false);
  const rot = ((i * 37) % 7) - 3;
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="jiggle anim-pop group relative block h-full w-full text-left focus:outline-none"
      style={{ ['--rot' as never]: `${rot}deg`, animationDelay: `${(i % 8) * 60}ms` }}
    >
      <div
        className={`relative h-full rounded-lg border-2 border-ink p-4 shadow-[var(--shadow-sticker)] transition-transform duration-300 ${toneCls(q.tone)} ${
          open ? "rotate-0 scale-[1.02]" : ""
        }`}
      >
        <span className="absolute -top-2 left-3 sticker-ink rounded-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
          {q.tag}
        </span>
        <p className="font-display text-xl leading-[1.05] sm:text-2xl">{q.line}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider opacity-70">— {q.src}</p>

        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="border-t border-ink/30 pt-2 font-marker text-xl leading-tight">
              {q.flip}
            </p>
          </div>
        </div>

        <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase opacity-60">
          {open ? "tap to hide" : "tap for truth"}
        </span>
      </div>
    </button>
  );
};

const QuotesWall = () => (
  <section id="quotes" className="relative px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3 sm:mb-12">
        <div>
          <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] ink-faint">
            intermission · the quote wall
          </p>
          <h2 className="mt-2 font-display text-[2.2rem] leading-none sm:text-5xl lg:text-6xl">
            every <span className="highlight">marketing truth</span> was<br className="hidden sm:inline" />
            already said in a movie.
          </h2>
        </div>
        <p className="font-marker text-2xl text-warn">tap a card · pls</p>
      </div>

      <InViewGate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <QuoteCard key={q.line} q={q} i={i} />
          ))}
        </div>
      </InViewGate>
    </div>
  </section>
);

export default QuotesWall;
