import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Text, Billboard, useGLTF, Environment } from "@react-three/drei";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import City3DCar from "./City3DCar";
import "./City3D.css";
import Portfolio3DContent from "./Portfolio3DContent";
import {
  createAsphaltTexture,
  createRoadMarkingTexture,
  createBrickTexture,
  createConcreteTexture,
  createGrassTexture,
} from "./City3DTextures";
import { useCarControls } from "../contexts/CarControlsContext";

type SectionId = "about" | "experience" | "skills" | "projects" | "education" | "contact" | "hero";

interface BuildingDef {
  id: SectionId;
  name: string;
  position: [number, number, number];
  color: string;
  modelUrl?: string; // Optional GLTF model URL
  scale?: number; // Optional scale for GLTF model
}

function Ground() {
  const [groundTexture, setGroundTexture] = useState<THREE.Texture | null>(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const grassTexture = useMemo(() => createGrassTexture(), []);
  
  // Load grass texture from Three.js-City repository - use it for all ground areas
  useEffect(() => {
    const loader = new TextureLoader();
    // Try multiple paths to ensure we find the texture
    const texturePaths = [
      `${process.env.PUBLIC_URL || ''}/images/textures/grass.jpg`,
      '/images/textures/grass.jpg',
      './images/textures/grass.jpg',
    ];
    
    let loaded = false;
    for (const texturePath of texturePaths) {
      loader.load(
        texturePath,
        (texture) => {
          if (!loaded) {
            loaded = true;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 10); // Lower repeat = larger, more visible texture
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;
            texture.anisotropy = 4;
            setGroundTexture(texture);
            setTextureLoaded(true);
            console.log("Ground grass texture loaded successfully from:", texturePath);
          }
        },
        undefined,
        (error) => {
          if (texturePath === texturePaths[texturePaths.length - 1]) {
            console.warn("Could not load ground texture from any path:", texturePaths);
            console.warn("Error:", error);
            console.warn("Using procedural grass texture as fallback.");
          }
        }
      );
    }
  }, []);
  
  // Always use downloaded grass texture if available, otherwise procedural
  const finalTexture = groundTexture || grassTexture;
  
  // Ensure the ground plane covers the entire area and is visible
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[200, 200, 10, 10]} />
      <meshStandardMaterial 
        map={finalTexture} 
        roughness={0.8} 
        metalness={0.1}
        color={groundTexture ? "#ffffff" : undefined} // White base if texture loaded
      />
    </mesh>
  );
}

function RoadGrid() {
  const [roadTexture, setRoadTexture] = useState<THREE.Texture | null>(null);
  const asphaltTexture = useMemo(() => createAsphaltTexture(), []);
  const roadMarkingTexture = useMemo(() => createRoadMarkingTexture(), []);
  
  useEffect(() => {
    const loader = new TextureLoader();
    const texturePath = `${process.env.PUBLIC_URL || ''}/images/textures/roadposx.png`;
    loader.load(
      texturePath,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 10);
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = 4;
        setRoadTexture(texture);
        console.log("Road texture loaded successfully from:", texturePath);
      },
      undefined,
      (error) => {
        console.warn("Could not load road texture from:", texturePath, error);
        console.warn("Using procedural texture as fallback");
      }
    );
  }, []);
  
  const roads: JSX.Element[] = [];
  const roadWidth = 16;
  const roadHeight = 0.02;
  const markingHeight = 0.025; // Increased gap to prevent z-fighting
  
  const finalRoadTexture = roadTexture || asphaltTexture;
  
  // Vertical roads
  for (let i = -80; i <= 80; i += 20) {
    // Main road surface
    roads.push(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[i, roadHeight, 0]} key={`v-road-${i}`}>
        <planeGeometry args={[roadWidth, 200]} />
        <meshStandardMaterial map={finalRoadTexture} roughness={0.9} metalness={0.1} depthWrite={true} />
      </mesh>
    );
    // Road markings - higher above surface to prevent z-fighting
    roads.push(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[i, markingHeight, 0]} key={`v-marking-${i}`}>
        <planeGeometry args={[roadWidth * 0.6, 200]} />
        <meshStandardMaterial 
          map={roadMarkingTexture} 
          transparent 
          opacity={0.9} 
          depthWrite={false}
          alphaTest={0.1}
        />
      </mesh>
    );
  }
  
  // Horizontal roads
  for (let i = -80; i <= 80; i += 20) {
    // Main road surface
    roads.push(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, roadHeight, i]} key={`h-road-${i}`}>
        <planeGeometry args={[200, roadWidth]} />
        <meshStandardMaterial map={finalRoadTexture} roughness={0.9} metalness={0.1} depthWrite={true} />
      </mesh>
    );
    // Road markings - higher above surface
    roads.push(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, markingHeight, i]} key={`h-marking-${i}`}>
        <planeGeometry args={[200, roadWidth * 0.6]} />
        <meshStandardMaterial 
          map={roadMarkingTexture} 
          transparent 
          opacity={0.9}
          depthWrite={false}
          alphaTest={0.1}
        />
      </mesh>
    );
  }
  
  return <group>{roads}</group>;
}

// Blinking Text Component - controls material opacity for blinking effect
function BlinkingText({
  children,
  position,
  rotation,
  fontSize,
  textOpacity,
}: {
  children: React.ReactNode;
  position: [number, number, number];
  rotation: [number, number, number];
  fontSize: number;
  textOpacity: number;
}) {
  const textRef = useRef<any>(null);

  useFrame(() => {
    if (textRef.current) {
      // drei Text creates a mesh, traverse to find materials
      textRef.current.traverse((child: THREE.Mesh) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material) {
            material.transparent = true;
            material.opacity = textOpacity;
          }
        }
      });
    }
  });

  return (
    <group ref={textRef}>
      <Text
        position={position}
        rotation={rotation}
        fontSize={fontSize}
        color="#FFEE00"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.2}
        outlineColor="#000000"
      >
        {children}
      </Text>
    </group>
  );
}

// GLTF Model Building Component
function GLTFBuilding({ def }: { def: BuildingDef }) {
  const { scene } = useGLTF(def.modelUrl!);
  const { camera } = useThree();
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(1);
  
  // Blinking animation for text
  const [textOpacity, setTextOpacity] = useState(1);
  
  // Make building fade out when too close to camera and animate text blinking
  useFrame((state) => {
    if (groupRef.current) {
      const buildingPos = new THREE.Vector3(...def.position);
      const cameraPos = camera.position;
      const distance = buildingPos.distanceTo(cameraPos);
      
      // Fade out when closer than 20 units, fully invisible at 12 units
      const minDistance = 12;
      const maxDistance = 20;
      if (distance < minDistance) {
        setOpacity(0);
      } else if (distance < maxDistance) {
        // Fade between minDistance and maxDistance
        const fadeRange = maxDistance - minDistance;
        const fadeAmount = (distance - minDistance) / fadeRange;
        setOpacity(fadeAmount);
      } else {
        setOpacity(1);
      }
      
      // Blinking effect - oscillate between 0.5 and 1.0
      const blinkSpeed = 2; // Blinks per second
      const blinkOpacity = 0.5 + 0.5 * (Math.sin(state.clock.elapsedTime * blinkSpeed * Math.PI) + 1) / 2;
      setTextOpacity(blinkOpacity * opacity); // Multiply by building opacity
      
      // Apply opacity to all materials in the cloned scene
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material) {
            material.transparent = true;
            material.opacity = opacity;
          }
        }
      });
    }
  });
  
  return (
    <group position={def.position} ref={groupRef}>
      <primitive 
        object={clonedScene} 
        scale={def.scale || 1} 
        castShadow 
        receiveShadow 
      />
      {/* Building name on all 4 faces - light yellow and blinking */}
      {/* Front face */}
      <BlinkingText
        position={[0, 12, 5]} 
        rotation={[0, 0, 0]}
        fontSize={1} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
      {/* Back face */}
      <BlinkingText
        position={[0, 12, -5]} 
        rotation={[0, Math.PI, 0]}
        fontSize={1} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
      {/* Right face */}
      <BlinkingText
        position={[5, 12, 0]} 
        rotation={[0, Math.PI / 2, 0]}
        fontSize={1} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
      {/* Left face */}
      <BlinkingText
        position={[-5, 12, 0]} 
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={1} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
    </group>
  );
}

// Procedural Building Component (fallback)
function ProceduralBuilding({ def }: { def: BuildingDef }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(1);
  
  const brickTexture = useMemo(() => createBrickTexture(), []);
  const concreteTexture = useMemo(() => createConcreteTexture(), []);
  
  // Use brick for most buildings, concrete for some
  // All buildings get textures - brick for about/experience/skills, concrete for projects/education/contact
  const useBrick = ["about", "experience", "skills"].includes(def.id);
  const wallTexture = useBrick ? brickTexture : concreteTexture;
  
  // Blinking animation for text
  const [textOpacity, setTextOpacity] = useState(1);
  
  // Make building fade out when too close to camera and animate text blinking
  useFrame((state) => {
    if (groupRef.current) {
      const buildingPos = new THREE.Vector3(...def.position);
      const cameraPos = camera.position;
      const distance = buildingPos.distanceTo(cameraPos);
      
      // Fade out when closer than 20 units, fully invisible at 12 units
      const minDistance = 12;
      const maxDistance = 20;
      if (distance < minDistance) {
        setOpacity(0);
      } else if (distance < maxDistance) {
        // Fade between minDistance and maxDistance
        const fadeRange = maxDistance - minDistance;
        const fadeAmount = (distance - minDistance) / fadeRange;
        setOpacity(fadeAmount);
      } else {
        setOpacity(1);
      }
      
      // Blinking effect - oscillate between 0.5 and 1.0
      const blinkSpeed = 2; // Blinks per second
      const blinkOpacity = 0.5 + 0.5 * (Math.sin(state.clock.elapsedTime * blinkSpeed * Math.PI) + 1) / 2;
      setTextOpacity(blinkOpacity * opacity); // Multiply by building opacity
    }
  });
  
  // Window texture - darker squares on the walls
  const windowMaterial = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, 256, 256);
    // Draw windows
    for (let y = 0; y < 256; y += 40) {
      for (let x = 0; x < 256; x += 40) {
        if ((x / 40 + y / 40) % 2 === 0) {
          ctx.fillStyle = "#000033";
          ctx.fillRect(x + 5, y + 5, 30, 30);
          // Window light
          ctx.fillStyle = "#4444ff";
          ctx.fillRect(x + 8, y + 8, 10, 10);
        }
      }
    }
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  return (
    <group position={def.position} ref={groupRef}>
      {/* Main building body with texture */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[8, 12, 8]} />
        <meshStandardMaterial 
          map={wallTexture} 
          roughness={0.7} 
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Windows on front face */}
      <mesh position={[0, 2, 4.01]} castShadow>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial 
          map={windowMaterial} 
          emissive="#000022" 
          emissiveIntensity={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Windows on side faces */}
      <mesh position={[4.01, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial 
          map={windowMaterial} 
          emissive="#000022" 
          emissiveIntensity={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[-4.01, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial 
          map={windowMaterial} 
          emissive="#000022" 
          emissiveIntensity={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 6.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[12, 1, 12]} />
        <meshStandardMaterial 
          color="#3a3a3a" 
          roughness={0.9} 
          metalness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Building name on all 4 faces - light yellow and blinking */}
      {/* Front face */}
      <BlinkingText
        position={[0, 5, 4.05]} 
        rotation={[0, 0, 0]}
        fontSize={0.833} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
      {/* Back face */}
      <BlinkingText
        position={[0, 5, -4.05]} 
        rotation={[0, Math.PI, 0]}
        fontSize={0.833} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
      {/* Right face */}
      <BlinkingText
        position={[4.05, 5, 0]} 
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.833} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
      {/* Left face */}
      <BlinkingText
        position={[-4.05, 5, 0]} 
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.833} 
        textOpacity={textOpacity}
      >
        {def.name}
      </BlinkingText>
    </group>
  );
}

function Building({ def }: { def: BuildingDef }) {
  // If modelUrl is provided, use GLTF model, otherwise use procedural building
  if (def.modelUrl) {
    return (
      <Suspense fallback={<ProceduralBuilding def={def} />}>
        <GLTFBuilding def={def} />
      </Suspense>
    );
  }
  return <ProceduralBuilding def={def} />;
}

function CityLayout({ buildings }: { buildings: BuildingDef[] }) {
  return (
    <group>
      {buildings.map((b) => (
        <Building key={b.id} def={b} />
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[20, 30, 10]} castShadow intensity={0.9} />
    </>
  );
}

function ProximityDetector({
  carRef,
  targets,
  onNearChange,
  radius = 15,
}: {
  carRef: React.RefObject<THREE.Object3D>;
  targets: { id: SectionId; position: THREE.Vector3 }[];
  onNearChange: (id: SectionId | null) => void;
  radius?: number;
}) {
  useFrame(() => {
    if (!carRef.current) {
      onNearChange(null);
      return;
    }
    const carPos = new THREE.Vector3();
    carRef.current.getWorldPosition(carPos);
    let found: SectionId | null = null;
    let closestDistance = Infinity;
    
    for (const t of targets) {
      // Only check horizontal distance (ignore Y axis)
      const dx = carPos.x - t.position.x;
      const dz = carPos.z - t.position.z;
      const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
      
      if (horizontalDistance < radius) {
        // Found a building within range, use the closest one
        if (horizontalDistance < closestDistance) {
          closestDistance = horizontalDistance;
          found = t.id;
        }
      }
    }
    onNearChange(found);
  });
  return null;
}

function CarHint({
  carRef,
  message,
}: {
  carRef: React.RefObject<THREE.Object3D>;
  message: string;
}) {
  const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 0));
  const [position, setPosition] = useState<[number, number, number]>([0, 3, 0]);
  
  useFrame(() => {
    if (carRef.current) {
      carRef.current.getWorldPosition(positionRef.current);
      positionRef.current.y += 2.5;
      setPosition([
        positionRef.current.x,
        positionRef.current.y,
        positionRef.current.z,
      ]);
    }
  });
  
  return (
    <Html position={position} center style={{ pointerEvents: "none" }}>
      <div className="city3d-hint">{message}</div>
    </Html>
  );
}

const City3D: React.FC<{ onSectionSelect: (id: string) => void; onToggle3D?: () => void }> = ({ onSectionSelect, onToggle3D }) => {
  const [selectedSection, setSelectedSection] = useState<SectionId | null>(null);
  const [near, setNear] = useState<SectionId | null>(null);
  const carRef = useRef<THREE.Object3D>(null);
  const controls = useCarControls();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const buildings = useMemo<BuildingDef[]>(
    () => [
      { 
        id: "about", 
        name: "About", 
        position: [-40, 6, -20], 
        color: "#10b981",
        // GLTF model temporarily disabled - path resolution issue with homepage setting
        // To enable: Uncomment below and ensure file is accessible at the correct path
        // modelUrl: process.env.NODE_ENV === "development" 
        //   ? "/models/gltf/LittlestTokyo.glb"
        //   : `${process.env.PUBLIC_URL || ""}/models/gltf/LittlestTokyo.glb`,
        // scale: 0.01
      },
      { id: "experience", name: "Experience", position: [-10, 6, -40], color: "#f59e0b" },
      { id: "skills", name: "Skills", position: [20, 6, -10], color: "#8b5cf6" },
      { id: "projects", name: "Projects", position: [40, 6, 20], color: "#ef4444" },
      { id: "education", name: "Education", position: [0, 6, 30], color: "#06b6d4" },
      { id: "contact", name: "Contact", position: [-30, 6, 30], color: "#ec4899" },
    ],
    []
  );

  const targets = useMemo(
    () => buildings.map((b) => ({ id: b.id, position: new THREE.Vector3(...b.position) })),
    [buildings]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && near) {
        setSelectedSection(near);
      }
      if (e.key === "Escape") setSelectedSection(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [near]);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleClose = () => setSelectedSection(null);

  return (
    <div className="city3d-container">
      {onToggle3D && (
        <button
          className="city3d-back-to-2d"
          onClick={onToggle3D}
          title="Switch to 2D Portfolio"
        >
          <span className="back-icon">🌍</span>
          <span className="back-text">Back to 2D</span>
        </button>
      )}
      <Canvas shadows camera={{ position: [0, 15, 30], fov: 60 }}>
        <color attach="background" args={["#0b1022"]} />
        <Suspense fallback={null}>
          <Lights />
          <Environment preset="city" /> {/* Environment map for car reflections */}
          <Ground />
          <RoadGrid />
          <CityLayout buildings={buildings} />
          <City3DCar ref={carRef} />
          <ProximityDetector carRef={carRef} targets={targets} onNearChange={setNear} radius={15} />
          {!selectedSection && (
            <CarHint 
              carRef={carRef} 
              message={near ? `Press Enter to open ${near}` : "Drive to a building"} 
            />
          )}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={5}
            maxDistance={100}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>

      <Portfolio3DContent selectedSection={selectedSection} onClose={handleClose} />

      {/* Mobile Touch Controls */}
      {isTouchDevice && !selectedSection && (
        <div className="city3d-touch-controls">
          <div className="touch-controls-wrapper">
            <div className="touch-controls-left">
              <button
                className="touch-control-btn touch-up"
                onTouchStart={(e) => {
                  e.preventDefault();
                  controls.current.forward = true;
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  controls.current.forward = false;
                }}
                onMouseDown={() => controls.current.forward = true}
                onMouseUp={() => controls.current.forward = false}
                onMouseLeave={() => controls.current.forward = false}
              >
                ↑
              </button>
              <div className="touch-controls-horizontal">
                <button
                  className="touch-control-btn touch-left"
                  onTouchStart={(e) => {
                    e.preventDefault();
                    controls.current.left = true;
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    controls.current.left = false;
                  }}
                  onMouseDown={() => controls.current.left = true}
                  onMouseUp={() => controls.current.left = false}
                  onMouseLeave={() => controls.current.left = false}
                >
                  ←
                </button>
                <button
                  className="touch-control-btn touch-down"
                  onTouchStart={(e) => {
                    e.preventDefault();
                    controls.current.back = true;
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    controls.current.back = false;
                  }}
                  onMouseDown={() => controls.current.back = true}
                  onMouseUp={() => controls.current.back = false}
                  onMouseLeave={() => controls.current.back = false}
                >
                  ↓
                </button>
                <button
                  className="touch-control-btn touch-right"
                  onTouchStart={(e) => {
                    e.preventDefault();
                    controls.current.right = true;
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    controls.current.right = false;
                  }}
                  onMouseDown={() => controls.current.right = true}
                  onMouseUp={() => controls.current.right = false}
                  onMouseLeave={() => controls.current.right = false}
                >
                  →
                </button>
              </div>
            </div>
            <div className="touch-controls-right">
              <button
                className="touch-control-btn touch-interact"
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (near) {
                    setSelectedSection(near);
                  }
                }}
                title={near ? `Open ${near}` : "Drive to a building"}
              >
                {near ? `Open ${near}` : "Interact"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default City3D;


