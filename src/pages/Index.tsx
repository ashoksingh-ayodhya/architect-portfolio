import Hero from "@/components/laws/Hero";
import Marquee from "@/components/laws/Marquee";
import LawSection from "@/components/laws/LawSection";
import SiteFooter from "@/components/laws/SiteFooter";
import DoodleLayer from "@/components/laws/DoodleLayer";
import CursorMarker from "@/components/laws/CursorMarker";
import BullshitMeter from "@/components/laws/BullshitMeter";
import QuotesWall from "@/components/laws/QuotesWall";
import StickyNotes from "@/components/laws/StickyNotes";
import ToldYouCounter from "@/components/laws/ToldYouCounter";
import ScrollTape from "@/components/laws/ScrollTape";
import { PersonaProvider } from "@/components/laws/PersonaContext";
import PersonaPicker from "@/components/laws/PersonaPicker";

import Iceberg from "@/components/laws/visuals/Iceberg";
import DrakeCacLtv from "@/components/laws/visuals/DrakeCacLtv";
import DistractedCmo from "@/components/laws/visuals/DistractedCmo";
import DunningKruger from "@/components/laws/visuals/DunningKruger";
import CreativePowerLaw from "@/components/laws/visuals/CreativePowerLaw";
import ExpandingBrain from "@/components/laws/visuals/ExpandingBrain";
import RoasReceipt from "@/components/laws/visuals/RoasReceipt";
import LeakyFunnel from "@/components/laws/visuals/LeakyFunnel";
import SlackDm from "@/components/laws/visuals/SlackDm";
import BuzzwordBingo from "@/components/laws/visuals/BuzzwordBingo";
import CreativeDecay from "@/components/laws/visuals/CreativeDecay";
import TwoButtons from "@/components/laws/visuals/TwoButtons";

const wrap = (node: React.ReactNode) => (
  <div className="jiggle transition-transform">{node}</div>
);

const Index = () => (
  <PersonaProvider>
    <main className="relative min-h-screen overflow-x-hidden pb-20">
      <ScrollTape />
      <CursorMarker />
      <DoodleLayer />

      <Hero />

      {/* Persona selector — changes the copy & examples below */}
      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <PersonaPicker variant="hero" />
        </div>
      </section>

      <Marquee />

    <LawSection
      id="law-01"
      number="01"
      kicker="LAW · 01"
      tldr="last-click is a horoscope"
      title={<>Attribution is an <span className="highlight">iceberg</span>. The dashboard sees the tip.</>}
      body={
        <>
          <p>
            Your CMO points at the <em>last-click</em> sliver and asks why brand
            spend isn’t “working.” It’s working. It is the entire iceberg you are
            currently steering a Q4 plan into.
          </p>
          <p className="font-marker text-xl text-warn">
            test: turn off the channel. measure the hole.
          </p>
        </>
      }
      receipt="data: every B2B holdout test we’ve ever shipped"
      visual={wrap(<Iceberg />)}
    />

    <LawSection
      id="law-02"
      number="02"
      kicker="LAW · 02"
      tldr="CAC is loud. payback is right."
      reverse
      title={<>If your KPI fits in a <span className="highlight">single number</span>, it’s lying to you.</>}
      body={
        <>
          <p>
            CAC without payback is a number you can shrink by being worse at sales.
            LTV without cohort math is a fanfic. Payback is what the CFO actually
            felt last month.
          </p>
          <p>
            One number is a press release. Three numbers, by cohort, are a business.
          </p>
        </>
      }
      receipt="if you cannot defend it by cohort, it didn’t happen"
      visual={wrap(<DrakeCacLtv />)}
    />

    <LawSection
      id="law-03"
      number="03"
      kicker="LAW · 03"
      tldr="the new shiny is rarely the bottleneck"
      title={<>The next <span className="highlight-warn">vendor demo</span> will not save you.</>}
      body={
        <>
          <p>
            Lead routing has been broken since 2021. The data warehouse has three
            sources of truth. Sales hasn’t opened the playbook. And yet — fourth
            martech RFP this year.
          </p>
          <p>
            Distracted-CMO syndrome is treatable. Symptom: re-platforming. Cure:
            fixing the boring thing that already prints money.
          </p>
        </>
      }
      receipt="based on a true story · all of them"
      visual={wrap(<DistractedCmo />)}
    />

    <LawSection
      id="law-04"
      number="04"
      kicker="LAW · 04"
      tldr="the worst takes have the highest CTR"
      reverse
      title={<>The <span className="highlight">loudest</span> media buyer in the room has been doing it for nine weeks.</>}
      body={
        <>
          <p>
            Week 2: “ROAS is easy.” Week 6: cold sweat. Month 3: humility. Year 2:
            quietly running incrementality tests and refusing to celebrate before
            geo-lift confirms.
          </p>
          <p>
            The skill curve is a U-bend. If your agency’s pitch was straight up,
            they’re on the left side of it.
          </p>
        </>
      }
      receipt="confidence and competence are not the same axis"
      visual={wrap(<DunningKruger />)}
    />

    <LawSection
      id="law-05"
      number="05"
      kicker="LAW · 05"
      tldr="20 ads. 1 winner. cope."
      title={<>Creative is a <span className="highlight">power law</span>. Stop pretending it’s a bell curve.</>}
      body={
        <>
          <p>
            Three out of twenty ads carry the account. The other seventeen exist
            so the three could be born. Treating them as “equally promising” is
            how budgets die in democracy.
          </p>
          <p className="font-marker text-xl text-warn">
            kill faster. promote louder. apologise to no one.
          </p>
        </>
      }
      receipt="every ad account, every quarter, since the beginning of ad accounts"
      visual={wrap(<CreativePowerLaw />)}
    />

    <LawSection
      id="law-06"
      number="06"
      kicker="LAW · 06"
      tldr="measure what you didn’t do, too"
      reverse
      title={<>Attribution maturity is just learning to <span className="highlight">trust holdouts</span>.</>}
      body={
        <>
          <p>
            Last-click → time-decay → Markov → MMM is not a tool stack. It’s a
            grief cycle. You bargain with platform dashboards until one quarter
            you finally accept that the only honest number came from the campaign
            you intentionally <em>didn’t</em> run.
          </p>
        </>
      }
      receipt="GA is not a measurement system, GA is a feelings journal"
      visual={wrap(<ExpandingBrain />)}
    />

    <BullshitMeter />

    <LawSection
      id="law-07"
      number="07"
      kicker="LAW · 07"
      tldr="add up your ROAS. now divide by reality."
      title={<>If platform ROAS &gt; revenue, you’re double-counting <span className="highlight-warn">someone’s lunch</span>.</>}
      body={
        <>
          <p>
            Meta says 5x. Google says 4x. TikTok says 9x. Your bank account, with
            the calm authority of a rock, says <em>1.9x</em>. Each platform takes
            full credit for the same conversion, like four uncles claiming credit
            for one cousin.
          </p>
          <p>
            Blended MER is the only number with a job.
          </p>
        </>
      }
      receipt="finance has the receipts. so do we now."
      visual={wrap(<RoasReceipt />)}
    />

    <LawSection
      id="law-08"
      number="08"
      kicker="LAW · 08"
      tldr="every stage leaks. that’s the stage."
      reverse
      title={<>Your funnel is a <span className="highlight">colander</span>. The plan should be plumbing.</>}
      body={
        <>
          <p>
            Don’t tell us how many MQLs you’re generating. Tell us how many MQLs
            you’re losing between scoring and routing because someone deleted
            a Salesforce field on a Friday.
          </p>
          <p>
            Top-of-funnel is a vanity sport. Conversion-rate-between-stages is
            where companies are quietly built or quietly bled.
          </p>
        </>
      }
      receipt="the floor is wet, the bucket has a hole, and the meeting is about fonts"
      visual={wrap(<LeakyFunnel />)}
    />

    <QuotesWall />

    <LawSection
      id="law-09"
      number="09"
      kicker="LAW · 09"
      tldr="stakeholder ≠ user"
      title={<>The CEO is not your <span className="highlight">buyer</span>. Please act accordingly.</>}
      body={
        <>
          <p>
            “Make the logo bigger.” “Move it above the fold.” “Let’s try a video,
            but keep it under 30 seconds and also longer.” Every test that ever
            ran has died on the rocks of a senior person typing at 9:41pm.
          </p>
          <p>
            Decisions belong to whoever holds the data. Opinions, however senior,
            do not vote.
          </p>
        </>
      }
      receipt="this dm has been re-enacted in 437 unique companies"
      visual={wrap(<SlackDm />)}
    />

    <LawSection
      id="law-10"
      number="10"
      kicker="LAW · 10"
      tldr="words ≠ work"
      reverse
      title={<>If the slide reads like a <span className="highlight">bingo card</span>, that’s because it is one.</>}
      body={
        <>
          <p>
            “We’ll synergize an AI-native, category-defining, intent-led, brand-led,
            agentic, full-funnel motion.” Cool. Who shipped what, by when, against
            which baseline?
          </p>
          <p>
            Every buzzword on the deck is one fewer mechanism in the plan. The
            inverse is also true and rarer.
          </p>
        </>
      }
      receipt="rule of thumb: 3+ buzzwords per slide = nobody knows what we’re doing"
      visual={wrap(<BuzzwordBingo />)}
    />

    <StickyNotes />

    <LawSection
      id="law-11"
      number="11"
      kicker="LAW · 11"
      tldr="the winner today is the loser by Q3"
      title={<>Every ad has a <span className="highlight">half-life</span>. Plan for the funeral, not the honeymoon.</>}
      body={
        <>
          <p>
            The first two weeks are a sugar high. CPA is gorgeous. The boss says
            scale. By day 21 the audience is saturated, the hook is stale, and
            CPA has quietly tripled — but the spend is still set to “send it.”
          </p>
          <p>
            Always be making the next ad. If your creative pipeline is one
            person on Fridays, your ROAS is on a timer.
          </p>
        </>
      }
      receipt="creative is yogurt · check the date · throw it out"
      visual={wrap(<CreativeDecay />)}
    />

    <LawSection
      id="law-12"
      number="12"
      kicker="LAW · 12"
      tldr="60 / 40, please go home"
      reverse
      title={<>Brand vs. performance is a <span className="highlight">false binary</span> sold by people who chose neither.</>}
      body={
        <>
          <p>
            Performance picks the fruit. Brand grows the tree. If you only do one,
            in three years you’re bidding against your own brand search and calling
            it efficiency.
          </p>
          <p>
            The split has been roughly 60 brand / 40 performance for two decades
            of evidence. Maybe just… do that. Then go for a walk.
          </p>
        </>
      }
      receipt="Binet & Field, ‘The Long and the Short of It’, 2013, still right"
      visual={wrap(<TwoButtons />)}
    />

    <section className="px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-md">
        <ToldYouCounter />
      </div>
    </section>

      <SiteFooter />

      {/* Sticky persona switcher — always reachable */}
      <PersonaPicker variant="sticky" />
    </main>
  </PersonaProvider>
);

export default Index;
