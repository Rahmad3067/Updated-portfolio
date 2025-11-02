import { Billboard, Html, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";

interface Section {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  icon: string;
  description: string;
}

interface FloatingPlanetProps {
  section: Section;
  isActive: boolean;
  onClick: () => void;
  showHtml: boolean;
}

const FloatingPlanet: React.FC<FloatingPlanetProps> = ({
  section,
  isActive,
  onClick,
  showHtml,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y =
        section.position[1] +
        Math.sin(state.clock.elapsedTime + section.position[0]) * 0.5;
    }
  });

  return (
    <group position={section.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isActive ? 1.5 : hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={isActive ? 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      <Billboard follow={true}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {String(section.name)}
        </Text>
      </Billboard>

      {showHtml && (
        <Html
          position={[0, 0, 0]}
          center
          sprite
          distanceFactor={10}
          style={{
            fontSize: "2rem",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span>{String(section.icon)}</span>
        </Html>
      )}
    </group>
  );
};

export default FloatingPlanet;

