import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface ArchetypeInfo {
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  watchFor: string;
}

const archetypes: Record<string, ArchetypeInfo> = {
  "Physical Courage": {
    title: "The Lion",
    emoji: "🦁",
    tagline: "Move first. Adjust later.",
    description: "You possess remarkable resilience when facing physical challenges. Like the lion, you confront threats head-on, using your strength and protective instincts to defend yourself and those around you.",
    watchFor: "You may normalize pain, disappear into doing, or over-identify with being the one who can handle it.",
  },
  "Emotional Courage": {
    title: "The Octopus",
    emoji: "🐙",
    tagline: "Feel it before you fix it.",
    description: "You are open and honest with your emotions, willing to be vulnerable and face difficult feelings in order to grow. Like the octopus, you navigate emotional depths and reveal your true self.",
    watchFor: "You may overexpose without grounding, hold emotional weight that isn't yours, or confuse expression with resolution.",
  },
  "Moral Courage": {
    title: "The Wolf",
    emoji: "🐺",
    tagline: "Hold the line, even alone.",
    description: "You have a strong sense of right and wrong and are unafraid to defend your principles, even when it comes at a personal cost. Like the wolf, you live by an inner code.",
    watchFor: "You may become inflexible, isolate instead of engaging disagreement, or carry moral weight alone and silently.",
  },
  "Social Courage": {
    title: "The Dolphin",
    emoji: "🐬",
    tagline: "Go toward people, not away.",
    description: "Your confidence in social settings allows you to stand up for yourself and others, even when it means going against the crowd. Like the dolphin, you navigate social dynamics with relational intelligence.",
    watchFor: "You may take on social risks others aren't ready for, over-share for connection, or speak before sensing the space.",
  },
  "Intellectual Courage": {
    title: "The Owl",
    emoji: "🦉",
    tagline: "Question everything, including yourself.",
    description: "You are eager to challenge your beliefs and explore new ideas, embracing uncertainty as an opportunity to grow. Like the owl, you seek understanding even in the dark.",
    watchFor: "You may stay in the abstract to avoid emotional risk, stall action for more information, or appear overly contrarian.",
  },
  "Spiritual Courage": {
    title: "The Butterfly",
    emoji: "🦋",
    tagline: "Trust the vision before the evidence arrives.",
    description: "You remain grounded in purpose, values, or long-range vision especially when the path forward is unclear. Like the butterfly, you transform through life's challenges.",
    watchFor: "You may default to abstract optimism when clarity is needed, under-communicate in crisis, or bypass hard conversations in favor of higher purpose.",
  },
};

const categoryOrder = [
  "Physical Courage",
  "Emotional Courage",
  "Moral Courage",
  "Social Courage",
  "Intellectual Courage",
  "Spiritual Courage",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, email, topTwo, resultId, scores } = await req.json();

    const arch1 = archetypes[topTwo[0]];
    const arch2 = archetypes[topTwo[1]];

    if (!arch1 || !arch2) {
      return new Response(JSON.stringify({ error: "Invalid archetypes" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resultsUrl = `https://courageprofile.com/results/${resultId}`;

    // Build score bars HTML
    const scoreValues = categoryOrder.map(cat => scores?.[cat] || 0);
    const maxScore = Math.max(...scoreValues);
    const minScore = Math.min(...scoreValues);
    const scoreRange = maxScore - minScore || 1;

    // Sort categories by score descending
    const sortedCategories = [...categoryOrder].sort((a, b) => (scores?.[b] || 0) - (scores?.[a] || 0));

    const scoreBarsHtml = sortedCategories.map(cat => {
      const arch = archetypes[cat];
      const score = scores?.[cat] || 0;
      const barPercent = Math.round(20 + ((score - minScore) / scoreRange) * 80);
      const isTopTwo = topTwo.includes(cat);
      const barColor = isTopTwo ? "#C9963B" : "#1A6B5C";

      return `
        <tr>
          <td style="padding:6px 0;">
            <p style="color:#1e2a4a;font-size:13px;margin:0 0 4px 0;font-weight:${isTopTwo ? '600' : '400'};">${arch.emoji} ${arch.title}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#e8e4de;border-radius:4px;">
                  <div style="background-color:${barColor};height:12px;border-radius:4px;width:${barPercent}%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    }).join("");

    // Build archetype card HTML helper
    const archCard = (arch: ArchetypeInfo) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;border:1px solid #e0dbd3;">
        <tr>
          <td style="padding:28px;">
            <h2 style="color:#1e2a4a;font-size:22px;font-weight:600;margin:0 0 6px 0;">${arch.emoji} ${arch.title}</h2>
            <p style="color:#C9963B;font-size:14px;font-style:italic;margin:0 0 12px 0;">${arch.tagline}</p>
            <p style="color:#3a3a3a;font-size:15px;line-height:1.6;margin:0 0 14px 0;">${arch.description}</p>
            <p style="color:#666;font-size:13px;line-height:1.5;margin:0;"><strong style="color:#1e2a4a;">Watch for:</strong> ${arch.watchFor}</p>
          </td>
        </tr>
      </table>`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#faf9f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f6;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <h1 style="color:#1e2a4a;font-size:28px;font-weight:700;margin:0;letter-spacing:-0.5px;">Your Courage Archetypes</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="color:#3a3a3a;font-size:18px;margin:0;">${firstName}, here's what we found.</p>
            </td>
          </tr>

          <!-- Archetype 1 -->
          <tr>
            <td style="padding-bottom:16px;">
              ${archCard(arch1)}
            </td>
          </tr>

          <!-- Plus sign -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <span style="color:#C9963B;font-size:24px;font-weight:300;">+</span>
            </td>
          </tr>

          <!-- Archetype 2 -->
          <tr>
            <td style="padding-bottom:32px;">
              ${archCard(arch2)}
            </td>
          </tr>

          <!-- Full Courage Profile -->
          <tr>
            <td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;border:1px solid #e0dbd3;">
                <tr>
                  <td style="padding:28px;">
                    <h3 style="color:#1e2a4a;font-size:18px;font-weight:600;margin:0 0 16px 0;">Full Courage Profile</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${scoreBarsHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Share Section -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <h3 style="color:#1e2a4a;font-size:20px;font-weight:600;margin:0 0 8px 0;">Courage is better together.</h3>
              <p style="color:#555;font-size:15px;margin:0 0 20px 0;">Share the quiz with someone you lead with, work with, or live with.</p>
              <a href="https://courageprofile.com" style="display:inline-block;background-color:#1e2a4a;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">Share the Quiz</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="border-top:1px solid #e0dbd3;padding-top:24px;">
              <p style="color:#999;font-size:13px;margin:0 0 8px 0;">© 2026 Courage Profile. All rights reserved.</p>
              <a href="https://courageprofile.com" style="color:#C9963B;font-size:13px;text-decoration:none;">courageprofile.com</a>
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
