/** LAW 09 — Fake Slack DM about creative iteration. */
const SlackDm = () => {
  const msgs: Array<{ who: "boss" | "you"; text: string; t: string; tone?: string }> = [
    { who: "boss", text: "can we make the logo bigger", t: "9:41" },
    { who: "you",  text: "the CTR went down 38% last time we did", t: "9:41" },
    { who: "boss", text: "yeah but the CEO can’t see it", t: "9:42" },
    { who: "you",  text: "the CEO is not the buyer", t: "9:42" },
    { who: "boss", text: "let’s align on this", t: "9:43" },
    { who: "you",  text: "we are aligned. you are wrong.", t: "9:43", tone: "bg-acid" },
  ];
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div className="paper rounded-xl p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2 border-b border-ink/15 pb-2">
          <span className="h-3 w-3 rounded-full bg-warn" />
          <span className="h-3 w-3 rounded-full bg-acid2" />
          <span className="h-3 w-3 rounded-full bg-good" />
          <span className="ml-2 font-grotesk text-xs font-bold">#growth-feedback</span>
          <span className="ml-auto font-mono text-[10px] ink-faint">3 unread</span>
        </div>
        <ul className="space-y-2.5">
          {msgs.map((m, i) => (
            <li
              key={i}
              className={`anim-slide flex ${m.who === "you" ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <div
                className={`max-w-[85%] rounded-2xl border-2 border-ink px-3 py-2 text-sm ${
                  m.tone ?? (m.who === "you" ? "bg-paper" : "bg-paper")
                } ${m.who === "you" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-grotesk text-[10px] font-bold uppercase ink-faint">
                    {m.who === "you" ? "you" : "boss"}
                  </span>
                  <span className="font-mono text-[10px] ink-faint">{m.t}</span>
                </div>
                <p className="mt-0.5">{m.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2 rounded-md border border-ink/40 bg-paper px-3 py-2">
          <span className="font-mono text-xs ink-faint">type a passive-aggressive reply…</span>
          <span className="ml-auto font-mono text-xs ink-faint anim-blink">|</span>
        </div>
      </div>
    </div>
  );
};

export default SlackDm;
