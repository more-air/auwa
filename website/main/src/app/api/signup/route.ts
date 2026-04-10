import { NextResponse } from "next/server";

// Segment IDs from Resend dashboard
const SEGMENT_MAP: Record<string, string> = {
  "app-waitlist": "1924598e-56f8-478e-a0c9-cd896e612953",
  "store-waitlist": "53ca6dff-01c3-4728-838a-5bac584294a1",
  "book-waitlist": "117496ae-3d14-46b5-b17c-d95a97f0ab35",
};

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Build segments array: always include the waitlist segment if applicable
    const segmentId = SEGMENT_MAP[source];
    const segments = segmentId ? [{ id: segmentId }] : [];

    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments,
    });

    if (error) {
      if (error.message?.includes("already exists")) {
        return NextResponse.json({ success: true });
      }
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to subscribe";
    console.error("Signup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
