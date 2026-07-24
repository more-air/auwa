// Monthly Auwa letter template.
//
// One calm email, sent roughly monthly (cadence still to be decided). Shape:
//   1. a short opener
//   2. the season — one illustration, its name, its dates, a few lines from Rieko
//      (optional: pass `season={undefined}` for a month with no seasonal note)
//   3. "Lately" — one to three quiet updates on what we've been making
//   4. a sign-off, then the standard footer links
//
// Everything below the interface has sample defaults so `<MonthlyEmail />`
// renders a complete example for review. Swap the props at send time.
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const BASE_URL = "https://auwa.life";
const INSTAGRAM_URL = "https://instagram.com/auwalife";

interface Season {
  image: string;
  imageAlt: string;
  kanji: string;
  name: string; // English translation only, e.g. "Paulownia trees bear fruit" (rendered uppercase)
  dates: string;
  note: string;
  href?: string; // first link, e.g. the Instagram post
  cta?: string; // first link label, short (1-2 words), e.g. "Instagram"
  href2?: string; // optional second link, e.g. the 72 Seasons journal article
  cta2?: string; // second link label, e.g. "72 Seasons"
}

interface Update {
  image: string;
  imageAlt: string;
  title: string;
  line: string;
  href: string;
  cta: string;
}

interface MonthlyEmailProps {
  preview?: string;
  intro?: string;
  season?: Season | null;
  updates?: Update[];
  horizon?: string; // optional quiet closing line about what's coming next
}

const SAMPLE_SEASON: Season = {
  image: `${BASE_URL}/pillars/book.jpg`,
  imageAlt: "Illustration of the season",
  kanji: "土潤溽暑",
  name: "Tsuchi uruōte mushi atsushi — earth damp, air thick with heat",
  dates: "28 July – 1 August",
  note: "The rains have soaked into the ground, and the days hold their warmth long after dark. In the garden the moss deepens to a heavier green. It is a season for moving slowly, for cold barley tea in the shade, for noticing how much life gathers in the heat before it turns.",
};

const SAMPLE_UPDATES: Update[] = [
  {
    image: `${BASE_URL}/pillars/store.jpg`,
    imageAlt: "The first Auwa figure",
    title: "The first figure is taking shape",
    line: "Signed, hand-finished, and almost ready. When it opens, the people on this list go first, and one of you will be drawn to receive it.",
    href: `${BASE_URL}/store`,
    cta: "See more",
  },
  {
    image: `${BASE_URL}/pillars/app.jpg`,
    imageAlt: "A new journal piece",
    title: "A new letter from the journal",
    line: "Rieko writes about a knife maker in Kyoto whose blades hold forty years of attention, and the thin film of camellia oil that keeps them.",
    href: `${BASE_URL}/journal`,
    cta: "Read",
  },
];

// Split the Lately updates into rows of `size` for the 2-up grid.
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function MonthlyEmail({
  preview = "The season turns, and a little of what we've been making.",
  intro = "A quiet note as July gives way to August, with a little of what we have been making, and the season turning outside the window.",
  season = SAMPLE_SEASON,
  updates = SAMPLE_UPDATES,
  horizon,
}: MonthlyEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&family=Noto+Serif+JP:wght@400;500&display=swap');
          /* Lately grid: 2-up on desktop, stacks to 1-up on mobile. Honoured by
             Apple Mail, iOS Mail and the Gmail app; Outlook (Windows) ignores it
             and keeps 2-up, which degrades acceptably. Extra bottom padding on
             mobile so the stacked tiles aren't tight against each other. */
          @media only screen and (max-width: 600px) {
            .tile-col { display: block !important; width: 100% !important; padding: 0 0 40px !important; }
          }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={`${BASE_URL}/email/auwa-logo.png`} alt="AUWA" width="110" height="22" style={wordmark} />
          </Section>

          {/* Masthead — a short, centred dateline. Format: "descriptor · Month Year". */}
          <Section style={contentSection}>
            <Text style={masthead}>{intro}</Text>
          </Section>

          {/* The season */}
          {season && (
            <>
              <Section style={imageSection}>
                <Img src={season.image} alt={season.imageAlt} width="520" style={heroImage} />
              </Section>
              <Section style={contentSection}>
                <Heading style={seasonKanji}>{season.kanji}</Heading>
                <Text style={seasonName}>{season.name}</Text>
                <Text style={seasonDates}>{season.dates}</Text>
                <Text style={paragraph}>{season.note}</Text>
                {(season.href || season.href2) && (
                  <Section style={seasonLinks}>
                    {season.href && season.cta && (
                      <Link href={season.href} style={ctaLink}>
                        {season.cta}
                      </Link>
                    )}
                    {season.href && season.cta && season.href2 && season.cta2 && (
                      <span style={linkSep}>·</span>
                    )}
                    {season.href2 && season.cta2 && (
                      <Link href={season.href2} style={ctaLink}>
                        {season.cta2}
                      </Link>
                    )}
                  </Section>
                )}
              </Section>
            </>
          )}

          <Hr style={divider} />

          {/* Lately — 2-up grid (see the media query in Head for mobile stacking) */}
          <Section style={contentSection}>
            <Text style={lately}>Lately</Text>
          </Section>
          {chunk(updates, 2).map((pair, r) => (
            <Row key={r} style={tileRow}>
              {pair.map((u, i) => (
                <Column
                  key={i}
                  className="tile-col"
                  style={{ ...tileCol, ...(i === 0 ? tileColLeft : tileColRight) }}
                >
                  <Link href={u.href} style={tileImageLink}>
                    <Img src={u.image} alt={u.imageAlt} width="256" style={tileImage} />
                  </Link>
                  <Heading style={tileTitle}>{u.title}</Heading>
                  <Text style={tileLine}>{u.line}</Text>
                  <Link href={u.href} style={ctaLink}>
                    {u.cta}
                  </Link>
                </Column>
              ))}
              {pair.length === 1 && (
                <Column className="tile-col" style={{ ...tileCol, ...tileColRight }} />
              )}
            </Row>
          ))}

          {/* Optional closing line about what's coming next */}
          {horizon && (
            <Section style={horizonSection}>
              <Text style={horizonText}>{horizon}</Text>
            </Section>
          )}

          {/* Sign-off — a single, centred, prominent follow link */}
          <Section style={followSection}>
            <Link href={INSTAGRAM_URL} style={followLink}>
              Follow on Instagram
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerLinks}>
              <Link href={`${BASE_URL}/book`} style={footerLink}>Book</Link>
              {"  ·  "}
              <Link href={`${BASE_URL}/journal`} style={footerLink}>Journal</Link>
              {"  ·  "}
              <Link href={`${BASE_URL}/about`} style={footerLink}>About</Link>
            </Text>
            <Text style={footerText}>© Auwa {new Date().getFullYear()}</Text>
            <Text style={footerText}>
              <Link href="mailto:hello@auwa.life?subject=Unsubscribe" style={{ color: "#999", textDecoration: "underline" }}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (matched to welcome.tsx)
const main: React.CSSProperties = {
  backgroundColor: "#f8f7f4",
  fontFamily: "'EB Garamond', Georgia, 'Times New Roman', serif",
};
const container: React.CSSProperties = { maxWidth: "520px", margin: "0 auto", padding: "40px 24px 48px" };
const logoSection: React.CSSProperties = { textAlign: "center", padding: "0 0 32px" };
const wordmark: React.CSSProperties = { display: "inline-block", height: "22px", width: "110px" };
const imageSection: React.CSSProperties = { padding: "8px 0 28px" };
const heroImage: React.CSSProperties = { width: "100%", height: "auto", display: "block", borderRadius: "2px" };
const contentSection: React.CSSProperties = { padding: "0" };
const paragraph: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "17px",
  lineHeight: "1.7",
  color: "#33313a",
  margin: "0 0 18px",
};
// Short centred dateline under the wordmark. Reusable format: "descriptor · Month Year".
const masthead: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#9b98a3",
  textAlign: "center",
  margin: "0 0 32px",
};
const seasonKanji: React.CSSProperties = {
  // Serif (Mincho) JP face so the kanji matches the website's 72-seasons block,
  // with tracking to echo the site's spaced-out kanji.
  fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', 'YuMincho', serif",
  fontSize: "38px",
  fontWeight: 500,
  color: "#141318",
  textAlign: "center",
  letterSpacing: "0.12em",
  margin: "0 0 10px",
  lineHeight: "1.2",
};
const seasonName: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#6b6875",
  textAlign: "center",
  margin: "0 0 4px",
};
const seasonDates: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "12px",
  letterSpacing: "0.08em",
  color: "#9b98a3",
  textAlign: "center",
  margin: "0 0 20px",
};
const lately: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "12px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#6b6875",
  margin: "0 0 20px",
};
const tileRow: React.CSSProperties = { marginBottom: "0" };
// Outer edges flush with the "Lately" heading; only an inner gutter between the two.
const tileCol: React.CSSProperties = {
  width: "50%",
  verticalAlign: "top",
  paddingBottom: "30px",
};
const tileColLeft: React.CSSProperties = { paddingRight: "8px" };
const tileColRight: React.CSSProperties = { paddingLeft: "8px" };
const tileImageLink: React.CSSProperties = { display: "block", textDecoration: "none" };
const tileImage: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: "2px",
  marginBottom: "14px",
};
const tileTitle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "19px",
  fontWeight: 400,
  color: "#141318",
  lineHeight: "1.3",
  margin: "0 0 6px",
  whiteSpace: "nowrap", // titles are kept short (≤ ~16 chars) so one line is safe
};
const tileLine: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#33313a",
  margin: "0 0 10px",
};
// Links (season CTAs + tile CTAs): uppercase, tracked, matching welcome.tsx.
const ctaLink: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#141318",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
};
const seasonLinks: React.CSSProperties = { margin: "4px 0 0" };
const linkSep: React.CSSProperties = { color: "#c8c5be", margin: "0 10px" };
// Quiet, centred closing line about what's coming next.
const horizonSection: React.CSSProperties = { textAlign: "center", padding: "14px 0 0" };
const horizonText: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "16px",
  fontStyle: "italic",
  lineHeight: "1.65",
  color: "#6b6875",
  margin: "0 auto",
  maxWidth: "400px",
};
// Prominent, centred follow link with breathing room above and below.
const followSection: React.CSSProperties = { textAlign: "center", padding: "30px 0 4px" };
const followLink: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#141318",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
};
const divider: React.CSSProperties = { borderColor: "#e4e1db", margin: "32px 0" };
const footer: React.CSSProperties = { textAlign: "center", padding: "0" };
const footerLinks: React.CSSProperties = { margin: "0 0 12px" };
const footerLink: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "12px",
  letterSpacing: "0.06em",
  color: "#6b6875",
  textDecoration: "none",
};
const footerText: React.CSSProperties = {
  fontFamily: "'Inter', Arial, sans-serif",
  fontSize: "11px",
  color: "#9b98a3",
  margin: "0 0 6px",
};
