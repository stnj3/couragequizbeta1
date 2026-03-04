export interface Archetype {
  name: string;
  emoji: string;
  title: string;
  tagline: string;
  quote: string;
  description: string;
  watchFor: string;
  oneLiner: string;
}

export const archetypes: Record<string, Archetype> = {
  "Physical Courage": {
    name: "Physical Courage",
    emoji: "🦁",
    title: "The Lion",
    tagline: "Move first. Adjust later.",
    quote: "Physical courage isn't always about running into danger. It's about staying in your body when everyone else is trying to escape theirs.",
    description: "You don't wait for the fear to pass before you act. Whether it's something small like handling the spider on the wall or something big like stepping into a confrontation, your courage lives in your body. You stay present when pressure hits and keep moving when others freeze.",
    watchFor: "Pushing through pain or exhaustion as a habit, not a choice. Sometimes the courageous move is knowing when to stop.",
    oneLiner: "Confront threats head-on with strength and resilience.",
  },
  "Emotional Courage": {
    name: "Emotional Courage",
    emoji: "🐙",
    title: "The Octopus",
    tagline: "Feel it before you fix it.",
    quote: "Emotional courage doesn't mean having no fear of vulnerability — it means choosing honesty anyway.",
    description: "You stay with difficult emotions when most people would numb out, distract, or move on too fast. You ask for what you want knowing the answer might be no. You end what isn't working even when what comes next is uncertain. Your courage is in your willingness to be emotionally honest, with yourself and with others.",
    watchFor: "Sitting with feelings so long that the moment to act passes you by. You can honor the emotion and still move forward.",
    oneLiner: "Navigate emotional depths with vulnerability and honesty.",
  },
  "Moral Courage": {
    name: "Moral Courage",
    emoji: "🐺",
    title: "The Wolf",
    tagline: "Right is right, even when it's expensive.",
    quote: "Moral courage isn't always about being bold. Often, it's a quiet refusal. A steady no. A choice no one sees but you.",
    description: "You live by an inner code and you act on it in both directions. You'll refuse what's wrong and you'll champion what's right, whether anyone's watching or not. You're the one advocating for the person who deserves the promotion, and the one saying no to the deal that doesn't sit right.",
    watchFor: "Holding the line so tightly that you forget to let others in. Your code works best when it has room to breathe.",
    oneLiner: "Defend your principles with unwavering conviction.",
  },
  "Social Courage": {
    name: "Social Courage",
    emoji: "🐬",
    title: "The Dolphin",
    tagline: "Show up real, even in a crowded room.",
    quote: "Social courage isn't about being loud or charming. It's about choosing connection over safety and authenticity over silence.",
    description: "You choose authenticity when it would be easier to perform. In group settings, in new rooms, in front of people with more status, you say what you actually think and show up as who you actually are. Your courage lives in the social field, where the risk is how people see you.",
    watchFor: "Saying the hard thing out of habit when the room might need something softer. Your honesty hits harder when it's timed well.",
    oneLiner: "Navigate social dynamics with authenticity and bold belonging.",
  },
  "Intellectual Courage": {
    name: "Intellectual Courage",
    emoji: "🦉",
    title: "The Owl",
    tagline: "Question everything, including yourself.",
    quote: "Intellectual courage isn't about being the smartest person in the room — it's about making space for what you don't yet know.",
    description: "You're willing to say \"I don't know\" and mean it. You seek out ideas that challenge your thinking, not just ones that confirm it. When you're wrong, you update. When something is complex, you resist the urge to force a simple answer. Your courage lives in your relationship with your own mind.",
    watchFor: "Staying in the question longer than you need to. Sometimes you already know enough to move.",
    oneLiner: "Embrace uncertainty and challenge beliefs to grow.",
  },
  "Existential Courage": {
    name: "Existential Courage",
    emoji: "🦋",
    title: "The Butterfly",
    tagline: "Trust the vision before the evidence arrives.",
    quote: "Existential courage is what allows vision to survive volatility. You don't need certainty to lead — you need alignment.",
    description: "You make moves that can't be fully explained yet. Career pivots, new ventures, life decisions that don't fit on a spreadsheet. You trust your sense of direction even when no one around you can see where it leads. Your courage is in your willingness to act without proof and build the road as you walk it.",
    watchFor: "Reaching for the next leap before you've landed from the last one. Your vision gets stronger when you give it time to build.",
    oneLiner: "Stay grounded in purpose through life's transformations.",
  },
};

export const categoryOrder = [
  "Physical Courage",
  "Emotional Courage",
  "Moral Courage",
  "Social Courage",
  "Intellectual Courage",
  "Existential Courage",
];
