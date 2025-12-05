'use client';

import { ReactNode } from 'react';
import { ChatProvider } from './ChatContext';
import ChatSidebar from './ChatSidebar';
import ChatToggleButton from './ChatToggleButton';
import { useChat } from './ChatContext';

function LayoutContent({ children }: { children: ReactNode }) {
  const { isOpen } = useChat();

  return (
    <div className="flex min-h-screen">
      {/* 主內容區 */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'lg:mr-0' : ''}`}>
        {children}
      </div>
      
      {/* AI 對話側邊欄 - 桌面版 */}
      {isOpen && (
        <div className="hidden lg:block w-[540px] flex-shrink-0 pr-4">
          <div className="sticky top-0 h-screen py-2">
            <ChatSidebar />
          </div>
        </div>
      )}
      
      {/* 手機版對話框 */}
      <div className="lg:hidden">
        <ChatSidebar />
      </div>
      
      {/* 浮動按鈕 */}
      <ChatToggleButton />
    </div>
  );
}

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <ChatProvider>
      <LayoutContent>{children}</LayoutContent>
    </ChatProvider>
  );
}

