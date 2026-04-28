/** Top marquee — looping LinkedIn-bro phrases for ambient sarcasm. */
const Marquee = () => {
  const phrases = [
    "★ no ROAS guarantees",
    "★ no “growth hacks”",
    "★ MMM is just regression with a haircut",
    "★ your ICP is not a vibe",
    "★ creative is yogurt",
    "★ stop A/B testing button colors",
    "★ blended ROAS is the only ROAS",
    "★ the funnel is a colander",
    "★ ‘intent data’ is a horoscope",
    "★ brand or die, math or die, pick both",
  ];
  const line = phrases.join("    ");
  return (
    <div className="border-y-2 border-ink bg-ink text-paper overflow-hidden">
      <div className="anim-marquee whitespace-nowrap py-2 font-grotesk text-sm font-bold uppercase tracking-wider">
        <span className="px-6">{line}</span>
        <span className="px-6" aria-hidden="true">{line}</span>
      </div>
    </div>
  );
};

export default Marquee;
