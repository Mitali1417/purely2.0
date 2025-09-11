import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Mic,
  MicOff,
  Bot,
  Lightbulb,
  Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProductRecommendations } from "./ProductRecommendations";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  concernType?: "skin" | "hair" | "body";
  severity?: "mild" | "moderate" | "severe";
  tips?: string[];
  recommendedProducts?: any[];
}

interface ChatInterfaceProps {
  products: any[];
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  isLoading: boolean;
  onQuickQuestion: (question: string) => void;
  hasProducts: boolean;
}

const PREDEFINED_QUESTIONS = [
  "I have acne and oily skin, what should I do?",
  "My hair is falling out, what can I do?",
  "I want to start a basic skincare routine",
  "What products for sensitive skin?",
];

export const ChatInterface = ({
  products,
  onSendMessage,
  messages,
  isLoading,
  onQuickQuestion,
  hasProducts,
}: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(
    messages.length === 0
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastSpokenMessageId = useRef<string | null>(null);

  useEffect(() => {
    // Auto-show quick questions when no messages
    if (messages.length === 0) {
      setShowQuickQuestions(true);
    }
  }, [messages.length]);

  // Scroll to top on mount or when messages are reset
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages.length === 0]);

  // Stop speech synthesis when component unmounts (e.g., navigating away)
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Helper to get a female voice
  const getFemaleVoice = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    // Try to find an English female voice
    const female = voices.find(
      (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
    );
    if (female) return female;
    // Fallback: any English voice with 'female' in name or marked as female
    const fallback = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("girl") ||
          v.voiceURI.toLowerCase().includes("female"))
    );
    if (fallback) return fallback;
    // Fallback: any English voice
    return voices.find((v) => v.lang.startsWith("en")) || voices[0];
  };

  // Auto-speak the latest assistant message
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg.role === "assistant" &&
      lastMsg.id !== lastSpokenMessageId.current &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      const utterance = new window.SpeechSynthesisUtterance(lastMsg.content);
      utterance.lang = "en-US";
      const voice = getFemaleVoice();
      if (voice) utterance.voice = voice;
      window.speechSynthesis.cancel(); // Stop any previous speech
      window.speechSynthesis.speak(utterance);
      lastSpokenMessageId.current = lastMsg.id;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    await onSendMessage(message);
    setShowQuickQuestions(false);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    onQuickQuestion(question);
    setShowQuickQuestions(false);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 pb-36">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            <Bot className="h-4 w-4 animate-pulse" />
            <div className="flex gap-1">
              <div
                className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-background p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-3">
          {!hasProducts &&
            PREDEFINED_QUESTIONS.map((question, index) => (
              <Badge
                key={index}
                variant="outline"
                onClick={() => handleQuickQuestionClick(question)}
                className="text-xs font-light cursor-pointer"
              >
                {question}
              </Badge>
            ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {hasProducts && (
            <ProductRecommendations products={products} isLoading={isLoading} />
          )}
          <div className="flex gap-2 w-full">
            <div className="flex relative w-full">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What’s bothering you today? I’m here to help!"
                className="pr-10 text-sm h-12 text-muted-foreground"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={
                  isListening ? stopVoiceRecognition : startVoiceRecognition
                }
                disabled={isLoading}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 text-destructive" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              size="lg"
              className="h-12 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  // Text-to-speech handler
  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(message.content);
    utterance.lang = "en-US";
    // Use female voice if available
    const voices = window.speechSynthesis.getVoices();
    const female =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("woman") ||
            v.voiceURI.toLowerCase().includes("female"))
      ) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0];
    if (female) utterance.voice = female;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-3 max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        {/* <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-primary" : "bg-primary/20"
          }`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-primary-foreground" />
          ) : (
            <Bot className="h-4 w-4 text-primary" />
          )}
        </div> */}

        {/* Message Content */}
        <div
          className={`flex flex-col gap-2 ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`rounded-2xl px-4 py-3 ${
                isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent-foreground text-foreground"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            {/* Speaker button for assistant messages */}
            {!isUser && (
              <button
                type="button"
                aria-label="Play voice reply"
                onClick={handleSpeak}
                className="p-1 rounded-full hover:bg-accent focus:outline-none"
                style={{ lineHeight: 0 }}
              >
                <Volume2 className="h-4 w-4 text-primary" />
              </button>
            )}
          </div>

          {/* Additional Info for Assistant Messages */}
          {!isUser &&
            (message.concernType || message.severity || message.tips) && (
              <div className="space-y-2 max-w-full">
                {/* Tips */}
                {message.tips && message.tips.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800">
                        Quick Tips
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {message.tips.slice(0, 3).map((tip, index) => (
                        <li
                          key={index}
                          className="text-amber-700 flex items-start gap-2"
                        >
                          <span className="text-amber-500 mt-1 text-xs">•</span>
                          <span className="text-amber-500 mt-1 text-xs">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          {/* Timestamp */}
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
