import React from "react";

interface DailyPlanPanelProps {
  plan: string;
  onGenerate: () => void;
  isLoading?: boolean;
}

const DailyPlanPanel: React.FC<DailyPlanPanelProps> = ({
  plan,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="daily-plan-panel">
      <div className="panel-header">
        <h4>📅 Daily Plan</h4>
        <button
          className="btn-generate"
          onClick={onGenerate}
          disabled={isLoading}
        >
          {isLoading ? "🔄 Generating..." : "✨ Regenerate"}
        </button>
      </div>
      <div className="plan-content">
        {plan ? (
          <pre className="ai-generated-plan">{plan}</pre>
        ) : (
          <div className="no-plan">
            <p>Click "Generate Daily Plan" to get AI-powered task scheduling!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyPlanPanel;

