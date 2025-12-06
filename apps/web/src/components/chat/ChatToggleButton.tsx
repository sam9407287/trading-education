'use client';

import { MessageCircle, X } from 'lucide-react';
import { useChat } from './ChatContext';

export default function ChatToggleButton() {
  const { isOpen, setIsOpen } = useChat();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] lg:hidden'
          : 'bg-[var(--accent-gold)] text-[var(--bg-primary)] hover:scale-110'
      }`}
      title={isOpen ? '關閉對話' : '開啟 AI 助教'}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </button>
  );
}




