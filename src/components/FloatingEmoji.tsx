
import React, { useEffect, useState } from 'react';

interface FloatingEmojiProps {
  emoji: string;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ emoji }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20">
      <div className="text-4xl animate-bounce">
        {emoji}
      </div>
    </div>
  );
};

export default FloatingEmoji;
