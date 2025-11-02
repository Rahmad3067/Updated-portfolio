import React from "react";
import ContentRenderer from "./ContentRenderer";

interface ContentModalProps {
  section: string | null;
  isVisible: boolean;
  t: (key: string) => string;
  onClose: () => void;
  onDemoClick: (projectId: string) => void;
}

const getSectionTitle = (section: string | null, t: (key: string) => string): string => {
  switch (section) {
    case "hero":
      return "Welcome";
    case "about":
      return t("nav.about");
    case "experience":
      return t("nav.experience");
    case "skills":
      return t("nav.skills");
    case "projects":
      return t("nav.projects");
    case "education":
      return t("nav.education");
    case "contact":
      return t("nav.contact");
    default:
      return "";
  }
};

const ContentModal: React.FC<ContentModalProps> = ({
  section,
  isVisible,
  t,
  onClose,
  onDemoClick,
}) => {
  return (
    <div className={`portfolio-3d-content ${isVisible ? "visible" : "hidden"}`}>
      <div className="content-overlay" onClick={onClose}></div>
      <div className="content-modal" onClick={(e) => e.stopPropagation()}>
        <div className="content-header">
          <h2 className="content-title">{getSectionTitle(section, t)}</h2>
          <button className="content-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="content-body">
          <ContentRenderer section={section} t={t} onDemoClick={onDemoClick} />
        </div>
      </div>
    </div>
  );
};

export default ContentModal;

