import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import "./Portfolio3D.css";
import Portfolio3DContent from "./Portfolio3DContent";
import Portfolio3DLoader from "./Portfolio3DLoader";
import PortfolioScene3D from "./PortfolioScene3D";

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
          <PortfolioScene3D onSectionSelect={handleSectionSelect} showHtml={selectedSection === null} />
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
