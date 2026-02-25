import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { archetypes } from "@/data/archetypes";

const SharedResults = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const [loading, setLoading] = useState(true);
  const [topTwo, setTopTwo] = useState<string[]>([]);

  useEffect(() => {
    if (!resultId) return;
    supabase
      .from("quiz_submissions")
      .select("top_two_archetypes")
      .eq("result_id", resultId)
      .single()
      .then(({ data }) => {
        if (data) setTopTwo(data.top_two_archetypes);
        setLoading(false);
      });
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Loading results…</p>
      </div>
    );
  }

  if (topTwo.length < 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6">
        <p className="text-muted-foreground font-body">Results not found.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg px-10 py-4 hover:opacity-90 transition-all"
        >
          Take the Quiz
        </Link>
      </div>
    );
  }

  const arch1 = archetypes[topTwo[0]];
  const arch2 = archetypes[topTwo[1]];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in-up">
      <div className="max-w-lg w-full text-center space-y-8">
        <p className="text-sm font-body text-muted-foreground uppercase tracking-widest">
          Someone's Courage Archetype
        </p>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold">
            {arch1.title} {arch1.emoji}
          </h1>
          <p className="text-primary font-heading italic text-base">"{arch1.tagline}"</p>
        </div>

        <p className="text-2xl text-muted-foreground">+</p>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold">
            {arch2.title} {arch2.emoji}
          </h2>
          <p className="text-primary font-heading italic text-base">"{arch2.tagline}"</p>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg px-10 py-4 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Discover Your Courage Archetype →
          </Link>
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          © 2026 Shatter The Norm LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SharedResults;
