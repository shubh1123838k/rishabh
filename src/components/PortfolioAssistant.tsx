import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Sparkles, X } from 'lucide-react';
import type { PortfolioProfile } from '../data/portfolioData';
import { getPortfolioAssistantReply } from '../utils/portfolioLogic';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface PortfolioAssistantProps {
  profile: PortfolioProfile;
  theme: 'dark' | 'light';
}

const SUGGESTIONS = [
  'What projects has he done?',
  'What tools does he use?',
  'How can I contact him?',
];

export function PortfolioAssistant({ profile, theme }: PortfolioAssistantProps) {
  const firstName = profile.name.trim().split(/\s+/)[0] || 'Rishabh';
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hi! I can tell you about ${firstName}'s skills, projects, experience, and contact details. What would you like to know?`,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            sender: 'bot',
            text: `Hi! I can tell you about ${firstName}'s skills, projects, experience, and contact details. What would you like to know?`,
          },
        ];
      }
      return prev;
    });
  }, [firstName]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const sendMessage = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}-${Math.random()}`,
      sender: 'user',
      text: trimmed,
    };
    const replyText = getPortfolioAssistantReply(trimmed, profile);
    const botMsg: ChatMessage = {
      id: `b-${Date.now()}-${Math.random()}`,
      sender: 'bot',
      text: replyText,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  const isLight = theme === 'light';

  return (
    <aside
      aria-label="Portfolio chat assistant"
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-end gap-3.5"
    >
      {isOpen && (
        <section
          id="chat-panel"
          aria-labelledby="chat-title"
          className="chat-panel-anim w-[min(360px,calc(100vw-32px))] h-[min(490px,calc(100dvh-110px))] min-h-[320px] flex flex-col overflow-hidden rounded-2xl border shadow-2xl"
          style={{
            backgroundColor: isLight ? '#ffffff' : '#111111',
            borderColor: isLight ? '#d8d5cd' : '#383735',
          }}
        >
          <header
            className="flex items-center justify-between gap-3 p-4 border-b"
            style={{
              backgroundColor: isLight ? '#f1efe9' : '#171717',
              borderColor: 'var(--line)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 0 8px rgba(198,35,62,0.7)',
                }}
              />
              <div>
                <h2
                  id="chat-title"
                  className="text-[13px] font-bold m-0"
                  style={{ color: 'var(--white)' }}
                >
                  Portfolio assistant
                </h2>
                <p
                  className="text-[10px] m-0 mt-0.5"
                  style={{ color: 'var(--muted)' }}
                >
                  Ask me about {firstName}&apos;s work
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="Close chat"
              className="w-8 h-8 grid place-items-center rounded-md cursor-pointer transition-colors hover:text-[#c6233e]"
              style={{ color: 'var(--muted)' }}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 flex flex-col items-start gap-2.5 overflow-y-auto p-4 overscroll-contain"
          >
            {messages.map((msg) => (
              <p
                key={msg.id}
                className={`max-w-[88%] m-0 px-3.5 py-2.5 rounded-xl text-[12px] leading-[1.65] break-words ${
                  msg.sender === 'user' ? 'self-end' : 'self-start'
                }`}
                style={
                  msg.sender === 'user'
                    ? { backgroundColor: '#7e1729', color: '#ffffff' }
                    : {
                        backgroundColor: isLight ? '#f0eee8' : '#222222',
                        color: isLight ? '#252421' : '#e4e2dd',
                      }
                }
              >
                {msg.text}
              </p>
            ))}
          </div>

          {showSuggestions && (
            <div
              aria-label="Suggested questions"
              className="flex flex-wrap gap-1.5 px-3.5 pb-3"
            >
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="px-2.5 py-1.5 rounded-full border text-[10px] cursor-pointer transition-colors hover:border-[#c6233e]"
                  style={{
                    borderColor: isLight ? '#d2cec5' : '#41403d',
                    color: isLight ? '#4a4741' : '#cccccc',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-3 border-t"
            style={{ borderColor: 'var(--line)' }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Your message
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
              required
              className="min-w-0 flex-1 rounded-lg border px-3 py-2.5 text-[12px] focus:outline-none focus:border-[#c6233e]"
              style={{
                backgroundColor: isLight ? '#f8f7f3' : '#191919',
                borderColor: isLight ? '#d5d1c8' : '#3a3936',
                color: 'var(--white)',
              }}
            />
            <button
              type="submit"
              aria-label="Send message"
              className="px-3.5 rounded-lg text-[11px] font-bold text-white cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        className="flex items-center gap-2.5 min-h-[50px] px-4 rounded-full border text-white font-bold text-[12px] shadow-xl cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{
          backgroundColor: 'var(--accent)',
          borderColor: 'rgba(255,255,255,0.18)',
        }}
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        <span className="whitespace-nowrap">Ask me</span>
      </button>
    </aside>
  );
}
