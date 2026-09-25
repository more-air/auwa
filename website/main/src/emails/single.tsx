// Single-story email template. For sharing ONE thing: a new journal article,
// a book announcement, a figure drop. Same layout as the welcome email:
// wordmark, one photo, heading, optional strapline, body, one CTA, footer.
//
// Body paragraphs are plain strings. Inline links use [text](url), e.g.
// "painted by [Fin DAC](https://www.instagram.com/findac)".
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

const BASE_URL = "https://auwa.life";

export interface SingleEmailProps {
  preview?: string;
  image?: string;
  imageAlt?: string;
  heading?: string;
  strapline?: string;
  body?: string[];
  cta?: string;
  ctaUrl?: string;
}

const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_PATTERN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} href={m[2]} style={inlineLink}>
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function SingleEmail({
  preview = "A new piece from the Auwa journal.",
  image = `${BASE_URL}/pillars/store.jpg`,
  imageAlt = "",
  heading = "A new piece.",
  strapline,
  body = ["Sample paragraph."],
  cta = "Read full article",
  ctaUrl = `${BASE_URL}/journal`,
}: SingleEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&display=swap');
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src={`${BASE_URL}/email/auwa-logo.png`}
              alt="AUWA"
              width="110"
              height="22"
              style={wordmark}
            />
          </Section>

          <Section style={imageSection}>
            <Link href={ctaUrl}>
              <Img src={image} alt={imageAlt} width="520" style={heroImage} />
            </Link>
          </Section>

          <Section style={contentSection}>
            <Heading style={headingStyle}>{heading}</Heading>
            {strapline && <Text style={straplineStyle}>{strapline}</Text>}
            {body.map((p, i) => (
              <Text key={i} style={paragraph}>
                {renderInline(p)}
              </Text>
            ))}
            <Section style={ctaSection}>
              <Link href={ctaUrl} style={ctaLink}>
                {cta}
              </Link>
            </Section>
          </Section>

          <Hr style={divider} />

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
              {/* Resend substitutes this per-recipient in Broadcasts. Transactional
                  test sends leave it as a harmless literal. */}
              <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: "#999", textDecoration: "underline" }}>
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
const imageSection: React.CSSProperties = { padding: "0 0 36px" };
const heroImage: React.CSSProperties = { width: "100%", height: "auto", display: "block", borderRadius: "2px" };
const contentSection: React.CSSProperties = { padding: "0" };
const headingStyle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "28px",
  fontWeight: 400,
  color: "#141318",
  letterSpacing: "0.01em",
  lineHeight: "1.2",
  margin: "0 0 12px",
  textAlign: "center",
};
const straplineStyle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "17px",
  fontStyle: "italic",
  lineHeight: "1.5",
  color: "#141318",
  opacity: 0.6,
  margin: "0 0 28px",
  textAlign: "center",
};
const paragraph: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "17px",
  lineHeight: "1.7",
  color: "#141318",
  letterSpacing: "0.005em",
  margin: "0 0 24px",
  opacity: 0.8,
  textAlign: "center",
};
const inlineLink: React.CSSProperties = {
  color: "#141318",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};
const ctaSection: React.CSSProperties = { textAlign: "center", padding: "8px 0 0" };
const ctaLink: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#141318",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
};
const divider: React.CSSProperties = { borderTop: "1px solid rgba(20, 19, 24, 0.1)", margin: "40px 0 32px" };
const footer: React.CSSProperties = { textAlign: "center" };
const footerLinks: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "15px",
  color: "#141318",
  opacity: 0.5,
  letterSpacing: "0.02em",
  margin: "0 0 12px",
};
const footerLink: React.CSSProperties = { color: "#141318", textDecoration: "none" };
const footerText: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "12px",
  color: "#141318",
  opacity: 0.35,
  margin: "0",
};
