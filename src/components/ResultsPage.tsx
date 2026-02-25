import { useState, useRef, useCallback, useEffect } from "react";
import { Instagram, Linkedin, Copy, Download } from "lucide-react";
import { archetypes } from "@/data/archetypes";
import { useToast } from "@/hooks/use-toast";
import type { ScoreResult } from "@/lib/scoring";

interface ResultsPageProps {
  results: ScoreResult;
  firstName: string;
  onRetake: () => void;
  resultId?: string;
}

const ResultsPage = ({ results, firstName, onRetake, resultId }: ResultsPageProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const topTwoNames = results.topTwo.map(([name]) => name);
  const top1 = archetypes[topTwoNames[0]];
  const top2 = archetypes[topTwoNames[1]];

  const resultsUrl = resultId ? `${window.location.origin}/results/${resultId}` : window.location.origin;
  const shareText = `I'm ${top1.title} ${top1.emoji} + ${top2.title} ${top2.emoji} — discover your Courage Archetype at`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${resultsUrl}`);
    toast({ title: "Copied to clipboard!", description: "Paste it anywhere to share." });
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(resultsUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resultsUrl)}`;

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(`${shareText} ${resultsUrl}`);
    toast({ title: "Text copied!", description: "Paste it in your Instagram story or post." });
    setTimeout(() => { window.open("https://www.instagram.com/", "_blank"); }, 500);
  };

  const renderShareCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;

    // Warm dark gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, 1920);
    grad.addColorStop(0, "#1A1A1A");
    grad.addColorStop(0.5, "#2A2220");
    grad.addColorStop(1, "#1A1A1A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle decorative line
    ctx.strokeStyle = "rgba(212, 168, 83, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(340, 280);
    ctx.lineTo(740, 280);
    ctx.stroke();

    // Header
    ctx.fillStyle = "#D4A853";
    ctx.font = "italic 42px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("My Courage Archetype", 540, 240);

    // Primary archetype
    ctx.fillStyle = "#FFF8F0";
    ctx.font = "bold 72px Georgia, serif";
    ctx.fillText(`${top1.title} ${top1.emoji}`, 540, 520);
    ctx.fillStyle = "#D4A853";
    ctx.font = "italic 36px Georgia, serif";
    ctx.fillText(`"${top1.tagline}"`, 540, 590);

    // Plus separator
    ctx.fillStyle = "rgba(255, 248, 240, 0.4)";
    ctx.font = "48px Georgia, serif";
    ctx.fillText("+", 540, 720);

    // Secondary archetype
    ctx.fillStyle = "#FFF8F0";
    ctx.font = "bold 60px Georgia, serif";
    ctx.fillText(`${top2.title} ${top2.emoji}`, 540, 870);
    ctx.fillStyle = "#D4A853";
    ctx.font = "italic 32px Georgia, serif";
    ctx.fillText(`"${top2.tagline}"`, 540, 930);

    // Decorative line
    ctx.strokeStyle = "rgba(212, 168, 83, 0.3)";
    ctx.beginPath();
    ctx.moveTo(340, 1080);
    ctx.lineTo(740, 1080);
    ctx.stroke();

    // Bottom CTA
    ctx.fillStyle = "rgba(255, 248, 240, 0.6)";
    ctx.font = "28px sans-serif";
    ctx.fillText("Discover yours at", 540, 1200);
    ctx.fillStyle = "#D4A853";
    ctx.font = "bold 30px sans-serif";
    const displayUrl = resultsUrl.replace(/^https?:\/\//, "");
    ctx.fillText(displayUrl, 540, 1250);

    // Copyright
    ctx.fillStyle = "rgba(255, 248, 240, 0.3)";
    ctx.font = "22px sans-serif";
    ctx.fillText("© 2026 Shatter The Norm LLC", 540, 1820);

    // Generate image URL for inline display
    const dataUrl = canvas.toDataURL("image/png");
    setShareImageUrl(dataUrl);
  }, [top1, top2, resultsUrl]);

  useEffect(() => {
    renderShareCard();
  }, [renderShareCard]);

  const handleDownload = () => {
    if (!shareImageUrl) return;
    const a = document.createElement("a");
    a.href = shareImageUrl;
    a.download = "my-courage-archetype.png";
    a.click();
  };

  const maxScore = Math.max(...results.sorted.map(([, score]) => score));

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 max-w-2xl mx-auto animate-fade-in-up">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-primary font-body font-medium text-sm uppercase tracking-widest mb-3">
          {firstName}'s Courage Archetype
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
              {arch.title} {arch.emoji}
            </h2>
            <p className="text-primary font-heading italic text-sm sm:text-base mb-1">
              "{arch.tagline}"
            </p>
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
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-body font-medium text-sm flex-1">
                      {arch.title} {arch.emoji}
                    </span>
                  </div>
                  <p className="font-heading italic text-xs text-muted-foreground mb-1.5">
                    "{arch.tagline}"
                  </p>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full animate-bar-grow`}
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: isTopTwo ? "#D4A853" : "#1A6B5C",
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

      {/* Share Card Preview */}
      <div className="mb-10">
        <h3 className="text-lg font-heading font-bold text-center mb-2">Share Your Courage Type</h3>
        <p className="text-center text-xs text-muted-foreground font-body mb-4">
          Hold to save to your photos 📲
        </p>
        {shareImageUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={shareImageUrl}
              alt={`My Courage Archetype: ${top1.title} + ${top2.title}`}
              className="w-full max-w-xs rounded-xl shadow-lg"
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            <Download size={16} /> Save Image
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            <Copy size={16} /> Copy
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
            <Linkedin size={16} /> LinkedIn
          </a>
          <button
            onClick={handleInstagramShare}
            className="inline-flex items-center gap-2 rounded-full bg-muted text-foreground font-body text-sm px-5 py-2.5 hover:bg-muted/80 transition-all"
          >
            <Instagram size={16} /> Instagram
          </button>
        </div>
      </div>

      {/* Share text preview */}
      <div className="text-center mb-10">
        <p className="text-sm text-muted-foreground font-body">
          I'm {top1.title} {top1.emoji} + {top2.title} {top2.emoji}
        </p>
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
          © 2026 Shatter The Norm LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
