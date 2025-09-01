import React, { useEffect, useRef } from 'react';

function Chat({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const renderContent = (content) => {
    if (typeof content !== 'string') {
      content = String(content);
    }
    
    // Convert markdown-style formatting to HTML
    let formatted = content
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Bullet points
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      // Line breaks
      .replace(/\n/g, '<br>')
      // URLs
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-y2k-blue underline hover:text-y2k-accent">$1</a>');
    
    // Wrap consecutive <li> elements in <ul>
    formatted = formatted.replace(/(<li>.*?<\/li>(?:<br>)*)+/g, (match) => {
      const cleanMatch = match.replace(/<br>/g, '');
      return `<ul class="list-disc list-inside space-y-1 my-2">${cleanMatch}</ul>`;
    });
    
    return formatted;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-y2k-elevated">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center text-xs font-bold border-2 ${
                message.type === 'assistant' 
                  ? 'bg-y2k-green border-y2k-green text-y2k-text-light mr-2 shadow-y2k-raised' 
                  : 'bg-y2k-blue border-y2k-blue text-y2k-text-light ml-2 shadow-y2k-raised'
              }`}>
                {message.type === 'assistant' ? 'AG' : 'U'}
              </div>
              
              <div className="y2k-window">
                <div className={`y2k-titlebar px-2 py-1 flex items-center justify-between ${
                  message.type === 'user' ? 'bg-gradient-to-r from-y2k-blue to-blue-400' : 'bg-gradient-to-r from-y2k-green to-green-400'
                }`}>
                  <div className="pixel-font text-y2k-text-light" style={{fontSize: '6px'}}>
                    {message.type === 'user' ? 'USER_MSG.TXT' : 'ASSISTANT_RESPONSE.TXT'}
                  </div>
                  <div className="window-controls">
                    <button className="window-control-btn">_</button>
                    <button className="window-control-btn">□</button>
                    <button className="window-control-btn">×</button>
                  </div>
                </div>
                <div className="px-3 py-2 bg-y2k-surface text-y2k-text text-sm">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: renderContent(message.content) 
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-y2k-green border-2 border-y2k-green text-y2k-text-light mr-2 flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-y2k-raised">
                AG
              </div>
              <div className="y2k-window">
                <div className="y2k-titlebar px-2 py-1 flex items-center justify-between bg-gradient-to-r from-y2k-green to-green-400">
                  <div className="pixel-font text-y2k-text-light" style={{fontSize: '6px'}}>
                    PROCESSING.EXE
                  </div>
                  <div className="window-controls">
                    <button className="window-control-btn">_</button>
                    <button className="window-control-btn">□</button>
                    <button className="window-control-btn">×</button>
                  </div>
                </div>
                <div className="px-3 py-2 bg-y2k-surface text-y2k-text">
                  <div className="flex items-center space-x-2">
                    <div className="pixel-font text-y2k-text" style={{fontSize: '8px'}}>LOADING</div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-y2k-accent animate-bounce"></div>
                      <div className="w-1 h-1 bg-y2k-accent animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-y2k-accent animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default Chat;