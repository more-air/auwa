import { Header } from "@/components/header";

export const metadata = {
  title: "Brand | AUWA",
  description: "AUWA brand guidelines. Typography, colour, spacing, and component reference.",
};

/* ─── Design tokens (mirrored from globals.css for display) ─── */

const foundations = [
  { name: "Void", variable: "--color-void", value: "oklch(0.08 0.025 250)", css: "bg-void" },
  { name: "Cosmic 900", variable: "--color-cosmic-900", value: "oklch(0.13 0.030 250)", css: "bg-cosmic-900" },
  { name: "Cosmic 800", variable: "--color-cosmic-800", value: "oklch(0.18 0.028 250)", css: "bg-cosmic-800" },
  { name: "Cosmic 700", variable: "--color-cosmic-700", value: "oklch(0.25 0.025 250)", css: "bg-cosmic-700" },
  { name: "Cosmic 600", variable: "--color-cosmic-600", value: "oklch(0.35 0.022 250)", css: "bg-cosmic-600" },
  { name: "Cosmic 500", variable: "--color-cosmic-500", value: "oklch(0.45 0.020 250)", css: "bg-cosmic-500" },
  { name: "Cosmic 400", variable: "--color-cosmic-400", value: "oklch(0.60 0.018 250)", css: "bg-cosmic-400" },
  { name: "Cosmic 300", variable: "--color-cosmic-300", value: "oklch(0.75 0.015 250)", css: "bg-cosmic-300" },
  { name: "Cosmic 200", variable: "--color-cosmic-200", value: "oklch(0.87 0.012 250)", css: "bg-cosmic-200" },
  { name: "Cosmic 100", variable: "--color-cosmic-100", value: "oklch(0.93 0.008 250)", css: "bg-cosmic-100" },
  { name: "Cosmic 50", variable: "--color-cosmic-50", value: "oklch(0.97 0.005 250)", css: "bg-cosmic-50" },
];

const surfaces = [
  { name: "Surface", variable: "--color-surface", value: "oklch(1 0 0)", note: "Page background, pure white" },
  { name: "Surface Raised", variable: "--color-surface-raised", value: "oklch(0.95 0.005 250)", note: "Card & placeholder backgrounds" },
];

const emotions = [
  { name: "Hare", kanji: "晴", meaning: "Radiant", value: "oklch(0.82 0.14 85)", css: "bg-hare" },
  { name: "Takaburi", kanji: "昂", meaning: "Intense", value: "oklch(0.60 0.18 25)", css: "bg-takaburi" },
  { name: "Aware", kanji: "哀", meaning: "Reflective", value: "oklch(0.70 0.06 250)", css: "bg-aware" },
  { name: "Yuragi", kanji: "揺", meaning: "Unsettled", value: "oklch(0.65 0.12 55)", css: "bg-yuragi" },
  { name: "Nagomi", kanji: "和", meaning: "Serene", value: "oklch(0.75 0.10 160)", css: "bg-nagomi" },
];

const typeScale = [
  { name: "Page title (h1)", font: "EB Garamond", weight: "400", size: "clamp(2.5rem, 5.5vw, 4.5rem)", tracking: "0.01em", sample: "Everything has Kokoro." },
  { name: "Section heading (h2)", font: "EB Garamond", weight: "400", size: "28px / 32px", tracking: "0.01em", sample: "Continue reading" },
  { name: "Card title", font: "EB Garamond", weight: "400", size: "20px / 22px", tracking: "0.01em", sample: "The knife maker of Seki" },
  { name: "Article body", font: "EB Garamond", weight: "400", size: "18px / 19px", tracking: "0.005em", sample: "The knife arrived on a Tuesday in June, two years after we ordered it." },
  { name: "Pullquote", font: "EB Garamond", weight: "400", size: "clamp(1.75rem, 3.5vw, 2.75rem)", tracking: "0.005em", sample: "The steel remembers every strike of the hammer." },
  { name: "Subtitle", font: "EB Garamond", weight: "400", size: "clamp(1.1rem, 2vw, 1.4rem)", tracking: "-", sample: "A daily awareness practice rooted in Japanese philosophy." },
  { name: "Navigation", font: "Instrument Sans", weight: "400", size: "14px", tracking: "0.06em", sample: "Journal" },
  { name: "UI text / excerpts", font: "Instrument Sans", weight: "400", size: "14px", tracking: "-", sample: "A lifetime spent perfecting a single blade." },
  { name: "Form button", font: "Instrument Sans", weight: "500", size: "14px", tracking: "0.02em", sample: "Join Waitlist" },
  { name: "Uppercase filter", font: "Instrument Sans", weight: "400", size: "13px", tracking: "0.06em", sample: "CRAFT" },
  { name: "Uppercase metadata", font: "Instrument Sans", weight: "400", size: "12px", tracking: "0.08em", sample: "PHILOSOPHY" },
  { name: "Kanji (micro-season)", font: "Noto Serif JP", weight: "400", size: "clamp(3rem, 8vw, 6.5rem)", tracking: "0.06em", sample: "清明" },
];

const spacingSystem = [
  { name: "Page padding (horizontal)", mobile: "24px (px-6)", tablet: "48px (md:px-12)", desktop: "80px (lg:px-20)", xl: "112px (xl:px-28)" },
  { name: "Section spacing (vertical)", mobile: "64px (pb-16)", tablet: "-", desktop: "96px (md:pb-24)", xl: "-" },
  { name: "Hero top padding", mobile: "48px (pt-12)", tablet: "-", desktop: "64px (md:pt-16)", xl: "-" },
  { name: "Micro-season module", mobile: "96px (py-24)", tablet: "-", desktop: "144px (md:py-36)", xl: "-" },
  { name: "Newsletter module", mobile: "112px (py-28)", tablet: "-", desktop: "160px (md:py-40)", xl: "-" },
  { name: "Header height", mobile: "64px (h-16)", tablet: "-", desktop: "80px (md:h-20)", xl: "-" },
];

export default function BrandPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Title ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 pb-16 md:pb-24">
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
            Brand reference
          </h1>
          <p className="mt-4 font-sans text-[14px] text-void/50">
            Living style guide for auwa.life. Updated April 2026.
          </p>
        </section>

        {/* ── Logo ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Logo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-raised rounded-sm p-12 md:p-16 flex items-center justify-center">
              <img src="/auwa-logo.svg" alt="AUWA wordmark on light" className="h-[24px] md:h-[32px] w-auto" />
            </div>
            <div className="bg-void rounded-sm p-12 md:p-16 flex items-center justify-center">
              <img src="/auwa-logo.svg" alt="AUWA wordmark on dark" className="h-[24px] md:h-[32px] w-auto invert" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-sans text-[14px] text-void/70 leading-[1.6]">
                The AUWA logo is the wordmark itself: the letters A-U-W-A set in EB Garamond. No separate symbol. The natural symmetry mirrors the etymology. あ (heavens) and わ (earth) framing う (connection).
              </p>
            </div>
            <div>
              <p className="font-sans text-[14px] text-void/70 leading-[1.6]">
                Minimum clear space: the height of the letter U on all sides. Never place over busy imagery. Never distort, outline, shadow, or animate.
              </p>
            </div>
          </div>
        </section>

        {/* ── Colour: Foundation ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Colour / Foundation palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {foundations.map((c) => (
              <div key={c.name}>
                <div
                  className="aspect-square rounded-sm"
                  style={{ background: c.value }}
                />
                <p className="mt-2 font-sans text-[13px] text-void">{c.name}</p>
                <p className="font-sans text-[12px] text-void/40 leading-[1.5]">{c.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Colour: Surfaces ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Colour / Surfaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {surfaces.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-sm border border-void/8 flex-shrink-0"
                  style={{ background: c.value }}
                />
                <div>
                  <p className="font-sans text-[13px] text-void">{c.name}</p>
                  <p className="font-sans text-[12px] text-void/40">{c.value}</p>
                  <p className="font-sans text-[12px] text-void/40">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Colour: Yamato emotional states ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Colour / Yamato emotional states</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {emotions.map((c) => (
              <div key={c.name}>
                <div
                  className="aspect-[4/3] rounded-sm"
                  style={{ background: c.value }}
                />
                <p className="mt-2 font-sans text-[13px] text-void">
                  {c.name} <span className="text-void/40">{c.kanji}</span>
                </p>
                <p className="font-sans text-[12px] text-void/40">{c.meaning}</p>
                <p className="font-sans text-[12px] text-void/40">{c.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Typography ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Typography / Typefaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="font-display text-[32px] leading-[1.2] text-void">EB Garamond</p>
              <p className="mt-1 font-sans text-[12px] tracking-[0.06em] uppercase text-void/40">Display + editorial</p>
              <p className="mt-4 font-display text-[18px] leading-[1.7] text-void/70">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
              <p className="mt-2 font-display text-[18px] leading-[1.7] text-void/70">
                0123456789
              </p>
              <p className="mt-3 font-sans text-[12px] text-void/40">Weights: 400, 500, 600, 700. Styles: normal, italic.</p>
            </div>
            <div>
              <p className="font-sans text-[32px] leading-[1.2] text-void">Instrument Sans</p>
              <p className="mt-1 font-sans text-[12px] tracking-[0.06em] uppercase text-void/40">Functional + UI</p>
              <p className="mt-4 font-sans text-[18px] leading-[1.7] text-void/70">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
              <p className="mt-2 font-sans text-[18px] leading-[1.7] text-void/70">
                0123456789
              </p>
              <p className="mt-3 font-sans text-[12px] text-void/40">Weights: 400, 500, 600.</p>
            </div>
            <div>
              <p className="text-[32px] leading-[1.2] text-void" style={{ fontFamily: 'var(--font-jp-serif), serif' }}>Noto Serif JP</p>
              <p className="mt-1 font-sans text-[12px] tracking-[0.06em] uppercase text-void/40">Japanese text</p>
              <p className="mt-4 text-[18px] leading-[1.7] text-void/70" style={{ fontFamily: 'var(--font-jp-serif), serif' }}>
                あいうえお かきくけこ さしすせそ
              </p>
              <p className="mt-2 text-[18px] leading-[1.7] text-void/70" style={{ fontFamily: 'var(--font-jp), sans-serif' }}>
                心 魂 和 晴 哀 揺 昂
              </p>
              <p className="mt-3 font-sans text-[12px] text-void/40">Noto Sans JP (300, 400) + Noto Serif JP (400, 600).</p>
            </div>
          </div>
        </section>

        {/* ── Type scale ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Typography / Scale</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-void/10">
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Element</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Font</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Weight</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Size</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal hidden lg:table-cell">Tracking</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 font-normal hidden xl:table-cell">Sample</th>
                </tr>
              </thead>
              <tbody>
                {typeScale.map((row) => (
                  <tr key={row.name} className="border-b border-void/5">
                    <td className="font-sans text-[13px] text-void py-3 pr-6 whitespace-nowrap">{row.name}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6 whitespace-nowrap">{row.font}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6">{row.weight}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6 whitespace-nowrap">{row.size}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6 hidden lg:table-cell">{row.tracking}</td>
                    <td className="font-sans text-[13px] text-void/40 py-3 hidden xl:table-cell">{row.sample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Spacing ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Spacing system</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-void/10">
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Element</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Mobile</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Tablet</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 pr-6 font-normal">Desktop</th>
                  <th className="font-sans text-[12px] tracking-[0.06em] uppercase text-void/40 pb-3 font-normal">XL</th>
                </tr>
              </thead>
              <tbody>
                {spacingSystem.map((row) => (
                  <tr key={row.name} className="border-b border-void/5">
                    <td className="font-sans text-[13px] text-void py-3 pr-6 whitespace-nowrap">{row.name}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6">{row.mobile}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6">{row.tablet}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3 pr-6">{row.desktop}</td>
                    <td className="font-sans text-[13px] text-void/60 py-3">{row.xl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Components ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Components</h2>

          <div className="space-y-12">

            {/* Form */}
            <div>
              <p className="font-sans text-[13px] text-void mb-4">Email form (light background)</p>
              <div className="max-w-[440px]">
                <div className="flex items-center gap-4 border-b border-void/20 pb-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    disabled
                    className="flex-1 bg-transparent font-sans text-[14px] text-void placeholder:text-void/35 outline-none"
                  />
                  <span className="font-sans text-[14px] font-medium tracking-[0.02em] text-void whitespace-nowrap">
                    Join Waitlist
                  </span>
                </div>
              </div>
            </div>

            {/* Form dark */}
            <div>
              <p className="font-sans text-[13px] text-void mb-4">Email form (dark background)</p>
              <div className="bg-void rounded-sm p-10 max-w-[480px]">
                <div className="flex items-center gap-4 border-b border-white/20 pb-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    disabled
                    className="flex-1 bg-transparent font-sans text-[14px] text-white placeholder:text-white/35 outline-none"
                  />
                  <span className="font-sans text-[14px] font-medium tracking-[0.02em] text-white/70 whitespace-nowrap">
                    Subscribe
                  </span>
                </div>
              </div>
            </div>

            {/* Article card */}
            <div>
              <p className="font-sans text-[13px] text-void mb-4">Article card</p>
              <div className="max-w-[300px]">
                <div className="bg-surface-raised rounded-sm overflow-hidden relative aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/50 to-surface-raised" />
                </div>
                <div className="mt-4">
                  <span className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40">Craft</span>
                  <h3 className="mt-1.5 font-display text-[20px] leading-[1.2] tracking-[0.01em] text-void">
                    The knife maker of Seki
                  </h3>
                  <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-void/50">
                    A lifetime spent perfecting a single blade.
                  </p>
                </div>
              </div>
            </div>

            {/* Image aspect ratios */}
            <div>
              <p className="font-sans text-[13px] text-void mb-4">Image aspect ratios</p>
              <div className="grid grid-cols-3 gap-4 max-w-[600px]">
                <div>
                  <div className="bg-surface-raised rounded-sm aspect-[4/5]" />
                  <p className="mt-2 font-sans text-[12px] text-void/40">4:5 portrait (primary)</p>
                </div>
                <div>
                  <div className="bg-surface-raised rounded-sm aspect-[3/4]" />
                  <p className="mt-2 font-sans text-[12px] text-void/40">3:4 portrait (book cover)</p>
                </div>
                <div>
                  <div className="bg-surface-raised rounded-sm aspect-[2.5/1]" />
                  <p className="mt-2 font-sans text-[12px] text-void/40">2.5:1 landscape (image break)</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Design principles ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Design principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[680px]">
            <div>
              <p className="font-display text-[18px] text-void">Portrait-first imagery</p>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-void/50">All editorial imagery uses 4:5 portrait aspect ratio. No landscape images in article layouts or card grids.</p>
            </div>
            <div>
              <p className="font-display text-[18px] text-void">Generous whitespace</p>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-void/50">Sections breathe. Standard vertical rhythm of 64px mobile, 96px desktop between sections. Content doesn&apos;t crowd.</p>
            </div>
            <div>
              <p className="font-display text-[18px] text-void">Serif voice, sans function</p>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-void/50">EB Garamond carries the brand voice: headlines, body, editorial. Instrument Sans handles UI, metadata, and navigation.</p>
            </div>
            <div>
              <p className="font-display text-[18px] text-void">Scroll-reveal motion</p>
              <p className="mt-2 font-sans text-[14px] leading-[1.6] text-void/50">Elements fade in with a gentle 12px rise as they enter the viewport. Ease-out-expo timing. Staggered delays on grid items.</p>
            </div>
          </div>
        </section>

        {/* ── Motion ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <h2 className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40 mb-8">Motion</h2>
          <div className="max-w-[480px] space-y-4">
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-void">Easing</span>
              <span className="text-void/50">cubic-bezier(0.16, 1, 0.3, 1)</span>
            </div>
            <div className="border-b border-void/5" />
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-void">FadeIn duration</span>
              <span className="text-void/50">800ms</span>
            </div>
            <div className="border-b border-void/5" />
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-void">FadeIn translate</span>
              <span className="text-void/50">12px (translateY)</span>
            </div>
            <div className="border-b border-void/5" />
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-void">Hover transitions</span>
              <span className="text-void/50">300ms</span>
            </div>
            <div className="border-b border-void/5" />
            <div className="flex justify-between font-sans text-[13px]">
              <span className="text-void">Stagger delay</span>
              <span className="text-void/50">60-100ms per item</span>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24 border-t border-void/8">
          <p className="font-sans text-[14px] text-void/40">
            This is a living reference. It reads from the same design tokens as the production site. When the CSS changes, this page updates automatically.
          </p>
          <p className="mt-2 font-sans text-[14px] text-void/40">
            &copy; AUWA {new Date().getFullYear()}. Confidential.
          </p>
        </section>

      </main>
    </>
  );
}
