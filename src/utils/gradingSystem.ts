
// Enhanced grading system with detailed feedback

interface GradeComponents {
  preparation: number;
  delivery: number;
  content: number;
  creativity: number;
  goalCompletion: number;
}

interface DetailedGrade {
  letterGrade: string;
  percentage: number;
  components: GradeComponents;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

export const calculateDetailedGrade = (stats: {
  goalsCompleted: number;
  peakSuspicion: number;
  slidesCompleted: number;
  totalSlides: number;
  longestSentence: string;
  quotes: string[];
  averageSpeechLength: number;
}): DetailedGrade => {
  
  // Calculate component scores (0-100)
  const preparation = Math.max(0, 100 - stats.peakSuspicion);
  const delivery = Math.min(100, (stats.averageSpeechLength / 50) * 50 + 25);
  const content = (stats.slidesCompleted / stats.totalSlides) * 100;
  const creativity = Math.min(100, stats.quotes.length * 25 + 25);
  const goalCompletion = (stats.goalsCompleted / stats.totalSlides) * 100;
  
  const components: GradeComponents = {
    preparation,
    delivery,
    content,
    creativity,
    goalCompletion
  };
  
  // Calculate overall percentage
  const percentage = Math.round(
    (preparation * 0.3 + 
     delivery * 0.2 + 
     content * 0.2 + 
     creativity * 0.15 + 
     goalCompletion * 0.15)
  );
  
  // Determine letter grade
  let letterGrade: string;
  if (percentage >= 97) letterGrade = 'A+';
  else if (percentage >= 93) letterGrade = 'A';
  else if (percentage >= 90) letterGrade = 'A-';
  else if (percentage >= 87) letterGrade = 'B+';
  else if (percentage >= 83) letterGrade = 'B';
  else if (percentage >= 80) letterGrade = 'B-';
  else if (percentage >= 77) letterGrade = 'C+';
  else if (percentage >= 73) letterGrade = 'C';
  else if (percentage >= 70) letterGrade = 'C-';
  else if (percentage >= 67) letterGrade = 'D+';
  else if (percentage >= 65) letterGrade = 'D';
  else letterGrade = 'F';
  
  // Generate feedback
  const feedback: string[] = [];
  const strengths: string[] = [];
  const improvements: string[] = [];
  
  // Analyze performance
  if (preparation >= 80) {
    strengths.push("Maintained composure throughout the presentation");
  } else if (preparation < 50) {
    improvements.push("Work on preparation to reduce obvious improvisation");
    feedback.push("Your nervousness was quite apparent to the audience.");
  }
  
  if (delivery >= 70) {
    strengths.push("Good speech length and pacing");
  } else {
    improvements.push("Practice speaking with more confidence and detail");
    feedback.push("Your delivery could use more substance and conviction.");
  }
  
  if (content >= 80) {
    strengths.push("Covered the assigned material adequately");
  } else {
    improvements.push("Stay focused on the assigned topics");
    feedback.push("You seemed to drift off-topic frequently.");
  }
  
  if (creativity >= 60) {
    strengths.push("Creative use of examples and references");
  } else {
    improvements.push("Try to be more creative with your examples");
  }
  
  if (goalCompletion >= 60) {
    strengths.push("Met most of the assignment requirements");
  } else {
    improvements.push("Pay closer attention to assignment requirements");
    feedback.push("You missed several key points that were specifically requested.");
  }
  
  // Overall feedback based on grade
  if (letterGrade.startsWith('A')) {
    feedback.push("Excellent work! You clearly understood the material and presented it well.");
  } else if (letterGrade.startsWith('B')) {
    feedback.push("Good effort! There's room for improvement, but you demonstrated solid understanding.");
  } else if (letterGrade.startsWith('C')) {
    feedback.push("Average performance. You met the basic requirements but lacked depth.");
  } else if (letterGrade.startsWith('D')) {
    feedback.push("Below expectations. This presentation needed more preparation and focus.");
  } else {
    feedback.push("This presentation was clearly unprepared and did not meet academic standards.");
  }
  
  return {
    letterGrade,
    percentage,
    components,
    feedback,
    strengths,
    improvements
  };
};
