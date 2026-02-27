import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const LandingPage = ({ onBegin }: { onBegin: () => void }) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("quiz_submissions")
      .select("id", { count: "exact", head: true })
      .then(({ count: c }) => {
        if (c !== null) {
          const displayCount = 200 + (c * 8);
          setCount(displayCount);
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in-up relative overflow-hidden"
      style={{
        background: "linear-gradient(165deg, hsl(222 35% 8%) 0%, hsl(222 30% 12%) 40%, hsl(220 25% 14%) 70%, hsl(222 35% 9%) 100%)"
      }}
    >
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 30%, hsla(40,55%,58%,0.10) 0%, transparent 70%)"
      }} />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* Emoji cluster */}
        <div className="text-4xl sm:text-5xl tracking-widest mb-2 opacity-85">
          🦁 🐙 🐺 🐬 🦉 🦋
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight tracking-tight text-foreground">
          Discover Your<br />Courage Archetypes
        </h1>

        <p className="text-lg sm:text-xl text-primary font-heading font-semibold">
          A 5-minute assessment that reveals how you show up when it matters most.
        </p>

        <p className="text-base sm:text-lg leading-relaxed max-w-md mx-auto" style={{ color: "hsl(220 15% 68%)" }}>
          There are six types of courage — and you naturally lead with two. This quiz maps your unique courage archetypes based on how you actually move through uncertainty, not how you think you should.
        </p>

        <button
          onClick={() => {
            console.log("Quiz started");
            onBegin();
          }}
          className="inline-flex items-center justify-center rounded-full font-body font-semibold text-lg px-10 py-4 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, hsl(40 55% 50%), hsl(40 55% 62%))",
            color: "hsl(0 0% 10%)",
          }}
        >
          Begin the Quiz
        </button>

        {count !== null && (
          <p className="text-sm font-body" style={{ color: "hsl(40 55% 58% / 0.85)" }}>
            Join {count.toLocaleString()} people who've discovered their Courage Archetypes.
          </p>
        )}

        <p className="text-xs pt-4" style={{ color: "hsl(220 15% 50%)" }}>
          © 2026 Courage Profile. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
