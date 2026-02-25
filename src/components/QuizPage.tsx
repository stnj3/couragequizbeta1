import { useState } from "react";
import { questions, QUESTIONS_PER_PAGE, TOTAL_PAGES } from "@/data/questions";
import ProgressBar from "@/components/ProgressBar";
import LikertScale from "@/components/LikertScale";

interface QuizPageProps {
  answers: Record<number, number>;
  onAnswer: (index: number, value: number) => void;
  onComplete: () => void;
}

const QuizPage = ({ answers, onAnswer, onComplete }: QuizPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showErrors, setShowErrors] = useState(false);

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const allAnswered = pageQuestions.every((_, i) => answers[startIndex + i] !== undefined);

  const handleNext = () => {
    if (!allAnswered) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    console.log(`Quiz page ${currentPage + 1} completed`);

    if (currentPage === TOTAL_PAGES - 1) {
      onComplete();
    } else {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setShowErrors(false);
    setCurrentPage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col" key={currentPage}>
      <ProgressBar currentPage={currentPage + 1} totalPages={TOTAL_PAGES} />

      <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl mx-auto w-full animate-fade-in">
        <div className="space-y-8 stagger-children">
          {pageQuestions.map((q, i) => {
            const globalIndex = startIndex + i;
            const hasError = showErrors && answers[globalIndex] === undefined;

            return (
              <div
                key={globalIndex}
                className="animate-fade-in-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <div className="rounded-xl bg-card text-card-foreground p-5 sm:p-6 shadow-sm">
                  <p className="font-body text-sm sm:text-base font-medium leading-relaxed mb-4">
                    {globalIndex + 1}. {q.text}
                  </p>
                  <LikertScale
                    questionIndex={globalIndex}
                    value={answers[globalIndex]}
                    onChange={onAnswer}
                    hasError={hasError}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {showErrors && !allAnswered && (
          <p className="text-destructive text-sm text-center mt-4 font-body animate-fade-in">
            Please answer all questions before continuing.
          </p>
        )}

        <div className="flex justify-between items-center mt-8 pb-8">
          {currentPage > 0 ? (
            <button
              onClick={handleBack}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-3 hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {currentPage === TOTAL_PAGES - 1 ? "See My Results" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
