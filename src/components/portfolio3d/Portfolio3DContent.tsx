import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Portfolio3DContent.css";
import ContentModal from "./content/ContentModal";
import DemosModalContent from "./content/DemosModalContent";

interface Portfolio3DContentProps {
  selectedSection: string | null;
  onClose: () => void;
}

const Portfolio3DContent: React.FC<Portfolio3DContentProps> = ({
  selectedSection,
  onClose,
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSection) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedSection]);

  useEffect(() => {
    if (selectedDemo) {
      console.log("Demo selected:", selectedDemo); // Debug log
    }
  }, [selectedDemo]);

  const handleDemoClick = (projectId: string) => {
    setSelectedDemo(projectId);
  };

  return (
    <>
      {selectedSection && isVisible && !selectedDemo && (
        <ContentModal
          section={selectedSection}
          isVisible={isVisible}
          t={t}
          onClose={onClose}
          onDemoClick={handleDemoClick}
        />
      )}

      {selectedDemo && (
        <DemosModalContent
          selectedDemo={selectedDemo}
          onClose={() => setSelectedDemo(null)}
        />
      )}
    </>
  );
};

export default Portfolio3DContent;
