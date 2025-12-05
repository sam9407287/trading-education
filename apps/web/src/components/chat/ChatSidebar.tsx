'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Send, Trash2, Bot, User, Loader2, Plus, MessageSquare, Pencil, Check } from 'lucide-react';
import { useChat } from './ChatContext';
import TypingEffect from './TypingEffect';

export default function ChatSidebar() {
  const { 
    isOpen, 
    setIsOpen, 
    messages, 
    addMessage,
    addMessageToConversation,
    clearMessages, 
    isLoading, 
    setIsLoading,
    conversations,
    activeConversationId,
    createConversation,
    switchConversation,
    deleteConversation,
    renameConversation,
  } = useChat();
  
  const [input, setInput] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 自動滾動到底部
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 打字動畫時持續滾動
  useEffect(() => {
    if (typingMessageId) {
      const interval = setInterval(scrollToBottom, 100);
      return () => clearInterval(interval);
    }
  }, [typingMessageId]);

  // 開啟時聚焦輸入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // 追蹤最後一條訊息，只對新訊息顯示打字效果
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.id !== lastMessageId && lastMsg.role === 'assistant' && typingMessageId) {
        setLastMessageId(lastMsg.id);
      }
    }
  }, [messages, lastMessageId, typingMessageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const messageToSend = trimmedInput;
    
    setInput('');
    setInputKey(prev => prev + 1);
    
    setTimeout(() => {
      setInput('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }, 50);
    
    // 保存對話 ID，確保 AI 回覆加到同一個對話
    const convId = addMessage('user', messageToSend);
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

      // 設置打字效果
      const newMessageId = Date.now().toString();
      setTypingMessageId(newMessageId);
      setLastMessageId(newMessageId);
      // 使用保存的對話 ID，確保 AI 回覆加到正確的對話
      addMessageToConversation(convId, 'assistant', data.reply);
    } catch (error) {
      console.error('Chat error:', error);
      // 使用保存的對話 ID
      addMessageToConversation(convId, 'assistant', '抱歉，發生錯誤。請稍後再試。');
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

  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const saveTitle = () => {
    if (editingId && editTitle.trim()) {
      renameConversation(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  // 判斷是否應該顯示打字效果
  const shouldShowTypingEffect = (messageId: string) => {
    return typingMessageId === lastMessageId && messageId === lastMessageId;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 手機版背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setIsOpen(false)}
      />
      
      {/* 側邊欄 - 左右兩欄佈局 */}
      <aside className="fixed lg:relative right-2 sm:right-4 lg:right-0 bottom-0 lg:bottom-auto lg:top-0 h-[70vh] sm:h-[80vh] lg:h-full w-[calc(100%-16px)] sm:w-[520px] lg:w-full bg-[var(--bg-primary)] border-2 border-[var(--accent-gold)]/30 z-50 lg:z-auto flex shadow-2xl shadow-black/20 rounded-2xl lg:rounded-xl overflow-hidden">
        
        {/* 左側：對話列表 */}
        <div className="w-[140px] sm:w-[160px] border-r border-[var(--border-color)] flex flex-col bg-[var(--bg-secondary)]">
          {/* 新對話按鈕 */}
          <div className="px-2 py-3 border-b border-[var(--border-color)]">
            <button
              onClick={createConversation}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg bg-[var(--accent-gold)] text-[var(--bg-primary)] text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              新對話
            </button>
          </div>

          {/* 對話列表 */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin">
            {conversations.length === 0 ? (
              <div className="text-center py-6">
                <MessageSquare className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2 opacity-50" />
                <p className="text-xs text-[var(--text-muted)]">無對話</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`rounded-lg p-3 cursor-pointer transition-colors ${
                    conv.id === activeConversationId
                      ? 'bg-[var(--accent-gold)]/20 border border-[var(--accent-gold)]/30'
                      : 'hover:bg-[var(--bg-card)] border border-transparent'
                  }`}
                  onClick={() => switchConversation(conv.id)}
                >
                  {editingId === conv.id ? (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveTitle();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                        className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded px-2 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveTitle();
                        }}
                        className="w-full py-2 rounded bg-[var(--accent-gold)] text-[var(--bg-primary)] text-sm font-medium"
                      >
                        確認
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* 標題 */}
                      <p className="text-sm text-[var(--text-primary)] truncate leading-relaxed mb-2">
                        {conv.title}
                      </p>
                      {/* 訊息數 + 操作按鈕 */}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[var(--text-muted)]">
                          {conv.messages.length}則
                        </p>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(conv.id, conv.title);
                            }}
                            className="p-1.5 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--accent-gold)]"
                            title="編輯"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteConversation(conv.id);
                            }}
                            className="p-1.5 rounded hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-red-400"
                            title="刪除"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 右側：對話內容 */}
        <div className="flex-1 flex flex-col">
          {/* 標題欄 */}
          <div className="flex items-center justify-between px-3 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
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
                title="收起"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 對話區域 */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 pr-2 pb-8 space-y-4 scrollbar-thin"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-gold)]/10 flex items-center justify-center mb-3">
                    <Bot className="w-7 h-7 text-[var(--accent-gold)]" />
                  </div>
                  <h4 className="font-medium text-[var(--text-primary)] text-sm">歡迎使用 AI 助教</h4>
                </div>
                <div className="pb-2 space-y-1.5">
                  <p className="text-[10px] text-[var(--text-muted)] text-center">試試這些問題：</p>
                  {[
                    'KDJ 指標怎麼用？',
                    '什麼是道氏理論？',
                    '如何判斷超買超賣？',
                    '什麼是備兌看漲期權（Covered Call）？',
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                      className="block w-full text-left text-xs px-2.5 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
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
                    className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-blue-500/20'
                          : 'bg-[var(--accent-gold)]/20'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-3.5 h-3.5 text-blue-400" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
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
                        {message.role === 'assistant' && shouldShowTypingEffect(message.id) ? (
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
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-gold)]/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    </div>
                    <div className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2">
                      <Loader2 className="w-4 h-4 text-[var(--text-muted)] animate-spin" />
                    </div>
                  </div>
                )}
                {/* 底部空白間距 */}
                <div className="h-4" />
              </>
            )}
          </div>

          {/* 輸入區域 */}
          <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <textarea
                key={inputKey}
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="輸入你的問題..."
                rows={1}
                autoFocus
                className="flex-1 resize-none rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                style={{ minHeight: '40px', maxHeight: '100px' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-6 rounded-lg bg-[var(--accent-gold)] text-[var(--bg-primary)] font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span className="text-sm font-semibold">發送</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
