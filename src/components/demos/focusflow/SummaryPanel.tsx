import React from "react";

interface SummaryPanelProps {
  summary: string;
  onGenerate: () => void;
  isLoading?: boolean;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  summary,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="summary-panel">
      <div className="panel-header">
        <h4>📊 Smart Summary</h4>
        <button
          className="btn-generate"
          onClick={onGenerate}
          disabled={isLoading}
        >
          {isLoading ? "🔄 Generating..." : "✨ Regenerate"}
        </button>
      </div>
      <div className="summary-content">
        {summary ? (
          <pre className="ai-generated-summary">{summary}</pre>
        ) : (
          <div className="no-summary">
            <p>Generate a smart summary of your productivity trends!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPanel;

