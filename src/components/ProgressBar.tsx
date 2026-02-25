interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

const ProgressBar = ({ currentPage, totalPages }: ProgressBarProps) => {
  const progress = (currentPage / totalPages) * 100;

  return (
    <div className="sticky top-0 z-50 w-full px-4 py-3 border-b border-border/30" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="flex items-center justify-center mb-2">
        <span className="text-sm font-body text-muted-foreground">
          {currentPage} of {totalPages}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;