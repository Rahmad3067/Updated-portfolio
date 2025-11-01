import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Chatbot.css";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface KnowledgeBase {
  keywords: string[];
  response: string;
  category: string;
}

const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();
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

  const knowledgeBase: KnowledgeBase[] = [
    {
      keywords: ["name", "nom", "qui es-tu", "who are you", "présente", "introduce"],
      response: language === "fr"
        ? "Je représente Rahmad ABUZAR, un développeur fullstack passionné par le développement web et mobile."
        : "I represent Rahmad ABUZAR, a fullstack developer passionate about web and mobile development.",
      category: "about",
    },
    {
      keywords: ["age", "âge", "old", "birthday", "anniversaire", "né", "born"],
      response: language === "fr"
        ? "Rahmad a 24 ans. Il est né le 12 novembre 2000."
        : "Rahmad is 24 years old. He was born on November 12, 2000.",
      category: "about",
    },
    {
      keywords: ["location", "lieu", "where", "où", "paris", "ville", "city", "live", "vit"],
      response: language === "fr"
        ? "Rahmad vit actuellement à Paris, France."
        : "Rahmad currently lives in Paris, France.",
      category: "about",
    },
    {
      keywords: ["email", "mail", "courriel", "contact", "email address"],
      response: language === "fr"
        ? "Vous pouvez contacter Rahmad par email à : aboozar919@gmail.com"
        : "You can contact Rahmad by email at: aboozar919@gmail.com",
      category: "contact",
    },
    {
      keywords: ["phone", "téléphone", "tel", "number", "numéro", "appeler", "call"],
      response: language === "fr"
        ? "Le numéro de téléphone de Rahmad est : +33 7 80 56 99 50"
        : "Rahmad's phone number is: +33 7 80 56 99 50",
      category: "contact",
    },
    {
      keywords: ["linkedin", "linkedin profile", "profil linkedin", "réseau", "network"],
      response: language === "fr"
        ? "Vous pouvez trouver Rahmad sur LinkedIn : https://www.linkedin.com/in/rahmad-abuzar-83a114214/"
        : "You can find Rahmad on LinkedIn: https://www.linkedin.com/in/rahmad-abuzar-83a114214/",
      category: "contact",
    },
    {
      keywords: ["job", "travail", "work", "emploi", "position", "poste", "currently", "actuellement"],
      response: language === "fr"
        ? "Rahmad est actuellement à la recherche d'un nouveau poste. Il est développeur fullstack avec une expertise en React, TypeScript, Python et Django."
        : "Rahmad is currently looking for a new position. He is a fullstack developer with expertise in React, TypeScript, Python, and Django.",
      category: "about",
    },
    {
      keywords: ["skills", "compétences", "technologies", "tech", "technologies", "what can", "peut"],
      response: language === "fr"
        ? "Rahmad maîtrise plusieurs technologies : Frontend (React, TypeScript, HTML, CSS, JavaScript), Backend (Python, Django, Node.js), 3D (Three.js), Outils (Docker, GitLab, MySQL, MongoDB, Ubuntu, WSL), et Méthodologies (Agile, SCRUM)."
        : "Rahmad masters several technologies: Frontend (React, TypeScript, HTML, CSS, JavaScript), Backend (Python, Django, Node.js), 3D (Three.js), Tools (Docker, GitLab, MySQL, MongoDB, Ubuntu, WSL), and Methodologies (Agile, SCRUM).",
      category: "skills",
    },
    {
      keywords: ["react", "typescript", "python", "django", "three.js", "three"],
      response: language === "fr"
        ? "Oui ! Rahmad a une solide expérience avec ces technologies. Il utilise React et TypeScript pour le frontend, Python et Django pour le backend, et Three.js pour les applications 3D."
        : "Yes! Rahmad has solid experience with these technologies. He uses React and TypeScript for frontend, Python and Django for backend, and Three.js for 3D applications.",
      category: "skills",
    },
    {
      keywords: ["experience", "expérience", "work experience", "emploi", "companies", "entreprises"],
      response: language === "fr"
        ? "Rahmad a travaillé chez Balyo (Développeur Fullstack), Datoscout (Développeur Backend), et a eu d'autres expériences professionnelles à Karlskrona, Suède. Il a de l'expérience avec React, TypeScript, MUI, Python, Django, HTMX, et Three.js."
        : "Rahmad has worked at Balyo (Fullstack Developer), Datoscout (Backend Developer), and has had other professional experiences in Karlskrona, Sweden. He has experience with React, TypeScript, MUI, Python, Django, HTMX, and Three.js.",
      category: "experience",
    },
    {
      keywords: ["balyo", "balyo company"],
      response: language === "fr"
        ? "Rahmad a travaillé chez Balyo en tant que développeur fullstack. Il utilisait React, TypeScript, MUI, Python, Django et Three.js pour développer des applications de gestion robotique."
        : "Rahmad worked at Balyo as a fullstack developer. He used React, TypeScript, MUI, Python, Django, and Three.js to develop robotic management applications.",
      category: "experience",
    },
    {
      keywords: ["datoscout", "datoscout company"],
      response: language === "fr"
        ? "Rahmad a travaillé chez Datoscout en tant que développeur backend. Il utilisait Python, Django, HTMX et Django REST-API pour développer des solutions backend."
        : "Rahmad worked at Datoscout as a backend developer. He used Python, Django, HTMX, and Django REST-API to develop backend solutions.",
      category: "experience",
    },
    {
      keywords: ["projects", "projets", "portfolio", "work", "applications", "tell me about", "parle-moi", "about your", "about", "your projects", "tes projets", "developed", "développé", "created", "créé", "built", "construit"],
      response: language === "fr"
        ? "Rahmad a développé plusieurs projets : Road Editor (éditeur de routes robotisées avec React/Three.js), Robot Interface Manager (tableau de bord de surveillance de robots), ROI Calculator (calculateur de retour sur investissement), et Ycsos (application de collecte d'informations)."
        : "Rahmad has developed several projects: Road Editor (robotic route editor with React/Three.js), Robot Interface Manager (robot monitoring dashboard), ROI Calculator (return on investment calculator), and Ycsos (information collection application).",
      category: "projects",
    },
    {
      keywords: ["road editor", "road", "route"],
      response: language === "fr"
        ? "Road Editor est une application de conception de sites robotisés développée avec React, TypeScript, MUI et Three.js. Elle permet de créer et éditer des routes pour robots dans un environnement 3D."
        : "Road Editor is a robotic site design application developed with React, TypeScript, MUI, and Three.js. It allows creating and editing routes for robots in a 3D environment.",
      category: "projects",
    },
    {
      keywords: ["robot interface", "robot manager", "dashboard"],
      response: language === "fr"
        ? "Robot Interface Manager est un tableau de bord de surveillance et de gestion de robots développé avec React, TypeScript, MUI et Three.js. Il permet de suivre l'état des robots, leurs batteries, leurs missions et de créer des tâches."
        : "Robot Interface Manager is a robot monitoring and management dashboard developed with React, TypeScript, MUI, and Three.js. It allows tracking robot status, batteries, missions, and creating tasks.",
      category: "projects",
    },
    {
      keywords: ["roi calculator", "roi", "calculator"],
      response: language === "fr"
        ? "ROI Calculator est un calculateur de retour sur investissement développé avec Python, Django et Tailwind. Il permet de calculer et analyser le ROI de différents projets."
        : "ROI Calculator is a return on investment calculator developed with Python, Django, and Tailwind. It allows calculating and analyzing the ROI of different projects.",
      category: "projects",
    },
    {
      keywords: ["ycsos", "ycsos application"],
      response: language === "fr"
        ? "Ycsos est une application de collecte d'informations et de calculs développée avec Python, Django et Tailwind."
        : "Ycsos is an information collection and calculation application developed with Python, Django, and Tailwind.",
      category: "projects",
    },
    {
      keywords: ["education", "formation", "studied", "étudié", "diploma", "diplôme", "school", "école"],
      response: language === "fr"
        ? "Rahmad a étudié le développement web et mobile à Konexio Paris en 2021. Il a également suivi d'autres formations incluant Digistart (2020) et des cours de français langue étrangère (FLE) en 2019-2020."
        : "Rahmad studied web and mobile development at Konexio Paris in 2021. He also completed other training including Digistart (2020) and French as a foreign language (FLE) courses in 2019-2020.",
      category: "education",
    },
    {
      keywords: ["languages", "langues", "parle", "speak", "français", "english", "suédois", "farsi"],
      response: language === "fr"
        ? "Rahmad parle plusieurs langues : Français (DELF B1), Anglais (TOEIC B2), Suédois (niveau B1), et Farsi (bilingue)."
        : "Rahmad speaks several languages: French (DELF B1), English (TOEIC B2), Swedish (B1 level), and Farsi (bilingual).",
      category: "skills",
    },
    {
      keywords: ["hire", "embaucher", "recruit", "recruter", "available", "disponible", "job", "travail"],
      response: language === "fr"
        ? "Oui ! Rahmad est actuellement à la recherche d'opportunités. Vous pouvez le contacter par email (aboozar919@gmail.com) ou téléphone (+33 7 80 56 99 50)."
        : "Yes! Rahmad is currently looking for opportunities. You can contact him by email (aboozar919@gmail.com) or phone (+33 7 80 56 99 50).",
      category: "contact",
    },
    {
      keywords: ["hello", "bonjour", "hi", "salut", "hey", "coucou"],
      response: language === "fr"
        ? "Bonjour ! Comment puis-je vous aider aujourd'hui ? Posez-moi des questions sur Rahmad !"
        : "Hello! How can I help you today? Ask me questions about Rahmad!",
      category: "greeting",
    },
    {
      keywords: ["thanks", "merci", "thank you", "thank"],
      response: language === "fr"
        ? "De rien ! N'hésitez pas si vous avez d'autres questions."
        : "You're welcome! Feel free to ask if you have other questions.",
      category: "greeting",
    },
  ];

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Find the best matching knowledge base entry with priority scoring
    let bestMatch: KnowledgeBase | null = null;
    let maxScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      
      // Count exact matches for all keywords
      for (const keyword of entry.keywords) {
        if (lowerQuestion.includes(keyword)) {
          // Longer keywords get higher priority
          score += keyword.length;
        }
      }
      
      // Bonus for more specific matches (projects, experience, etc.)
      const specificTerms: Record<string, number> = {
        "projects": 50,
        "projets": 50,
        "project": 45,
        "projet": 45,
        "tell me about": 60,
        "parle-moi": 60,
        "about your": 55,
        "your projects": 55,
        "tes projets": 55,
        "application": 30,
        "applications": 30,
        "app": 20,
        "portfolio": 40,
        "work": 35,
      };
      
      for (const [term, bonus] of Object.entries(specificTerms)) {
        if (lowerQuestion.includes(term) && entry.category === "projects") {
          score += bonus;
        }
      }
      
      // Bonus for contact-related questions
      const contactTerms: Record<string, number> = {
        "contact": 50,
        "contacter": 50,
        "email": 40,
        "phone": 40,
        "téléphone": 40,
        "linkedin": 40,
        "call": 30,
        "appeler": 30,
      };
      
      for (const [term, bonus] of Object.entries(contactTerms)) {
        if (lowerQuestion.includes(term) && entry.category === "contact") {
          score += bonus;
        }
      }
      
      // Bonus for skills-related questions
      const skillTerms: Record<string, number> = {
        "skills": 50,
        "compétences": 50,
        "skill": 45,
        "compétence": 45,
        "technologies": 40,
        "technologie": 40,
        "tech": 30,
      };
      
      for (const [term, bonus] of Object.entries(skillTerms)) {
        if (lowerQuestion.includes(term) && entry.category === "skills") {
          score += bonus;
        }
      }
      
      // Bonus for experience-related questions
      const experienceTerms: Record<string, number> = {
        "experience": 50,
        "expérience": 50,
        "work": 40,
        "travail": 40,
        "job": 30,
        "emploi": 30,
        "company": 35,
        "entreprise": 35,
        "balyo": 50,
        "datoscout": 50,
      };
      
      for (const [term, bonus] of Object.entries(experienceTerms)) {
        if (lowerQuestion.includes(term) && entry.category === "experience") {
          score += bonus;
        }
      }
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && maxScore > 0) {
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

