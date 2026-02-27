import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface ArchetypeInfo {
  title: string;
  emoji: string;
  tagline: string;
  description: string;
}

const archetypes: Record<string, ArchetypeInfo> = {
  "Physical Courage": {
    title: "The Lion",
    emoji: "🦁",
    tagline: "Move first. Adjust later.",
    description: "You possess remarkable resilience when facing physical challenges. Like the lion, you confront threats head-on, using your strength and protective instincts to defend yourself and those around you.",
  },
  "Emotional Courage": {
    title: "The Octopus",
    emoji: "🐙",
    tagline: "Feel it before you fix it.",
    description: "You are open and honest with your emotions, willing to be vulnerable and face difficult feelings in order to grow. Like the octopus, you navigate emotional depths and reveal your true self.",
  },
  "Moral Courage": {
    title: "The Wolf",
    emoji: "🐺",
    tagline: "Hold the line, even alone.",
    description: "You have a strong sense of right and wrong and are unafraid to defend your principles, even when it comes at a personal cost. Like the wolf, you live by an inner code.",
  },
  "Social Courage": {
    title: "The Dolphin",
    emoji: "🐬",
    tagline: "Go toward people, not away.",
    description: "Your confidence in social settings allows you to stand up for yourself and others, even when it means going against the crowd. Like the dolphin, you navigate social dynamics with relational intelligence.",
  },
  "Intellectual Courage": {
    title: "The Owl",
    emoji: "🦉",
    tagline: "Question everything, including yourself.",
    description: "You are eager to challenge your beliefs and explore new ideas, embracing uncertainty as an opportunity to grow. Like the owl, you seek understanding even in the dark.",
  },
  "Spiritual Courage": {
    title: "The Butterfly",
    emoji: "🦋",
    tagline: "Trust the vision before the evidence arrives.",
    description: "You remain grounded in purpose, values, or long-range vision especially when the path forward is unclear. Like the butterfly, you transform through life's challenges.",
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, email, topTwo, resultId } = await req.json();

    const arch1 = archetypes[topTwo[0]];
    const arch2 = archetypes[topTwo[1]];

    if (!arch1 || !arch2) {
      return new Response(JSON.stringify({ error: "Invalid archetypes" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resultsUrl = `https://courageprofile.com/results/${resultId}`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0e0e0e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0e0e0e;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <h1 style="color:#f5f0e8;font-size:28px;font-weight:700;margin:0;letter-spacing:-0.5px;">Your Courage Archetypes</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="color:#c4bfb4;font-size:18px;margin:0;">${firstName}, here's what we found.</p>
            </td>
          </tr>

          <!-- Archetype 1 -->
          <tr>
            <td style="padding-bottom:16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;">
                <tr>
                  <td style="padding:28px;">
                    <p style="font-size:40px;margin:0 0 12px 0;">${arch1.emoji}</p>
                    <h2 style="color:#f5f0e8;font-size:22px;font-weight:600;margin:0 0 6px 0;">${arch1.title}</h2>
                    <p style="color:#d4a574;font-size:14px;font-style:italic;margin:0 0 12px 0;">${arch1.tagline}</p>
                    <p style="color:#c4bfb4;font-size:15px;line-height:1.6;margin:0;">${arch1.description}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Plus sign -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <span style="color:#d4a574;font-size:24px;font-weight:300;">+</span>
            </td>
          </tr>

          <!-- Archetype 2 -->
          <tr>
            <td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;">
                <tr>
                  <td style="padding:28px;">
                    <p style="font-size:40px;margin:0 0 12px 0;">${arch2.emoji}</p>
                    <h2 style="color:#f5f0e8;font-size:22px;font-weight:600;margin:0 0 6px 0;">${arch2.title}</h2>
                    <p style="color:#d4a574;font-size:14px;font-style:italic;margin:0 0 12px 0;">${arch2.tagline}</p>
                    <p style="color:#c4bfb4;font-size:15px;line-height:1.6;margin:0;">${arch2.description}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <a href="${resultsUrl}" style="display:inline-block;background-color:#d4a574;color:#0e0e0e;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">View Full Results</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="border-top:1px solid #2a2a2a;padding-top:24px;">
              <p style="color:#666;font-size:13px;margin:0 0 8px 0;">© 2026 Shatter The Norm LLC. All rights reserved.</p>
              <a href="https://courageprofile.com" style="color:#d4a574;font-size:13px;text-decoration:none;">courageprofile.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Courage Profile <quiz@courageprofile.com>",
        to: [email],
        subject: `${firstName}, your Courage Archetypes are ready`,
        html,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      return new Response(JSON.stringify({ error: result }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
