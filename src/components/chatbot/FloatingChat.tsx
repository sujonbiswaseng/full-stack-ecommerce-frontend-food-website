"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { MessageSquare, Send, RefreshCw, Bot, User, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Ingestmeals, QueryMeals } from "@/actions/rag.actions";
import Link from "next/link";
import { getSession } from "@/services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // shadcn/ui

type MessageSource = {
  id: string;
  content: string;
  similarity: number;
  metadata?: { name?: string; [key: string]: unknown };
  sourceType?: string;
};

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  sources?: MessageSource[];
  isError?: boolean;
  queryToRetry?: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "bot",
    content:
      "Hello! I'm your AI meal assistant 👋\n\nAsk me anything about meals — the most searched dishes, trending foods, or popular cuisines. I'll help you discover the most sought-after meal content quickly.",
  },
];

const SUGGESTED_QUERIES = [
  "best food near me open now",
  "top restaurants near me",
  "cheap food near me today",
  "order food online near me",
  "best rated restaurants nearby",
  "popular food places near me"
];

// Skeleton Loader for card/message loading
function MessageSkeleton() {
  return (
    <div className="flex items-end gap-4 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-muted" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 rounded bg-muted w-1/2"></div>
        <div className="h-4 rounded bg-muted w-2/3"></div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-4 max-w-[85%]" aria-live="polite">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary shadow shrink-0">
        <Bot size={16} className="text-primary-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl shadow px-6 py-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full inline-block bg-secondary animate-bounce" />
        <span className="w-2 h-2 rounded-full inline-block bg-secondary animate-bounce [animation-delay:120ms]" />
        <span className="w-2 h-2 rounded-full inline-block bg-secondary animate-bounce [animation-delay:240ms]" />
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  onRetry,
}: {
  message: Message;
  onRetry?: (query: string) => void;
}) {
  const isUser = message.role === "user";

  // Card for event lists (content as array)
  if (Array.isArray(message.content) && message.content.length > 0) {
    return (
      <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-card border border-border shadow shrink-0">
          {isUser ? (
            <User size={16} className="text-muted-foreground" />
          ) : (
            <Bot size={16} className="text-primary" />
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {message.content.map((evt: any) => (
              <Card key={evt.id} className="flex flex-col h-full border border-border bg-card transition hover:border-accent/60">
                <CardContent className="p-4 flex flex-col gap-2">
                  <h4 className="text-base font-semibold text-primary">{evt.title}</h4>
                  <p className="text-sm text-muted-foreground">{evt.description}</p>
                </CardContent>
                <CardFooter className="mt-auto p-4 pt-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link
                      href={`/meals/${evt.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View details for ${evt.title}`}
                    >
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-end gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      data-user={isUser}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border shadow bg-card ${isUser ? "border-muted" : "border-primary"}`}
        aria-hidden
      >
        {isUser ? (
          <User size={16} className="text-muted-foreground" />
        ) : (
          <Bot size={16} className="text-primary" />
        )}
      </div>
      <div className={`flex flex-col gap-2 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          className={[
            "text-[15px] rounded-2xl shadow-sm px-6 py-3 whitespace-pre-line font-medium",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-lg rounded-tl-2xl rounded-tr-2xl"
              : "bg-card text-card-foreground border border-border rounded-bl-lg rounded-tr-2xl rounded-tl-2xl",
          ].join(" ")}
        >
          {message.content}
        </motion.div>
        {message.isError && onRetry && message.queryToRetry && (
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2 mt-2"
            onClick={() => onRetry(message.queryToRetry!)}
          >
            <RefreshCw size={14} /> Retry
          </Button>
        )}
      </div>
    </div>
  );
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isQuerying, startQueryTransition] = useTransition();
  const [isSyncing, startSyncTransition] = useTransition();
  const [userRole, setUserRole] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const user = await getSession();
      setUserRole(user?.data?.role as string);
    };
    fetchRole();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isQuerying]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSync = () => {
    startSyncTransition(async () => {
      const result = await Ingestmeals();
      if (result.success) {
        toast.success("meal data synced!", {
          description:
            result.message ?? `${result.data.count ?? 0} meal indexed.`,
        });
      } else {
        toast.error("Sync failed");
      }
    });
  };

  const handleSend = (query?: string) => {
    const text = (query ?? inputValue).trim();
    if (!text || isQuerying) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    startQueryTransition(async () => {
      const result = await QueryMeals(text);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: result.success
          ? result.data!
          : (result.message ?? "Something went wrong. Please try again."),
        sources: result.success ? result.data : undefined,
        isError: !result.success,
        queryToRetry: !result.success ? text : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-modal"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.18 } }}
            className="fixed bottom-6 right-6 z-[60] w-full max-w-[95vw] xs:max-w-[380px] sm:max-w-[410px] md:max-w-[400px] lg:max-w-[420px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl transition-all"
            style={{
              maxHeight: "78vh",
            }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/90 shrink-0">
                  <Bot size={22} className="text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <span className="block text-base font-semibold text-foreground truncate">
                    AI Health Assistant
                  </span>
                  <span className="block text-xs mt-1 text-muted-foreground font-medium tracking-wide">
                    Powered by RAG · Always online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(userRole === "Admin" || userRole === "Provider") && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="border border-border bg-card hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
                    title="Sync Doctor Data"
                    onClick={handleSync}
                    disabled={isSyncing}
                  >
                    <RefreshCw
                      size={18}
                      className={isSyncing ? "animate-spin" : ""}
                      aria-hidden
                    />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close chat"
                  onClick={() => setIsOpen(false)}
                  className="border border-transparent hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronDown size={20} />
                </Button>
              </div>
            </div>
            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-6 bg-background space-y-6 min-h-[180px] max-h-[55vh] custom-scrollbar"
            >
              {messages.length === 0 &&
                Array.from({ length: 2 }).map((_, i) => (
                  <MessageSkeleton key={i} />
                ))}
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onRetry={handleSend} />
              ))}
              {isQuerying && <TypingIndicator />}
              {messages.length === 1 && !isQuerying && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <p className="text-xs font-medium text-muted-foreground px-1">
                    Try asking:
                  </p>
                  <div className="flex flex-col gap-4">
                    {SUGGESTED_QUERIES.map((q) => (
                      <Button
                        key={q}
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="justify-start text-primary font-medium px-4 py-2 rounded-lg bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground active:scale-98 transition-shadow shadow-sm border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full text-left"
                        onClick={() => handleSend(q)}
                        aria-label={q}
                        tabIndex={0}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
             
                </motion.div>
              )}
            </div>
            {/* Input */}
            <div className="shrink-0 border-t border-border bg-card px-4 py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-end gap-4"
                autoComplete="off"
              >
                <label htmlFor="chatbot-input" className="sr-only">
                  Message (Ask about doctors, specialties...)
                </label>
                <Input
                  id="chatbot-input"
                  ref={inputRef}
                  type="text"
                  placeholder="Type your question about meals, restaurants, or cuisines…"
             
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isQuerying}
                  className="flex-1 text-sm bg-input text-foreground border border-input rounded-xl focus-visible:ring-ring focus-visible:border-primary"
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-label="Chat message input"
                  maxLength={240}
                />
                <Button
                  type="submit"
                  variant='default'
                  size="icon"
                  aria-label="Send"
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                  disabled={isQuerying || !inputValue.trim()}
                >
                  <Send size={18} strokeWidth={2} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && <Button
        type="button"
        size="icon"
        variant="default"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className={`fixed bottom-7 right-7 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition duration-200 border-2 border-accent outline-none ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen && <MessageSquare size={24} />}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
            style={{ opacity: 0.11 }}
          />
        )}
      </Button>}
    </>
  );
}