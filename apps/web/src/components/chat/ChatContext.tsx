'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  // 對話列表
  conversations: Conversation[];
  activeConversationId: string | null;
  // 當前對話的訊息
  messages: Message[];
  // 對話操作
  createConversation: () => void;
  switchConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  // 訊息操作
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  // 狀態
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const STORAGE_KEY = 'trading-edu-chats';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');
  const [isInitialized, setIsInitialized] = useState(false);

  // 從 localStorage 載入對話
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // 轉換日期字串回 Date 物件
          const loadedConversations = parsed.conversations.map((conv: Conversation) => ({
            ...conv,
            createdAt: new Date(conv.createdAt),
            updatedAt: new Date(conv.updatedAt),
            messages: conv.messages.map((msg: Message) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          }));
          setConversations(loadedConversations);
          setActiveConversationId(parsed.activeId || null);
        }
      } catch (e) {
        console.error('Failed to load conversations:', e);
      }
      setIsInitialized(true);
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          conversations,
          activeId: activeConversationId,
        }));
      } catch (e) {
        console.error('Failed to save conversations:', e);
      }
    }
  }, [conversations, activeConversationId, isInitialized]);

  // 獲取當前對話的訊息
  const messages = conversations.find(c => c.id === activeConversationId)?.messages || [];

  // 創建新對話
  const createConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: '新對話',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setShowConversationList(false);
  };

  // 切換對話
  const switchConversation = (id: string) => {
    setActiveConversationId(id);
    setShowConversationList(false);
  };

  // 刪除對話
  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter(c => c.id !== id);
      setActiveConversationId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // 重命名對話
  const renameConversation = (id: string, newTitle: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, title: newTitle, updatedAt: new Date() } : conv
    ));
  };

  // 添加訊息
  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };

    // 如果沒有活躍對話，創建一個
    if (!activeConversationId) {
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: content.slice(0, 20) + (content.length > 20 ? '...' : ''),
        messages: [newMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    } else {
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          const updatedMessages = [...conv.messages, newMessage];
          // 如果是第一條用戶訊息，自動設定標題
          const title = conv.messages.length === 0 && role === 'user'
            ? content.slice(0, 20) + (content.length > 20 ? '...' : '')
            : conv.title;
          return {
            ...conv,
            title,
            messages: updatedMessages,
            updatedAt: new Date(),
          };
        }
        return conv;
      }));
    }
  };

  // 清除當前對話訊息
  const clearMessages = () => {
    if (activeConversationId) {
      setConversations(prev => prev.map(conv =>
        conv.id === activeConversationId
          ? { ...conv, messages: [], updatedAt: new Date() }
          : conv
      ));
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        conversations,
        activeConversationId,
        messages,
        createConversation,
        switchConversation,
        deleteConversation,
        renameConversation,
        addMessage,
        clearMessages,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
