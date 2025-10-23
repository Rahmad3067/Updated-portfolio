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
}

interface StorageZone {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  type: "storage" | "loading" | "unloading";
  x: number;
  y: number;
  width: number;
  height: number;
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

const RobotInterfaceDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [robots, setRobots] = useState<Robot[]>([
    {
      id: "1",
      name: "Robot-001",
      status: "active",
      battery: 85,
      location: "Zone A",
      mission: "Transport to Zone B",
      speed: 2.5,
    },
    {
      id: "2",
      name: "Robot-002",
      status: "charging",
      battery: 45,
      location: "Charging Station",
      mission: "Charging",
      speed: 0,
    },
    {
      id: "3",
      name: "Robot-003",
      status: "active",
      battery: 92,
      location: "Zone C",
      mission: "Loading pallets",
      speed: 1.8,
    },
    {
      id: "4",
      name: "Robot-004",
      status: "maintenance",
      battery: 78,
      location: "Maintenance Bay",
      mission: "Maintenance",
      speed: 0,
    },
  ]);

  const [warehouseItems, setWarehouseItems] = useState<WarehouseItem[]>([
    // Robots
    {
      id: "r1",
      type: "robot",
      x: 100,
      y: 100,
      width: 30,
      height: 30,
      name: "Robot-001",
      status: "active",
      battery: 85,
    },
    {
      id: "r2",
      type: "robot",
      x: 200,
      y: 200,
      width: 30,
      height: 30,
      name: "Robot-002",
      status: "charging",
      battery: 45,
    },
    {
      id: "r3",
      type: "robot",
      x: 300,
      y: 150,
      width: 30,
      height: 30,
      name: "Robot-003",
      status: "active",
      battery: 92,
    },
    {
      id: "r4",
      type: "robot",
      x: 150,
      y: 300,
      width: 30,
      height: 30,
      name: "Robot-004",
      status: "maintenance",
      battery: 78,
    },

    // Storage Zones
    {
      id: "s1",
      type: "storage",
      x: 50,
      y: 50,
      width: 80,
      height: 60,
      name: "Storage Zone A",
    },
    {
      id: "s2",
      type: "storage",
      x: 400,
      y: 50,
      width: 80,
      height: 60,
      name: "Storage Zone B",
    },
    {
      id: "s3",
      type: "storage",
      x: 50,
      y: 250,
      width: 80,
      height: 60,
      name: "Storage Zone C",
    },
    {
      id: "s4",
      type: "storage",
      x: 400,
      y: 250,
      width: 80,
      height: 60,
      name: "Storage Zone D",
    },

    // Pallets
    {
      id: "p1",
      type: "pallet",
      x: 200,
      y: 80,
      width: 20,
      height: 15,
      name: "Pallet-001",
    },
    {
      id: "p2",
      type: "pallet",
      x: 250,
      y: 80,
      width: 20,
      height: 15,
      name: "Pallet-002",
    },
    {
      id: "p3",
      type: "pallet",
      x: 300,
      y: 80,
      width: 20,
      height: 15,
      name: "Pallet-003",
    },
    {
      id: "p4",
      type: "pallet",
      x: 200,
      y: 300,
      width: 20,
      height: 15,
      name: "Pallet-004",
    },
    {
      id: "p5",
      type: "pallet",
      x: 250,
      y: 300,
      width: 20,
      height: 15,
      name: "Pallet-005",
    },

    // Chargers
    {
      id: "c1",
      type: "charger",
      x: 180,
      y: 180,
      width: 25,
      height: 25,
      name: "Charger-001",
    },
    {
      id: "c2",
      type: "charger",
      x: 350,
      y: 180,
      width: 25,
      height: 25,
      name: "Charger-002",
    },
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

  const [storageZones, setStorageZones] = useState<StorageZone[]>([
    {
      id: "1",
      name: "Zone A",
      capacity: 100,
      occupied: 75,
      type: "storage",
      x: 50,
      y: 50,
      width: 80,
      height: 60,
    },
    {
      id: "2",
      name: "Zone B",
      capacity: 80,
      occupied: 60,
      type: "loading",
      x: 400,
      y: 50,
      width: 80,
      height: 60,
    },
    {
      id: "3",
      name: "Zone C",
      capacity: 120,
      occupied: 45,
      type: "unloading",
      x: 50,
      y: 250,
      width: 80,
      height: 60,
    },
    {
      id: "4",
      name: "Zone D",
      capacity: 100,
      occupied: 30,
      type: "storage",
      x: 400,
      y: 250,
      width: 80,
      height: 60,
    },
  ]);

  const [selectedRobot, setSelectedRobot] = useState<string>("1");
  const [newMission, setNewMission] = useState("");

  const drawWarehouseMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
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

    // Draw movement paths
    Object.keys(movingRobots).forEach((robotId) => {
      const movement = movingRobots[robotId];
      if (movement) {
        // Draw path line
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(movement.startX + 15, movement.startY + 15);
        ctx.lineTo(movement.targetX + 15, movement.targetY + 15);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw target indicator
        ctx.fillStyle = "#4CAF50";
        ctx.beginPath();
        ctx.arc(
          movement.targetX + 15,
          movement.targetY + 15,
          8,
          0,
          2 * Math.PI
        );
        ctx.fill();

        // Draw target ring
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          movement.targetX + 15,
          movement.targetY + 15,
          12,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
    });

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
    const robotId = item.id.replace("r", "");

    // Check if robot is moving
    const isMoving = movingRobots[robotId];

    // Draw forklift robot
    drawForkliftRobot(ctx, item, isMoving);

    // Add movement indicator (pulsing effect)
    if (isMoving) {
      ctx.strokeStyle = "#4CAF50";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, item.width / 2 + 8, 0, 2 * Math.PI);
      ctx.stroke();

      // Add movement trail
      ctx.strokeStyle = "#4CAF50";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(item.x - 15, item.y + item.height / 2);
      ctx.lineTo(item.x + item.width + 15, item.y + item.height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Show pallet if robot is carrying one
      if (isMoving.step === "delivery" && isMoving.palletId) {
        // Draw pallet on forklift
        ctx.fillStyle = "#8D6E63";
        ctx.fillRect(item.x + 8, item.y - 12, 16, 10);

        // Draw pallet slats
        ctx.strokeStyle = "#5D4037";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(item.x + 8, item.y - 8);
        ctx.lineTo(item.x + 24, item.y - 8);
        ctx.moveTo(item.x + 8, item.y - 5);
        ctx.lineTo(item.x + 24, item.y - 5);
        ctx.stroke();
      }
    }

    // Battery indicator
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

    // Robot name with movement status
    ctx.fillStyle = "#fff";
    ctx.font = "8px Arial";
    ctx.textAlign = "center";
    let displayName = item.name;
    if (isMoving) {
      if (isMoving.step === "pickup") {
        displayName = `${item.name} (Going to Pallet)`;
      } else if (isMoving.step === "delivery") {
        displayName = `${item.name} (Delivering Pallet)`;
      } else if (isMoving.step === "charging") {
        displayName = `${item.name} (Going to Charger)`;
      }
    }
    ctx.fillText(displayName, centerX, item.y + item.height + 12);
  };

  const drawForkliftRobot = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem,
    isMoving: any
  ) => {
    const centerX = item.x + item.width / 2;
    const centerY = item.y + item.height / 2;

    // Robot body color based on status
    const bodyColor =
      item.status === "active"
        ? "#2196F3"
        : item.status === "charging"
        ? "#FF9800"
        : "#9E9E9E";

    // Forklift body (main chassis)
    ctx.fillStyle = bodyColor;
    ctx.fillRect(item.x + 2, item.y + 8, item.width - 4, item.height - 12);

    // Forklift cabin
    ctx.fillStyle = bodyColor;
    ctx.fillRect(item.x + 4, item.y + 2, item.width - 8, 8);

    // Forklift forks (front)
    ctx.fillStyle = "#666";
    ctx.fillRect(item.x - 2, item.y + 12, 4, 2);
    ctx.fillRect(item.x - 2, item.y + 16, 4, 2);

    // Forklift mast (vertical lift mechanism)
    ctx.fillStyle = "#555";
    ctx.fillRect(item.x + 6, item.y - 4, 4, item.height + 4);
    ctx.fillRect(item.x + item.width - 10, item.y - 4, 4, item.height + 4);

    // Forklift wheels
    ctx.fillStyle = "#333";
    // Front wheels
    ctx.beginPath();
    ctx.arc(item.x + 6, item.y + item.height - 4, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      item.x + item.width - 6,
      item.y + item.height - 4,
      3,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Rear wheels
    ctx.beginPath();
    ctx.arc(item.x + 4, item.y + item.height - 2, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      item.x + item.width - 4,
      item.y + item.height - 2,
      2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Forklift operator cabin details
    ctx.fillStyle = "#000";
    ctx.fillRect(item.x + 5, item.y + 3, 2, 2); // Window
    ctx.fillRect(item.x + item.width - 7, item.y + 3, 2, 2); // Window

    // Forklift lights
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(item.x + 3, item.y + 4, 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(item.x + item.width - 3, item.y + 4, 1, 0, 2 * Math.PI);
    ctx.fill();

    // Forklift sensors
    ctx.fillStyle = "#00FF00";
    ctx.beginPath();
    ctx.arc(centerX, item.y + 1, 1, 0, 2 * Math.PI);
    ctx.fill();

    // Add movement animation effect
    if (isMoving) {
      // Animated wheels
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(item.x + 6, item.y + item.height - 4, 3, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(item.x + item.width - 6, item.y + item.height - 4, 3, 0, Math.PI);
      ctx.stroke();
    }
  };

  const drawStorageZoneOnMap = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Storage zone background
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Draw rack shelves
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

    // Zone name
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
    // Pallet base
    ctx.fillStyle = "#8D6E63";
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Pallet slats
    ctx.strokeStyle = "#5D4037";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(item.x, item.y + 3);
    ctx.lineTo(item.x + item.width, item.y + 3);
    ctx.moveTo(item.x, item.y + 6);
    ctx.lineTo(item.x + item.width, item.y + 6);
    ctx.moveTo(item.x, item.y + 9);
    ctx.lineTo(item.x + item.width, item.y + 9);
    ctx.moveTo(item.x, item.y + 12);
    ctx.lineTo(item.x + item.width, item.y + 12);
    ctx.stroke();
  };

  const drawChargerOnMap = (
    ctx: CanvasRenderingContext2D,
    item: WarehouseItem
  ) => {
    // Charger base
    ctx.fillStyle = "#FF9800";
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Charger symbol
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("⚡", item.x + item.width / 2, item.y + item.height / 2 + 4);
  };

  // Draw warehouse map
  useEffect(() => {
    drawWarehouseMap();
  }, [warehouseItems, movingRobots]);

  // Robot movement animation
  useEffect(() => {
    const interval = setInterval(() => {
      setMovingRobots((prev) => {
        const updated = { ...prev };
        let hasMovingRobots = false;

        Object.keys(updated).forEach((robotId) => {
          const movement = updated[robotId];
          if (movement.progress < 1) {
            movement.progress += 0.005; // Much slower movement
            hasMovingRobots = true;

            if (movement.progress >= 1) {
              // Movement completed
              movement.progress = 1;

              // Update warehouse items with final position
              setWarehouseItems((prevItems) =>
                prevItems.map((item) =>
                  item.id === `r${robotId}`
                    ? { ...item, x: movement.targetX, y: movement.targetY }
                    : item
                )
              );

              // Handle different steps
              if (movement.step === "pickup") {
                // Robot picked up pallet, now go to storage zone
                const pallet = warehouseItems.find(
                  (item) => item.id === movement.palletId
                );
                const storageZones = warehouseItems.filter(
                  (item) => item.type === "storage"
                );
                const targetStorage = storageZones[0]; // Go to first available storage zone

                if (targetStorage) {
                  // Start delivery step
                  setTimeout(() => {
                    setMovingRobots((prev) => ({
                      ...prev,
                      [robotId]: {
                        startX: movement.targetX,
                        startY: movement.targetY,
                        targetX: targetStorage.x + targetStorage.width / 2 - 15,
                        targetY:
                          targetStorage.y + targetStorage.height / 2 - 15,
                        progress: 0,
                        step: "delivery",
                        palletId: movement.palletId,
                        storageId: targetStorage.id,
                      },
                    }));
                  }, 1000); // Wait 1 second before starting delivery
                }
              } else if (movement.step === "delivery") {
                // Delivery completed
                setTimeout(() => {
                  // Complete the task
                  setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                      task.robotId === robotId && task.status === "active"
                        ? { ...task, status: "completed" }
                        : task
                    )
                  );

                  // Remove from moving robots
                  setMovingRobots((prev) => {
                    const newMoving = { ...prev };
                    delete newMoving[robotId];
                    return newMoving;
                  });
                }, 1000);
              } else if (movement.step === "charging") {
                // Charging completed
                setTimeout(() => {
                  setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                      task.robotId === robotId && task.status === "active"
                        ? { ...task, status: "completed" }
                        : task
                    )
                  );

                  setMovingRobots((prev) => {
                    const newMoving = { ...prev };
                    delete newMoving[robotId];
                    return newMoving;
                  });
                }, 1000);
              }
            } else {
              // Update warehouse items with current position
              const currentX =
                movement.startX +
                (movement.targetX - movement.startX) * movement.progress;
              const currentY =
                movement.startY +
                (movement.targetY - movement.startY) * movement.progress;

              setWarehouseItems((prevItems) =>
                prevItems.map((item) =>
                  item.id === `r${robotId}`
                    ? { ...item, x: currentX, y: currentY }
                    : item
                )
              );
            }
          }
        });

        return hasMovingRobots ? updated : {};
      });
    }, 50); // 20 FPS

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRobots((prevRobots) =>
        prevRobots.map((robot) => {
          if (robot.status === "active") {
            const batteryChange = Math.random() * 2 - 1; // -1 to 1
            const newBattery = Math.max(
              0,
              Math.min(100, robot.battery + batteryChange)
            );
            return {
              ...robot,
              battery: Math.round(newBattery),
              speed: robot.speed + (Math.random() * 0.4 - 0.2), // Small speed variation
            };
          }
          return robot;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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

    // Start robot movement
    startRobotMovement(newTask.robotId, newTask.targetId);

    setNewTask({
      robotId: "",
      type: "transport",
      targetId: "",
      description: "",
    });
    setShowTaskCreator(false);
  };

  const startRobotMovement = (robotId: string, targetId: string) => {
    const robot = warehouseItems.find((item) => item.id === `r${robotId}`);
    const target = warehouseItems.find((item) => item.id === targetId);

    console.log("Starting robot movement:", {
      robotId,
      targetId,
      robot,
      target,
    });

    if (!robot || !target) {
      console.log("Robot or target not found");
      return;
    }

    // For transport tasks, first go to pallet, then to storage zone
    if (target.type === "pallet") {
      console.log("Starting pickup movement to pallet");
      // Step 1: Go to pallet
      setMovingRobots((prev) => ({
        ...prev,
        [robotId]: {
          startX: robot.x,
          startY: robot.y,
          targetX: target.x + target.width / 2 - robot.width / 2,
          targetY: target.y + target.height / 2 - robot.height / 2,
          progress: 0,
          step: "pickup",
          palletId: targetId,
        },
      }));
    } else if (target.type === "charger") {
      console.log("Starting charging movement");
      // For charging tasks, go directly to charger
      setMovingRobots((prev) => ({
        ...prev,
        [robotId]: {
          startX: robot.x,
          startY: robot.y,
          targetX: target.x + target.width / 2 - robot.width / 2,
          targetY: target.y + target.height / 2 - robot.height / 2,
          progress: 0,
          step: "charging",
        },
      }));
    }

    // Update robot status
    setWarehouseItems((prev) =>
      prev.map((item) =>
        item.id === `r${robotId}` ? { ...item, status: "active" } : item
      )
    );
  };

  const getAvailableRobots = () => {
    return robots.filter(
      (robot) => robot.status === "active" || robot.status === "idle"
    );
  };

  const getAvailableTargets = () => {
    if (newTask.type === "charge") {
      return warehouseItems.filter((item) => item.type === "charger");
    } else {
      return warehouseItems.filter(
        (item) => item.type === "pallet" || item.type === "storage"
      );
    }
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

  const assignMission = () => {
    if (!newMission.trim()) return;

    setRobots((prevRobots) =>
      prevRobots.map((robot) =>
        robot.id === selectedRobot
          ? { ...robot, mission: newMission, status: "active" as const }
          : robot
      )
    );
    setNewMission("");
  };

  const getTotalCapacity = () => {
    return storageZones.reduce((total, zone) => total + zone.capacity, 0);
  };

  const getTotalOccupied = () => {
    return storageZones.reduce((total, zone) => total + zone.occupied, 0);
  };

  return (
    <div className="robot-interface-demo">
      <div className="demo-header">
        <h3>Robot Interface Manager</h3>
        <p>
          Monitor robot status, battery levels, and manage warehouse operations
          in real-time.
        </p>
      </div>

      <div className="demo-dashboard">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">🤖</div>
            <div className="stat-content">
              <div className="stat-value">{robots.length}</div>
              <div className="stat-label">Total Robots</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">
                {Math.round(
                  robots.reduce((sum, r) => sum + r.battery, 0) / robots.length
                )}
                %
              </div>
              <div className="stat-label">Avg Battery</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <div className="stat-value">
                {getTotalOccupied()}/{getTotalCapacity()}
              </div>
              <div className="stat-label">Storage Usage</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏃</div>
            <div className="stat-content">
              <div className="stat-value">
                {robots.filter((r) => r.status === "active").length}
              </div>
              <div className="stat-label">Active Robots</div>
            </div>
          </div>
        </div>

        <div className="demo-content">
          <div className="warehouse-map-section">
            <div className="map-header">
              <h4>Warehouse Map</h4>
              <button
                className="create-task-btn"
                onClick={() => setShowTaskCreator(true)}
              >
                + Create Task
              </button>
            </div>
            <div className="warehouse-canvas-container">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="warehouse-canvas"
              />
            </div>
          </div>

          <div className="robots-section">
            <h4>Robot Status</h4>
            <div className="robots-grid">
              {robots.map((robot) => (
                <div
                  key={robot.id}
                  className={`robot-card ${
                    selectedRobot === robot.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRobot(robot.id)}
                >
                  <div className="robot-header">
                    <div className="robot-name">{robot.name}</div>
                    <div
                      className="robot-status"
                      style={{ color: getStatusColor(robot.status) }}
                    >
                      {robot.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="robot-details">
                    <div className="detail-item">
                      <span className="detail-label">Battery:</span>
                      <div className="battery-bar">
                        <div
                          className="battery-fill"
                          style={{
                            width: `${robot.battery}%`,
                            backgroundColor: getBatteryColor(robot.battery),
                          }}
                        ></div>
                        <span className="battery-text">{robot.battery}%</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{robot.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Speed:</span>
                      <span className="detail-value">
                        {robot.speed.toFixed(1)} m/s
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Mission:</span>
                      <span className="detail-value">{robot.mission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tasks-section">
            <h4>Active Tasks</h4>
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div className="task-type">{task.type.toUpperCase()}</div>
                    <div
                      className="task-status"
                      style={{ color: getStatusColor(task.status) }}
                    >
                      {task.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="task-details">
                    <div className="task-robot">Robot: {task.robotId}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-time">
                      Created: {new Date(task.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mission-control">
          <h4>Mission Control</h4>
          <div className="mission-form">
            <div className="form-group">
              <label>
                Selected Robot:{" "}
                {robots.find((r) => r.id === selectedRobot)?.name}
              </label>
            </div>
            <div className="form-group">
              <input
                type="text"
                value={newMission}
                onChange={(e) => setNewMission(e.target.value)}
                placeholder="Enter new mission..."
                className="mission-input"
              />
            </div>
            <button onClick={assignMission} className="assign-btn">
              Assign Mission
            </button>
          </div>
        </div>
      </div>

      {/* Task Creator Modal */}
      {showTaskCreator && (
        <div className="task-creator-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Task</h3>
              <button
                className="close-btn"
                onClick={() => setShowTaskCreator(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Select Robot:</label>
                <select
                  value={newTask.robotId}
                  onChange={(e) =>
                    setNewTask({ ...newTask, robotId: e.target.value })
                  }
                >
                  <option value="">Choose a robot...</option>
                  {getAvailableRobots().map((robot) => (
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
                  <label>Select Pallet to Transport:</label>
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
                  <small style={{ color: "#888", fontSize: "0.8rem" }}>
                    Robot will pick up this pallet and deliver it to a storage
                    zone
                  </small>
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
                <label>Task Description (Optional):</label>
                <input
                  type="text"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Enter task description..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowTaskCreator(false)}
              >
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
        </div>
      )}
    </div>
  );
};

export default RobotInterfaceDemo;
