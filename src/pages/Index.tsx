import { useState, useCallback } from "react";
import LandingPage from "@/components/LandingPage";
import QuizPage from "@/components/QuizPage";
import EmailCapture from "@/components/EmailCapture";
import ResultsPage from "@/components/ResultsPage";
import { calculateScores, type ScoreResult } from "@/lib/scoring";
import { sendToWebhook, type QuizSubmission } from "@/lib/webhook";

type Step = "landing" | "quiz" | "email" | "results";

const Index = () => {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<ScoreResult | null>(null);
  const [firstName, setFirstName] = useState("");
  const [resultId, setResultId] = useState<string | undefined>();

  const handleAnswer = useCallback((index: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  }, []);

  const handleQuizComplete = () => {
    setStep("email");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    setFirstName(name);
    const scored = calculateScores(answers);
    setResults(scored);

    const submission: QuizSubmission = {
      id: crypto.randomUUID(),
      firstName: name,
      email,
      answers,
      categories: scored.categories,
      topTwo: scored.topTwo,
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("quiz_submissions") || "[]");
      existing.push(submission);
      localStorage.setItem("quiz_submissions", JSON.stringify(existing));
    } catch {
      // silently fail
    }

    const rid = await sendToWebhook(submission);
    if (rid) setResultId(rid);
    console.log("Email submitted, results calculated");
    setStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setAnswers({});
    setResults(null);
    setResultId(undefined);
    setStep("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grain-overlay" />
      <div className="relative z-10">
        {step === "landing" && (
          <LandingPage onBegin={() => { console.log("Quiz started"); setStep("quiz"); window.scrollTo({ top: 0 }); }} />
        )}
        {step === "quiz" && (
          <QuizPage answers={answers} onAnswer={handleAnswer} onComplete={handleQuizComplete} />
        )}
        {step === "email" && <EmailCapture onSubmit={handleEmailSubmit} />}
        {step === "results" && results && (
          <ResultsPage results={results} firstName={firstName} onRetake={handleRetake} resultId={resultId} />
        )}
      </div>
    </>
  );
};

export default Index;
