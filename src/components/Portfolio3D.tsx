import {
  Environment,
  Html,
  OrbitControls,
  Stars,
  Text,
  Billboard,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./Portfolio3D.css";
import Portfolio3DContent from "./Portfolio3DContent";
import Portfolio3DLoader from "./Portfolio3DLoader";

// Extend JSX namespace for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      torusGeometry: any;
      lineSegments: any;
      lineBasicMaterial: any;
    }
  }
}

// Portfolio sections data
const portfolioSections = [
  {
    id: "hero",
    name: "Welcome",
    position: [0, 0, 0],
    color: "#4f46e5",
    icon: "🚀",
    description: "Welcome to my portfolio",
  },
  {
    id: "about",
    name: "About Me",
    position: [8, 2, -5],
    color: "#10b981",
    icon: "👨‍💻",
    description: "Learn about me",
  },
  {
    id: "experience",
    name: "Experience",
    position: [-8, 1, -3],
    color: "#f59e0b",
    icon: "💼",
    description: "My work experience",
  },
  {
    id: "skills",
    name: "Skills",
    position: [5, -2, 8],
    color: "#8b5cf6",
    icon: "⚡",
    description: "Technical skills",
  },
  {
    id: "projects",
    name: "Projects",
    position: [-5, -1, 6],
    color: "#ef4444",
    icon: "🛠️",
    description: "My projects",
  },
  {
    id: "education",
    name: "Education",
    position: [0, -4, -8],
    color: "#06b6d4",
    icon: "🎓",
    description: "Educational background",
  },
  {
    id: "contact",
    name: "Contact",
    position: [0, 3, 10],
    color: "#ec4899",
    icon: "📧",
    description: "Get in touch",
  },
];

// Floating planet component
function FloatingPlanet({
  section,
  isActive,
  onClick,
  showHtml,
}: {
  section: (typeof portfolioSections)[0];
  isActive: boolean;
  onClick: () => void;
  showHtml: boolean;
}) {
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
    <group position={section.position as [number, number, number]}>
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

      {/* Planet ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.1, 8, 100]} />
        <meshStandardMaterial color={section.color} transparent opacity={0.6} />
      </mesh>

      {/* Section label */}
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

      {/* Icon */}
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
}

// Navigation paths between planets
function NavigationPaths() {
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
}

// Camera controller
function CameraController({ targetSection }: { targetSection: number }) {
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
}

// Main 3D scene component
function Scene3D({
  onSectionSelect,
  showHtml,
}: {
  onSectionSelect: (sectionId: string) => void;
  showHtml: boolean;
}) {
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
        <FloatingPlanet
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
}

// Main Portfolio3D component
const Portfolio3D: React.FC<{
  onSectionSelect: (sectionId: string) => void;
}> = ({ onSectionSelect }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    onSectionSelect(sectionId);
  };

  const handleCloseContent = () => {
    setSelectedSection(null);
  };

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    let isDragging = false;
    let hasDragged = false;

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    // Mouse wheel (zoom)
    const handleWheel = (e: WheelEvent) => {
      handleInteraction();
    };

    // Mouse down (start of drag/rotate)
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      hasDragged = false;
    };

    // Mouse move (dragging/rotating)
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        hasDragged = true;
        handleInteraction();
      }
    };

    // Mouse up (end of drag)
    const handleMouseUp = () => {
      if (hasDragged) {
        handleInteraction();
      }
      isDragging = false;
      hasDragged = false;
    };

    // Touch events (for mobile)
    const handleTouchStart = () => {
      handleInteraction();
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isLoading, hasInteracted]);

  if (isLoading) {
    return <Portfolio3DLoader />;
  }

  return (
    <div className="portfolio-3d-container" ref={containerRef}>
      <div className="portfolio-3d-overlay">
        <div className="portfolio-3d-ui">
          <h1 className="portfolio-3d-title">Interactive Portfolio</h1>
          <p className="portfolio-3d-subtitle">
            Navigate through space to explore my work
          </p>
          {!hasInteracted && (
            <div className="portfolio-3d-controls">
              <p>
                🖱️ Click and drag to rotate • Scroll to zoom • Click planets to
                explore
              </p>
            </div>
          )}
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 5, 15], fov: 75 }}
        style={{
          background:
            "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      >
        <Suspense fallback={null}>
          <Scene3D onSectionSelect={handleSectionSelect} showHtml={selectedSection === null} />
        </Suspense>
      </Canvas>

      <Portfolio3DContent
        selectedSection={selectedSection}
        onClose={handleCloseContent}
      />
    </div>
  );
};

export default Portfolio3D;
