import { supabase } from "@/integrations/supabase/client";

export interface QuizSubmission {
  id: string;
  firstName: string;
  email: string;
  answers: Record<number, number>;
  categories: Record<string, number>;
  topTwo: [string, number][];
  timestamp: string;
}

export async function sendToWebhook(data: QuizSubmission): Promise<void> {
  try {
    const { error } = await supabase.from("quiz_submissions").insert({
      first_name: data.firstName,
      email: data.email,
      raw_scores: data.categories,
      top_two_archetypes: data.topTwo.map(([name]) => name),
      answers: data.answers,
    });

    if (error) {
      console.error("Failed to save submission:", error.message);
    } else {
      console.log("Quiz submission saved to database");
    }
  } catch (err) {
    console.error("Error saving submission:", err);
  }
}