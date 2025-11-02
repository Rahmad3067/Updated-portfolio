import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ROICalculatorDemo from "../../demos/ROICalculatorDemo";
import RoadEditorDemo from "../../demos/RoadEditorDemo";
import RobotInterfaceDemo from "../../demos/RobotInterfaceDemo";
import YcsosDemo from "../../demos/YcsosDemo";

interface DemosModalContentProps {
  selectedDemo: string | null;
  onClose: () => void;
}

const DemosModalContent: React.FC<DemosModalContentProps> = ({ selectedDemo, onClose }) => {
  const { t } = useLanguage();

  const renderDemo = () => {
    switch (selectedDemo) {
      case "road-editor":
        return <RoadEditorDemo />;
      case "robot-interface":
        return <RobotInterfaceDemo />;
      case "roi-calculator":
        return <ROICalculatorDemo />;
      case "ycsos":
        return <YcsosDemo />;
      default:
        return null;
    }
  };

  const getDemoTitle = (demoId: string | null): string => {
    const titles: Record<string, string> = {
      "road-editor": t("projects.roadeditor.title"),
      "robot-interface": t("projects.robotinterface.title"),
      "roi-calculator": t("projects.roi.title"),
      ycsos: t("projects.ycsos.title"),
    };
    return titles[demoId || ""] || "";
  };

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="demo-modal-header">
          <div className="demo-header-content">
            <h3>{getDemoTitle(selectedDemo)}</h3>
            <div className="demo-subtitle">
              🎮 Interactive Demo - Core Functionality Preview
            </div>
          </div>
          <button className="demo-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="demo-modal-content">{renderDemo()}</div>
      </div>
    </div>
  );
};

export default DemosModalContent;

