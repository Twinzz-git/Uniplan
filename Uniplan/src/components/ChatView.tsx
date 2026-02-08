import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/task';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const aiResponses = [
  'Puedo ayudarte a organizar tus tareas. ¿Qué necesitas?',
  'Te sugiero priorizar las tareas con fecha límite más cercana.',
  'Una buena práctica es dividir las tareas grandes en subtareas más pequeñas.',
  'Recuerda tomar descansos regulares para mantener la productividad.',
  '¿Quieres que te ayude a planificar tu sprint semanal?',
  'Basándome en tus tareas, parece que tienes una carga de trabajo balanceada.',
];

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'ai',
      content: '¡Hola! Soy tu asistente de productividad. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex gap-2.5 animate-fade-in',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-accent-foreground" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[75%] rounded-xl px-4 py-2.5 text-sm',
                msg.role === 'user'
                  ? 'bg-chat-user text-foreground rounded-br-sm'
                  : 'bg-chat-ai text-foreground rounded-bl-sm'
              )}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <User size={14} className="text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5 items-start">
            <div className="w-7 h-7 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-accent-foreground" />
            </div>
            <div className="bg-chat-ai rounded-xl px-4 py-3 rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse-dot" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded-xl bg-muted border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-shadow"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="px-4 rounded-xl bg-accent text-accent-foreground hover:bg-accent/80 disabled:opacity-40 transition-all"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
