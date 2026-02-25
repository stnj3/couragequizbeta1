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
  // TODO: Replace with Beehiiv or Zapier webhook URL
  // const webhookUrl = "https://your-webhook-url-here";
  // await fetch(webhookUrl, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data)
  // });
  console.log("Quiz submission data:", data);
}
