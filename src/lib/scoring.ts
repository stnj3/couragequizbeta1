import { questions } from "@/data/questions";

export interface ScoreResult {
  categories: Record<string, number>;
  sorted: [string, number][];
  topTwo: [string, number][];
  percentages: Record<string, number>;
  totalScore: number;
}

export function calculateScores(answers: Record<number, number>): ScoreResult {
  const categories: Record<string, number> = {
    "Physical Courage": 0,
    "Emotional Courage": 0,
    "Moral Courage": 0,
    "Social Courage": 0,
    "Intellectual Courage": 0,
    "Spiritual Courage": 0,
  };

  // Track max single-question response per category for tie-breaking
  const categoryMaxResponse: Record<string, number> = {
    "Physical Courage": 0,
    "Emotional Courage": 0,
    "Moral Courage": 0,
    "Social Courage": 0,
    "Intellectual Courage": 0,
    "Spiritual Courage": 0,
  };

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer) {
      categories[question.category] += answer;
      if (answer > categoryMaxResponse[question.category]) {
        categoryMaxResponse[question.category] = answer;
      }
    }
  });

  // Sort by score desc, then by highest single response desc, then alphabetically
  const sorted = Object.entries(categories).sort(([catA, a], [catB, b]) => {
    if (b !== a) return b - a;
    const maxA = categoryMaxResponse[catA];
    const maxB = categoryMaxResponse[catB];
    if (maxB !== maxA) return maxB - maxA;
    return catA.localeCompare(catB);
  });

  const topTwo: [string, number][] = [sorted[0] as [string, number], sorted[1] as [string, number]];

  const totalScore = Object.values(categories).reduce((sum, s) => sum + s, 0);
  const percentages: Record<string, number> = {};
  for (const [cat, score] of Object.entries(categories)) {
    percentages[cat] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
  }

  return { categories, sorted: sorted as [string, number][], topTwo, percentages, totalScore };
}
