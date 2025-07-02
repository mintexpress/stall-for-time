
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import SlideDisplay from '@/components/SlideDisplay';
import TeacherCommentary from '@/components/TeacherCommentary';
import PanicButtons from '@/components/PanicButtons';
import GameSummary from '@/components/GameSummary';
import StudentCharacter from '@/components/StudentCharacter';
import FloatingEmoji from '@/components/FloatingEmoji';
import { generateSlide, evaluateSpeech, generatePanicResponse, generateTeacherComment, generateGameSummary } from '@/utils/gameLogic';
import { useToast } from '@/hooks/use-toast';

interface Slide {
  title: string;
  bullets: string[];
  goal: {
    description: string;
    keywords: string[];
  };
}

interface GameSummary {
  longestSentence: string;
  funniestQuote: string;
  goalsCompleted: number;
  peakSuspicion: number;
  finalGrade: string;
  percentage: number;
  components: {
    preparation: number;
    delivery: number;
    content: number;
    creativity: number;
    goalCompletion: number;
  };
  feedback: string[];
  strengths: string[];
  improvements: string[];
  comment: string;
}

const Index = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null);
  const [slideNumber, setSlideNumber] = useState(1);
  const [suspicion, setSuspicion] = useState(0);
  const [peakSuspicion, setPeakSuspicion] = useState(0);
  const [speechInput, setSpeechInput] = useState('');
  const [teacherComment, setTeacherComment] = useState('');
  const [goalsCompleted, setGoalsCompleted] = useState(0);
  const [currentGoalCompleted, setCurrentGoalCompleted] = useState(false);
  const [floatingEmoji, setFloatingEmoji] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState({
    longestSentence: '',
    quotes: [] as string[],
    totalSlides: 5
  });
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [speechHistory, setSpeechHistory] = useState<string[]>([]);
  
  const { toast } = useToast();

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft]);

  // Speech evaluation
  useEffect(() => {
    if (gameState === 'playing' && speechInput.trim()) {
      const evaluationTimer = setTimeout(() => {
        evaluateCurrentSpeech();
      }, 3000);
      return () => clearTimeout(evaluationTimer);
    }
  }, [speechInput, gameState]);

  // Teacher commentary
  useEffect(() => {
    if (gameState === 'playing') {
      const commentTimer = setTimeout(() => {
        generateTeacherCommentary();
      }, Math.random() * 5000 + 7000); // 7-12 seconds
      return () => clearTimeout(commentTimer);
    }
  }, [teacherComment, gameState]);

  // Suspicion monitoring
  useEffect(() => {
    if (suspicion > peakSuspicion) {
      setPeakSuspicion(suspicion);
    }
    if (suspicion >= 100) {
      endGame();
    }
  }, [suspicion, peakSuspicion]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setSlideNumber(1);
    setSuspicion(20);
    setPeakSuspicion(20);
    setGoalsCompleted(0);
    setTimeLeft(60);
    setSpeechInput('');
    setSpeechHistory([]);
    setTeacherComment('Alright class, let\'s see what you\'ve prepared for us today...');
    loadNewSlide();
  }, []);

  const loadNewSlide = useCallback(() => {
    const newSlide = generateSlide();
    setCurrentSlide(newSlide);
    setCurrentGoalCompleted(false);
    toast({
      title: "New Slide!",
      description: `Secret Goal: ${newSlide.goal.description}`,
      duration: 3000,
    });
  }, [toast]);

  const nextSlide = useCallback(() => {
    // Track speech for grading
    if (speechInput.trim()) {
      setSpeechHistory(prev => [...prev, speechInput]);
    }
    
    if (slideNumber >= gameStats.totalSlides) {
      endGame();
    } else {
      setSlideNumber(prev => prev + 1);
      loadNewSlide();
      setSpeechInput('');
      setTimeLeft(60); // Reset to 60 seconds for new slide
    }
  }, [slideNumber, gameStats.totalSlides, loadNewSlide, speechInput]);

  const evaluateCurrentSpeech = useCallback(() => {
    if (!speechInput.trim() || !currentSlide) return;

    const evaluation = evaluateSpeech(speechInput, currentSlide, currentGoalCompleted);
    
    // Update suspicion
    setSuspicion(prev => Math.max(0, Math.min(100, prev + evaluation.suspicionChange)));
    
    // Check for goal completion
    if (!currentGoalCompleted && evaluation.goalCompleted) {
      setCurrentGoalCompleted(true);
      setGoalsCompleted(prev => prev + 1);
      toast({
        title: "Goal Completed! ✨",
        description: "Nice work on hitting that objective!",
        duration: 2000,
      });
    }
    
    // Update stats
    if (speechInput.length > gameStats.longestSentence.length) {
      setGameStats(prev => ({
        ...prev,
        longestSentence: speechInput
      }));
    }
    
    // Show floating emoji
    setFloatingEmoji(evaluation.emoji);
    setTimeout(() => setFloatingEmoji(null), 2000);
  }, [speechInput, currentSlide, currentGoalCompleted, gameStats.longestSentence, toast]);

  const generateTeacherCommentary = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Pass slide title to the AI commentary generator
    const comment = generateTeacherComment(speechInput, suspicion, currentGoalCompleted, currentSlide?.title || '');
    setTeacherComment(comment);
  }, [speechInput, suspicion, currentGoalCompleted, gameState, currentSlide]);

  const handlePanicButton = useCallback((type: 'quote' | 'definition' | 'chart') => {
    const response = generatePanicResponse(type, currentSlide?.title || '');
    
    // Add to quotes if it's a quote
    if (type === 'quote') {
      setGameStats(prev => ({
        ...prev,
        quotes: [...prev.quotes, response.text]
      }));
    }
    
    // Apply suspicion penalty if any
    if (response.suspicionPenalty > 0) {
      setSuspicion(prev => Math.min(100, prev + response.suspicionPenalty));
      toast({
        title: "That was... suspicious",
        description: "The teacher looks confused",
        variant: "destructive",
        duration: 2000,
      });
    }
    
    // Add the response to speech input
    setSpeechInput(prev => prev + (prev ? ' ' : '') + response.text);
  }, [currentSlide, toast]);

  const endGame = useCallback(() => {
    // Calculate average speech length for detailed grading
    const allSpeeches = [...speechHistory, speechInput].filter(s => s.trim());
    const averageSpeechLength = allSpeeches.reduce((sum, speech) => sum + speech.length, 0) / Math.max(allSpeeches.length, 1);
    
    const summary = generateGameSummary({
      longestSentence: gameStats.longestSentence,
      quotes: gameStats.quotes,
      goalsCompleted,
      peakSuspicion,
      slidesCompleted: slideNumber,
      averageSpeechLength
    });
    
    setGameSummary(summary);
    setGameState('ended');
  }, [gameStats, goalsCompleted, peakSuspicion, slideNumber, speechHistory, speechInput]);

  const resetGame = useCallback(() => {
    setGameState('menu');
    setCurrentSlide(null);
    setSlideNumber(1);
    setSuspicion(0);
    setPeakSuspicion(0);
    setSpeechInput('');
    setSpeechHistory([]);
    setTeacherComment('');
    setGoalsCompleted(0);
    setCurrentGoalCompleted(false);
    setFloatingEmoji(null);
    setGameStats({
      longestSentence: '',
      quotes: [],
      totalSlides: 5
    });
    setGameSummary(null);
    setTimeLeft(60);
  }, []);

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-indigo-900 mb-4">
              📊 Stall for Time: PowerPoint Edition
            </CardTitle>
            <p className="text-lg text-gray-700 mb-6">
              You forgot to prepare your presentation! Now you must improvise through absurd meme-themed slides 
              while an AI teacher judges your every word. Can you survive without raising too much suspicion?
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-8">
              <div className="text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">🎯 How to Play:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Type your live commentary for each slide</li>
                  <li>• Use panic buttons for AI-generated help</li>
                  <li>• Complete secret slide goals to reduce suspicion</li>
                  <li>• Don't let the teacher's suspicion reach 100%!</li>
                  <li>• Survive 5 slides or 60 seconds to win</li>
                </ul>
              </div>
            </div>
            <Button 
              onClick={startGame}
              size="lg"
              className="text-xl px-8 py-4 bg-indigo-600 hover:bg-indigo-700"
            >
              🚀 Start Presentation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'ended' && gameSummary) {
    return <GameSummary summary={gameSummary} onRestart={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Slide {slideNumber}/{gameStats.totalSlides}
            </Badge>
            <Badge variant="outline" className="text-lg px-3 py-1">
              ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline" className="text-lg px-3 py-1">
              🎯 Goals: {goalsCompleted}
            </Badge>
          </div>
          <Button variant="outline" onClick={resetGame}>
            Exit Game
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Slide and Character */}
          <div className="lg:col-span-2 space-y-6">
            {currentSlide && (
              <SlideDisplay 
                slide={currentSlide} 
                goalCompleted={currentGoalCompleted}
              />
            )}
            
            <div className="relative">
              <StudentCharacter suspicion={suspicion} />
              {floatingEmoji && (
                <FloatingEmoji emoji={floatingEmoji} />
              )}
            </div>
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Suspicion Meter */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  🤔 Teacher Suspicion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={suspicion} 
                  className="h-3 mb-2"
                  style={{
                    background: suspicion > 70 ? '#fee2e2' : suspicion > 40 ? '#fef3cd' : '#f0f9ff'
                  }}
                />
                <p className="text-sm text-center font-medium">
                  {suspicion}% suspicious
                </p>
              </CardContent>
            </Card>

            {/* Teacher Commentary */}
            <TeacherCommentary comment={teacherComment} />

            {/* Speech Input */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">🎤 Your Speech</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={speechInput}
                  onChange={(e) => setSpeechInput(e.target.value)}
                  placeholder="Start speaking about the slide... be creative!"
                  className="min-h-24 resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {speechInput.length} characters
                  </span>
                  <Button
                    onClick={nextSlide}
                    variant="outline"
                    size="sm"
                  >
                    Next Slide →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Panic Buttons */}
            <PanicButtons onPanicButtonClick={handlePanicButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
