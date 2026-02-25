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
    description: "You possess remarkable resilience when facing physical challenges. Like the lion, you confront threats head-on, using your strength and protective instincts to defend yourself and those around you. You take the mic with wobbly knees, push through discomfort, and keep showing up. Others feel tangible groundedness from you — calm under pressure, quiet reliability when things go sideways.",
    watchFor: "You may normalize pain, disappear into doing, or over-identify with being the one who can handle it.",
    oneLiner: "Confront threats head-on with strength and resilience.",
  },
  "Emotional Courage": {
    name: "Emotional Courage",
    emoji: "🐙",
    title: "The Octopus",
    tagline: "Feel it before you fix it.",
    quote: "Emotional courage doesn't mean having no fear of vulnerability — it means choosing honesty anyway.",
    description: "You are open and honest with your emotions, willing to be vulnerable and face difficult feelings in order to grow. Like the octopus, you navigate emotional depths and reveal your true self. You can name your own emotions with clarity, you're willing to pause or admit hurt even in front of others, and you help people feel like they don't need to hide what they feel. Others experience emotional safety and real trust around you.",
    watchFor: "You may overexpose without grounding, hold emotional weight that isn't yours, or confuse expression with resolution.",
    oneLiner: "Navigate emotional depths with vulnerability and honesty.",
  },
  "Moral Courage": {
    name: "Moral Courage",
    emoji: "🐺",
    title: "The Wolf",
    tagline: "Hold the line, even alone.",
    quote: "Moral courage isn't always about being bold. Often, it's a quiet refusal. A steady no. A choice no one sees but you.",
    description: "You have a strong sense of right and wrong and are unafraid to defend your principles, even when it comes at a personal cost. Like the wolf, you live by an inner code — standing up for what's right within your community even when faced with adversity. You feel an inner boundary when something crosses a line and you act on your values even when no one's watching. Others trust that you won't trade values for convenience.",
    watchFor: "You may become inflexible, isolate instead of engaging disagreement, or carry moral weight alone and silently.",
    oneLiner: "Defend your principles with unwavering conviction.",
  },
  "Social Courage": {
    name: "Social Courage",
    emoji: "🐬",
    title: "The Dolphin",
    tagline: "Go toward people, not away.",
    quote: "Social courage isn't about being loud or charming. It's about choosing connection over safety and authenticity over silence.",
    description: "Your confidence in social settings allows you to stand up for yourself and others, even when it means going against the crowd. Like the dolphin, you navigate social dynamics with relational intelligence and bold belonging. You're willing to introduce yourself when it's awkward, speak up when it might ruffle someone, and be visible even when it makes you vulnerable. Others feel openness and permission to show up as themselves.",
    watchFor: "You may take on social risks others aren't ready for, over-share for connection, or speak before sensing the space.",
    oneLiner: "Navigate social dynamics with authenticity and bold belonging.",
  },
  "Intellectual Courage": {
    name: "Intellectual Courage",
    emoji: "🦉",
    title: "The Owl",
    tagline: "Question everything, including yourself.",
    quote: "Intellectual courage isn't about being the smartest person in the room — it's about making space for what you don't yet know.",
    description: "You are eager to challenge your beliefs and explore new ideas, embracing uncertainty as an opportunity to grow. Like the owl, you seek understanding even in the dark, using keen insight to navigate complex terrain. You're willing to say \"I don't know\" in front of others, challenge ideas including your own, and learn rather than be seen as always right. Others experience a culture where questions matter more than certainty.",
    watchFor: "You may stay in the abstract to avoid emotional risk, stall action for more information, or appear overly contrarian.",
    oneLiner: "Embrace uncertainty and challenge beliefs to grow.",
  },
  "Spiritual Courage": {
    name: "Spiritual Courage",
    emoji: "🦋",
    title: "The Butterfly",
    tagline: "Trust the vision before the evidence arrives.",
    quote: "Spiritual courage is what allows vision to survive volatility. You don't need certainty to lead — you need alignment.",
    description: "You remain grounded in purpose, values, or long-range vision especially when the path forward is unclear. Like the butterfly emerging from its cocoon, you transform through life's challenges. You hold steady during ambiguity, choose perspective when pressure calls for reaction, and move through change by staying connected to meaning. Others feel calm during complex transitions and conviction that transcends short-term outcomes.",
    watchFor: "You may default to abstract optimism when clarity is needed, under-communicate in crisis, or bypass hard conversations in favor of higher purpose.",
    oneLiner: "Stay grounded in purpose through life's transformations.",
  },
};

export const categoryOrder = [
  "Physical Courage",
  "Emotional Courage",
  "Moral Courage",
  "Social Courage",
  "Intellectual Courage",
  "Spiritual Courage",
];
