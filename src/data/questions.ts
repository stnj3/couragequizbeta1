export interface Question {
  text: string;
  category: string;
}

export const questions: Question[] = [
  // PAGE 1
  { text: "I am willing to physically intervene in a dangerous situation to help someone in need.", category: "Physical Courage" },
  { text: "I am comfortable expressing my opinions in group settings, even when my views are unpopular.", category: "Social Courage" },
  { text: "I speak out against injustice, even when it's unpopular or difficult to do so.", category: "Moral Courage" },
  { text: "I am open about my feelings, even when they make me vulnerable.", category: "Emotional Courage" },
  { text: "I am willing to explore ideas or viewpoints that challenge my current beliefs.", category: "Intellectual Courage" },
  { text: "I stay true to my core beliefs, even when they are tested by difficult circumstances.", category: "Spiritual Courage" },

  // PAGE 2
  { text: "I enjoy participating in activities that involve physical risk (e.g., extreme sports, hiking in challenging environments).", category: "Physical Courage" },
  { text: "I often take on leadership roles in social situations, even when I might face criticism.", category: "Social Courage" },
  { text: "I am comfortable taking a stand on ethical issues, regardless of the consequences.", category: "Moral Courage" },
  { text: "I find it easy to express deep emotions to others, even in difficult situations.", category: "Emotional Courage" },
  { text: "I feel comfortable engaging in debates where my opinions may be criticized.", category: "Intellectual Courage" },
  { text: "I find strength in my spiritual or philosophical practices when facing challenges.", category: "Spiritual Courage" },

  // PAGE 3
  { text: "When faced with a physical challenge, I trust my body to handle it.", category: "Physical Courage" },
  { text: "I am willing to speak up when I witness something unfair, regardless of who is present.", category: "Social Courage" },
  { text: "I prioritize doing what I believe is right, even if it comes at a personal cost.", category: "Moral Courage" },
  { text: "I am not afraid to confront my own emotional pain or discomfort.", category: "Emotional Courage" },
  { text: "I am open to learning from people who have radically different worldviews.", category: "Intellectual Courage" },
  { text: "I reflect on my sense of purpose or meaning during tough times.", category: "Spiritual Courage" },

  // PAGE 4
  { text: "I am not easily discouraged by the risk of injury or harm when pursuing my goals.", category: "Physical Courage" },
  { text: "I often step out of my comfort zone to engage in new social situations, even if I risk rejection.", category: "Social Courage" },
  { text: "I will not compromise my moral values, even if it leads to conflict with people close to me.", category: "Moral Courage" },
  { text: "I can talk about my personal challenges with people I trust, even if it's emotionally difficult.", category: "Emotional Courage" },
  { text: "I seek out opportunities to learn, even if it makes me realize how little I know.", category: "Intellectual Courage" },
  { text: "I am open to exploring different spiritual or philosophical perspectives.", category: "Spiritual Courage" },

  // PAGE 5
  { text: "I feel confident stepping into potentially dangerous environments if the situation calls for it.", category: "Physical Courage" },
  { text: "I have no problem initiating difficult conversations with friends or colleagues.", category: "Social Courage" },
  { text: "I can admit when I've made a mistake and take responsibility for my actions.", category: "Moral Courage" },
  { text: "I am able to stay emotionally present during tough conversations.", category: "Emotional Courage" },
  { text: "I embrace complexity and uncertainty when learning something new.", category: "Intellectual Courage" },
  { text: "I am comfortable making decisions based on my internal moral compass, even if they defy external expectations.", category: "Spiritual Courage" },

  // PAGE 6
  { text: "I find that confronting physical dangers helps me feel alive and empowered.", category: "Physical Courage" },
  { text: "I can navigate social situations where I might not fit in without feeling intimidated.", category: "Social Courage" },
  { text: "I challenge unethical behaviors in my workplace or community, even if it could negatively affect me.", category: "Moral Courage" },
  { text: "I can ask for help or support when I'm feeling overwhelmed or emotionally drained.", category: "Emotional Courage" },
  { text: "I enjoy questioning established norms or widely accepted ideas.", category: "Intellectual Courage" },
  { text: "I find that leaning into my spiritual beliefs helps me handle uncertainty and fear.", category: "Spiritual Courage" },

  // PAGE 7
  { text: "I often take the lead in situations where physical action is necessary, even when others hesitate.", category: "Physical Courage" },
  { text: "I am able to stand by my beliefs even when I face social pressure to conform.", category: "Social Courage" },
  { text: "I consistently live by my moral compass, even when it's inconvenient.", category: "Moral Courage" },
  { text: "I find strength in being vulnerable, even when it's hard for others to understand.", category: "Emotional Courage" },
  { text: "I am not afraid to admit when I don't know something and use it as a chance to grow.", category: "Intellectual Courage" },
  { text: "I seek meaning in life's difficult experiences and trust they contribute to my growth.", category: "Spiritual Courage" },
];

export const QUESTIONS_PER_PAGE = 6;
export const TOTAL_PAGES = 7;
