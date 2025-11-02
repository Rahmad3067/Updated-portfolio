import { Environment, OrbitControls, Stars } from "@react-three/drei";
import React, { useState } from "react";
import CameraController from "./CameraController";
import NavigationPaths from "./NavigationPaths";
import PortfolioFloatingPlanet from "./PortfolioFloatingPlanet";
import { portfolioSections } from "./data/portfolioSections";

interface PortfolioScene3DProps {
  onSectionSelect: (sectionId: string) => void;
  showHtml: boolean;
}

const PortfolioScene3D: React.FC<PortfolioScene3DProps> = ({ onSectionSelect, showHtml }) => {
  const [activeSection] = useState(0);

  const handleSectionClick = (sectionId: string) => {
    onSectionSelect(sectionId);
  };

  return (
    <>
      <Environment preset="night" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <NavigationPaths />

      {portfolioSections.map((section, index) => (
        <PortfolioFloatingPlanet
          key={section.id}
          section={section}
          isActive={index === activeSection}
          onClick={() => handleSectionClick(section.id)}
          showHtml={showHtml}
        />
      ))}

      <CameraController targetSection={activeSection} />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
    </>
  );
};

export default PortfolioScene3D;

