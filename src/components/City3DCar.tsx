import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { createCarPaintTexture } from "./City3DTextures";
import { useCarControls } from "../contexts/CarControlsContext";

function useKeyboard(controls: React.MutableRefObject<{ forward: boolean; back: boolean; left: boolean; right: boolean }>) {
  const keys = useRef({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, w: false, a: false, s: false, d: false });
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key in keys.current) {
        (keys.current as any)[e.key] = true;
        // Update shared controls
        if (e.key === "ArrowUp" || e.key === "w") controls.current.forward = true;
        if (e.key === "ArrowDown" || e.key === "s") controls.current.back = true;
        if (e.key === "ArrowLeft" || e.key === "a") controls.current.left = true;
        if (e.key === "ArrowRight" || e.key === "d") controls.current.right = true;
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key in keys.current) {
        (keys.current as any)[e.key] = false;
        // Update shared controls
        if (e.key === "ArrowUp" || e.key === "w") controls.current.forward = false;
        if (e.key === "ArrowDown" || e.key === "s") controls.current.back = false;
        if (e.key === "ArrowLeft" || e.key === "a") controls.current.left = false;
        if (e.key === "ArrowRight" || e.key === "d") controls.current.right = false;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [controls]);
  return keys;
}

const City3DCar = forwardRef<THREE.Object3D, {}>(function City3DCar(_, ref) {
  const groupRef = useRef<THREE.Group | null>(null);
  const controls = useCarControls();
  const keys = useKeyboard(controls);
  const zoomDistanceRef = useRef(14); // Default zoom distance

  // Handle mouse wheel zoom
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 1.5;
      const minDistance = 5;
      const maxDistance = 50;
      
      if (e.deltaY > 0) {
        // Zoom out
        zoomDistanceRef.current = Math.min(maxDistance, zoomDistanceRef.current + zoomSpeed);
      } else {
        // Zoom in
        zoomDistanceRef.current = Math.max(minDistance, zoomDistanceRef.current - zoomSpeed);
      }
    };
    
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useFrame(({ camera }, dt) => {
    const car = groupRef.current;
    if (!car) return;

    // Basic kinematic car movement
    const accel = 40; // 2x faster acceleration
    const maxSpeed = 50; // 2x faster max speed
    const turnSpeed = 2.5;

    // Store velocity in userData
    if (!car.userData.vel) car.userData.vel = new THREE.Vector3();
    const vel: THREE.Vector3 = car.userData.vel;

    // Use shared controls (keyboard + touch)
    const forward = keys.current.ArrowUp || keys.current.w || controls.current.forward;
    const back = keys.current.ArrowDown || keys.current.s || controls.current.back;
    const left = keys.current.ArrowLeft || keys.current.a || controls.current.left;
    const right = keys.current.ArrowRight || keys.current.d || controls.current.right;

    // accelerate / brake
    if (forward) vel.z -= accel * dt;
    if (back) vel.z += accel * dt;
    vel.z = THREE.MathUtils.clamp(vel.z, -maxSpeed, maxSpeed);
    // damping
    vel.z *= 0.98;

    // rotate when moving
    if (Math.abs(vel.z) > 0.5) {
      const dir = vel.z < 0 ? 1 : -1; // invert when reversing
      if (left) car.rotation.y += turnSpeed * dt * dir;
      if (right) car.rotation.y -= turnSpeed * dt * dir;
    }

    // apply translation along local forward
    const forwardVec = new THREE.Vector3(0, 0, 1).applyEuler(car.rotation);
    car.position.addScaledVector(forwardVec, vel.z * dt);

    // keep car within bounds
    car.position.x = THREE.MathUtils.clamp(car.position.x, -95, 95);
    car.position.z = THREE.MathUtils.clamp(car.position.z, -95, 95);

    // chase camera with zoom support (mouse wheel controls zoom)
    const idealOffset = new THREE.Vector3(0, 8, zoomDistanceRef.current)
      .applyEuler(car.rotation)
      .add(car.position);
    const idealLookAt = new THREE.Vector3(0, 2, 0).applyEuler(car.rotation).add(car.position);
    camera.position.lerp(idealOffset, 0.1);
    camera.lookAt(idealLookAt);
  });

  const setRefs = React.useCallback(
    (node: THREE.Group | null) => {
      (groupRef as React.MutableRefObject<THREE.Group | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<THREE.Object3D | null>).current = node;
      }
    },
    [ref]
  );

  const carPaintTexture = useMemo(() => createCarPaintTexture("#3b82f6"), []);
  const wheelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    // Tire rubber texture
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 128, 128);
    // Add tire pattern
    for (let i = 0; i < 128; i += 4) {
      ctx.fillStyle = i % 8 === 0 ? "#1a1a1a" : "#0a0a0a";
      ctx.fillRect(0, i, 128, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);
  
  const windowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    // Dark window with slight reflection
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, 128, 128);
    const gradient = ctx.createLinearGradient(0, 0, 128, 128);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group ref={setRefs} position={[0, 1, 0]}>
      {/* Body with paint texture */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1, 4]} />
        <meshStandardMaterial 
          map={carPaintTexture} 
          roughness={0.1} 
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Cabin with windows */}
      <mesh position={[0, 0.8, -0.3]} castShadow>
        <boxGeometry args={[1.8, 0.8, 1.8]} />
        <meshStandardMaterial 
          map={carPaintTexture} 
          roughness={0.1} 
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.8, -1.8]} castShadow>
        <boxGeometry args={[1.7, 0.7, 0.1]} />
        <meshStandardMaterial 
          map={windowTexture} 
          transparent 
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Wheels with tire texture */}
      <mesh position={[1.2, -0.3, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial 
          map={wheelTexture} 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-1.2, -0.3, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial 
          map={wheelTexture} 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      <mesh position={[1.2, -0.3, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial 
          map={wheelTexture} 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      <mesh position={[-1.2, -0.3, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial 
          map={wheelTexture} 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      {/* Rim/center caps */}
      <mesh position={[1.2, -0.3, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-1.2, -0.3, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[1.2, -0.3, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-1.2, -0.3, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
});

export default City3DCar;


