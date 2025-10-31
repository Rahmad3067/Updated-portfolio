import * as THREE from "three";

// Create procedural textures
export function createAsphaltTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  // Base gray
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(0, 0, 512, 512);
  
  // Add noise/grain
  for (let i = 0; i < 10000; i++) {
    ctx.fillStyle = `rgba(${40 + Math.random() * 20}, ${40 + Math.random() * 20}, ${40 + Math.random() * 20}, 0.3)`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}

export function createRoadMarkingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  
  // Black background
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, 256, 256);
  
  // Yellow center lines
  ctx.fillStyle = "#ffff00";
  for (let y = 0; y < 256; y += 20) {
    ctx.fillRect(118, y, 20, 10);
  }
  
  // White edge lines
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(10, 0, 5, 256);
  ctx.fillRect(241, 0, 5, 256);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 20);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}

export function createBrickTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  // Base brick color
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(0, 0, 512, 512);
  
  // Draw bricks
  const brickWidth = 64;
  const brickHeight = 32;
  const mortar = 4;
  
  for (let y = 0; y < 512; y += brickHeight + mortar) {
    const offset = (y / (brickHeight + mortar)) % 2 === 0 ? 0 : brickWidth / 2;
    for (let x = -offset; x < 512; x += brickWidth + mortar) {
      // Brick
      ctx.fillStyle = `rgb(${120 + Math.random() * 30}, ${60 + Math.random() * 20}, ${15 + Math.random() * 10})`;
      ctx.fillRect(x, y, brickWidth, brickHeight);
      
      // Mortar
      ctx.fillStyle = "#555555";
      ctx.fillRect(x, y, brickWidth + mortar, mortar);
      ctx.fillRect(x, y, mortar, brickHeight + mortar);
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createConcreteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  // Base concrete color - darker gray for visibility
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(0, 0, 512, 512);
  
  // Add visible concrete panel pattern with strong contrast
  // Horizontal panel lines (very visible)
  for (let y = 0; y < 512; y += 64) {
    ctx.fillStyle = "#444444";  // Much darker lines
    ctx.fillRect(0, y, 512, 4);  // Thicker lines
    ctx.fillStyle = "#707070";   // Lighter highlight
    ctx.fillRect(0, y + 4, 512, 2);
  }
  
  // Vertical panel lines (very visible)
  for (let x = 0; x < 512; x += 64) {
    ctx.fillStyle = "#444444";  // Much darker lines
    ctx.fillRect(x, 0, 4, 512);  // Thicker lines
    ctx.fillStyle = "#707070";   // Lighter highlight
    ctx.fillRect(x + 4, 0, 2, 512);
  }
  
  // Add concrete grain with high contrast for texture
  for (let i = 0; i < 20000; i++) {
    const variation = Math.random() > 0.5 ? 1 : -1;
    const gray = 70 + variation * (25 + Math.random() * 35);
    ctx.fillStyle = `rgba(${Math.max(40, Math.min(150, gray))}, ${Math.max(40, Math.min(150, gray))}, ${Math.max(40, Math.min(150, gray))}, 0.9)`;
    const size = Math.random() > 0.7 ? 2 : 1;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, size, size);
  }
  
  // Add darker patches for concrete variation (more visible)
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = 15 + Math.random() * 25;
    ctx.fillStyle = `rgba(60, 60, 60, 0.7)`;
    ctx.fillRect(x, y, size, size);
  }
  
  // Add lighter patches for contrast
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = 10 + Math.random() * 15;
    ctx.fillStyle = `rgba(120, 120, 120, 0.6)`;
    ctx.fillRect(x, y, size, size);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}

export function createGrassTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  // Base grass color
  ctx.fillStyle = "#2d5016";
  ctx.fillRect(0, 0, 512, 512);
  
  // Add grass variation
  for (let i = 0; i < 5000; i++) {
    const green = 30 + Math.random() * 50;
    ctx.fillStyle = `rgba(${green * 0.5}, ${green}, ${green * 0.3}, 0.6)`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(20, 20);
  return texture;
}

export function createCarPaintTexture(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  
  // Parse the color to RGB values
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Base paint color - smooth metallic base
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 512);
  
  // Add metallic flake effect (for metallic paint)
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = 0.5 + Math.random() * 1.5;
    const brightness = 0.8 + Math.random() * 0.2;
    ctx.fillStyle = `rgba(${Math.min(255, r * brightness)}, ${Math.min(255, g * brightness)}, ${Math.min(255, b * brightness)}, 0.6)`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add subtle reflection gradients for metallic look
  // Top-left bright reflection
  const gradient1 = ctx.createRadialGradient(128, 128, 0, 256, 256, 300);
  gradient1.addColorStop(0, "rgba(255, 255, 255, 0.15)");
  gradient1.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
  gradient1.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient1;
  ctx.fillRect(0, 0, 512, 512);
  
  // Bottom-right shadow/depth
  const gradient2 = ctx.createRadialGradient(384, 384, 0, 512, 512, 400);
  gradient2.addColorStop(0, "rgba(0, 0, 0, 0.1)");
  gradient2.addColorStop(0.5, "rgba(0, 0, 0, 0.05)");
  gradient2.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, 512, 512);
  
  // Add smooth finish with slight noise for realism
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const noise = Math.random() * 0.02 - 0.01;
    const currentR = Math.max(0, Math.min(255, r + noise * 255));
    const currentG = Math.max(0, Math.min(255, g + noise * 255));
    const currentB = Math.max(0, Math.min(255, b + noise * 255));
    ctx.fillStyle = `rgba(${currentR}, ${currentG}, ${currentB}, 0.3)`;
    ctx.fillRect(x, y, 1, 1);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}

