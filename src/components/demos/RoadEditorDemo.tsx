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
}

const RoadEditorDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<WarehouseItem[]>([
    {
      id: "1",
      type: "storage",
      x: 50,
      y: 50,
      width: 100,
      height: 60,
      color: "#4CAF50",
    },
    {
      id: "2",
      type: "pallet",
      x: 200,
      y: 80,
      width: 80,
      height: 40,
      color: "#FF9800",
    },
    {
      id: "3",
      type: "robot",
      x: 300,
      y: 100,
      width: 30,
      height: 30,
      color: "#2196F3",
    },
  ]);
  const [selectedTool, setSelectedTool] = useState<
    "storage" | "pallet" | "robot" | "path"
  >("storage");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and pan transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw grid
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1 / zoom;
    const gridSize = 20;
    for (let i = 0; i < canvas.width / zoom; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height / zoom);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height / zoom; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width / zoom, i);
      ctx.stroke();
    }

    // Draw items with detailed shapes
    items.forEach((item) => {
      drawDetailedItem(ctx, item);
    });

    ctx.restore();
  };

  const drawDetailedItem = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;

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
  };

  const drawStorageZone = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Draw storage rack structure
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Draw rack shelves
    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 2;
    const shelfCount = Math.floor(item.height / 20);
    for (let i = 1; i < shelfCount; i++) {
      const shelfY = item.y + (item.height / shelfCount) * i;
      ctx.beginPath();
      ctx.moveTo(item.x, shelfY);
      ctx.lineTo(item.x + item.width, shelfY);
      ctx.stroke();
    }

    // Draw vertical supports
    const supportCount = Math.floor(item.width / 30);
    for (let i = 1; i < supportCount; i++) {
      const supportX = item.x + (item.width / supportCount) * i;
      ctx.beginPath();
      ctx.moveTo(supportX, item.y);
      ctx.lineTo(supportX, item.y + item.height);
      ctx.stroke();
    }

    // Draw label
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "STORAGE",
      item.x + item.width / 2,
      item.y + item.height / 2 + 3
    );
  };

  const drawPalletZone = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Draw pallet zone background
    ctx.fillStyle = item.color;
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Draw pallets
    const palletWidth = 20;
    const palletHeight = 15;
    const palletsPerRow = Math.floor(item.width / (palletWidth + 5));
    const palletRows = Math.floor(item.height / (palletHeight + 5));

    for (let row = 0; row < palletRows; row++) {
      for (let col = 0; col < palletsPerRow; col++) {
        const palletX = item.x + 5 + col * (palletWidth + 5);
        const palletY = item.y + 5 + row * (palletHeight + 5);

        // Draw pallet base
        ctx.fillStyle = "#8D6E63";
        ctx.fillRect(palletX, palletY, palletWidth, palletHeight);

        // Draw pallet slats
        ctx.strokeStyle = "#5D4037";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(palletX, palletY + 3);
        ctx.lineTo(palletX + palletWidth, palletY + 3);
        ctx.moveTo(palletX, palletY + 6);
        ctx.lineTo(palletX + palletWidth, palletY + 6);
        ctx.moveTo(palletX, palletY + 9);
        ctx.lineTo(palletX + palletWidth, palletY + 9);
        ctx.moveTo(palletX, palletY + 12);
        ctx.lineTo(palletX + palletWidth, palletY + 12);
        ctx.stroke();

        // Draw vertical supports
        ctx.beginPath();
        ctx.moveTo(palletX + 2, palletY);
        ctx.lineTo(palletX + 2, palletY + palletHeight);
        ctx.moveTo(palletX + palletWidth - 2, palletY);
        ctx.lineTo(palletX + palletWidth - 2, palletY + palletHeight);
        ctx.stroke();
      }
    }

    // Draw label
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "PALLETS",
      item.x + item.width / 2,
      item.y + item.height / 2 + 3
    );
  };

  const drawWarehouseRobot = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;

    // Draw robot body (rounded rectangle)
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(item.x, item.y, item.width, item.height, 5);
    ctx.fill();

    // Draw robot wheels
    ctx.fillStyle = "#333";
    const wheelRadius = 4;
    ctx.beginPath();
    ctx.arc(item.x + 6, item.y + item.height - 6, wheelRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      item.x + item.width - 6,
      item.y + item.height - 6,
      wheelRadius,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw robot sensors
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(centerX, item.y + 4, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw robot arms/lift mechanism
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 3, item.y + 8);
    ctx.lineTo(centerX - 8, item.y + 3);
    ctx.moveTo(centerX + 3, item.y + 8);
    ctx.lineTo(centerX + 8, item.y + 3);
    ctx.stroke();

    // Draw robot status indicator
    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw label
    ctx.fillStyle = "#fff";
    ctx.font = "bold 8px Arial";
    ctx.textAlign = "center";
    ctx.fillText("ROBOT", centerX, item.y + item.height + 12);
  };

  const drawRobotPath = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Draw path as a curved line
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Create a curved path
    ctx.beginPath();
    ctx.moveTo(item.x, item.y);

    // Add curves based on path dimensions
    const controlX1 = item.x + item.width * 0.3;
    const controlY1 = item.y + item.height * 0.2;
    const controlX2 = item.x + item.width * 0.7;
    const controlY2 = item.y + item.height * 0.8;

    ctx.bezierCurveTo(
      controlX1,
      controlY1,
      controlX2,
      controlY2,
      item.x + item.width,
      item.y + item.height
    );
    ctx.stroke();

    // Draw path direction arrows
    const arrowCount = 3;
    for (let i = 1; i <= arrowCount; i++) {
      const t = i / (arrowCount + 1);
      const arrowX = item.x + item.width * t;
      const arrowY = item.y + item.height * t;

      // Calculate direction
      const nextT = (i + 0.1) / (arrowCount + 1);
      const nextX = item.x + item.width * nextT;
      const nextY = item.y + item.height * nextT;

      const angle = Math.atan2(nextY - arrowY, nextX - arrowX);

      // Draw arrow
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - 6 * Math.cos(angle - 0.5),
        arrowY - 6 * Math.sin(angle - 0.5)
      );
      ctx.lineTo(
        arrowX - 6 * Math.cos(angle + 0.5),
        arrowY - 6 * Math.sin(angle + 0.5)
      );
      ctx.closePath();
      ctx.fill();
    }

    // Draw path label
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PATH", item.x + item.width / 2, item.y + item.height / 2 + 3);
  };

  const getItemAtPoint = (x: number, y: number): string | null => {
    // Convert screen coordinates to canvas coordinates
    const canvasX = (x - pan.x) / zoom;
    const canvasY = (y - pan.y) / zoom;

    // Check items in reverse order (top items first)
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (
        canvasX >= item.x &&
        canvasX <= item.x + item.width &&
        canvasY >= item.y &&
        canvasY <= item.y + item.height
      ) {
        return item.id;
      }
    }
    return null;
  };

  useEffect(() => {
    drawCanvas();
  }, [items]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on an existing item
    const itemId = getItemAtPoint(x, y);
    if (itemId) {
      // Start dragging existing item
      setDraggedItem(itemId);
      const item = items.find((i) => i.id === itemId);
      if (item) {
        const canvasX = (x - pan.x) / zoom;
        const canvasY = (y - pan.y) / zoom;
        setDragOffset({
          x: canvasX - item.x,
          y: canvasY - item.y,
        });
      }
      return;
    }

    // Start drawing new item
    setStartPos({ x, y });
    setIsDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Handle dragging
    if (draggedItem) {
      const canvasX = (x - pan.x) / zoom;
      const canvasY = (y - pan.y) / zoom;

      setItems(
        items.map((item) =>
          item.id === draggedItem
            ? { ...item, x: canvasX - dragOffset.x, y: canvasY - dragOffset.y }
            : item
        )
      );

      setDraggedItem(null);
      return;
    }

    // Handle drawing new item
    if (!isDrawing) return;

    const width = Math.abs(x - startPos.x);
    const height = Math.abs(y - startPos.y);

    if (width > 10 && height > 10) {
      const newItem: WarehouseItem = {
        id: Date.now().toString(),
        type: selectedTool,
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        width,
        height,
        color:
          selectedTool === "storage"
            ? "#4CAF50"
            : selectedTool === "pallet"
            ? "#FF9800"
            : selectedTool === "robot"
            ? "#2196F3"
            : "#9C27B0",
      };

      setItems([...items, newItem]);
    }

    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggedItem) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canvasX = (x - pan.x) / zoom;
    const canvasY = (y - pan.y) / zoom;

    // Update item position in real-time
    setItems(
      items.map((item) =>
        item.id === draggedItem
          ? { ...item, x: canvasX - dragOffset.x, y: canvasY - dragOffset.y }
          : item
      )
    );
  };

  const clearCanvas = () => {
    setItems([]);
  };

  return (
    <div className="road-editor-demo">
      <div className="demo-header">
        <h3>Road Editor - Warehouse Layout Designer</h3>
        <p>
          Design and configure robotic warehouse layouts with storage zones,
          pallet areas, and robot paths.
        </p>
      </div>

      <div className="demo-toolbar">
        <div className="tool-buttons">
          <button
            className={`tool-btn ${selectedTool === "storage" ? "active" : ""}`}
            onClick={() => setSelectedTool("storage")}
          >
            🏪 Storage Zone
          </button>
          <button
            className={`tool-btn ${selectedTool === "pallet" ? "active" : ""}`}
            onClick={() => setSelectedTool("pallet")}
          >
            📦 Pallet Zone
          </button>
          <button
            className={`tool-btn ${selectedTool === "robot" ? "active" : ""}`}
            onClick={() => setSelectedTool("robot")}
          >
            🤖 Robot
          </button>
          <button
            className={`tool-btn ${selectedTool === "path" ? "active" : ""}`}
            onClick={() => setSelectedTool("path")}
          >
            🛤️ Path
          </button>
        </div>
        <div className="zoom-controls">
          <button
            className="zoom-btn"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            title="Zoom Out"
          >
            🔍−
          </button>
          <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button
            className="zoom-btn"
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            title="Zoom In"
          >
            🔍+
          </button>
        </div>
        <button className="clear-btn" onClick={clearCanvas}>
          🗑️ Clear All
        </button>
      </div>

      <div className="demo-canvas-container">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="demo-canvas"
        />
      </div>

      <div className="demo-info">
        <div className="info-item">
          <span className="info-label">Items placed:</span>
          <span className="info-value">{items.length}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Current tool:</span>
          <span className="info-value">{selectedTool}</span>
        </div>
      </div>

      <div className="demo-instructions">
        <h4>Instructions:</h4>
        <ul>
          <li>Select a tool from the toolbar above</li>
          <li>Click and drag on empty space to place new items</li>
          <li>Click and drag existing items to move them around</li>
          <li>Use zoom controls to work with detailed layouts</li>
          <li>
            🏪 <strong>Storage Zones</strong> - Green areas with rack structures
            for inventory storage
          </li>
          <li>
            📦 <strong>Pallet Areas</strong> - Orange zones showing individual
            pallets for loading/unloading
          </li>
          <li>
            🤖 <strong>Robots</strong> - Blue warehouse robots with sensors,
            wheels, and lift mechanisms
          </li>
          <li>
            🛤️ <strong>Paths</strong> - Purple curved routes with direction
            arrows for robot navigation
          </li>
          <li>Use "Clear All" to reset the layout</li>
          <li>
            Design your warehouse layout by placing and arranging items
            strategically
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RoadEditorDemo;
