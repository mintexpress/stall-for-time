
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GameSummaryProps {
  summary: {
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
  };
  onRestart: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({ summary, onRestart }) => {
  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'bg-green-500';
    if (grade.includes('B')) return 'bg-blue-500';
    if (grade.includes('C')) return 'bg-yellow-500';
    if (grade.includes('D')) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-indigo-900 mb-4">
            📊 Presentation Complete!
          </CardTitle>
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`${getGradeColor(summary.finalGrade)} text-white text-2xl px-6 py-3`}>
              {summary.finalGrade}
            </Badge>
            <div className="text-3xl font-bold text-gray-700">
              {summary.percentage}%
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Teacher's Overall Comment */}
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-lg italic text-gray-700">
              "{summary.comment}"
            </p>
            <p className="text-sm text-gray-500 mt-2">- Your AI Teacher</p>
          </div>

          {/* Detailed Grade Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">📈 Grade Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Preparation</span>
                    <span>{Math.round(summary.components.preparation)}%</span>
                  </div>
                  <Progress value={summary.components.preparation} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Delivery</span>
                    <span>{Math.round(summary.components.delivery)}%</span>
                  </div>
                  <Progress value={summary.components.delivery} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Content</span>
                    <span>{Math.round(summary.components.content)}%</span>
                  </div>
                  <Progress value={summary.components.content} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Creativity</span>
                    <span>{Math.round(summary.components.creativity)}%</span>
                  </div>
                  <Progress value={summary.components.creativity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Goal Completion</span>
                    <span>{Math.round(summary.components.goalCompletion)}%</span>
                  </div>
                  <Progress value={summary.components.goalCompletion} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {/* Performance Stats */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📈 Performance Stats</h3>
                <ul className="text-sm space-y-1">
                  <li>Goals Completed: <span className="font-bold">{summary.goalsCompleted}</span></li>
                  <li>Peak Suspicion: <span className="font-bold">{summary.peakSuspicion}%</span></li>
                </ul>
              </div>

              {/* Best Quote */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">💬 Best Quote</h3>
                <p className="text-sm italic">"{summary.funniestQuote}"</p>
              </div>
            </div>
          </div>

          {/* Feedback Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            {summary.strengths.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Strengths</h3>
                <ul className="text-sm space-y-1">
                  {summary.strengths.map((strength, index) => (
                    <li key={index}>• {strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Improvement */}
            {summary.improvements.length > 0 && (
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">🎯 Areas for Improvement</h3>
                <ul className="text-sm space-y-1">
                  {summary.improvements.map((improvement, index) => (
                    <li key={index}>• {improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Longest Sentence */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">📝 Longest Sentence</h3>
            <p className="text-sm">
              {summary.longestSentence || "You didn't say much..."}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {summary.longestSentence.length} characters
            </p>
          </div>

          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              onClick={onRestart}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              🔄 Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSummary;
