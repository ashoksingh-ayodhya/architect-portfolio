import type { ReactNode } from "react";
import type { Persona } from "./PersonaContext";

export interface PersonaSlot {
  tldr?: string;
  body?: ReactNode;
  receipt?: string;
}

type LawId =
  | "law-01" | "law-02" | "law-03" | "law-04" | "law-05" | "law-06"
  | "law-07" | "law-08" | "law-09" | "law-10" | "law-11" | "law-12";

// Only override what changes per persona. Missing → fall back to default in Index.tsx.
export const PERSONA_COPY: Record<LawId, Partial<Record<Persona, PersonaSlot>>> = {
  "law-01": {
    cmo: {
      tldr: "your dashboard is gaslighting your CFO",
      body: (
        <>
          <p>
            You stare at last-click in QBR and ask why brand is “underperforming.”
            Brand is the reason the last click happened at all. You are about to
            cut the legs off the chair you’re sitting on, on a Zoom, in front of
            the board.
          </p>
          <p className="font-marker text-xl text-warn">
            ask: what stops if I turn off brand for 8 weeks?
          </p>
        </>
      ),
      receipt: "every board deck where brand spend is line-item #1 on the chopping block",
    },
    founder: {
      tldr: "your gut is louder than the data, again",
      body: (
        <>
          <p>
            You launched the Google ad on Monday, a sale closed on Friday, and
            now Google Ads is the company religion. The other 9 touchpoints don’t
            send you a notification, so they don’t exist.
          </p>
          <p>Founder-led attribution = whichever channel you personally watched convert.</p>
        </>
      ),
      receipt: "n=1, your phone, last Tuesday",
    },
    agency: {
      tldr: "your reporting tab is a comfort blanket",
      body: (
        <>
          <p>
            Client wants the dashboard with the pretty 7x. You ship the dashboard.
            Meanwhile their MER is 1.6 and you both pretend not to notice until
            renewal week, when you suddenly discover incrementality.
          </p>
        </>
      ),
      receipt: "every QBR slide deck, 14:32 the day before the call",
    },
  },

  "law-02": {
    cmo: {
      tldr: "one-number KPIs are board theater",
      body: (
        <>
          <p>
            The board wants one number. Give them one number and they’ll set
            it as the bonus metric, and then your team will optimise toward
            being worse at sales to make CAC go down. Congratulations, you
            invented a doom loop.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "LTV is fanfic until month 12",
      body: (
        <>
          <p>
            You raised on a 36-month LTV calculated from 11 weeks of data and
            a vibe. The cohort hasn’t even churned yet. The slide says 4.2x.
            Reality is going to send a calendar invite in Q3.
          </p>
        </>
      ),
      receipt: "every seed deck with ‘early signal of strong retention’",
    },
    agency: {
      tldr: "ROAS is the mug. payback is the contract.",
      body: (
        <>
          <p>
            You report ROAS. The client funds the business out of cash. Those
            are not the same number, on the same day, in the same currency.
            Bring payback and contribution margin to the call or bring snacks.
          </p>
        </>
      ),
    },
  },

  "law-03": {
    cmo: {
      tldr: "another platform won’t fix your ops",
      body: (
        <>
          <p>
            You’re 3 weeks into evaluating a $400k/year CDP because attribution
            “feels off.” It feels off because nobody fired the events properly
            in 2022 and the analytics intern is gone. The CDP will not know that.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "stop hiring a head of growth to avoid hiring an analyst",
      body: (
        <>
          <p>
            You don’t need a VP. You need someone who will open the warehouse,
            count the rows, and tell you, calmly, that your funnel reporting
            has been double-counting trials since launch.
          </p>
        </>
      ),
    },
    agency: {
      tldr: "‘let’s also do TikTok’ is not a strategy",
      body: (
        <>
          <p>
            The client has a leaky checkout and you’re pitching them a 6th
            channel because the QBR needs a slide titled “What’s next.” The
            answer is fix the checkout. The slide should say fix the checkout.
          </p>
        </>
      ),
    },
  },

  "law-04": {
    cmo: { tldr: "the loudest pitch deck has the shortest track record" },
    founder: {
      tldr: "the agency that promised 10x has been open since March",
      body: (
        <>
          <p>
            They had a great deck. They had a great accent. They had two case
            studies and one of them was a sister company. By month 4 you’re
            running the account yourself in tabs at midnight.
          </p>
        </>
      ),
    },
    agency: {
      tldr: "your junior is loud. your senior is tired. both are right sometimes.",
    },
  },

  "law-05": {
    cmo: {
      tldr: "your committee killed the only ad that worked",
      body: (
        <>
          <p>
            The 3 winners always look unhinged in the review meeting. Someone
            senior says “this isn’t on brand.” It gets cut. The 17 polite ones
            ship. CPA goes up. Somebody blames the algorithm.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "make 20 ads or make excuses",
      body: (
        <>
          <p>
            You shot 3 ads with a videographer in February and you’ve been
            running them ever since. It is now almost summer. The audience
            has memorised your script. They are mouthing it back at the screen.
          </p>
        </>
      ),
    },
    agency: { tldr: "the brief asked for 5. ship 25. bill for 25." },
  },

  "law-06": {
    cmo: {
      tldr: "MMM doesn’t care about your feelings",
      body: (
        <>
          <p>
            Last-click → time-decay → Markov → MMM is a corporate stages-of-grief
            chart. Most orgs get stuck at ‘bargaining’ for about four years,
            which is also coincidentally how long the average CMO tenure is.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "geo-holdouts > vibes",
      body: (
        <>
          <p>
            Turn the channel off in 3 metros for 6 weeks. Watch what happens
            to revenue in those metros vs control. That is more honest than
            any dashboard you will ever buy. It also costs zero dollars.
          </p>
        </>
      ),
    },
    agency: { tldr: "sell the test, not the tool" },
  },

  "law-07": {
    cmo: {
      tldr: "if Meta + Google + TikTok > revenue, fire the math",
      body: (
        <>
          <p>
            Three platforms, three credits, one customer. You are not 19x.
            You are 1.9x and three vendors are taking turns high-fiving over
            your wallet.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "the bank account is the only honest dashboard",
      body: (
        <>
          <p>
            Open Stripe. Open the ads manager. Notice the gap. That gap is
            either fraud, double-counting, or your accountant. Pick one and
            investigate before the next board meeting.
          </p>
        </>
      ),
    },
    agency: {
      tldr: "MER is the only number the client’s CFO will accept in writing",
    },
  },

  "law-08": {
    cmo: {
      tldr: "the leak is between your teams, not your tools",
      body: (
        <>
          <p>
            Marketing throws MQLs over a fence. Sales drops 60% of them on the
            floor. Both teams report green to you, separately, on different
            slides, in different units, in the same meeting.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "your funnel is 4 spreadsheets and a Calendly",
      body: (
        <>
          <p>
            There is no funnel. There is you, a Notion page, a forgotten Zapier,
            and the prayer that someone replies to the welcome email. Stage-by-
            stage conversion is unknowable because the stages are vibes.
          </p>
        </>
      ),
    },
    agency: { tldr: "diagnose the colander before you pour in more leads" },
  },

  "law-09": {
    cmo: {
      tldr: "you are not the buyer. stop A/B testing yourself.",
      body: (
        <>
          <p>
            You haven’t been in the ICP for 8 years. You drive a different car,
            read different things, and skip your own ads. Your gut is a
            beautifully-tailored, completely irrelevant instrument.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "your taste is a feature until ~$5M ARR. then it’s a bug.",
    },
    agency: {
      tldr: "the 9:41pm Slack is not feedback. it’s anxiety in a trench coat.",
    },
  },

  "law-10": {
    cmo: { tldr: "if your strategy fits on a tote bag, it’s a tote bag" },
    founder: {
      tldr: "‘AI-native’ is not a go-to-market",
      body: (
        <>
          <p>
            You added ‘AI-native’ to the homepage on Tuesday. By Thursday so
            had 14,000 other companies. The buyer cannot tell you apart. The
            buyer was never going to be able to tell you apart from the
            homepage. The homepage is not the work.
          </p>
        </>
      ),
    },
    agency: {
      tldr: "every buzzword on the deck is one missing mechanism in the plan",
    },
  },

  "law-11": {
    cmo: {
      tldr: "your hero ad is past its expiry date",
      body: (
        <>
          <p>
            That ‘brand film’ you approved in January? CPA has tripled and
            nobody told you because the slide still shows the launch-week
            numbers, helpfully averaged over the quarter so the recent damage
            disappears into the mean.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "you cannot be the only one making the ads",
      body: (
        <>
          <p>
            You are the founder, the talent, the editor, the media buyer, and
            the person who decides if it’s ‘on brand.’ This is fine until week
            6, when you are tired and the next ad doesn’t get made and CPA
            quietly doubles.
          </p>
        </>
      ),
    },
    agency: { tldr: "the creative roadmap is the retainer. everything else is hosting." },
  },

  "law-12": {
    cmo: {
      tldr: "60/40 isn’t a vibe, it’s the actual data",
      body: (
        <>
          <p>
            You know this. Your team knows this. The board wants the slide
            with the down-funnel CAC anyway because brand doesn’t have a row
            in the spreadsheet. Make brand have a row in the spreadsheet.
          </p>
        </>
      ),
    },
    founder: {
      tldr: "do brand before you’re bidding against your own name",
      body: (
        <>
          <p>
            In year one ‘brand’ feels like a tax. In year three, you’re paying
            Google $14 a click to show up for searches of your own company,
            because nobody else is telling the story for you.
          </p>
        </>
      ),
    },
    agency: { tldr: "if you only sell performance, you’re a media buying desk, not an agency" },
  },
};
