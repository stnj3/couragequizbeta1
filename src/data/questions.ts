export interface Question {
  text: string;
  category: string;
}

export const questions: Question[] = [
  // LION — Physical Courage (6)
  { text: "When something physical needs to be handled, like a spider, a strange noise or a minor emergency, I'm usually the one who steps up.", category: "Physical Courage" },
  { text: "I've done things that scared me physically because sitting it out felt worse.", category: "Physical Courage" },
  { text: "Under physical stress or exhaustion, I tend to keep going rather than shut down.", category: "Physical Courage" },
  { text: "My instinct in a physically tense moment is to move toward it, not away from it.", category: "Physical Courage" },
  { text: "I stay present in my body when pressure hits rather than checking out.", category: "Physical Courage" },
  { text: "I show up physically even on days when my body is telling me to stay home.", category: "Physical Courage" },

  // WOLF — Moral Courage (6)
  { text: "I've spoken up for someone or something I believed in, even when it cost me socially or professionally.", category: "Moral Courage" },
  { text: "When no one would ever know the difference, I still make the choice I believe is right.", category: "Moral Courage" },
  { text: "I've gone out of my way to advocate for someone who deserved recognition, even when I had nothing to gain from it.", category: "Moral Courage" },
  { text: "I hold my ground on what I believe is right, even when the people around me want me to let it go.", category: "Moral Courage" },
  { text: "If I see someone being excluded or overlooked, I'm the person who pulls them back in.", category: "Moral Courage" },
  { text: "I've turned down an opportunity that looked good on paper because something about it didn't sit right with me.", category: "Moral Courage" },

  // DOLPHIN — Social Courage (6)
  { text: "I say what I actually think in group settings, even when I know it might land badly.", category: "Social Courage" },
  { text: "I'd rather be genuinely myself in a room full of people than perform a version of me that fits in better.", category: "Social Courage" },
  { text: "I've disagreed openly with someone who had more authority or status than me.", category: "Social Courage" },
  { text: "When a group is avoiding an uncomfortable truth, I tend to be the one who names it.", category: "Social Courage" },
  { text: "I show up as myself in new social environments rather than waiting to see what's expected first.", category: "Social Courage" },
  { text: "I've let people see me struggle rather than pretending I had it together.", category: "Social Courage" },

  // OCTOPUS — Emotional Courage (6)
  { text: "When I'm angry or hurt, I try to stay with the feeling and understand it rather than push it away.", category: "Emotional Courage" },
  { text: "I've asked for something I really wanted knowing the answer might be no.", category: "Emotional Courage" },
  { text: "I've ended a relationship or situation that wasn't working, even though what came next was uncertain.", category: "Emotional Courage" },
  { text: "When someone hurts me, I tell them rather than pretending it didn't happen.", category: "Emotional Courage" },
  { text: "I let myself feel sadness or grief fully instead of rushing to fix it or stay busy.", category: "Emotional Courage" },
  { text: "I've admitted to myself that something I wanted to believe was working actually wasn't.", category: "Emotional Courage" },

  // OWL — Intellectual Courage (6)
  { text: "I've changed my position on something important after realizing I was wrong.", category: "Intellectual Courage" },
  { text: "I seek out perspectives that challenge what I already believe, not just ones that confirm it.", category: "Intellectual Courage" },
  { text: "I'm comfortable saying \"I don't know\" when I genuinely don't, even on topics I'm supposed to be good at.", category: "Intellectual Courage" },
  { text: "When my strategy or plan isn't working, I can let it go rather than defending it.", category: "Intellectual Courage" },
  { text: "I'd rather sit with a complex question than force a simple answer just to feel settled.", category: "Intellectual Courage" },
  { text: "When someone challenges my thinking, my first instinct is to consider their point rather than defend mine.", category: "Intellectual Courage" },

  // BUTTERFLY — Existential Courage (6)
  { text: "I've made a major life decision without being able to fully explain or justify it to others.", category: "Existential Courage" },
  { text: "I trust my sense of direction in life even when I can't point to evidence that it's working yet.", category: "Existential Courage" },
  { text: "I've walked away from something safe or stable because something unproven was calling me forward.", category: "Existential Courage" },
  { text: "I'm more comfortable with not knowing what's next than most people around me seem to be.", category: "Existential Courage" },
  { text: "I've built or started something that no one else could see the value of yet.", category: "Existential Courage" },
  { text: "People have questioned my path and I've stayed on it anyway because something in me knew it was right.", category: "Existential Courage" },
];

export const QUESTIONS_PER_PAGE = 6;
export const TOTAL_PAGES = 6;
