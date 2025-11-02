import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Chatbot.css";
import { createKnowledgeBase } from "./chatbot/knowledgeBase";
import { findBestMatch } from "./chatbot/scoring";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: language === "fr" 
        ? "Bonjour ! Je suis l'assistant virtuel de Rahmad. Posez-moi des questions sur lui, son parcours, ses compétences ou ses projets !"
        : "Hello! I'm Rahmad's virtual assistant. Ask me questions about him, his background, skills, or projects!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const knowledgeBase = createKnowledgeBase(language);

  const findAnswer = (question: string): string => {
    const bestMatch = findBestMatch(question, knowledgeBase);

    if (bestMatch) {
      return bestMatch.response;
    }

    // Default response
    return language === "fr"
      ? "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ? Je peux vous parler du parcours de Rahmad, ses compétences, ses projets, son expérience ou ses coordonnées."
      : "I'm not sure I understand. Could you rephrase your question? I can tell you about Rahmad's background, skills, projects, experience, or contact information.";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findAnswer(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className={`chatbot-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={language === "fr" ? "Ouvrir le chat" : "Open chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="chatbot-icon">🤖</span>
              <div>
                <h3>{language === "fr" ? "Assistant Virtuel" : "Virtual Assistant"}</h3>
                <p>{language === "fr" ? "Rahmad ABUZAR" : "Rahmad ABUZAR"}</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label={language === "fr" ? "Fermer" : "Close"}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.sender}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === "fr"
                  ? "Posez une question..."
                  : "Ask a question..."
              }
              className="chatbot-input"
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label={language === "fr" ? "Envoyer" : "Send"}
            >
              ➤
            </button>
          </div>

          <div className="chatbot-suggestions">
            <p className="suggestions-label">
              {language === "fr" ? "Suggestions :" : "Suggestions:"}
            </p>
            <div className="suggestions-buttons">
              <button
                className="suggestion-btn"
                onClick={() => {
                  setInputValue(language === "fr" ? "Qui es-tu ?" : "Who are you?");
                }}
              >
                {language === "fr" ? "Qui es-tu ?" : "Who are you?"}
              </button>
              <button
                className="suggestion-btn"
                onClick={() => {
                  setInputValue(language === "fr" ? "Quelles sont tes compétences ?" : "What are your skills?");
                }}
              >
                {language === "fr" ? "Compétences" : "Skills"}
              </button>
              <button
                className="suggestion-btn"
                onClick={() => {
                  setInputValue(language === "fr" ? "Parle-moi de tes projets" : "Tell me about your projects");
                }}
              >
                {language === "fr" ? "Projets" : "Projects"}
              </button>
              <button
                className="suggestion-btn"
                onClick={() => {
                  setInputValue(language === "fr" ? "Comment te contacter ?" : "How to contact you?");
                }}
              >
                {language === "fr" ? "Contact" : "Contact"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
