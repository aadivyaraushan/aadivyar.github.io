import React, { useState } from 'react';

interface InputSectionProps {
  onSendMessage: (message: string) => void;
}

function InputSection({ onSendMessage }: InputSectionProps) {
  const [input, setInput] = useState('');

  const suggestions = [
    "What is Aadivya working on right now?",
    "Where does Aadivya study?",
    "What projects has Aadivya worked on?",
    "Tell me about Aadivya's research interests",
    "What startups is Aadivya involved with?",
    "How can I contact Aadivya?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t-2 border-y2k-border bg-y2k-surface p-3">
      <div className="max-w-3xl mx-auto">
        <div className="mb-3">
          <div className="pixel-font text-y2k-text mb-2" style={{fontSize: '6px'}}>QUICK_ACTIONS.BAT:</div>
          <div className="flex flex-wrap gap-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="y2k-button px-2 py-1 text-xs"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="y2k-window">
            <div className="y2k-titlebar px-2 py-1 flex items-center justify-between bg-gradient-to-r from-y2k-darkgray to-gray-500">
              <div className="pixel-font text-y2k-text-light" style={{fontSize: '6px'}}>
                INPUT_TERMINAL.EXE
              </div>
              <div className="window-controls">
                <button className="window-control-btn">_</button>
                <button className="window-control-btn">□</button>
              </div>
            </div>
            <div className="flex items-end p-2 bg-y2k-elevated">
              <div className="pixel-font text-y2k-text mr-2" style={{fontSize: '8px'}}>C:\&gt;</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ENTER COMMAND..."
                className="flex-1 y2k-input text-y2k-text placeholder-y2k-text-dim resize-none outline-none min-h-[24px] max-h-48 font-y2k text-sm p-1"
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="ml-2 y2k-button px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                [EXEC]
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputSection;