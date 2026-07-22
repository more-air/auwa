import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

/**
 * The Quiet Letter — the every-5-days micro-season newsletter.
 *
 * One season, one illustration by Rieko, a few lines. Deliberately smaller
 * than newsletter.tsx: no article list, no hero/article split. The season is
 * the header, Rieko's image is the body, the text is the letter.
 *
 * Content is the same asset Rieko already makes for the 72-season Instagram
 * cadence, re-dressed as an email. Season data comes from
 * `@/lib/micro-seasons` (getCurrentMicroSeason) so kanji/romaji/translation
 * stay in one source of truth.
 */
interface QuietLetterProps {
  previewText?: string;
  kanji?: string;
  romaji?: string;
  translation?: string;
  /** Rieko's illustration for this season (absolute URL). */
  image?: string;
  imageAlt?: string;
  /** The letter body, one entry per paragraph. Keep to 2-4 short sentences total. */
  paragraphs?: string[];
  /** Optional single soft link, e.g. the Instagram Reel of the animation. */
  link?: { label: string; url: string };
  /** Optional sign-off line, e.g. "Rieko" or "Until the next turning". */
  signOff?: string;
}

export default function QuietLetter({
  previewText = "A quiet letter, as the season turns.",
  kanji = "",
  romaji = "",
  translation = "",
  image,
  imageAlt = "",
  paragraphs = [],
  link,
  signOff,
}: QuietLetterProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&family=Noto+Serif+JP:wght@400;500&display=swap');
        `}</style>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Wordmark */}
          <Section style={logoSection}>
            <Img
              src="https://auwa.life/email/auwa-logo.png"
              alt="AUWA"
              width="110"
              height="22"
              style={wordmark}
            />
          </Section>

          {/* Season header */}
          <Section style={seasonSection}>
            {kanji && <Text style={kanjiStyle}>{kanji}</Text>}
            {(romaji || translation) && (
              <Text style={seasonMeta}>
                {[romaji, translation].filter(Boolean).join("  ·  ")}
              </Text>
            )}
          </Section>

          {/* Illustration */}
          {image && (
            <Section style={imageSection}>
              <Img
                src={image}
                width="520"
                height="auto"
                alt={imageAlt}
                style={illustration}
              />
            </Section>
          )}

          {/* Letter body */}
          <Section style={bodySection}>
            {paragraphs.map((p, i) => (
              <Text key={i} style={bodyParagraph}>
                {p}
              </Text>
            ))}

            {link && (
              <Text style={linkRow}>
                <Link href={link.url} style={softLink}>
                  {link.label}
                </Link>
              </Text>
            )}

            {signOff && <Text style={signOffStyle}>{signOff}</Text>}
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerLinks}>
              <Link href="https://auwa.life/book" style={footerLink}>
                Book
              </Link>
              {"  ·  "}
              <Link href="https://auwa.life/journal" style={footerLink}>
                Journal
              </Link>
              {"  ·  "}
              <Link href="https://auwa.life/about" style={footerLink}>
                About
              </Link>
            </Text>
            <Text style={footerText}>© Auwa {new Date().getFullYear()}</Text>
            <Text style={unsubscribeText}>
              <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={unsubscribeLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles — mirror newsletter.tsx tokens (warm off-white, void text, EB Garamond + Inter).
const main: React.CSSProperties = {
  backgroundColor: "#f8f7f4",
  fontFamily: "'EB Garamond', Georgia, 'Times New Roman', serif",
};

const container: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "40px 24px 48px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center",
  padding: "0 0 40px",
};

const wordmark: React.CSSProperties = {
  display: "inline-block",
  height: "22px",
  width: "110px",
};

const seasonSection: React.CSSProperties = {
  textAlign: "center",
  padding: "0 0 32px",
};

const kanjiStyle: React.CSSProperties = {
  fontFamily:
    "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', Georgia, serif",
  fontSize: "34px",
  fontWeight: 400,
  color: "#141318",
  letterSpacing: "0.08em",
  lineHeight: "1.2",
  margin: "0 0 14px",
  textAlign: "center" as const,
};

const seasonMeta: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#141318",
  opacity: 0.5,
  margin: "0",
  textAlign: "center" as const,
};

const imageSection: React.CSSProperties = {
  padding: "0 0 32px",
};

const illustration: React.CSSProperties = {
  width: "100%",
  borderRadius: "2px",
};

const bodySection: React.CSSProperties = {
  padding: "0",
};

const bodyParagraph: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "17px",
  lineHeight: "1.75",
  color: "#141318",
  letterSpacing: "0.005em",
  margin: "0 0 18px",
  opacity: 0.82,
};

const linkRow: React.CSSProperties = {
  margin: "6px 0 0",
};

const softLink: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "#141318",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  opacity: 0.5,
};

const signOffStyle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#141318",
  opacity: 0.6,
  fontStyle: "italic",
  margin: "28px 0 0",
};

const divider: React.CSSProperties = {
  borderTop: "1px solid rgba(20, 19, 24, 0.1)",
  margin: "40px 0 32px",
};

const footer: React.CSSProperties = {
  textAlign: "center" as const,
};

const footerLinks: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "15px",
  color: "#141318",
  opacity: 0.5,
  letterSpacing: "0.02em",
  margin: "0 0 12px",
};

const footerLink: React.CSSProperties = {
  color: "#141318",
  textDecoration: "none",
};

const footerText: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "12px",
  color: "#141318",
  opacity: 0.35,
  margin: "0 0 8px",
};

const unsubscribeText: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "11px",
  margin: "0",
};

const unsubscribeLink: React.CSSProperties = {
  color: "#141318",
  opacity: 0.3,
  textDecoration: "underline",
};
