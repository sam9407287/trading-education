'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// AI 模式類型
export type AIMode = 'smart' | 'fast' | 'stable';

// 模式配置
export const AI_MODE_CONFIG = {
  smart: {
    label: '💡 聰明',
    description: '回答最精準',
    color: 'text-yellow-400',
  },
  fast: {
    label: '⚡ 快速',
    description: '回應最迅速',
    color: 'text-blue-400',
  },
  stable: {
    label: '📦 舊版',
    description: '限額較大',
    color: 'text-gray-400',
  },
};

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
  addMessage: (role: 'user' | 'assistant', content: string) => string;
  addMessageToConversation: (convId: string, role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  // 狀態
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  // AI 模式
  aiMode: AIMode;
  setAIMode: (mode: AIMode) => void;
  // Cloudflare 用量追蹤
  stableUsageCount: number;
  isStableLimitReached: boolean;
  incrementStableUsage: () => void;
}

const STORAGE_KEY = 'trading-edu-chats';
const MODE_STORAGE_KEY = 'trading-edu-ai-mode';
const STABLE_USAGE_KEY = 'trading-edu-stable-usage';
const STABLE_DAILY_LIMIT = 4000;

// 獲取今天的日期字串（用於重置每日計數）
const getTodayString = () => new Date().toISOString().split('T')[0];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');
  const [isInitialized, setIsInitialized] = useState(false);
  const [aiMode, setAIModeState] = useState<AIMode>('fast');
  const [stableUsageCount, setStableUsageCount] = useState(0);
  const [stableUsageDate, setStableUsageDate] = useState('');

  // 從 localStorage 載入對話和設定
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // 載入對話
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
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

        // 載入 AI 模式
        const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
        if (savedMode && ['smart', 'fast', 'stable'].includes(savedMode)) {
          setAIModeState(savedMode as AIMode);
        }

        // 載入 Cloudflare 用量
        const savedUsage = localStorage.getItem(STABLE_USAGE_KEY);
        if (savedUsage) {
          const { date, count } = JSON.parse(savedUsage);
          const today = getTodayString();
          if (date === today) {
            setStableUsageCount(count);
            setStableUsageDate(date);
          } else {
            // 新的一天，重置計數
            setStableUsageCount(0);
            setStableUsageDate(today);
          }
        } else {
          setStableUsageDate(getTodayString());
        }
      } catch (e) {
        console.error('Failed to load data:', e);
      }
      setIsInitialized(true);
    }
  }, []);

  // 保存對話到 localStorage
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

  // 保存 AI 模式到 localStorage
  const setAIMode = (mode: AIMode) => {
    setAIModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    }
  };

  // 保存 Cloudflare 用量到 localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined' && stableUsageDate) {
      localStorage.setItem(STABLE_USAGE_KEY, JSON.stringify({
        date: stableUsageDate,
        count: stableUsageCount,
      }));
    }
  }, [stableUsageCount, stableUsageDate, isInitialized]);

  // 檢查是否達到限制
  const isStableLimitReached = stableUsageCount >= STABLE_DAILY_LIMIT;

  // 增加用量計數
  const incrementStableUsage = () => {
    const today = getTodayString();
    if (stableUsageDate !== today) {
      // 新的一天，重置計數
      setStableUsageCount(1);
      setStableUsageDate(today);
    } else {
      setStableUsageCount(prev => prev + 1);
    }
  };

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
  };

  // 切換對話
  const switchConversation = (id: string) => {
    setActiveConversationId(id);
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

  // 添加訊息 - 返回對話 ID
  const addMessage = (role: 'user' | 'assistant', content: string): string => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };

    if (!activeConversationId) {
      const newConvId = (Date.now() + 1).toString();
      const newConv: Conversation = {
        id: newConvId,
        title: content.slice(0, 20) + (content.length > 20 ? '...' : ''),
        messages: [newMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConvId);
      return newConvId;
    } else {
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          const updatedMessages = [...conv.messages, newMessage];
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
      return activeConversationId;
    }
  };

  // 添加訊息到指定對話
  const addMessageToConversation = (convId: string, role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    
    setConversations(prev => prev.map(conv => {
      if (conv.id === convId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
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
        addMessageToConversation,
        clearMessages,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
        aiMode,
        setAIMode,
        stableUsageCount,
        isStableLimitReached,
        incrementStableUsage,
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
