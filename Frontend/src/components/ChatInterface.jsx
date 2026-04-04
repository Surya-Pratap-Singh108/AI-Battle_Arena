import { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ArenaResponse from './ArenaResponse';

export default function ChatInterface({ messages, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* TopNavBar */}
      <header className="fixed top-0 flex justify-end w-full md:w-[calc(100%-16rem)] z-30 bg-background/80 backdrop-blur-xl h-16 items-center px-8 font-label">
         <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary px-3 py-1 bg-primary-container rounded-full uppercase">Stitch UI Layout</span>
         </div>
      </header>

      {/* Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-24 pb-40 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {messages.map((msg, idx) => (
            <div key={idx} className="space-y-12">
              <UserMessage message={msg.problem} />
              <ArenaResponse 
                solution1={msg.solution_1} 
                solution2={msg.solution_2} 
                judge={msg.judge} 
              />
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Sophisticated Fixed Text Input */}
      <div className="absolute bottom-0 left-0 w-full px-6 lg:px-24 pb-8 pt-16 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto glass-input rounded-3xl shadow-[0_20px_40px_-12px_rgba(42,52,57,0.08)] border border-outline-variant/40 p-2 flex items-end pointer-events-auto transition-all focus-within:shadow-md">
          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body py-3 px-6 resize-none max-h-32 focus:outline-none"
            placeholder="Ask a coding problem to evaluate..."
            rows={1}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={handleKeyDown}
            style={{ overflowY: 'hidden' }}
          />
          <div className="flex items-center gap-2 pr-2 mb-1 pl-2">
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFF"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-on-surface-variant mt-4 font-label tracking-widest uppercase opacity-60">AI can make mistakes. Verify critical code.</p>
      </div>
    </main>
  );
}
