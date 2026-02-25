const LandingPage = ({ onBegin }: { onBegin: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in-up">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Emoji cluster */}
        <div className="text-4xl sm:text-5xl tracking-widest mb-2 opacity-80">
          🦁 🐙 🐺 🐬 🦉 🦋
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight tracking-tight">
          Discover Your<br />Courage Type
        </h1>

        <p className="text-lg sm:text-xl text-primary font-heading italic">
          A 5-minute assessment that reveals how you show up when it matters most.
        </p>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          There are six types of courage — and you lead with two. This quiz maps your unique courage signature based on how you actually move through uncertainty, not how you think you should.
        </p>

        <button
          onClick={() => {
            console.log("Quiz started");
            onBegin();
          }}
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-body font-semibold text-lg px-10 py-4 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Begin the Quiz
        </button>

        <p className="text-xs text-muted-foreground pt-4">
          © 2025 Shatter The Norm LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
