
// AI Commentary service for generating reactive teacher responses

interface CommentaryContext {
  speech: string;
  slideTitle: string;
  suspicion: number;
  goalCompleted: boolean;
  speechLength: number;
}

const generateAICommentary = (context: CommentaryContext): string => {
  const { speech, slideTitle, suspicion, goalCompleted, speechLength } = context;
  
  // Analyze speech content for funny reactions
  const lowerSpeech = speech.toLowerCase();
  const hasNumbers = /\d/.test(speech);
  const hasBuzzwords = /synergy|leverage|optimize|paradigm|disrupt|innovation|blockchain/.test(lowerSpeech);
  const isRambling = speechLength > 200;
  const isVague = speechLength < 30;
  const hasOhio = lowerSpeech.includes('ohio');
  const hasMemeWords = /sigma|rizz|sus|cringe|based|chad|npc|skibidi|bruh|literally|crazy|wild/.test(lowerSpeech);
  const hasFood = /pizza|food|eat|hungry|snack|burger|taco/.test(lowerSpeech);
  const hasAnimals = /cat|dog|animal|pet|bird|fish|monkey|penguin/.test(lowerSpeech);
  const hasColors = /red|blue|green|yellow|purple|black|white|orange|pink/.test(lowerSpeech);
  
  // Generate contextual responses with more personality
  const responses = [];
  
  // Suspicion-based responses with more character
  if (suspicion > 80) {
    responses.push(
      "At this point I'm convinced you're just reading random Wikipedia articles.",
      "Are you having a stroke, or is this your presentation?",
      "I've seen more convincing arguments from a Magic 8-Ball.",
      "Did you prepare this on the bus ride to school?",
      "This is giving me flashbacks to my worst teaching nightmares.",
      "I'm starting to question my life choices as an educator."
    );
  } else if (suspicion > 60) {
    responses.push(
      "That's... certainly a creative interpretation of the facts.",
      "I don't remember teaching this in any universe I inhabit.",
      "Your research methodology appears to be 'vibes only'.",
      "Are you channeling the spirit of a confused ChatGPT?",
      "I'm getting strong 'made it up 5 minutes ago' energy.",
      "This feels like academic fanfiction."
    );
  } else if (suspicion > 40) {
    responses.push(
      "Well, that's one way to approach the topic... I guess.",
      "Your confidence is admirable, your accuracy less so.",
      "I appreciate the enthusiasm, even if I don't understand it.",
      "That's a bold strategy, Cotton. Let's see if it pays off.",
      "You're really swinging for the fences with this one.",
      "I admire your commitment to... whatever this is."
    );
  }
  
  // Content-specific reactions with more humor
  if (hasOhio) {
    responses.push(
      "Ohio? In MY classroom? How dare you bring that cursed place up.",
      "Great, now I'm going to have nightmares about Ohio again.",
      "Why does everything eventually lead back to Ohio?",
      "Ohio is not a valid academic source, despite what TikTok tells you."
    );
  }
  
  if (hasMemeWords) {
    responses.push(
      "I'm too old and too caffeinated to decode your Gen Z hieroglyphics.",
      "Did you just unironically use 'sigma' in an academic presentation?",
      "I need Urban Dictionary to understand half of what you're saying.",
      "Are you speaking English or did aliens teach you language?",
      "My brain is buffering trying to process your word choices."
    );
  }
  
  if (hasFood) {
    responses.push(
      "Did you just relate this to food? Are you hungry right now?",
      "Everything's about food with your generation, isn't it?",
      "I see we've reached the 'compare everything to pizza' phase of education.",
      "Your metaphors are making me crave lunch."
    );
  }
  
  if (hasAnimals) {
    responses.push(
      "Why are we talking about animals? This isn't biology class.",
      "Did you just make a cat analogy? In my economics presentation?",
      "Your animal comparisons are... surprisingly insightful, actually.",
      "I wasn't expecting a nature documentary in your presentation."
    );
  }
  
  if (hasColors) {
    responses.push(
      "Interesting color choice for your argument there.",
      "Are we painting a picture or giving a presentation?",
      "Your color-coded approach to academia is... unique.",
      "I see you're really trying to paint the full picture here."
    );
  }
  
  if (hasBuzzwords) {
    responses.push(
      "Ah yes, corporate buzzword bingo. My favorite academic exercise.",
      "Did you swallow a LinkedIn post before coming to class?",
      "I see you've been reading those business self-help books again.",
      "Your synergy is disrupting my paradigm, and not in a good way.",
      "Please tell me you didn't learn this from a motivational poster."
    );
  }
  
  if (isRambling) {
    responses.push(
      "I lost the plot somewhere around your third tangent.",
      "Are we still talking about the same topic we started with?",
      "Your stream of consciousness is more like a river of confusion.",
      "I think you've set a new record for longest sentence without a point.",
      "My attention span gave up somewhere in the middle there."
    );
  }
  
  if (isVague) {
    responses.push(
      "That was brief. Did you forget the rest of your presentation?",
      "I was expecting more than a haiku, but okay.",
      "Your minimalist approach to explaining is... bold.",
      "Care to elaborate, or should I just guess what you meant?"
    );
  }
  
  if (goalCompleted) {
    responses.push(
      "Well, you managed to hit the target somehow. Color me impressed.",
      "Against all odds, you actually addressed the requirements.",
      "I'll give you points for accidentally being on topic.",
      "That was surprisingly coherent. Are you feeling alright?",
      "You exceeded my very low expectations. Congratulations!"
    );
  }
  
  // Slide-specific reactions with more personality
  if (slideTitle.includes('6') && slideTitle.includes('7')) {
    if (hasNumbers) {
      responses.push("Finally, someone who can count! The bar is so low it's underground.");
    } else {
      responses.push("Talking about numbers without mentioning numbers is peak academic performance.");
    }
  }
  
  if (slideTitle.toLowerCase().includes('meme') || slideTitle.toLowerCase().includes('tiktok')) {
    responses.push(
      "This is what 30 years of teaching has led to. Meme analysis.",
      "I used to teach Shakespeare. Now I'm here. Life comes at you fast.",
      "My PhD is crying somewhere in a dusty corner.",
      "I'm updating my resume after this class."
    );
  }
  
  // Encouraging responses when things are going well
  if (suspicion < 30 && speechLength > 50) {
    responses.push(
      "Now we're cooking with gas! Keep it up!",
      "Finally, someone who came prepared! Sort of!",
      "This is actually making sense. I'm shocked.",
      "You're exceeding my caffeine-deprived expectations!",
      "I can see the effort, and I appreciate it. Mostly."
    );
  }
  
  // Default fallbacks with more personality
  if (responses.length === 0) {
    responses.push(
      "Well, that certainly happened. I can't unsee it now.",
      "Your unique perspective is... definitely unique.",
      "I've never heard it explained quite like that, and I hope I never do again.",
      "That was an experience. I'm not sure what kind, but it was definitely one.",
      "My poker face is being severely tested right now.",
      "I'm adding this to my collection of 'student said what now?' moments."
    );
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export { generateAICommentary };
