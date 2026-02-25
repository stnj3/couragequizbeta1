import { useState } from "react";
import { archetypes } from "@/data/archetypes";
import type { ScoreResult } from "@/lib/scoring";

interface ResultsPageProps {
  results: ScoreResult;
  firstName: string;
  onRetake: () => void;
}

const ResultsPage = ({ results, firstName, onRetake }: ResultsPageProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const topTwoNames = results.topTwo.map(([name]) => name);
  const top1 = archetypes[topTwoNames[0]];
  const top2 = archetypes[topTwoNames[1]];

  const shareText = `I'm a ${top1.title} + ${top2.title} — my Courage Signature. Discover yours at`;
  const shareUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    alert("Copied to clipboard!");
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  console.log("Results viewed:", { topTwo: topTwoNames, scores: results.categories });

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 max-w-2xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-primary font-body font-medium text-sm uppercase tracking-widest mb-3">
          {firstName}'s Courage Signature
        </p>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
          Your Two Strongest Courage Types
        </h1>
      </div>

      {/* Top Two Cards */}
      <div className="space-y-6 mb-12">
        {[top1, top2].map((arch, i) => (
          <div
            key={arch.name}
            className="rounded-2xl bg-card text-card-foreground p-6 sm:p-8 shadow-md animate-scale-in"
            style={{ animationDelay: `${i * 150}ms`, animationFillMode: "forwards", opacity: 0 }}
          >
            <div className="text-5xl mb-3">{arch.emoji}</div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-1">
              {arch.title}
            </h2>
            <p className="text-sm font-body text-card-foreground/60 uppercase tracking-wider mb-4">
              {arch.name}
            </p>
            <blockquote className="border-l-2 border-primary pl-4 mb-4 italic font-heading text-sm sm:text-base text-card-foreground/80">
              "{arch.quote}"
            </blockquote>
            <p className="font-body text-sm sm:text-base leading-relaxed text-card-foreground/90 mb-4">
              {arch.description}
            </p>
            <p className="font-body text-sm text-card-foreground/70">
              <span className="font-semibold">Watch for overplay:</span> {arch.watchFor}
            </p>
          </div>
        ))}
      </div>

      {/* Full Ranking */}
      <div className="mb-12">
        <h3 className="text-xl font-heading font-bold mb-6 text-center">
          Full Courage Profile
        </h3>
        <div className="space-y-3">
          {results.sorted.map(([category, score], i) => {
            const arch = archetypes[category];
            const isTopTwo = topTwoNames.includes(category);
            const pct = results.percentages[category];
            const isExpanded = expandedCategory === category;

            return (
              <div key={category}>
                <button
                  onClick={() => {
                    if (!isTopTwo) setExpandedCategory(isExpanded ? null : category);
                  }}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xl">{arch.emoji}</span>
                    <span className="font-body font-medium text-sm flex-1">
                      {arch.title} · {arch.name}
                    </span>
                    <span className="font-body text-sm text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full animate-bar-grow ${
                        isTopTwo ? "bg-primary" : "bg-secondary"
                      }`}
                      style={{
                        width: `${pct}%`,
                        animationDelay: `${i * 100 + 300}ms`,
                        animationFillMode: "forwards",
                      }}
                    />
                  </div>
                </button>

                {/* Expandable description for non-top-two */}
                {!isTopTwo && isExpanded && (
                  <div className="mt-3 ml-9 animate-fade-in">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {arch.oneLiner}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Share */}
      <div className="text-center space-y-4 mb-10">
        <h3 className="text-lg font-heading font-bold">Share Your Courage Type</h3>
        <p className="text-sm text-muted-foreground font-body">
          I'm a {top1.emoji} {top1.title} + {top2.emoji} {top2.title}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            📋 Copy to Clipboard
          </button>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            𝕏 Share on X
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            in Share on LinkedIn
          </a>
        </div>
      </div>

      {/* Retake */}
      <div className="text-center pb-10">
        <button
          onClick={onRetake}
          className="font-body text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Retake Quiz
        </button>
        <p className="text-xs text-muted-foreground mt-6">
          © 2025 Shatter The Norm LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
