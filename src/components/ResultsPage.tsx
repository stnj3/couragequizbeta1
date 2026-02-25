import { useState, useRef, useCallback } from "react";
import { archetypes } from "@/data/archetypes";
import type { ScoreResult } from "@/lib/scoring";

interface ResultsPageProps {
  results: ScoreResult;
  firstName: string;
  onRetake: () => void;
}

const ResultsPage = ({ results, firstName, onRetake }: ResultsPageProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topTwoNames = results.topTwo.map(([name]) => name);
  const top1 = archetypes[topTwoNames[0]];
  const top2 = archetypes[topTwoNames[1]];

  const shareText = `I'm The ${top1.title} ${top1.emoji} + The ${top2.title} ${top2.emoji} — discover your Courage Type at`;
  const shareUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    alert("Copied to clipboard!");
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const generateShareImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Background
    ctx.fillStyle = "#1A1A1A";
    ctx.fillRect(0, 0, 1080, 1080);

    // Title
    ctx.fillStyle = "#FFF8F0";
    ctx.font = "bold 48px serif";
    ctx.textAlign = "center";
    ctx.fillText("My Courage Signature", 540, 180);

    // Archetype 1
    ctx.font = "80px serif";
    ctx.fillText(top1.emoji, 540, 340);
    ctx.font = "bold 52px serif";
    ctx.fillStyle = "#D4A853";
    ctx.fillText(`The ${top1.title}`, 540, 420);

    // Plus
    ctx.fillStyle = "#FFF8F0";
    ctx.font = "40px sans-serif";
    ctx.fillText("+", 540, 500);

    // Archetype 2
    ctx.font = "80px serif";
    ctx.fillText(top2.emoji, 540, 600);
    ctx.font = "bold 52px serif";
    ctx.fillStyle = "#D4A853";
    ctx.fillText(`The ${top2.title}`, 540, 680);

    // URL
    ctx.fillStyle = "#FFF8F0";
    ctx.font = "28px sans-serif";
    ctx.fillText("Discover yours at", 540, 840);
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(shareUrl, 540, 890);

    // Footer
    ctx.fillStyle = "#FFF8F0";
    ctx.globalAlpha = 0.5;
    ctx.font = "22px sans-serif";
    ctx.fillText("© 2025 Shatter The Norm LLC", 540, 1020);
    ctx.globalAlpha = 1;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-courage-signature.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [top1, top2, shareUrl]);

  // Find max score for relative bar sizing
  const maxScore = Math.max(...results.sorted.map(([, score]) => score));

  console.log("Results viewed:", { topTwo: topTwoNames, scores: results.categories });

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 max-w-2xl mx-auto animate-fade-in-up">
      <canvas ref={canvasRef} className="hidden" />

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
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-1">
              The {arch.title} {arch.emoji}
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
            const barWidth = (score / maxScore) * 100;
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
                    <span className="font-body font-medium text-sm flex-1">
                      The {arch.title} {arch.emoji}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full animate-bar-grow ${
                        isTopTwo ? "bg-primary" : "bg-secondary"
                      }`}
                      style={{
                        width: `${barWidth}%`,
                        animationDelay: `${i * 100 + 300}ms`,
                        animationFillMode: "forwards",
                      }}
                    />
                  </div>
                </button>

                {!isTopTwo && isExpanded && (
                  <div className="mt-3 ml-2 animate-fade-in">
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
          I'm The {top1.title} {top1.emoji} + The {top2.title} {top2.emoji}
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
          <button
            onClick={generateShareImage}
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            📸 Share on Instagram
          </button>
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