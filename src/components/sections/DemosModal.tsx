import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ECommerceTaskManagerDemo from "../demos/ECommerceTaskManagerDemo";
import FocusFlowDemo from "../demos/FocusFlowDemo";
import RoadEditorDemo from "../demos/RoadEditorDemo";
import RobotInterfaceDemo from "../demos/RobotInterfaceDemo";
import ROICalculatorDemo from "../demos/ROICalculatorDemo";
import YcsosDemo from "../demos/YcsosDemo";

interface DemosModalProps {
  selectedDemo: string | null;
  onClose: () => void;
}

const DemosModal: React.FC<DemosModalProps> = ({ selectedDemo, onClose }) => {
  const { t } = useLanguage();
  
  if (!selectedDemo) return null;

  const getDemoTitle = (demoId: string): string => {
    const titles: Record<string, string> = {
      "road-editor": t("projects.roadeditor.title"),
      "robot-interface": t("projects.robotinterface.title"),
      "roi-calculator": t("projects.roi.title"),
      ycsos: t("projects.ycsos.title"),
      "ecommerce-task-manager": t("projects.taskmanager.title"),
      focusflow: t("projects.focusflow.title"),
    };
    return titles[demoId] || demoId;
  };

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
      case "ecommerce-task-manager":
        return <ECommerceTaskManagerDemo />;
      case "focusflow":
        return <FocusFlowDemo />;
      default:
        return null;
    }
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

export default DemosModal;

