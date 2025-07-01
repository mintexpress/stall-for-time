
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeacherCommentaryProps {
  comment: string;
}

const TeacherCommentary: React.FC<TeacherCommentaryProps> = ({ comment }) => {
  const getTeacherMood = (comment: string): string => {
    const lowerComment = comment.toLowerCase();
    if (lowerComment.includes('good') || lowerComment.includes('nice') || lowerComment.includes('coherent')) {
      return '😊';
    } else if (lowerComment.includes('suspicious') || lowerComment.includes('confused') || lowerComment.includes('what')) {
      return '🤨';
    } else if (lowerComment.includes('stop') || lowerComment.includes('enough') || lowerComment.includes('terrible')) {
      return '😠';
    }
    return '😐';
  };

  return (
    <Card className="border-2 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          👩‍🏫 Teacher Commentary {getTeacherMood(comment)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-3 rounded border-l-4 border-amber-400">
          <p className="text-gray-800 italic">
            "{comment}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCommentary;
