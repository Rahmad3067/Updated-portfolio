import { Environment, OrbitControls, Stars } from "@react-three/drei";
import React, { useState } from "react";
import { portfolioSections } from "./data/portfolioSections";
import FloatingPlanet from "./FloatingPlanet";

interface Scene3DProps {
  onSectionSelect: (sectionId: string) => void;
  showHtml: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ onSectionSelect, showHtml }) => {
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

      {portfolioSections.map((section, index) => (
        <FloatingPlanet
          key={section.id}
          section={section}
          isActive={index === activeSection}
          onClick={() => handleSectionClick(section.id)}
          showHtml={showHtml}
        />
      ))}

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

export default Scene3D;

