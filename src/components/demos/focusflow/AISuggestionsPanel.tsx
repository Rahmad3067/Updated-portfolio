import React from "react";
import { AISuggestion } from "./types";

interface AISuggestionsPanelProps {
  suggestions: AISuggestion[];
}

const AISuggestionsPanel: React.FC<AISuggestionsPanelProps> = ({
  suggestions,
}) => {
  const getSuggestionIcon = (type: AISuggestion["type"]): string => {
    switch (type) {
      case "priority":
        return "🎯";
      case "break":
        return "☕";
      case "focus":
        return "🧠";
      case "summary":
        return "📊";
      default:
        return "💡";
    }
  };

  const getSuggestionColor = (type: AISuggestion["type"]): string => {
    switch (type) {
      case "priority":
        return "#ef4444";
      case "break":
        return "#8b5cf6";
      case "focus":
        return "#3b82f6";
      case "summary":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="ai-suggestions-panel">
      <div className="panel-header">
        <h4>🤖 AI Assistant</h4>
        <span className="ai-badge">Powered by OpenAI</span>
      </div>
      <div className="suggestions-list">
        {suggestions.length === 0 ? (
          <div className="no-suggestions">
            <p>✨ AI is analyzing your tasks... suggestions will appear here!</p>
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="ai-suggestion"
              style={{
                borderLeft: `3px solid ${getSuggestionColor(suggestion.type)}`,
              }}
            >
              <div className="suggestion-header">
                <span className="suggestion-icon">
                  {getSuggestionIcon(suggestion.type)}
                </span>
                <span
                  className="suggestion-type"
                  style={{ color: getSuggestionColor(suggestion.type) }}
                >
                  {suggestion.type.charAt(0).toUpperCase() +
                    suggestion.type.slice(1)}
                </span>
                <span className="confidence-badge">
                  {suggestion.confidence}% confident
                </span>
              </div>
              <div className="suggestion-message">{suggestion.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AISuggestionsPanel;

