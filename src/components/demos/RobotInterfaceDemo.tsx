import React, { useEffect, useRef, useState } from "react";
import "./RobotInterfaceDemo.css";

interface Robot {
  id: string;
  name: string;
  status: "active" | "charging" | "maintenance" | "idle";
  battery: number;
  location: string;
  mission: string;
  speed: number;
  model: string;
  lastMaintenance: string;
  totalTasks: number;
}

interface Battery {
  id: string;
  robotId: string;
  robotName: string;
  capacity: number;
  currentCharge: number;
  status: "charging" | "discharging" | "idle" | "maintenance";
  health: number;
  cycles: number;
  manufacturer: string;
  installDate: string;
}

interface WarehouseItem {
  id: string;
  type: "robot" | "pallet" | "storage" | "charger";
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  status?: string;
  battery?: number;
}

interface Task {
  id: string;
  robotId: string;
  type: "charge" | "transport";
  status: "pending" | "active" | "completed";
  targetId?: string;
  startTime: number;
  description: string;
}

interface Modal {
  id: string;
  type: "map" | "robots" | "batteries" | "createTask";
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
  zIndex: number;
}

const RobotInterfaceDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modals, setModals] = useState<Modal[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [draggedModal, setDraggedModal] = useState<string | null>(null);
  const [resizedModal, setResizedModal] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const [robots, setRobots] = useState<Robot[]>([
    {
      id: "1",
      name: "Robot-001",
      status: "active",
      battery: 85,
      location: "Zone A",
      mission: "Transport to Zone B",
      speed: 2.5,
      model: "AGV-2000",
      lastMaintenance: "2024-01-15",
      totalTasks: 234,
    },
    {
      id: "2",
      name: "Robot-002",
      status: "charging",
      battery: 45,
      location: "Charging Station",
      mission: "Charging",
      speed: 0,
      model: "AGV-2000",
      lastMaintenance: "2024-01-20",
      totalTasks: 189,
    },
    {
      id: "3",
      name: "Robot-003",
      status: "active",
      battery: 92,
      location: "Zone C",
      mission: "Loading pallets",
      speed: 1.8,
      model: "AGV-3000",
      lastMaintenance: "2024-01-18",
      totalTasks: 312,
    },
    {
      id: "4",
      name: "Robot-004",
      status: "maintenance",
      battery: 78,
      location: "Maintenance Bay",
      mission: "Maintenance",
      speed: 0,
      model: "AGV-2000",
      lastMaintenance: "2024-01-22",
      totalTasks: 156,
    },
  ]);

  const [batteries, setBatteries] = useState<Battery[]>([
    {
      id: "b1",
      robotId: "1",
      robotName: "Robot-001",
      capacity: 100,
      currentCharge: 85,
      status: "discharging",
      health: 92,
      cycles: 450,
      manufacturer: "LithiumPro",
      installDate: "2023-06-15",
    },
    {
      id: "b2",
      robotId: "2",
      robotName: "Robot-002",
      capacity: 100,
      currentCharge: 45,
      status: "charging",
      health: 88,
      cycles: 520,
      manufacturer: "LithiumPro",
      installDate: "2023-05-20",
    },
    {
      id: "b3",
      robotId: "3",
      robotName: "Robot-003",
      capacity: 100,
      currentCharge: 92,
      status: "discharging",
      health: 95,
      cycles: 380,
      manufacturer: "LithiumPro",
      installDate: "2023-08-10",
    },
    {
      id: "b4",
      robotId: "4",
      robotName: "Robot-004",
      capacity: 100,
      currentCharge: 78,
      status: "idle",
      health: 85,
      cycles: 600,
      manufacturer: "LithiumPro",
      installDate: "2023-04-05",
    },
  ]);

  const [warehouseItems, setWarehouseItems] = useState<WarehouseItem[]>([
    { id: "r1", type: "robot", x: 100, y: 100, width: 30, height: 30, name: "Robot-001", status: "active", battery: 85 },
    { id: "r2", type: "robot", x: 200, y: 200, width: 30, height: 30, name: "Robot-002", status: "charging", battery: 45 },
    { id: "r3", type: "robot", x: 300, y: 150, width: 30, height: 30, name: "Robot-003", status: "active", battery: 92 },
    { id: "r4", type: "robot", x: 150, y: 300, width: 30, height: 30, name: "Robot-004", status: "maintenance", battery: 78 },
    { id: "s1", type: "storage", x: 50, y: 50, width: 80, height: 60, name: "Storage Zone A" },
    { id: "s2", type: "storage", x: 400, y: 50, width: 80, height: 60, name: "Storage Zone B" },
    { id: "s3", type: "storage", x: 50, y: 250, width: 80, height: 60, name: "Storage Zone C" },
    { id: "s4", type: "storage", x: 400, y: 250, width: 80, height: 60, name: "Storage Zone D" },
    { id: "p1", type: "pallet", x: 200, y: 80, width: 20, height: 15, name: "Pallet-001" },
    { id: "p2", type: "pallet", x: 250, y: 80, width: 20, height: 15, name: "Pallet-002" },
    { id: "c1", type: "charger", x: 180, y: 180, width: 25, height: 25, name: "Charger-001" },
    { id: "c2", type: "charger", x: 350, y: 180, width: 25, height: 25, name: "Charger-002" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [newTask, setNewTask] = useState({
    robotId: "",
    type: "transport" as "charge" | "transport",
    targetId: "",
    description: "",
  });
  const [movingRobots, setMovingRobots] = useState<{
    [key: string]: {
      targetX: number;
      targetY: number;
      startX: number;
      startY: number;
      progress: number;
      step: "pickup" | "delivery" | "charging";
      palletId?: string;
      storageId?: string;
    };
  }>({});

  // Open a modal
  const openModal = (type: Modal["type"]) => {
    const existingModal = modals.find((m) => m.type === type);
    if (existingModal) {
      // Bring to front
      setModals((prev) =>
        prev.map((m) =>
          m.id === existingModal.id
            ? { ...m, minimized: false, zIndex: nextZIndex }
            : m
        )
      );
      setNextZIndex((prev) => prev + 1);
      return;
    }

    const defaultSizes: Record<Modal["type"], { width: number; height: number }> = {
      map: { width: 800, height: 600 },
      robots: { width: 900, height: 600 },
      batteries: { width: 900, height: 600 },
      createTask: { width: 500, height: 500 },
    };

    const defaultPositions: Record<Modal["type"], { x: number; y: number }> = {
      map: { x: 100, y: 50 },
      robots: { x: 150, y: 50 },
      batteries: { x: 200, y: 50 },
      createTask: { x: 250, y: 50 },
    };

    const newModal: Modal = {
      id: `${type}-${Date.now()}`,
      type,
      position: defaultPositions[type],
      size: defaultSizes[type],
      minimized: false,
      zIndex: nextZIndex,
    };

    setModals((prev) => [...prev, newModal]);
    setNextZIndex((prev) => prev + 1);
  };

  // Close a modal
  const closeModal = (modalId: string) => {
    setModals((prev) => prev.filter((m) => m.id !== modalId));
  };

  // Toggle minimize
  const toggleMinimize = (modalId: string) => {
    setModals((prev) =>
      prev.map((m) => (m.id === modalId ? { ...m, minimized: !m.minimized } : m))
    );
  };

  // Bring modal to front
  const bringToFront = (modalId: string) => {
    setModals((prev) =>
      prev.map((m) =>
        m.id === modalId ? { ...m, zIndex: nextZIndex } : m
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  // Handle modal drag
  const handleMouseDown = (e: React.MouseEvent, modalId: string) => {
    e.preventDefault();
    e.stopPropagation();
    bringToFront(modalId);
    const modal = modals.find((m) => m.id === modalId);
    if (modal) {
      setDraggedModal(modalId);
      setDragOffset({
        x: e.clientX - modal.position.x,
        y: e.clientY - modal.position.y,
      });
    }
  };

  // Handle modal resize
  const handleResizeMouseDown = (e: React.MouseEvent, modalId: string) => {
    e.preventDefault();
    e.stopPropagation();
    bringToFront(modalId);
    const modal = modals.find((m) => m.id === modalId);
    if (modal) {
      setResizedModal(modalId);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: modal.size.width,
        height: modal.size.height,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedModal) {
        setModals((prev) =>
          prev.map((m) =>
            m.id === draggedModal
              ? {
                  ...m,
                  position: {
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y,
                  },
                }
              : m
          )
        );
      }
      if (resizedModal) {
        const modal = modals.find((m) => m.id === resizedModal);
        if (modal) {
          const deltaX = e.clientX - resizeStart.x;
          const deltaY = e.clientY - resizeStart.y;
          setModals((prev) =>
            prev.map((m) =>
              m.id === resizedModal
                ? {
                    ...m,
                    size: {
                      width: Math.max(400, resizeStart.width + deltaX),
                      height: Math.max(300, resizeStart.height + deltaY),
                    },
                  }
                : m
            )
          );
        }
      }
    };

    const handleMouseUp = () => {
      setDraggedModal(null);
      setResizedModal(null);
    };

    if (draggedModal || resizedModal) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggedModal, resizedModal, dragOffset, resizeStart, modals]);

  // Canvas drawing functions (similar to RoadEditor)
  const drawWarehouseMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw warehouse items
    warehouseItems.forEach((item) => {
      drawWarehouseItem(ctx, item);
    });
  };

  const drawWarehouseItem = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    switch (item.type) {
      case "robot":
        drawRobotOnMap(ctx, item);
        break;
      case "storage":
        drawStorageZoneOnMap(ctx, item);
        break;
      case "pallet":
        drawPalletOnMap(ctx, item);
        break;
      case "charger":
        drawChargerOnMap(ctx, item);
        break;
    }
  };

  const drawRobotOnMap = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;
    const bodyColor =
      item.status === "active"
        ? "#2196F3"
        : item.status === "charging"
        ? "#FF9800"
        : "#9E9E9E";

    ctx.fillStyle = bodyColor;
    ctx.fillRect(item.x + 2, item.y + 8, item.width - 4, item.height - 12);

    ctx.fillStyle = bodyColor;
    ctx.fillRect(item.x + 4, item.y + 2, item.width - 8, 8);

    ctx.fillStyle = "#666";
    ctx.fillRect(item.x - 2, item.y + 12, 4, 2);
    ctx.fillRect(item.x - 2, item.y + 16, 4, 2);

    if (item.battery !== undefined) {
      ctx.fillStyle =
        item.battery > 70
          ? "#4CAF50"
          : item.battery > 30
          ? "#FF9800"
          : "#F44336";
      ctx.beginPath();
      ctx.arc(centerX, item.y + 2, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "8px Arial";
    ctx.textAlign = "center";
    ctx.fillText(item.name, centerX, item.y + item.height + 12);
  };

  const drawStorageZoneOnMap = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(item.x, item.y, item.width, item.height);
    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 2;
    const shelfCount = Math.floor(item.height / 15);
    for (let i = 1; i < shelfCount; i++) {
      const shelfY = item.y + (item.height / shelfCount) * i;
      ctx.beginPath();
      ctx.moveTo(item.x, shelfY);
      ctx.lineTo(item.x + item.width, shelfY);
      ctx.stroke();
    }
    ctx.fillStyle = "#fff";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      item.name,
      item.x + item.width / 2,
      item.y + item.height / 2 + 3
    );
  };

  const drawPalletOnMap = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    ctx.fillStyle = "#8D6E63";
    ctx.fillRect(item.x, item.y, item.width, item.height);
    ctx.strokeStyle = "#5D4037";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(item.x, item.y + 3);
    ctx.lineTo(item.x + item.width, item.y + 3);
    ctx.moveTo(item.x, item.y + 6);
    ctx.lineTo(item.x + item.width, item.y + 6);
    ctx.moveTo(item.x, item.y + 9);
    ctx.lineTo(item.x + item.width, item.y + 9);
    ctx.stroke();
  };

  const drawChargerOnMap = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    ctx.fillStyle = "#FF9800";
    ctx.fillRect(item.x, item.y, item.width, item.height);
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("⚡", item.x + item.width / 2, item.y + item.height / 2 + 4);
  };

  useEffect(() => {
    drawWarehouseMap();
  }, [warehouseItems]);

  const createTask = () => {
    if (!newTask.robotId || (!newTask.targetId && newTask.type === "transport"))
      return;

    const task: Task = {
      id: Date.now().toString(),
      robotId: newTask.robotId,
      type: newTask.type,
      status: "active",
      targetId: newTask.targetId,
      startTime: Date.now(),
      description:
        newTask.description || `${newTask.type} task for ${newTask.robotId}`,
    };

    setTasks([...tasks, task]);
    setNewTask({
      robotId: "",
      type: "transport",
      targetId: "",
      description: "",
    });
    setShowTaskCreator(false);
    closeModal(modals.find((m) => m.type === "createTask")?.id || "");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "charging":
        return "#FF9800";
      case "maintenance":
        return "#F44336";
      case "idle":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return "#4CAF50";
    if (battery > 30) return "#FF9800";
    return "#F44336";
  };

  // Render modal content
  const renderModalContent = (modal: Modal) => {
    switch (modal.type) {
      case "map":
        return (
          <div className="map-modal-content">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="map-canvas"
            />
          </div>
        );
      case "robots":
        return (
          <div className="table-modal-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Battery</th>
                  <th>Location</th>
                  <th>Mission</th>
                  <th>Speed</th>
                  <th>Model</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {robots.map((robot) => (
                  <tr key={robot.id}>
                    <td>{robot.id}</td>
                    <td>{robot.name}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ color: getStatusColor(robot.status) }}
                      >
                        {robot.status}
                      </span>
                    </td>
                    <td>
                      <div className="battery-cell">
                        <div
                          className="battery-fill"
                          style={{
                            width: `${robot.battery}%`,
                            backgroundColor: getBatteryColor(robot.battery),
                          }}
                        />
                        <span>{robot.battery}%</span>
                      </div>
                    </td>
                    <td>{robot.location}</td>
                    <td>{robot.mission}</td>
                    <td>{robot.speed.toFixed(1)} m/s</td>
                    <td>{robot.model}</td>
                    <td>{robot.totalTasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "batteries":
        return (
          <div className="table-modal-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Robot</th>
                  <th>Charge</th>
                  <th>Status</th>
                  <th>Health</th>
                  <th>Cycles</th>
                  <th>Manufacturer</th>
                  <th>Install Date</th>
                </tr>
              </thead>
              <tbody>
                {batteries.map((battery) => (
                  <tr key={battery.id}>
                    <td>{battery.id}</td>
                    <td>{battery.robotName}</td>
                    <td>
                      <div className="battery-cell">
                        <div
                          className="battery-fill"
                          style={{
                            width: `${battery.currentCharge}%`,
                            backgroundColor: getBatteryColor(
                              battery.currentCharge
                            ),
                          }}
                        />
                        <span>{battery.currentCharge}%</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ color: getStatusColor(battery.status) }}
                      >
                        {battery.status}
                      </span>
                    </td>
                    <td>{battery.health}%</td>
                    <td>{battery.cycles}</td>
                    <td>{battery.manufacturer}</td>
                    <td>{battery.installDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "createTask":
        return (
          <div className="task-creator-content">
            <div className="form-group">
              <label>Select Robot:</label>
              <select
                value={newTask.robotId}
                onChange={(e) =>
                  setNewTask({ ...newTask, robotId: e.target.value })
                }
              >
                <option value="">Choose a robot...</option>
                {robots
                  .filter(
                    (r) => r.status === "active" || r.status === "idle"
                  )
                  .map((robot) => (
                    <option key={robot.id} value={robot.id}>
                      {robot.name} (Battery: {robot.battery}%)
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>Task Type:</label>
              <select
                value={newTask.type}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    type: e.target.value as "charge" | "transport",
                  })
                }
              >
                <option value="transport">Transport Pallet</option>
                <option value="charge">Go to Charger</option>
              </select>
            </div>
            {newTask.type === "transport" && (
              <div className="form-group">
                <label>Select Pallet:</label>
                <select
                  value={newTask.targetId}
                  onChange={(e) =>
                    setNewTask({ ...newTask, targetId: e.target.value })
                  }
                >
                  <option value="">Choose a pallet...</option>
                  {warehouseItems
                    .filter((item) => item.type === "pallet")
                    .map((pallet) => (
                      <option key={pallet.id} value={pallet.id}>
                        {pallet.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {newTask.type === "charge" && (
              <div className="form-group">
                <label>Select Charger:</label>
                <select
                  value={newTask.targetId}
                  onChange={(e) =>
                    setNewTask({ ...newTask, targetId: e.target.value })
                  }
                >
                  <option value="">Choose a charger...</option>
                  {warehouseItems
                    .filter((item) => item.type === "charger")
                    .map((charger) => (
                      <option key={charger.id} value={charger.id}>
                        {charger.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Enter task description..."
              />
            </div>
            <div className="task-creator-footer">
              <button className="cancel-btn" onClick={() => closeModal(modal.id)}>
                Cancel
              </button>
              <button
                className="create-btn"
                onClick={createTask}
                disabled={!newTask.robotId || !newTask.targetId}
              >
                Create Task
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="robot-interface-demo">
      <div className="demo-sidebar">
        <div className="sidebar-header">
          <h3>Robot Interface</h3>
        </div>
        <nav className="sidebar-nav">
          <button
            className="nav-item"
            onClick={() => openModal("createTask")}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-label">Create Task</span>
          </button>
          <button
            className="nav-item"
            onClick={() => openModal("map")}
          >
            <span className="nav-icon">🗺️</span>
            <span className="nav-label">Map</span>
          </button>
          <button
            className="nav-item"
            onClick={() => openModal("robots")}
          >
            <span className="nav-icon">🤖</span>
            <span className="nav-label">Robots</span>
          </button>
          <button
            className="nav-item"
            onClick={() => openModal("batteries")}
          >
            <span className="nav-icon">🔋</span>
            <span className="nav-label">Batteries</span>
          </button>
        </nav>
      </div>

      <div className="demo-main-content">
        <div className="main-content-header">
          <h2>Robot Interface Manager</h2>
          <p>Manage your robots, tasks, and warehouse operations</p>
        </div>
        <div className="main-content-body">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🤖</div>
              <div className="stat-value">{robots.length}</div>
              <div className="stat-label">Total Robots</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">
                {Math.round(
                  robots.reduce((sum, r) => sum + r.battery, 0) / robots.length
                )}
                %
              </div>
              <div className="stat-label">Avg Battery</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{tasks.length}</div>
              <div className="stat-label">Active Tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏃</div>
              <div className="stat-value">
                {robots.filter((r) => r.status === "active").length}
              </div>
              <div className="stat-label">Active Robots</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modals.map((modal) => (
        <div
          key={modal.id}
          className={`demo-modal ${modal.minimized ? "minimized" : ""}`}
          style={{
            left: `${modal.position.x}px`,
            top: `${modal.position.y}px`,
            width: modal.minimized ? "250px" : `${modal.size.width}px`,
            height: modal.minimized ? "40px" : `${modal.size.height}px`,
            zIndex: modal.zIndex,
          }}
          onMouseDown={() => bringToFront(modal.id)}
        >
          <div
            className="modal-header"
            onMouseDown={(e) => handleMouseDown(e, modal.id)}
          >
            <div className="modal-title">
              {modal.type === "map" && "🗺️ Map"}
              {modal.type === "robots" && "🤖 Robots"}
              {modal.type === "batteries" && "🔋 Batteries"}
              {modal.type === "createTask" && "➕ Create Task"}
            </div>
            <div className="modal-actions">
              <button
                className="modal-btn"
                onClick={() => toggleMinimize(modal.id)}
              >
                {modal.minimized ? "□" : "—"}
              </button>
              <button
                className="modal-btn"
                onClick={() => closeModal(modal.id)}
              >
                ×
              </button>
            </div>
          </div>
          {!modal.minimized && (
            <>
              <div className="modal-body">{renderModalContent(modal)}</div>
              <div
                className="modal-resize-handle"
                onMouseDown={(e) => handleResizeMouseDown(e, modal.id)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RobotInterfaceDemo;
