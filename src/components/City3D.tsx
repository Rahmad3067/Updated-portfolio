import { Canvas, useFrame } from "@react-three/fiber";
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
  const grassTexture = useMemo(() => createGrassTexture(), []);
  const [groundTexture, setGroundTexture] = useState<THREE.Texture | null>(null);
  
  // Load custom texture
  // UPDATE THIS: Change the path to match your texture file
  // If file is in src/components/texture/, use: process.env.PUBLIC_URL + "/../src/components/texture/yourfile.jpg"
  // If file is in public folder, use: "/yourfile.jpg" or "/textures/yourfile.jpg"
  const texturePath = "/textures/ground.jpg"; // ← UPDATE THIS to match your file location and name!
  
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      texturePath,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20); // Adjust repeat: lower = larger tiles, higher = smaller tiles
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = 4;
        setGroundTexture(texture);
        console.log("Ground texture loaded successfully from:", texturePath);
      },
      undefined,
      (error) => {
        console.warn("Could not load ground texture from:", texturePath);
        console.warn("Error:", error);
        console.warn("Make sure your texture file is in the public folder.");
        console.warn("Using procedural grass texture as fallback.");
      }
    );
  }, [texturePath]);
  
  const finalTexture = groundTexture || grassTexture;
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200, 10, 10]} />
      <meshStandardMaterial 
        map={finalTexture} 
        roughness={0.8} 
        metalness={0.1}
      />
    </mesh>
  );
}

function RoadGrid() {
  const asphaltTexture = useMemo(() => createAsphaltTexture(), []);
  const roadMarkingTexture = useMemo(() => createRoadMarkingTexture(), []);
  
  const roads: JSX.Element[] = [];
  const roadWidth = 16;
  const roadHeight = 0.02;
  const markingHeight = 0.025; // Increased gap to prevent z-fighting
  
  // Vertical roads
  for (let i = -80; i <= 80; i += 20) {
    // Main road surface
    roads.push(
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[i, roadHeight, 0]} key={`v-road-${i}`}>
        <planeGeometry args={[roadWidth, 200]} />
        <meshStandardMaterial map={asphaltTexture} roughness={0.9} metalness={0.1} depthWrite={true} />
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
        <meshStandardMaterial map={asphaltTexture} roughness={0.9} metalness={0.1} depthWrite={true} />
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

// GLTF Model Building Component
function GLTFBuilding({ def }: { def: BuildingDef }) {
  const { scene } = useGLTF(def.modelUrl!);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  return (
    <group position={def.position}>
      <primitive 
        object={clonedScene} 
        scale={def.scale || 1} 
        castShadow 
        receiveShadow 
      />
      <Billboard follow>
        <Text 
          position={[0, 15, 0]} 
          fontSize={2.5} 
          color="#ffffff" 
          anchorX="center" 
          anchorY="bottom"
          outlineWidth={0.15}
          outlineColor="#000000"
          strokeWidth={0.05}
          strokeColor="#000000"
        >
          {def.name}
        </Text>
      </Billboard>
    </group>
  );
}

// Procedural Building Component (fallback)
function ProceduralBuilding({ def }: { def: BuildingDef }) {
  const brickTexture = useMemo(() => createBrickTexture(), []);
  const concreteTexture = useMemo(() => createConcreteTexture(), []);
  
  // Use brick for most buildings, concrete for some
  const useBrick = ["about", "experience", "skills"].includes(def.id);
  const wallTexture = useBrick ? brickTexture : concreteTexture;
  
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
    <group position={def.position}>
      {/* Main building body with texture */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[8, 12, 8]} />
        <meshStandardMaterial map={wallTexture} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Windows on front face */}
      <mesh position={[0, 2, 4.01]} castShadow>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial map={windowMaterial} emissive="#000022" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Windows on side faces */}
      <mesh position={[4.01, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial map={windowMaterial} emissive="#000022" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-4.01, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <planeGeometry args={[7, 10]} />
        <meshStandardMaterial map={windowMaterial} emissive="#000022" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 6.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[12, 1, 12]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.9} metalness={0.2} />
      </mesh>
      
      <Billboard follow>
        <Text 
          position={[0, 8, 0]} 
          fontSize={2.5} 
          color="#ffffff" 
          anchorX="center" 
          anchorY="bottom"
          outlineWidth={0.15}
          outlineColor="#000000"
          strokeWidth={0.05}
          strokeColor="#000000"
        >
          {def.name}
        </Text>
      </Billboard>
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

const City3D: React.FC<{ onSectionSelect: (id: string) => void }> = ({ onSectionSelect }) => {
  const [selectedSection, setSelectedSection] = useState<SectionId | null>(null);
  const [near, setNear] = useState<SectionId | null>(null);
  const carRef = useRef<THREE.Object3D>(null);

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

  const handleClose = () => setSelectedSection(null);

  return (
    <div className="city3d-container">
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
          <Html position={[0, 10, 0]} center style={{ pointerEvents: "none" }}>
            <div className="city3d-hint">{near ? `Press Enter to open ${near}` : "Drive to a building"}</div>
          </Html>
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            enableRotate={false}
          />
        </Suspense>
      </Canvas>

      <Portfolio3DContent selectedSection={selectedSection} onClose={handleClose} />
    </div>
  );
};

export default City3D;


