"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '@/lib/api/aiService';
import { accessoireService, Accessoire } from '@/lib/api/accessoireService';
import { cn } from '@/lib/utils';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Bonjour ! Je suis Expert Tech. Comment puis-je vous aider aujourd'hui à choisir vos accessoires ?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Accessoire[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Charger le catalogue pour l'IA
    const loadProducts = async () => {
      try {
        const res = await accessoireService.getAll(0, 100);
        setProducts(res.data?.content || []);
      } catch (e) {
        console.error("Erreur chargement catalogue chatbot", e);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Préparer l'historique pour l'API Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await aiService.getChatResponse(userMessage, history, products);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, j'ai une petite panne technique. Réessayez ?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Fenêtre de Chat */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Expert Tech</div>
                <div className="flex items-center gap-1.5 text-[10px] opacity-80">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  En ligne pour vous aider
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                  msg.role === 'user' 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-150"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-300"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="relative">
              <input 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Posez votre question..."
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white text-sm"
              />
              <button 
                type="submit" 
                disabled={isLoading || !message.trim()}
                className="absolute right-2 top-1.5 p-1.5 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
              Propulsé par <Sparkles className="h-2.5 w-2.5 text-primary" /> AI Intelligence
            </div>
          </form>
        </div>
      )}

      {/* Bulle Flottante */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
        >
          <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Besoin d'aide ? Chattez avec l'IA ✨
          </div>
        </button>
      )}
    </div>
  );
}
