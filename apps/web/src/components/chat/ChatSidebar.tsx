'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Trash2, Bot, User, Loader2 } from 'lucide-react';
import { useChat } from './ChatContext';
import TypingEffect from './TypingEffect';

export default function ChatSidebar() {
  const { isOpen, setIsOpen, messages, addMessage, clearMessages, isLoading, setIsLoading } = useChat();
  const [input, setInput] = useState('');
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 自動滾動到底部
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // 開啟時聚焦輸入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // 保存訊息後立即清空
    const messageToSend = trimmedInput;
    
    // 使用 requestAnimationFrame 確保 DOM 更新
    setInput('');
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.style.height = '40px';
        inputRef.current.blur();
        inputRef.current.focus();
      }
    });
    
    addMessage('user', messageToSend);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          history: messages,
          currentPage: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '發生錯誤');
      }

      const newMessageId = Date.now().toString();
      setTypingMessageId(newMessageId);
      addMessage('assistant', data.reply);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('assistant', '抱歉，發生錯誤。請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 手機版背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setIsOpen(false)}
      />
      
      {/* 側邊欄 */}
      <aside className="fixed lg:relative right-0 top-0 lg:top-auto h-full lg:h-auto w-full sm:w-[380px] lg:w-[380px] bg-[var(--bg-primary)] border-l-2 border-[var(--accent-gold)]/30 z-50 lg:z-auto flex flex-col shadow-2xl shadow-black/20">
        {/* 標題欄 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-gold)]/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">AI 助教</h3>
              <p className="text-xs text-[var(--text-muted)]">技術分析專家</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearMessages}
              className="p-2 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              title="清除對話"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 對話區域 - 可滾動 */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--border-color)] scrollbar-track-transparent"
          style={{ maxHeight: 'calc(100vh - 140px)' }}
        >
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-gold)]/10 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-[var(--accent-gold)]" />
              </div>
              <h4 className="font-medium text-[var(--text-primary)] mb-2">歡迎使用 AI 助教</h4>
              <p className="text-sm text-[var(--text-muted)] max-w-[250px] mx-auto">
                我是你的技術分析學習助手，有任何問題都可以問我！
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-[var(--text-muted)]">試試這些問題：</p>
                {[
                  'KDJ 指標怎麼用？',
                  '什麼是道氏理論？',
                  '如何判斷超買超賣？',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      inputRef.current?.focus();
                    }}
                    className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-blue-500/20'
                        : 'bg-[var(--accent-gold)]/20'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-[var(--accent-gold)]" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-500/20 text-[var(--text-primary)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.role === 'assistant' && 
                       messages.indexOf(message) === messages.length - 1 && 
                       typingMessageId ? (
                        <TypingEffect 
                          text={message.content} 
                          speed={10}
                          onComplete={() => setTypingMessageId(null)}
                        />
                      ) : (
                        message.content
                      )}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-gold)]/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[var(--accent-gold)]" />
                  </div>
                  <div className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2">
                    <Loader2 className="w-4 h-4 text-[var(--text-muted)] animate-spin" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* 輸入區域 */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入你的問題..."
              rows={1}
              className="flex-1 resize-none rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 rounded-lg bg-[var(--accent-gold)] text-[var(--bg-primary)] font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
            按 Enter 發送，Shift + Enter 換行
          </p>
        </div>
      </aside>
    </>
  );
}

