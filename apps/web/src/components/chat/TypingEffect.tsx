'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypingEffect({ text, speed = 15, onComplete }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 重置狀態當文字改變
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        // 每次增加 1-3 個字符，讓效果更流暢
        const charsToAdd = Math.min(
          Math.floor(Math.random() * 3) + 1,
          text.length - currentIndex
        );
        setDisplayedText(text.slice(0, currentIndex + charsToAdd));
        setCurrentIndex(currentIndex + charsToAdd);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete && text.length > 0) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && currentIndex < text.length && (
        <span className="inline-block w-2 h-4 ml-0.5 bg-[var(--accent-gold)] animate-pulse" />
      )}
    </span>
  );
}



