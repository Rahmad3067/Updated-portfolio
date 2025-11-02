import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { portfolioSections } from "./data/portfolioSections";

interface CameraControllerProps {
  targetSection: number;
}

const CameraController: React.FC<CameraControllerProps> = ({ targetSection }) => {
  const { camera } = useThree();

  useEffect(() => {
    const targetPosition = portfolioSections[targetSection].position;
    const target = new THREE.Vector3(...targetPosition);
    target.y += 2;
    target.z += 5;

    // Smooth camera transition
    const startPosition = camera.position.clone();
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      camera.position.lerpVectors(startPosition, target, easeProgress);
      camera.lookAt(new THREE.Vector3(...targetPosition));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [targetSection, camera]);

  return null;
};

export default CameraController;

