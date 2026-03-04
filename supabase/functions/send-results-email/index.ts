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
    description: "You don't wait for the fear to pass before you act. Whether it's something small like handling the spider on the wall or something big like stepping into a confrontation, your courage lives in your body. You stay present when pressure hits and keep moving when others freeze.",
    watchFor: "Pushing through pain or exhaustion as a habit, not a choice. Sometimes the courageous move is knowing when to stop.",
  },
  "Emotional Courage": {
    title: "The Octopus",
    emoji: "🐙",
    tagline: "Feel it before you fix it.",
    description: "You stay with difficult emotions when most people would numb out, distract, or move on too fast. You ask for what you want knowing the answer might be no. You end what isn't working even when what comes next is uncertain. Your courage is in your willingness to be emotionally honest, with yourself and with others.",
    watchFor: "Sitting with feelings so long that the moment to act passes you by. You can honor the emotion and still move forward.",
  },
  "Moral Courage": {
    title: "The Wolf",
    emoji: "🐺",
    tagline: "Right is right, even when it's expensive.",
    description: "You live by an inner code and you act on it in both directions. You'll refuse what's wrong and you'll champion what's right, whether anyone's watching or not. You're the one advocating for the person who deserves the promotion, and the one saying no to the deal that doesn't sit right.",
    watchFor: "Holding the line so tightly that you forget to let others in. Your code works best when it has room to breathe.",
  },
  "Social Courage": {
    title: "The Dolphin",
    emoji: "🐬",
    tagline: "Show up real, even in a crowded room.",
    description: "You choose authenticity when it would be easier to perform. In group settings, in new rooms, in front of people with more status, you say what you actually think and show up as who you actually are. Your courage lives in the social field, where the risk is how people see you.",
    watchFor: "Saying the hard thing out of habit when the room might need something softer. Your honesty hits harder when it's timed well.",
  },
  "Intellectual Courage": {
    title: "The Owl",
    emoji: "🦉",
    tagline: "Question everything, including yourself.",
    description: "You're willing to say \"I don't know\" and mean it. You seek out ideas that challenge your thinking, not just ones that confirm it. When you're wrong, you update. When something is complex, you resist the urge to force a simple answer. Your courage lives in your relationship with your own mind.",
    watchFor: "Staying in the question longer than you need to. Sometimes you already know enough to move.",
  },
  "Existential Courage": {
    title: "The Butterfly",
    emoji: "🦋",
    tagline: "Trust the vision before the evidence arrives.",
    description: "You make moves that can't be fully explained yet. Career pivots, new ventures, life decisions that don't fit on a spreadsheet. You trust your sense of direction even when no one around you can see where it leads. Your courage is in your willingness to act without proof and build the road as you walk it.",
    watchFor: "Reaching for the next leap before you've landed from the last one. Your vision gets stronger when you give it time to build.",
  },
};

const categoryOrder = [
  "Physical Courage",
  "Emotional Courage",
  "Moral Courage",
  "Social Courage",
  "Intellectual Courage",
  "Existential Courage",
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
    const { firstName, email, topTwo, resultId, scores, answers } = await req.json();

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

    // Compute max single response per category for tie-breaking
    const categoryMaxResponse: Record<string, number> = {};
    for (const cat of categoryOrder) {
      categoryMaxResponse[cat] = 0;
    }
    if (answers) {
      // 36 questions: 6 per category, grouped by category
      const questionCategories = [
        ...Array(6).fill("Physical Courage"),
        ...Array(6).fill("Moral Courage"),
        ...Array(6).fill("Social Courage"),
        ...Array(6).fill("Emotional Courage"),
        ...Array(6).fill("Intellectual Courage"),
        ...Array(6).fill("Existential Courage"),
      ];
      for (const [idx, val] of Object.entries(answers)) {
        const cat = questionCategories[Number(idx)];
        if (cat && Number(val) > (categoryMaxResponse[cat] || 0)) {
          categoryMaxResponse[cat] = Number(val);
        }
      }
    }

    // Sort categories by score desc, then by highest single response desc, then alphabetically
    const sortedCategories = [...categoryOrder].sort((a, b) => {
      const scoreA = scores?.[a] || 0;
      const scoreB = scores?.[b] || 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      const maxA = categoryMaxResponse[a] || 0;
      const maxB = categoryMaxResponse[b] || 0;
      if (maxB !== maxA) return maxB - maxA;
      return a.localeCompare(b);
    });

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
              <p style="color:#555;font-size:15px;margin:0 0 20px 0;">Send the quiz to someone you lead with, work with, or live with.</p>
              <a href="mailto:?subject=${encodeURIComponent("I just took this and thought of you...")}&body=${encodeURIComponent("I just discovered my Courage Archetypes — it's a 5-minute quiz that shows which types of courage come most naturally to you. Take it here: https://courageprofile.com")}" style="display:inline-block;background-color:#1e2a4a;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">Share the Quiz</a>
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
