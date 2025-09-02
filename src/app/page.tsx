'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';
import InputSection from '../../components/InputSection';
import { initializeVectorRAG, retrieveRelevantChunks, generateRAGResponse } from '../../lib/vectorRAG';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatData {
  id: number;
  title: string;
  messages: Message[];
}

interface Chats {
  [key: number]: ChatData;
}

export default function Home() {
  const [currentChatId, setCurrentChatId] = useState(1);
  const [chats, setChats] = useState<Chats>({
    1: {
      id: 1,
      title: 'About Aadivya',
      messages: [
        {
          id: 1,
          type: 'assistant',
          content: "Hey! This is Aadivya's personal website. Aadivya is an entrepreneur, researcher and student interested in AI research and startups. Feel free to ask me anything about him!",
          timestamp: new Date()
        }
      ]
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const currentChat = chats[currentChatId];
  const messages = currentChat ? currentChat.messages : [];

  useEffect(() => {
    initializeVectorRAG();
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    if (currentChat.messages.length === 1 && currentChat.title === 'New Chat') {
      updateChatTitle(currentChatId, content);
    }
    
    setChats(prev => ({
      ...prev,
      [currentChatId]: {
        ...prev[currentChatId],
        messages: [...prev[currentChatId].messages, userMessage]
      }
    }));
    setIsLoading(true);
    
    const generateResponse = async () => {
      try {
        const relevantChunks = await retrieveRelevantChunks(content, 3);
        const response = await generateRAGResponse(content, relevantChunks);
        
        const assistantMessage: Message = {
          id: Date.now() + 1,
          type: 'assistant',
          content: response,
          timestamp: new Date()
        };
        
        setChats(prev => ({
          ...prev,
          [currentChatId]: {
            ...prev[currentChatId],
            messages: [...prev[currentChatId].messages, assistantMessage]
          }
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('RAG error:', error);
        const errorMessage: Message = {
          id: Date.now() + 1,
          type: 'assistant',
          content: "Sorry, I encountered an error processing your question. Please try again!",
          timestamp: new Date()
        };
        setChats(prev => ({
          ...prev,
          [currentChatId]: {
            ...prev[currentChatId],
            messages: [...prev[currentChatId].messages, errorMessage]
          }
        }));
        setIsLoading(false);
      }
    };
    
    setTimeout(generateResponse, Math.random() * 1000 + 500);
  };

  const handleNewChat = () => {
    const newChatId = Date.now();
    const newChat: ChatData = {
      id: newChatId,
      title: 'New Chat',
      messages: [
        {
          id: Date.now() + 1,
          type: 'assistant',
          content: "Hey! This is Aadivya's personal website. Aadivya is an entrepreneur, researcher and student interested in AI research and startups. Feel free to ask me anything about him!",
          timestamp: new Date()
        }
      ]
    };
    
    setChats(prev => ({
      ...prev,
      [newChatId]: newChat
    }));
    setCurrentChatId(newChatId);
  };

  const handleChatSelect = (chatId: number) => {
    setCurrentChatId(chatId);
  };

  const updateChatTitle = (chatId: number, firstUserMessage: string) => {
    const title = firstUserMessage.length > 25 ? 
      firstUserMessage.substring(0, 25) + '...' : 
      firstUserMessage;
    
    setChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        title
      }
    }));
  };

  return (
    <div className="flex h-screen bg-y2k-bg text-y2k-text font-y2k p-4">
      <div className="flex-1 flex">
        <div className="y2k-window flex-1 flex">
          <Sidebar 
            chats={Object.values(chats)}
            currentChatId={currentChatId}
            onNewChat={handleNewChat}
            onChatSelect={handleChatSelect}
          />
          <div className="flex-1 flex flex-col">
            <div className="y2k-titlebar px-3 py-1 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-y2k-yellow mr-2 pixel-font text-y2k-text flex items-center justify-center" style={{fontSize: '6px'}}>A</div>
                <h1 className="text-sm font-y2k-title text-y2k-text-light pixel-font">
                  AADIVYA.GPT.EXE
                </h1>
              </div>
              <div className="window-controls">
                <button className="window-control-btn">_</button>
                <button className="window-control-btn">□</button>
                <button className="window-control-btn">×</button>
              </div>
            </div>
            <Chat messages={messages} isLoading={isLoading} />
            <InputSection onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
