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

interface NewsletterProps {
  previewText?: string;
  heroImage?: string;
  heroAlt?: string;
  heading?: string;
  intro?: string;
  articles?: Array<{
    title: string;
    excerpt: string;
    url: string;
    image?: string;
  }>;
  closingNote?: string;
}

export default function Newsletter({
  previewText = "The latest from Auwa.",
  heroImage,
  heroAlt = "",
  heading = "Seasonal letter.",
  intro = "",
  articles = [],
  closingNote,
}: NewsletterProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&display=swap');
        `}</style>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Text style={wordmark}>Auwa</Text>
          </Section>

          {/* Hero image */}
          {heroImage && (
            <Section style={heroSection}>
              <Img
                src={heroImage}
                width="520"
                height="auto"
                alt={heroAlt}
                style={heroImg}
              />
            </Section>
          )}

          {/* Heading + intro */}
          <Section style={contentSection}>
            <Heading style={headingStyle}>{heading}</Heading>
            {intro && <Text style={introParagraph}>{intro}</Text>}
          </Section>

          {/* Articles */}
          {articles.map((article, i) => (
            <Section key={i} style={articleSection}>
              {article.image && (
                <Link href={article.url}>
                  <Img
                    src={article.image}
                    width="520"
                    height="auto"
                    alt={article.title}
                    style={articleImg}
                  />
                </Link>
              )}
              <Heading as="h2" style={articleTitle}>
                <Link href={article.url} style={articleTitleLink}>
                  {article.title}
                </Link>
              </Heading>
              <Text style={articleExcerpt}>{article.excerpt}</Text>
              <Link href={article.url} style={readMore}>
                Read
              </Link>
              {i < articles.length - 1 && <Hr style={articleDivider} />}
            </Section>
          ))}

          {/* Closing note */}
          {closingNote && (
            <Section style={{ padding: "24px 0 0" }}>
              <Hr style={articleDivider} />
              <Text style={closingStyle}>{closingNote}</Text>
            </Section>
          )}

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerLinks}>
              <Link href="https://auwa.life/journal" style={footerLink}>
                Read Journal
              </Link>
              {"  ·  "}
              <Link href="https://instagram.com/auwalife" style={footerLink}>
                Follow on Instagram
              </Link>
            </Text>
            <Text style={footerText}>
              © Auwa {new Date().getFullYear()}
            </Text>
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

// Styles
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
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "24px",
  fontWeight: 400,
  letterSpacing: "0.25em",
  color: "#141318",
  textAlign: "center" as const,
  margin: "0",
};

const heroSection: React.CSSProperties = {
  padding: "0 0 32px",
};

const heroImg: React.CSSProperties = {
  width: "100%",
  borderRadius: "2px",
};

const contentSection: React.CSSProperties = {
  padding: "0 0 8px",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "28px",
  fontWeight: 400,
  color: "#141318",
  letterSpacing: "0.01em",
  lineHeight: "1.2",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const introParagraph: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "17px",
  lineHeight: "1.7",
  color: "#141318",
  letterSpacing: "0.005em",
  margin: "0 0 8px",
  opacity: 0.8,
};

const articleSection: React.CSSProperties = {
  padding: "16px 0",
};

const articleImg: React.CSSProperties = {
  width: "100%",
  borderRadius: "2px",
  marginBottom: "16px",
};

const articleTitle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "21px",
  fontWeight: 400,
  color: "#141318",
  letterSpacing: "0.01em",
  lineHeight: "1.3",
  margin: "0 0 8px",
};

const articleTitleLink: React.CSSProperties = {
  color: "#141318",
  textDecoration: "none",
};

const articleExcerpt: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "16px",
  lineHeight: "1.65",
  color: "#141318",
  opacity: 0.7,
  margin: "0 0 12px",
};

const readMore: React.CSSProperties = {
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

const articleDivider: React.CSSProperties = {
  borderTop: "1px solid rgba(20, 19, 24, 0.08)",
  margin: "24px 0 8px",
};

const closingStyle: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#141318",
  opacity: 0.6,
  fontStyle: "italic",
  margin: "16px 0 0",
  textAlign: "center" as const,
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
