interface LikertScaleProps {
  questionIndex: number;
  value: number | undefined;
  onChange: (questionIndex: number, value: number) => void;
  hasError: boolean;
}

const labels = ["Rarely", "Seldom", "Sometimes", "Often", "Almost Always"];

const LikertScale = ({ questionIndex, value, onChange, hasError }: LikertScaleProps) => {
  return (
    <div className={`flex flex-col gap-2 ${hasError ? 'ring-1 ring-destructive/50 rounded-lg p-2 -m-2' : ''}`}>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {labels.map((label, i) => {
          const score = i + 1;
          const isSelected = value === score;
          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(questionIndex, score)}
              className={`
                flex flex-col items-center justify-center
                rounded-lg py-3 px-1 sm:px-2
                text-xs sm:text-sm font-body font-medium
                transition-all duration-200 cursor-pointer
                min-h-[60px] sm:min-h-[68px]
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-muted text-foreground [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-foreground"
                }
              `}
            >
              <span className="text-base sm:text-lg font-bold mb-0.5">{score}</span>
              <span className="leading-tight text-center text-[10px] sm:text-xs">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LikertScale;
