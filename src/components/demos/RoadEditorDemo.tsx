import React, { useEffect, useRef, useState } from "react";
import "./RoadEditorDemo.css";

interface WarehouseItem {
  id: string;
  type: "storage" | "pallet" | "robot" | "path";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  layer: string;
}

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  active: boolean;
}

const RoadEditorDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<WarehouseItem[]>([]);
  const [selectedTool, setSelectedTool] = useState<
    "move" | "storage" | "pallet" | "robot" | "path"
  >("move");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [layers, setLayers] = useState<Layer[]>([
    { id: "layer1", name: "Layer 1", visible: true, active: true },
    { id: "layer2", name: "Layer 2", visible: true, active: false },
  ]);
  const [currentCoords, setCurrentCoords] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [drawingPreview, setDrawingPreview] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    const gridSize = 20;
    const startX = Math.floor(-pan.x / zoom / gridSize) * gridSize;
    const startY = Math.floor(-pan.y / zoom / gridSize) * gridSize;
    const endX = Math.ceil((canvas.width - pan.x) / zoom / gridSize) * gridSize;
    const endY =
      Math.ceil((canvas.height - pan.y) / zoom / gridSize) * gridSize;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    // Draw axis labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";

    // X-axis labels
    for (let x = startX; x <= endX; x += gridSize * 2) {
      ctx.fillText((x / gridSize).toString(), x, startY - 5);
    }

    // Y-axis labels
    for (let y = startY; y <= endY; y += gridSize * 2) {
      ctx.save();
      ctx.translate(startX - 15, y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText((y / gridSize).toString(), 0, 0);
      ctx.restore();
    }
  };

  const drawItem = (ctx: CanvasRenderingContext2D, item: WarehouseItem) => {
    ctx.save();

    switch (item.type) {
      case "storage":
        drawStorageZone(ctx, item);
        break;
      case "pallet":
        drawPalletZone(ctx, item);
        break;
      case "robot":
        drawWarehouseRobot(ctx, item);
        break;
      case "path":
        drawRobotPath(ctx, item);
        break;
    }

    ctx.restore();
  };

  const drawStorageZone = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Storage rack structure
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Rack shelves
    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 2;
    for (let i = 1; i < 4; i++) {
      const shelfY = item.y + (item.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(item.x, shelfY);
      ctx.lineTo(item.x + item.width, shelfY);
      ctx.stroke();
    }

    // Vertical supports
    for (let i = 1; i < 3; i++) {
      const supportX = item.x + (item.width / 3) * i;
      ctx.beginPath();
      ctx.moveTo(supportX, item.y);
      ctx.lineTo(supportX, item.y + item.height);
      ctx.stroke();
    }

    // Label
    ctx.fillStyle = "#fff";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Storage", item.x + item.width / 2, item.y + item.height / 2);
  };

  const drawPalletZone = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Pallet base
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Pallet slats
    ctx.strokeStyle = "#E65100";
    ctx.lineWidth = 2;
    for (let i = 1; i < 4; i++) {
      const slatY = item.y + (item.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(item.x + 5, slatY);
      ctx.lineTo(item.x + item.width - 5, slatY);
      ctx.stroke();
    }

    // Label
    ctx.fillStyle = "#fff";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Pallet", item.x + item.width / 2, item.y + item.height / 2);
  };

  const drawWarehouseRobot = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;

    // Robot body
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Robot details
    ctx.fillStyle = "#1976D2";
    ctx.fillRect(item.x + 5, item.y + 5, item.width - 10, item.height - 10);

    // Wheels
    ctx.fillStyle = "#424242";
    ctx.beginPath();
    ctx.arc(item.x + 5, item.y + item.height - 5, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      item.x + item.width - 5,
      item.y + item.height - 5,
      3,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Label
    ctx.fillStyle = "#fff";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Robot", centerX, centerY);
  };

  const drawRobotPath = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(item.x, item.y);
    ctx.lineTo(item.x + item.width, item.y + item.height);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawSelectionHighlight = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(item.x - 2, item.y - 2, item.width + 4, item.height + 4);
    ctx.setLineDash([]);
  };

  const drawDrawingPreview = (
    ctx: CanvasRenderingContext2D,
    preview: { x: number; y: number; width: number; height: number }
  ) => {
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(preview.x, preview.y, preview.width, preview.height);
    ctx.setLineDash([]);
  };

  // Helper function to convert screen coordinates to canvas coordinates
  const screenToCanvas = (clientX: number, clientY: number): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    return { x: canvasX, y: canvasY };
  };

  // Helper function to convert canvas coordinates to world coordinates
  const canvasToWorld = (canvasX: number, canvasY: number): { x: number; y: number } => {
    return {
      x: (canvasX - pan.x) / zoom,
      y: (canvasY - pan.y) / zoom,
    };
  };

  const getItemAtPoint = (clientX: number, clientY: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const { x: canvasX, y: canvasY } = screenToCanvas(clientX, clientY);
    const { x: worldX, y: worldY } = canvasToWorld(canvasX, canvasY);

    // Check items in reverse order (top to bottom)
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (
        worldX >= item.x &&
        worldX <= item.x + item.width &&
        worldY >= item.y &&
        worldY <= item.y + item.height
      ) {
        return item.id;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === "move") {
      const itemId = getItemAtPoint(e.clientX, e.clientY);
      if (itemId) {
        setDraggedItem(itemId);
        const item = items.find((i) => i.id === itemId);
        if (item) {
          // Get canvas coordinates for the drag offset calculation
          const { x: canvasX, y: canvasY } = screenToCanvas(e.clientX, e.clientY);
          setDragOffset({
            x: canvasX - (item.x * zoom + pan.x),
            y: canvasY - (item.y * zoom + pan.y),
          });
        }
        setSelectedItem(itemId);
      } else {
        setSelectedItem(null);
      }
    } else {
      setIsDrawing(true);
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert screen coordinates to canvas coordinates
    const { x: canvasX, y: canvasY } = screenToCanvas(e.clientX, e.clientY);

    // Update coordinates display
    const { x: worldX, y: worldY } = canvasToWorld(canvasX, canvasY);
    setCurrentCoords({ x: worldX, y: worldY });

    if (draggedItem) {
      const item = items.find((i) => i.id === draggedItem);
      if (item) {
        const newX = (canvasX - dragOffset.x - pan.x) / zoom;
        const newY = (canvasY - dragOffset.y - pan.y) / zoom;

        setItems((prev) =>
          prev.map((i) =>
            i.id === draggedItem ? { ...i, x: newX, y: newY } : i
          )
        );
      }
    }

    // Update drawing preview
    if (isDrawing && selectedTool !== "move") {
      const { x: canvasStartX, y: canvasStartY } = screenToCanvas(startPos.x, startPos.y);
      const worldStartX = (canvasStartX - pan.x) / zoom;
      const worldStartY = (canvasStartY - pan.y) / zoom;
      const worldEndX = (canvasX - pan.x) / zoom;
      const worldEndY = (canvasY - pan.y) / zoom;

      const previewX = Math.min(worldStartX, worldEndX);
      const previewY = Math.min(worldStartY, worldEndY);
      const previewWidth = Math.abs(worldEndX - worldStartX);
      const previewHeight = Math.abs(worldEndY - worldStartY);

      setDrawingPreview({
        x: previewX,
        y: previewY,
        width: previewWidth,
        height: previewHeight,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && selectedTool !== "move") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Convert screen coordinates to canvas coordinates
      const { x: canvasEndX, y: canvasEndY } = screenToCanvas(e.clientX, e.clientY);
      const { x: canvasStartX, y: canvasStartY } = screenToCanvas(startPos.x, startPos.y);

      // Convert canvas coordinates to world coordinates
      const worldStartX = (canvasStartX - pan.x) / zoom;
      const worldStartY = (canvasStartY - pan.y) / zoom;
      const worldEndX = (canvasEndX - pan.x) / zoom;
      const worldEndY = (canvasEndY - pan.y) / zoom;

      // Calculate proper dimensions
      const itemX = Math.min(worldStartX, worldEndX);
      const itemY = Math.min(worldStartY, worldEndY);
      const itemWidth = Math.abs(worldEndX - worldStartX);
      const itemHeight = Math.abs(worldEndY - worldStartY);

      // Only create item if it has minimum size
      if (itemWidth > 5 && itemHeight > 5) {
        const newItem: WarehouseItem = {
          id: Date.now().toString(),
          type: selectedTool as "storage" | "pallet" | "robot" | "path",
          x: itemX,
          y: itemY,
          width: itemWidth,
          height: itemHeight,
          color:
            selectedTool === "storage"
              ? "#4CAF50"
              : selectedTool === "pallet"
              ? "#FF9800"
              : selectedTool === "robot"
              ? "#2196F3"
              : "#9C27B0",
          layer: layers.find((l) => l.active)?.id || "layer1",
        };

        setItems((prev) => [...prev, newItem]);
      }
    }

    setIsDrawing(false);
    setDraggedItem(null);
    setDrawingPreview(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(3, zoom * delta));

    // Zoom towards mouse position
    const canvas = canvasRef.current;
    if (canvas) {
      // Convert screen coordinates to canvas coordinates
      const { x: canvasX, y: canvasY } = screenToCanvas(e.clientX, e.clientY);

      const worldX = (canvasX - pan.x) / zoom;
      const worldY = (canvasY - pan.y) / zoom;

      const newPanX = canvasX - worldX * newZoom;
      const newPanY = canvasY - worldY * newZoom;

      setPan({ x: newPanX, y: newPanY });
    }

    setZoom(newZoom);
  };

  useEffect(() => {
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply transformations
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // Draw grid
      drawGrid(ctx, canvas);

      // Draw items
      items.forEach((item) => {
        const layer = layers.find((l) => l.id === item.layer);
        if (layer && layer.visible) {
          drawItem(ctx, item);
        }
      });

      // Draw selection highlight
      if (selectedItem) {
        const item = items.find((i) => i.id === selectedItem);
        if (item) {
          drawSelectionHighlight(ctx, item);
        }
      }

      // Draw drawing preview
      if (drawingPreview && isDrawing) {
        drawDrawingPreview(ctx, drawingPreview);
      }

      ctx.restore();
    };
    
    drawCanvas();
  }, [items, zoom, pan, selectedItem, layers, drawingPreview, isDrawing]);

  return (
    <div className="road-editor-demo">
      {/* Top Navigation Bar */}
      <div className="editor-header">
        <div className="header-left">
          <div className="project-info">
            <span className="project-icon">📁</span>
            <span className="project-name">No Project / Draft Mode</span>
          </div>
        </div>
        <div className="header-center">
          <div className="logo">BALYO</div>
        </div>
        <div className="header-right">
          <button className="header-btn share-btn">Share</button>
          <div className="header-icons">
            <span className="icon">✏️</span>
            <span className="icon">📋</span>
            <span className="icon">📤</span>
            <span className="icon">📋</span>
            <span className="icon">⚙️</span>
            <span className="icon">▼</span>
          </div>
          <span className="logout">Logout</span>
          <button className="render-btn">Render2</button>
        </div>
      </div>

      <div className="editor-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="tools-section">
            <div className="section-title">Tools</div>
            <div className="tool-buttons">
              <button
                className={`tool-btn ${
                  selectedTool === "move" ? "active" : ""
                }`}
                onClick={() => setSelectedTool("move")}
                title="Move Tool"
              >
                ✋
              </button>
              <button
                className={`tool-btn ${
                  selectedTool === "storage" ? "active" : ""
                }`}
                onClick={() => setSelectedTool("storage")}
                title="Storage Zone"
              >
                📦
              </button>
              <button
                className={`tool-btn ${
                  selectedTool === "pallet" ? "active" : ""
                }`}
                onClick={() => setSelectedTool("pallet")}
                title="Pallet Zone"
              >
                🏷️
              </button>
              <button
                className={`tool-btn ${
                  selectedTool === "robot" ? "active" : ""
                }`}
                onClick={() => setSelectedTool("robot")}
                title="Robot"
              >
                🤖
              </button>
              <button
                className={`tool-btn ${
                  selectedTool === "path" ? "active" : ""
                }`}
                onClick={() => setSelectedTool("path")}
                title="Robot Path"
              >
                🛤️
              </button>
            </div>
          </div>

          <div className="zoom-section">
            <div className="section-title">Zoom</div>
            <div className="zoom-controls">
              <button
                className="zoom-btn"
                onClick={() => setZoom((prev) => Math.min(3, prev * 1.2))}
                title="Zoom In"
              >
                🔍+
              </button>
              <span className="zoom-level">{Math.round(zoom * 100)}%</span>
              <button
                className="zoom-btn"
                onClick={() => setZoom((prev) => Math.max(0.1, prev * 0.8))}
                title="Zoom Out"
              >
                🔍-
              </button>
              <button
                className="zoom-btn"
                onClick={() => setZoom(1)}
                title="Reset Zoom"
              >
                🎯
              </button>
            </div>
            <div className="pan-controls">
              <button
                className="pan-btn"
                onClick={() =>
                  setPan((prev) => ({ x: prev.x + 50, y: prev.y }))
                }
                title="Pan Right"
              >
                →
              </button>
              <button
                className="pan-btn"
                onClick={() =>
                  setPan((prev) => ({ x: prev.x - 50, y: prev.y }))
                }
                title="Pan Left"
              >
                ←
              </button>
              <button
                className="pan-btn"
                onClick={() =>
                  setPan((prev) => ({ x: prev.x, y: prev.y + 50 }))
                }
                title="Pan Down"
              >
                ↓
              </button>
              <button
                className="pan-btn"
                onClick={() =>
                  setPan((prev) => ({ x: prev.x, y: prev.y - 50 }))
                }
                title="Pan Up"
              >
                ↑
              </button>
              <button
                className="pan-btn"
                onClick={() => setPan({ x: 0, y: 0 })}
                title="Reset Pan"
              >
                🎯
              </button>
            </div>
          </div>

          <div className="layers-section">
            <div className="section-title">
              <span>Layers</span>
              <span className="layer-icon">💎</span>
              <span className="filter-icon">🔍</span>
              <span className="dropdown">▼</span>
            </div>
            <div className="layers-list">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className={`layer-item ${layer.active ? "active" : ""}`}
                >
                  <span className="layer-visibility">👁️</span>
                  <span className="layer-name">{layer.name}</span>
                  {layer.active && <div className="active-indicator"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            className="editor-canvas"
          />

          {/* Bottom Info Bar */}
          <div className="canvas-info">
            <div className="info-left">
              <div className="shortcuts">
                <div>(Hover) [F] / [B] Bring to front / to back</div>
                <div>[Ctrl] + Click Select multiple shapes</div>
                <div>[Alt] + Click Select nearest segment</div>
                <div>[Space] Previous Tool : Move</div>
                <div>(Hover) [L] / [U] Lock / Unlock shape</div>
              </div>
            </div>
            <div className="info-right">
              <div className="coordinates">
                <div>Current shape: {selectedItem || "--------"}</div>
                <div>X: {currentCoords.x.toFixed(2)} m</div>
                <div>Y: {currentCoords.y.toFixed(2)} m</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="demo-instructions">
        <h4>🎮 Road Editor Demo Instructions:</h4>
        <ul>
          <li>
            <strong>Select Tools:</strong> Click on tool buttons in the left
            sidebar
          </li>
          <li>
            <strong>Draw Elements:</strong> Click and drag on the canvas to
            create warehouse elements
          </li>
          <li>
            <strong>Move Elements:</strong> Use the Move tool (hand icon) to
            drag existing elements
          </li>
          <li>
            <strong>Zoom:</strong> Use mouse wheel to zoom in/out
          </li>
          <li>
            <strong>Pan:</strong> Right-click and drag to pan around the canvas
          </li>
          <li>
            <strong>Layers:</strong> Toggle layer visibility and switch between
            layers
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RoadEditorDemo;
