
import React from 'react';

interface StudentCharacterProps {
  suspicion: number;
}

const StudentCharacter: React.FC<StudentCharacterProps> = ({ suspicion }) => {
  const getCharacterState = () => {
    if (suspicion >= 80) return 'panicked';
    if (suspicion >= 60) return 'nervous';
    if (suspicion >= 40) return 'worried';
    if (suspicion >= 20) return 'confident';
    return 'calm';
  };

  const getCharacterImage = () => {
    const state = getCharacterState();
    // Using the uploaded sprite images for different emotional states
    switch (state) {
      case 'panicked': 
        return '/placeholder.svg?height=100&width=100&text=😰'; // Stressed cat
      case 'nervous': 
        return '/placeholder.svg?height=100&width=100&text=😅'; // Nervous kitten
      case 'worried': 
        return '/placeholder.svg?height=100&width=100&text=😬'; // Worried monkey
      case 'confident': 
        return '/placeholder.svg?height=100&width=100&text=😊'; // Happy penguin
      case 'calm': 
        return '/placeholder.svg?height=100&width=100&text=😌'; // Calm penguin
      default: 
        return '/placeholder.svg?height=100&width=100&text=😐';
    }
  };

  const getCharacterColor = () => {
    const state = getCharacterState();
    switch (state) {
      case 'panicked': return 'text-red-500';
      case 'nervous': return 'text-orange-500';
      case 'worried': return 'text-yellow-500';
      case 'confident': return 'text-green-500';
      case 'calm': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getBackgroundImage = () => {
    // Classroom/presentation background
    return '/placeholder.svg?height=400&width=800&text=Classroom';
  };

  return (
    <div className="relative">
      {/* Background classroom scene */}
      <div 
        className="w-full h-64 bg-cover bg-center rounded-lg relative overflow-hidden"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        {/* Student character */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <div className="relative">
              <img 
                src={getCharacterImage()}
                alt="Student character"
                className={`w-24 h-24 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${
                  suspicion >= 80 ? 'animate-pulse' : ''
                }`}
              />
              {/* Emotion overlay */}
              <div className="absolute -top-2 -right-2 text-2xl">
                {suspicion >= 80 ? '😰' : 
                 suspicion >= 60 ? '😅' : 
                 suspicion >= 40 ? '😬' : 
                 suspicion >= 20 ? '😊' : '😌'}
              </div>
            </div>
            
            <div className="mt-2 p-2 bg-white bg-opacity-90 rounded-lg shadow-md border">
              <p className="text-sm font-medium text-gray-700">
                Status: <span className={getCharacterColor()}>{getCharacterState()}</span>
              </p>
              <div className="mt-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    suspicion >= 80 ? 'bg-red-500' :
                    suspicion >= 60 ? 'bg-orange-500' :
                    suspicion >= 40 ? 'bg-yellow-500' :
                    suspicion >= 20 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${suspicion}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Stress: {suspicion}%</p>
            </div>
          </div>
        </div>
        
        {/* Presentation screen in background */}
        <div className="absolute top-4 right-4 w-20 h-12 bg-white bg-opacity-80 rounded border-2 border-gray-300">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
            <span className="text-xs">📊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCharacter;
