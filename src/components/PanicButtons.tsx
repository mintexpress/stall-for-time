
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PanicButtonsProps {
  onPanicButtonClick: (type: 'quote' | 'definition' | 'chart') => void;
}

const PanicButtons: React.FC<PanicButtonsProps> = ({ onPanicButtonClick }) => {
  const [cooldowns, setCooldowns] = useState({
    quote: 0,
    definition: 0,
    chart: 0
  });

  const [usageCount, setUsageCount] = useState({
    quote: 0,
    definition: 0,
    chart: 0
  });

  const handleClick = (type: 'quote' | 'definition' | 'chart') => {
    if (cooldowns[type] > 0 || usageCount[type] >= 2) return;

    onPanicButtonClick(type);
    
    // Set usage count
    setUsageCount(prev => ({ ...prev, [type]: prev[type] + 1 }));
    
    // Set cooldown
    setCooldowns(prev => ({ ...prev, [type]: 10 }));
    
    // Start cooldown timer
    const interval = setInterval(() => {
      setCooldowns(current => {
        const newTime = current[type] - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          return { ...current, [type]: 0 };
        }
        return { ...current, [type]: newTime };
      });
    }, 1000);
  };

  const getButtonText = (type: 'quote' | 'definition' | 'chart') => {
    if (cooldowns[type] > 0) return `${cooldowns[type]}s`;
    if (usageCount[type] >= 2) return 'Used Up';
    
    switch (type) {
      case 'quote': return '💬 Quote';
      case 'definition': return '📖 Define';
      case 'chart': return '📊 Chart';
    }
  };

  const isDisabled = (type: 'quote' | 'definition' | 'chart') => {
    return cooldowns[type] > 0 || usageCount[type] >= 2;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-red-600">🚨 Panic Buttons</CardTitle>
        <p className="text-sm text-gray-600">Emergency AI assistance (2 uses each per slide)</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={() => handleClick('quote')}
          disabled={isDisabled('quote')}
          className="w-full justify-start"
          variant={isDisabled('quote') ? 'outline' : 'default'}
        >
          {getButtonText('quote')}
          {usageCount.quote > 0 && (
            <span className="ml-2 text-xs">({usageCount.quote}/2)</span>
          )}
        </Button>
        
        <Button
          onClick={() => handleClick('definition')}
          disabled={isDisabled('definition')}
          className="w-full justify-start"
          variant={isDisabled('definition') ? 'outline' : 'default'}
        >
          {getButtonText('definition')}
          {usageCount.definition > 0 && (
            <span className="ml-2 text-xs">({usageCount.definition}/2)</span>
          )}
        </Button>
        
        <Button
          onClick={() => handleClick('chart')}
          disabled={isDisabled('chart')}
          className="w-full justify-start"
          variant={isDisabled('chart') ? 'outline' : 'default'}
        >
          {getButtonText('chart')}
          {usageCount.chart > 0 && (
            <span className="ml-2 text-xs">({usageCount.chart}/2)</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PanicButtons;
