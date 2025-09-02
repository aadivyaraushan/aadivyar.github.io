import React from 'react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

interface SidebarProps {
  chats: Chat[];
  currentChatId: number;
  onNewChat: () => void;
  onChatSelect: (chatId: number) => void;
}

function Sidebar({ chats, currentChatId, onNewChat, onChatSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-y2k-surface border-r-2 border-y2k-border flex flex-col">
      <div className="bg-y2k-silver p-2 border-b-2 border-y2k-darkgray">
        <div className="pixel-font text-y2k-text mb-2">FILE MENU:</div>
        <button 
          onClick={onNewChat}
          className="y2k-button w-full p-2 text-xs"
        >
          [NEW_CHAT.EXE]
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 bg-y2k-elevated">
        <div className="pixel-font text-y2k-text mb-2">
          RECENT SESSIONS:
        </div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-2 m-1 cursor-pointer transition-all duration-100 border ${
              chat.id === currentChatId 
                ? 'bg-y2k-primary text-y2k-text-light border-y2k-blue shadow-y2k-inset' 
                : 'bg-y2k-surface border-y2k-border hover:bg-y2k-elevated hover:shadow-y2k-raised'
            }`}
          >
            <span className="truncate block text-xs">
              {chat.id === currentChatId ? '▶ ' : '  '}{chat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;