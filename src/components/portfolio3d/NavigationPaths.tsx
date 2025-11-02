import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { portfolioSections } from "./data/portfolioSections";

const NavigationPaths: React.FC = () => {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.001;
    }
  });

  const points = portfolioSections.map(
    (section) => new THREE.Vector3(...section.position)
  );
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </lineSegments>
  );
};

export default NavigationPaths;

