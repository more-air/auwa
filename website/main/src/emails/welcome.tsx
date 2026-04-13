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

const BASE_URL = "https://auwa.life";

const sourceContent = {
  newsletter: {
    preview: "Something quiet is on its way.",
    heading: "Stay close.",
    body: "You've joined a small group of people building a more aware life. We send occasional letters on Japanese craft, seasonal living, and the philosophy behind AUWA. Nothing noisy. Just things worth reading.",
    image: `${BASE_URL}/pillars/store.jpg`,
    imageAlt: "Japanese ceramics in afternoon light",
    cta: null,
    ctaUrl: null,
  },
  "app-waitlist": {
    preview: "You're on the Kokoro Mirror waitlist.",
    heading: "A practice is taking shape.",
    body: "Kokoro Mirror is a daily awareness practice rooted in Japanese philosophy. You'll be among the first to try it, and we'll write to you when it's ready. Until then, the journal has lots to explore.",
    image: `${BASE_URL}/pillars/app.jpg`,
    imageAlt: "AUWA Kokoro Mirror app",
    cta: "Read the journal",
    ctaUrl: `${BASE_URL}/journal`,
  },
  "store-waitlist": {
    preview: "You're on the AUWA Store waitlist.",
    heading: "Made by hand, chosen with care.",
    body: "The AUWA Store will bring together lifetime objects from Japanese craftsmen. Every piece chosen because a master poured their soul into making it. We'll let you know when the doors open.",
    image: `${BASE_URL}/pillars/store.jpg`,
    imageAlt: "Japanese ceramics and wooden bowl in afternoon light",
    cta: "Read the journal",
    ctaUrl: `${BASE_URL}/journal`,
  },
  "book-waitlist": {
    preview: "You're on the AUWA Book waitlist.",
    heading: "Four stories, one light.",
    body: "The AUWA book will initially span four illustrated stories about a being who reveals the kokoro hidden in all things. We'll write to you when it's ready. In the meantime, the journal is a good place to start.",
    image: `${BASE_URL}/pillars/book.jpg`,
    imageAlt: "AUWA: The Beginning illustrated book",
    cta: "Read the journal",
    ctaUrl: `${BASE_URL}/journal`,
  },
};

interface WelcomeEmailProps {
  source?: keyof typeof sourceContent;
}

export default function WelcomeEmail({
  source = "newsletter",
}: WelcomeEmailProps) {
  const content = sourceContent[source];

  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&display=swap');
        `}</style>
      </Head>
      <Preview>{content.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Text style={wordmark}>AUWA</Text>
          </Section>

          {/* Hero image */}
          <Section style={imageSection}>
            <Img
              src={content.image}
              alt={content.imageAlt}
              width="520"
              style={heroImage}
            />
          </Section>

          {/* Content */}
          <Section style={contentSection}>
            <Heading style={heading}>{content.heading}</Heading>
            <Text style={paragraph}>{content.body}</Text>

            {content.cta && content.ctaUrl && (
              <Section style={ctaSection}>
                <Link href={content.ctaUrl} style={ctaLink}>
                  {content.cta}
                </Link>
              </Section>
            )}
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerLinks}>
              <Link href={`${BASE_URL}/journal`} style={footerLink}>
                Journal
              </Link>
              {"  ·  "}
              <Link href={`${BASE_URL}/store`} style={footerLink}>
                Store
              </Link>
              {"  ·  "}
              <Link href={`${BASE_URL}/app`} style={footerLink}>
                App
              </Link>
              {"  ·  "}
              <Link href={`${BASE_URL}/book`} style={footerLink}>
                Book
              </Link>
            </Text>
            <Text style={footerText}>
              © AUWA {new Date().getFullYear()}
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
  fontFamily:
    "'EB Garamond', Georgia, 'Times New Roman', serif",
};

const container: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "40px 24px 48px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center",
  padding: "0 0 32px",
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

const imageSection: React.CSSProperties = {
  padding: "0 0 36px",
};

const heroImage: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: "2px",
};

const contentSection: React.CSSProperties = {
  padding: "0",
};

const heading: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "28px",
  fontWeight: 400,
  color: "#141318",
  letterSpacing: "0.01em",
  lineHeight: "1.2",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const paragraph: React.CSSProperties = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "17px",
  lineHeight: "1.7",
  color: "#141318",
  letterSpacing: "0.005em",
  margin: "0 0 24px",
  opacity: 0.8,
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "8px 0 0",
};

const ctaLink: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "#141318",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
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
  margin: "0",
};
