// Game logic utilities for Stall for Time: PowerPoint Edition

interface Slide {
  title: string;
  bullets: string[];
  goal: {
    description: string;
    keywords: string[];
  };
}

interface SpeechEvaluation {
  suspicionChange: number;
  goalCompleted: boolean;
  emoji: string;
}

interface PanicResponse {
  text: string;
  suspicionPenalty: number;
}

interface GameStats {
  longestSentence: string;
  quotes: string[];
  goalsCompleted: number;
  peakSuspicion: number;
  slidesCompleted: number;
}

interface GameSummary {
  longestSentence: string;
  funniestQuote: string;
  goalsCompleted: number;
  peakSuspicion: number;
  finalGrade: string;
  comment: string;
}

// Slide generation data
const slideTemplates = {
  titles: [
    "Why 6 is Afraid of 7: A Mathematical Horror Story",
    "The Socioeconomic Impact of the NPC Meme",
    "The Skibidi Toilet Conflict: A Global Analysis",
    "How Sigma Males Destroyed the Housing Market",
    "The Rise of Ohio and the Fall of Sanity",
    "Emotional Damage: A New Leadership Paradigm",
    "The Rizz Recession of 2023: Causes and Effects",
    "Why Your Wi-Fi Router is Actually Sentient",
    "The Hidden Meanings Behind Drake Pointing",
    "Sus Behavior in Corporate Environments",
    "The Evolution of 'It's Giving' Culture",
    "How TikTok Dances Predict Stock Market Trends",
    "The Philosophy of 'No Cap' in Modern Society",
    "Why Karen Became the Ultimate Final Boss"
  ],
  
  bulletSets: [
    [
      "The numerical hierarchy of fear-based relationships",
      "Statistical analysis of number-on-number violence",
      "The forbidden arithmetic operations"
    ],
    [
      "NPC dialogue trees in workplace environments",
      "The commodification of scripted responses",
      "Breaking free from the simulation economy"
    ],
    [
      "Toilet-based infrastructure as geopolitical leverage",
      "The strategic importance of bathroom humor",
      "Plumbing diplomacy in the 21st century"
    ],
    [
      "Alpha vs Beta real estate investment strategies",
      "The grindset approach to mortgage applications",
      "Why traditional dating killed homeownership"
    ],
    [
      "Ohio as the epicenter of reality breakdown",
      "The psychological effects of living in Ohio",
      "Migration patterns away from cursed states"
    ],
    [
      "Emotional damage as a measurable KPI",
      "The therapeutic benefits of constructive criticism",
      "Building resilience through strategic disappointment"
    ],
    [
      "The declining value of charisma currency",
      "Market volatility in the dating economy",
      "Federal Reserve policies on romantic inflation"
    ]
  ],

  goals: [
    { description: "Say 'bruh' at least once (very natural!)", keywords: ["bruh", "bro", "dude"] },
    { description: "Mention any food item (pizza counts!)", keywords: ["pizza", "food", "eat", "hungry", "snack", "burger", "taco", "sandwich"] },
    { description: "Use the word 'literally' (easy win!)", keywords: ["literally", "actually", "basically", "honestly"] },
    { description: "Reference any animal (cats, dogs, whatever!)", keywords: ["cat", "dog", "animal", "pet", "bird", "fish", "monkey", "penguin"] },
    { description: "Say something is 'crazy' or 'wild'", keywords: ["crazy", "wild", "insane", "nuts", "bananas"] },
    { description: "Mention any day of the week", keywords: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "weekend"] },
    { description: "Use the word 'like' as filler (you probably do this already!)", keywords: ["like", "um", "uh", "so", "well"] },
    { description: "Reference any color (red, blue, green, etc.)", keywords: ["red", "blue", "green", "yellow", "purple", "black", "white", "orange", "pink"] },
    { description: "Say 'I think' or 'I believe' (show confidence!)", keywords: ["i think", "i believe", "in my opinion", "personally"] },
    { description: "Mention any number (even 'one' counts!)", keywords: ["one", "two", "three", "1", "2", "3", "first", "second", "many", "few"] }
  ]
};

import { generateAICommentary } from './aiCommentary';
import { calculateDetailedGrade } from './gradingSystem';

export const generateSlide = (): Slide => {
  const titleIndex = Math.floor(Math.random() * slideTemplates.titles.length);
  const bulletIndex = Math.floor(Math.random() * slideTemplates.bulletSets.length);
  const goalIndex = Math.floor(Math.random() * slideTemplates.goals.length);

  return {
    title: slideTemplates.titles[titleIndex],
    bullets: slideTemplates.bulletSets[bulletIndex],
    goal: slideTemplates.goals[goalIndex]
  };
};

export const evaluateSpeech = (speech: string, slide: Slide, goalAlreadyCompleted: boolean): SpeechEvaluation => {
  const lowerSpeech = speech.toLowerCase();
  let suspicionChange = 0;
  let goalCompleted = false;
  let emoji = '😐';

  // Check for goal completion (very lenient matching)
  if (!goalAlreadyCompleted) {
    goalCompleted = slide.goal.keywords.some(keyword => 
      lowerSpeech.includes(keyword.toLowerCase())
    );
    
    if (goalCompleted) {
      suspicionChange -= 15; // Bigger reward for completing goals
      emoji = '✨';
    }
  }

  // Evaluate speech quality (more lenient)
  if (speech.length < 5) {
    suspicionChange += 3;
    emoji = '🤨';
  } else if (speech.length > 50) {
    suspicionChange -= 2;
    emoji = '😊';
  }

  // Check for repetition (more forgiving)
  const words = speech.split(' ');
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  if (words.length > 8 && uniqueWords.size < words.length * 0.5) {
    suspicionChange += 2;
    emoji = '🤔';
  }

  // Check for slide relevance (more generous)
  const slideKeywords = [...slide.title.toLowerCase().split(' '), ...slide.bullets.join(' ').toLowerCase().split(' ')];
  const relevantWords = slideKeywords.filter(keyword => lowerSpeech.includes(keyword));
  
  if (relevantWords.length > 1) {
    suspicionChange -= 3;
    emoji = '👍';
  } else if (relevantWords.length === 0) {
    suspicionChange += 2;
    emoji = '🤨';
  }

  return {
    suspicionChange: Math.max(-20, Math.min(8, suspicionChange)),
    goalCompleted,
    emoji
  };
};

export const generatePanicResponse = (type: 'quote' | 'definition' | 'chart', slideTitle: string): PanicResponse => {
  const responses = {
    quote: [
      "As Shakespeare once said, 'To meme or not to meme, that is the question.'",
      "Einstein famously noted, 'Rizz equals mass times charisma squared.'",
      "Confucius wisely observed, 'The person who chases two Ohio memes catches neither.'",
      "Sun Tzu wrote, 'Know your memes and know yourself.'",
      "As Socrates put it, 'The only thing I know is that I know nothing about TikTok.'",
      "Darwin theorized, 'It is not the strongest memes that survive, but the most adaptable.'",
      "Gandhi said, 'Be the sigma you wish to see in the world.'",
      "Lincoln declared, 'A house divided against itself cannot properly ratio.'"
    ],
    
    definition: [
      "Skibidinomics refers to the study of toilet-based economic theories and their impact on GDP.",
      "Rizzonomics is the academic discipline focusing on charisma as a tradeable commodity.",
      "Ohiology is the scientific study of states that exist in perpetual chaos.",
      "Sigmalogical theory examines the behavioral patterns of self-proclaimed alpha individuals.",
      "Susology is the psychological analysis of suspicious behavioral indicators.",
      "Memetic engineering involves the systematic design of viral content for maximum cultural impact.",
      "Cringe analytics measures the societal embarrassment quotient of digital content."
    ],
    
    chart: [
      "As the chart clearly demonstrates, Ohio-related incidents increased by 420% since 2020.",
      "The data visualization shows a direct correlation between rizz levels and economic prosperity.",
      "This graph illustrates the exponential decay of traditional social skills since TikTok's launch.",
      "The pie chart reveals that 69% of all memes are, statistically speaking, not funny.",
      "The trend line indicates that sigma male identification peaked during the pandemic.",
      "The bar graph shows that emotional damage complaints rose 300% in corporate environments.",
      "The scatter plot demonstrates the inverse relationship between screen time and grass-touching frequency."
    ]
  };

  const responseArray = responses[type];
  let selectedResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
  
  // 10% chance of suspicious response
  const suspicionPenalty = Math.random() < 0.1 ? 5 : 0;
  
  if (suspicionPenalty > 0) {
    selectedResponse += " ...wait, did I just make that up?";
  }

  return {
    text: selectedResponse,
    suspicionPenalty
  };
};

export const generateTeacherComment = (speech: string, suspicion: number, goalCompleted: boolean, slideTitle: string = ''): string => {
  // Use AI commentary instead of predetermined responses
  return generateAICommentary({
    speech,
    slideTitle,
    suspicion,
    goalCompleted,
    speechLength: speech.length
  });
};

export const generateGameSummary = (stats: GameStats & { averageSpeechLength: number }): any => {
  const detailedGrade = calculateDetailedGrade({
    goalsCompleted: stats.goalsCompleted,
    peakSuspicion: stats.peakSuspicion,
    slidesCompleted: stats.slidesCompleted,
    totalSlides: 5,
    longestSentence: stats.longestSentence,
    quotes: stats.quotes,
    averageSpeechLength: stats.averageSpeechLength || 50
  });
  
  return {
    longestSentence: stats.longestSentence,
    funniestQuote: stats.quotes.length > 0 ? stats.quotes[Math.floor(Math.random() * stats.quotes.length)] : "None captured",
    goalsCompleted: stats.goalsCompleted,
    peakSuspicion: stats.peakSuspicion,
    finalGrade: detailedGrade.letterGrade,
    percentage: detailedGrade.percentage,
    components: detailedGrade.components,
    feedback: detailedGrade.feedback,
    strengths: detailedGrade.strengths,
    improvements: detailedGrade.improvements,
    comment: detailedGrade.feedback[0] || "That was... something."
  };
};
