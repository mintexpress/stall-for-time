
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Slide {
  title: string;
  bullets: string[];
  goal: {
    description: string;
    keywords: string[];
  };
}

interface SlideDisplayProps {
  slide: Slide;
  goalCompleted: boolean;
}

const SlideDisplay: React.FC<SlideDisplayProps> = ({ slide, goalCompleted }) => {
  return (
    <Card className="relative overflow-hidden">
      {goalCompleted && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-green-500 text-white animate-pulse">
            ✨ Goal Complete!
          </Badge>
        </div>
      )}
      
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">
          {slide.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 bg-white">
        <div className="space-y-6">
          {slide.bullets.map((bullet, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0" />
              <p className="text-lg text-gray-800 leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            <strong>Secret Goal:</strong> {slide.goal.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlideDisplay;
