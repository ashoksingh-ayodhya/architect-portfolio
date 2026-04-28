import LawSection from "@/components/laws/LawSection";
import SiteFooter from "@/components/laws/SiteFooter";
import DoodleLayer from "@/components/laws/DoodleLayer";
import ScrollTape from "@/components/laws/ScrollTape";
import InViewGate from "@/components/laws/InViewGate";

import CrmGraveyard from "@/components/laws/visuals/CrmGraveyard";
import ErpDashboard from "@/components/laws/visuals/ErpDashboard";
import SalesReality from "@/components/laws/visuals/SalesReality";

const wrap = (node: React.ReactNode) => (
  <div className="jiggle transition-transform">{node}</div>
);

const StackPage = () => (
  <main className="relative min-h-screen overflow-x-hidden pb-20">
    <ScrollTape />
    <DoodleLayer />

    {/* Page Hero */}
    <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pt-20">
      <InViewGate>
        <div className="mx-auto max-w-5xl">
          <p className="anim-slide font-marker text-3xl text-warn sm:text-4xl">
            the sales stack playbook.
          </p>
          <h1 className="mt-2 font-display text-balance text-[3.2rem] leading-[0.9] sm:text-[4.6rem] md:text-[5.6rem] lg:text-[7rem]">
            three <span className="highlight">laws</span> of CRMs,
            <br className="hidden sm:inline" />{" "}
            ERPs, and <span className="italic">dashboard theatre</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed ink-soft sm:mt-8 sm:text-lg">
            You bought Salesforce in 2019. You have 40,000 contacts. 16,000 are
            duplicates. 8,000 left their jobs. Your ERP syncs once a week, on
            Tuesdays, when nobody is looking.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <a href="#stack-01" className="sticker-ink inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
              start reading
              <span aria-hidden="true">↓</span>
            </a>
            <a href="/" className="sticker inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
              ← back to home
            </a>
          </div>
        </div>
      </InViewGate>
    </section>

    <LawSection
      id="stack-01"
      number="01"
      kicker="STACK · 01"
      tldr="your CRM is a zombie army"
      title={<>40% of your CRM contacts are <span className="highlight">dead</span>. The other 60% are lying.</>}
      body={
        <>
          <p>
            The "prospect" you emailed last week left the company in 2023. The
            "MQL" from Q1 is a test account. The "enterprise opportunity" is a
            intern who filled out the demo form to win a bet.
          </p>
          <p>
            Sales blames marketing for bad leads. Marketing blames sales for not
            updating records. Meanwhile the CRM grows like a tumour, and nobody
            has run a duplicate merge since the Obama administration.
          </p>
          <p className="font-marker text-xl text-warn">
            clean your data or stop trusting your pipeline.
          </p>
        </>
      }
      receipt="salesforce data: 30% of B2B contact data decays yearly"
      visual={wrap(<CrmGraveyard />)}
    />

    <LawSection
      id="stack-02"
      number="02"
      kicker="STACK · 02"
      tldr="your ERP dashboard is a PowerPoint in a tracksuit"
      reverse
      title={<>The <span className="highlight">dashboard</span> says green. The bank account disagrees.</>}
      body={
        <>
          <p>
            Your ERP has 47 charts. 46 of them are forecast. One of them is actuals,
            and it is buried three menus deep behind a login that only Finance has.
          </p>
          <p>
            The "live sync" has been syncing since March. The "real-time revenue"
            widget refreshes every 6 hours, which is just slow enough for everyone
            to make decisions on stale data and blame the algorithm.
          </p>
        </>
      }
      receipt="every ERP implementation: 18 months late, 2x over budget, still manual exports"
      visual={wrap(<ErpDashboard />)}
    />

    <LawSection
      id="stack-03"
      number="03"
      kicker="STACK · 03"
      tldr="your pipeline is a participation trophy"
      title={<>CRM says 90% close rate. <span className="highlight">Calendar</span> says 4 meetings this month.</>}
      body={
        <>
          <p>
            Sales reps inflate pipeline stages because their bonus depends on
            forecast accuracy, not closed revenue. By Q3 the CRM shows $4M in
            "commit" and the actual booked number is $400k. Nobody is surprised.
            This is not forecasting. This is astrology with a Salesforce login.
          </p>
          <p>
            The real funnel is brutal: 500 prospects → 180 MQLs → 60 SQLs → 22
            opps → 7 deals. But nobody puts that slide in the board deck.
          </p>
          <p className="font-marker text-xl text-warn">
            if your win rate is above 50%, you are not forecasting. you are hoping.
          </p>
        </>
      }
      receipt="forrester: 43% of forecasted deals never close"
      visual={wrap(<SalesReality />)}
    />

    <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-marker text-3xl text-warn sm:text-4xl">
          fewer tools. cleaner data. honest numbers.
        </p>
        <a href="/conversion" className="sticker-ink mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
          ← the conversion playbook
        </a>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default StackPage;
