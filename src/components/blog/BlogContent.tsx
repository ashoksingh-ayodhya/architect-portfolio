import { ContentBlock } from "@/data/blogPosts";
import ScrambleText from "./animations/ScrambleText";
import HighlightSweep from "./animations/HighlightSweep";
import StickerSlap from "./animations/StickerSlap";
import CounterRoll from "./animations/CounterRoll";
import Typewriter from "./animations/Typewriter";
import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  ink: "ink-faint",
  warn: "text-warn",
  acid: "text-acid",
};

const Block = ({ block, index }: { block: ContentBlock; index: number }) => {
  switch (block.type) {
    case "heading":
      return block.level === 3 ? (
        <h3 className="mt-10 mb-4 font-display text-2xl leading-tight sm:text-3xl">
          <ScrambleText text={block.text} delay={index * 50} />
        </h3>
      ) : (
        <h2 className="mt-14 mb-5 font-display text-3xl leading-tight sm:text-4xl">
          <ScrambleText text={block.text} delay={index * 50} />
        </h2>
      );

    case "paragraph":
      return (
        <p className="mb-5 text-base leading-relaxed sm:text-lg">
          {block.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-acid pl-5">
          <p className="font-marker text-2xl text-warn sm:text-3xl">
            "{block.text}"
          </p>
          {block.attribution && (
            <cite className="mt-2 block font-mono text-xs not-italic ink-faint">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "receipt":
      return (
        <div className="my-8 max-w-md">
          <div className="paper relative rounded-lg border-2 border-ink p-5 font-mono text-sm sm:text-base">
            <div className="absolute inset-x-0 -top-2 h-3" style={{ background: "repeating-linear-gradient(45deg, transparent 0 6px, hsl(var(--background)) 6px 12px), hsl(var(--paper))", maskImage: "linear-gradient(180deg, hsl(var(--paper)) 50%, transparent 50%)" }} />
            <p className="font-display text-lg">{block.label}</p>
            <p className="mb-3 ink-faint text-xs">order #{Math.floor(Math.random() * 900) + 100} — self-reported</p>
            <hr className="my-3 border-dashed border-ink/20" />
            <ul className="space-y-1.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3">
                  <span className={cn(toneMap[item.tone || "ink"])}>{item.label}</span>
                  <span className={cn("font-bold", toneMap[item.tone || "ink"])}>{item.value}</span>
                </li>
              ))}
            </ul>
            <hr className="my-3 border-dashed border-ink/20" />
            <div className="flex items-baseline justify-between">
              <span>TOTAL</span>
              <span className="font-display text-xl">$ feelings</span>
            </div>
            <p className="mt-2 text-xs ink-faint">tip not included — neither is incrementality</p>
          </div>
        </div>
      );

    case "divider":
      return <hr className="my-10 border-ink/10" />;

    case "list":
      return (
        <ul className="my-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-acid" />
              <span className="text-base leading-relaxed sm:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "sticker":
      return (
        <div className="my-6">
          <StickerSlap text={block.text} tone={block.tone || "warn"} />
        </div>
      );

    case "marquee":
      return (
        <div className="my-8 overflow-hidden border-y border-ink/10 py-3">
          <div className="anim-marquee whitespace-nowrap font-grotesk text-xs font-bold uppercase tracking-wider ink-faint">
            {block.text}
          </div>
        </div>
      );

    case "counter":
      return (
        <div className="my-8 text-center">
          <p className="font-grotesk text-xs font-bold uppercase tracking-wider ink-faint">{block.label}</p>
          <p className="mt-1 font-display text-6xl">
            <CounterRoll value={block.value} suffix={block.suffix} />
          </p>
        </div>
      );

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-lg border-2 border-ink bg-paper p-4 font-mono text-sm">
          <code>{block.text}</code>
        </pre>
      );

    default:
      return null;
  }
};

const BlogContent = ({ blocks }: { blocks: ContentBlock[] }) => {
  return (
    <div className="prose-custom">
      {blocks.map((block, i) => (
        <Block key={i} block={block} index={i} />
      ))}
    </div>
  );
};

export default BlogContent;
