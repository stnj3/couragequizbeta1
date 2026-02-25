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

export async function sendToWebhook(data: QuizSubmission): Promise<string | null> {
  try {
    const { data: inserted, error } = await supabase.from("quiz_submissions").insert({
      first_name: data.firstName,
      email: data.email,
      raw_scores: data.categories,
      top_two_archetypes: data.topTwo.map(([name]) => name),
      answers: data.answers,
    }).select("result_id").single();

    if (error) {
      console.error("Failed to save submission:", error.message);
      return null;
    }
    console.log("Quiz submission saved to database");
    return inserted?.result_id ?? null;
  } catch (err) {
    console.error("Error saving submission:", err);
    return null;
  }
}
