import LawSection from "@/components/laws/LawSection";
import SiteFooter from "@/components/laws/SiteFooter";
import DoodleLayer from "@/components/laws/DoodleLayer";
import ScrollTape from "@/components/laws/ScrollTape";
import InViewGate from "@/components/laws/InViewGate";

import LeakyCheckout from "@/components/laws/visuals/LeakyCheckout";
import HeatmapParody from "@/components/laws/visuals/HeatmapParody";
import FormGraveyard from "@/components/laws/visuals/FormGraveyard";

const wrap = (node: React.ReactNode) => (
  <div className="jiggle transition-transform">{node}</div>
);

const ConversionPage = () => (
  <main className="relative min-h-screen overflow-x-hidden pb-20">
    <ScrollTape />
    <DoodleLayer />

    {/* Page Hero */}
    <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pt-20">
      <InViewGate>
        <div className="mx-auto max-w-5xl">
          <p className="anim-slide font-marker text-3xl text-warn sm:text-4xl">
            the conversion playbook.
          </p>
          <h1 className="mt-2 font-display text-balance text-[3.2rem] leading-[0.9] sm:text-[4.6rem] md:text-[5.6rem] lg:text-[7rem]">
            three <span className="highlight">laws</span> of turning
            <br className="hidden sm:inline" />{" "}
            visitors into <span className="italic">actual</span> customers.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed ink-soft sm:mt-8 sm:text-lg">
            You spent $40k driving traffic to a page that asks for a fax number.
            The CRO agency charged $15k to change a button colour. Here is what
            actually moves the needle.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <a href="#conv-01" className="sticker-ink inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
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
      id="conv-01"
      number="01"
      kicker="CONVERSION · 01"
      tldr="every field is an exit door"
      title={<>Your checkout has <span className="highlight">six</span> required fields. Five of them are none of your business.</>}
      body={
        <>
          <p>
            Name and email are the rent. Everything else — phone, company size,
            job title, "how did you hear about us" — is a toll booth you installed
            on your own highway.
          </p>
          <p>
            The best B2B forms convert at 35%. The average has 11 fields and
            converts at 3%. The math is not subtle.
          </p>
          <p className="font-marker text-xl text-warn">
            test: remove half your fields. watch what happens.
          </p>
        </>
      }
      receipt="HubSpot, 2023: forms with 3 fields convert 2.5x better than 8+"
      visual={wrap(<LeakyCheckout />)}
    />

    <LawSection
      id="conv-02"
      number="02"
      kicker="CONVERSION · 02"
      tldr="your heatmap is a horror story"
      reverse
      title={<>The <span className="highlight">hottest</span> zone on your landing page is the close button.</>}
      body={
        <>
          <p>
            You paid $4k for heatmap software to discover that users click "NO"
            on your modal, scroll past your hero video, and exit from the
            cookie-banner. This is not insight. This is a cry for help.
          </p>
          <p>
            If your CTA is not the hottest pixel on the page, the page is not
            working. It is just hosting your brand colours.
          </p>
        </>
      }
      receipt="every heatmap ever: users want the content, not the popup"
      visual={wrap(<HeatmapParody />)}
    />

    <LawSection
      id="conv-03"
      number="03"
      kicker="CONVERSION · 03"
      tldr="the graveyard grows every quarter"
      title={<>Every required field you add has <span className="highlight">killed</span> a lead. They have names.</>}
      body={
        <>
          <p>
            "Fax number" died in 2019. "Department" died when your ICP became
            "anyone with a budget." "Referral source" died because nobody
            remembers. And yet they still sit there, ghost fields haunting your
            form, scaring real humans.
          </p>
          <p>
            The leads that ghosted you are not unqualified. They were qualified
            enough to click, then you asked for their life story.
          </p>
          <p className="font-marker text-xl text-warn">
            rule: if you would not ask it on a first date, do not ask it on a form.
          </p>
        </>
      }
      receipt="formstack: 1 extra field = 11% drop in conversions"
      visual={wrap(<FormGraveyard />)}
    />

    <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-marker text-3xl text-warn sm:text-4xl">
          fewer fields. more sales. shocking.
        </p>
        <a href="/stack" className="sticker-ink mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
          next: the sales stack →
        </a>
      </div>
    </section>

    <SiteFooter />
  </main>
);

export default ConversionPage;
