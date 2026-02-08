"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  towerDefenseDefeat,
  towerDefenseEnemies,
  towerDefenseMission,
  towerDefensePlacement,
  towerDefenseWaves,
  type EnemyDef,
} from "@/constants/games";

// =============================================================================
// Types
// =============================================================================

type GamePhase = 
  | "placeWall" 
  | "placeGun" 
  | "missionBriefing" 
  | "playing" 
  | "waveComplete" 
  | "defeat";

type Enemy = {
  id: string;
  x: number;
  y: number;
  label: string;
  hitText: string;
  speed: number;
  health: number;
  maxHealth: number;
  width: number;
  height: number;
  showingHitText: boolean;
  hitTextTimer: number;
  dying: boolean;
  deathTimer: number;
  isBoss: boolean;
};

type Bullet = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type GameState = {
  phase: GamePhase;
  enemies: Enemy[];
  bullets: Bullet[];
  turretAngle: number;
  wallHealth: number;
  maxWallHealth: number;
  wave: number;
  score: number;
  mouseX: number;
  mouseY: number;
  canFire: boolean;
  fireTimer: number;
  waveCompleteTimer: number;
  spawnTimer: number;
  spawnInterval: number;
  enemySpeedMultiplier: number;
  enemiesToSpawn: EnemyDef[];
  wallPlaced: boolean;
  gunPlaced: boolean;
  placementPulse: number;
  ammo: number;
  maxAmmo: number;
  suppressFireUntil: number;
};

// =============================================================================
// Constants
// =============================================================================

const FIRE_COOLDOWN = 20;
const BULLET_SPEED = 12;
const BULLET_RADIUS = 6;
const ENEMY_WIDTH = 80;  // Increased from 60
const ENEMY_HEIGHT = 90; // Increased from 70
const BOSS_SCALE = 2;    // Boss is 2x size
const WALL_Y_OFFSET = 100;
const TURRET_Y_OFFSET = 40;
const WAVE_COMPLETE_DELAY = 2500;
const HIT_TEXT_DURATION = 1000;
const DEATH_ANIMATION_DURATION = 300;
const MAX_AMMO = 100;

// =============================================================================
// Component
// =============================================================================

const TowerDefenseGame = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef<GameState | null>(null);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const imagesRef = useRef<{
    turret: HTMLImageElement | null;
    bullet: HTMLImageElement | null;
    enemy: HTMLImageElement | null;
    explosion: HTMLImageElement | null;
    wall: HTMLImageElement | null;
  }>({
    turret: null,
    bullet: null,
    enemy: null,
    explosion: null,
    wall: null,
  });

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [showDefeatOverlay, setShowDefeatOverlay] = useState(false);
  const [showBriefing, setShowBriefing] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Initialize game state
  const initGameState = useCallback((): GameState => {
    return {
      phase: "placeWall",
      enemies: [],
      bullets: [],
      turretAngle: -Math.PI / 2,
      wallHealth: 100,
      maxWallHealth: 100,
      wave: 0,
      score: 0,
      mouseX: dimensions.width / 2,
      mouseY: dimensions.height / 2,
      canFire: true,
      fireTimer: 0,
      waveCompleteTimer: 0,
      spawnTimer: 0,
      spawnInterval: 1200,
      enemySpeedMultiplier: 1.0,
      enemiesToSpawn: [],
      wallPlaced: false,
      gunPlaced: false,
      placementPulse: 0,
      ammo: MAX_AMMO,
      maxAmmo: MAX_AMMO,
      suppressFireUntil: 0,
    };
  }, [dimensions.width, dimensions.height]);

  // Load images
  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all([
      loadImage("/assets/game/gun.png"),
      loadImage("/assets/game/ammo.png"),
      loadImage("/assets/game/enemy.svg"),
      loadImage("/assets/game/explosion.svg"),
      loadImage("/assets/game/wall.png"),
    ]).then(([turret, bullet, enemy, explosion, wall]) => {
      imagesRef.current = { turret, bullet, enemy, explosion, wall };
      setImagesLoaded(true);
    }).catch((err) => {
      console.error("Failed to load game images:", err);
    });
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize game
  useEffect(() => {
    if (!imagesLoaded) return;
    gameStateRef.current = initGameState();
  }, [imagesLoaded, initGameState]);

  // Spawn enemy helper
  const spawnEnemy = useCallback((def: EnemyDef, canvasWidth: number, speedMultiplier: number): Enemy => {
    const isBoss = def.isBoss ?? false;
    const width = isBoss ? ENEMY_WIDTH * BOSS_SCALE : ENEMY_WIDTH;
    const height = isBoss ? ENEMY_HEIGHT * BOSS_SCALE : ENEMY_HEIGHT;
    const margin = width;
    
    // Boss spawns in center, others spawn randomly
    const x = isBoss 
      ? canvasWidth / 2 
      : margin + Math.random() * (canvasWidth - margin * 2);
    
    return {
      id: `${def.id}-${Date.now()}-${Math.random()}`,
      x,
      y: -height,
      label: def.label,
      hitText: def.hitText,
      speed: (0.8 + Math.random() * 0.4) * speedMultiplier,
      health: isBoss ? Infinity : 1,  // Boss has infinite health
      maxHealth: isBoss ? Infinity : 1,
      width,
      height,
      showingHitText: false,
      hitTextTimer: 0,
      dying: false,
      deathTimer: 0,
      isBoss,
    };
  }, []);

  // Start game after briefing
  const startGame = useCallback(() => {
    const state = gameStateRef.current;
    if (!state) return;

    const firstWave = towerDefenseWaves[0];
    state.enemiesToSpawn = firstWave
      ? firstWave.enemyIds
          .map((id) => towerDefenseEnemies.find((e) => e.id === id))
          .filter((e): e is EnemyDef => e !== undefined)
      : [];
    state.spawnInterval = firstWave?.spawnInterval ?? 1200;
    state.enemySpeedMultiplier = firstWave?.enemySpeed ?? 1.0;
    state.phase = "playing";
    state.suppressFireUntil = performance.now() + 200;
    setShowBriefing(false);
  }, []);

  // Fire bullet
  const fireBullet = useCallback(() => {
    const state = gameStateRef.current;
    if (!state || !state.canFire || state.phase !== "playing" || state.ammo <= 0) return;

    const turretX = dimensions.width / 2;
    const turretY = dimensions.height - TURRET_Y_OFFSET;
    
    const angle = state.turretAngle;
    const vx = Math.cos(angle) * BULLET_SPEED;
    const vy = Math.sin(angle) * BULLET_SPEED;

    state.bullets.push({
      id: `bullet-${Date.now()}`,
      x: turretX,
      y: turretY - 30,
      vx,
      vy,
      radius: BULLET_RADIUS,
    });

    state.ammo -= 1;
    state.canFire = false;
    state.fireTimer = FIRE_COOLDOWN;
  }, [dimensions.width, dimensions.height]);

  // Handle placement clicks
  const handlePlacementClick = useCallback((clickX: number, clickY: number) => {
    const state = gameStateRef.current;
    if (!state) return;

    const wallY = dimensions.height - WALL_Y_OFFSET;
    const wallWidth = dimensions.width * 0.8;
    const wallX = (dimensions.width - wallWidth) / 2;
    const wallHeight = 30;
    const wallRenderHeight = imagesRef.current.wall
      ? Math.max(
          40,
          (imagesRef.current.wall.height / imagesRef.current.wall.width) * wallWidth
        )
      : wallHeight;

    const turretX = dimensions.width / 2;
    const turretY = dimensions.height - TURRET_Y_OFFSET;

    if (state.phase === "placeWall") {
      if (
        clickX >= wallX - 20 &&
        clickX <= wallX + wallWidth + 20 &&
        clickY >= wallY - wallRenderHeight - 20 &&
        clickY <= wallY + wallRenderHeight + 20
      ) {
        state.wallPlaced = true;
        state.phase = "placeGun";
      }
    } else if (state.phase === "placeGun") {
      const dx = clickX - turretX;
      const dy = clickY - turretY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 60) {
        state.gunPlaced = true;
        state.phase = "missionBriefing";
        setShowBriefing(true);
      }
    }
  }, [dimensions]);

  // Mouse handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameStateRef.current) return;
      gameStateRef.current.mouseX = e.clientX;
      gameStateRef.current.mouseY = e.clientY;
    };

    const handlePointerFire = (clientX: number, clientY: number) => {
      const state = gameStateRef.current;
      if (!state) return;

      state.mouseX = clientX;
      state.mouseY = clientY;

      if (state.phase === "placeWall" || state.phase === "placeGun") {
        handlePlacementClick(clientX, clientY);
      } else if (state.phase === "playing") {
        if (performance.now() < state.suppressFireUntil) return;
        const turretX = dimensions.width / 2;
        const turretY = dimensions.height - TURRET_Y_OFFSET;
        const angle = Math.atan2(clientY - turretY, clientX - turretX);
        state.turretAngle = angle > 0 ? (clientX > turretX ? -0.1 : -Math.PI + 0.1) : angle;
        fireBullet();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      handlePointerFire(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [fireBullet, handlePlacementClick]);

  // Game loop
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const gameLoop = (timestamp: number) => {
      const state = gameStateRef.current;
      if (!state) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16;
      lastTimeRef.current = timestamp;

      state.placementPulse = (state.placementPulse + deltaTime * 0.003) % (Math.PI * 2);

      const turretX = dimensions.width / 2;
      const turretY = dimensions.height - TURRET_Y_OFFSET;
      const wallY = dimensions.height - WALL_Y_OFFSET;
      const wallWidth = dimensions.width * 0.8;
      const wallX = (dimensions.width - wallWidth) / 2;
      const wallHeight = 30;
      const wallRenderHeight = imagesRef.current.wall
        ? Math.max(
            40,
            (imagesRef.current.wall.height / imagesRef.current.wall.width) * wallWidth
          )
        : wallHeight;

      if (state.phase === "playing") {
        state.turretAngle = Math.atan2(
          state.mouseY - turretY,
          state.mouseX - turretX
        );
        if (state.turretAngle > 0) {
          state.turretAngle = state.mouseX > turretX ? -0.1 : -Math.PI + 0.1;
        }
      }

      if (!state.canFire) {
        state.fireTimer -= deltaTime;
        if (state.fireTimer <= 0) {
          state.canFire = true;
          state.fireTimer = 0;
        }
      }

      // Spawn enemies
      if (state.phase === "playing" && state.enemiesToSpawn.length > 0) {
        state.spawnTimer -= deltaTime;
        if (state.spawnTimer <= 0) {
          const nextEnemy = state.enemiesToSpawn.shift();
          if (nextEnemy) {
            state.enemies.push(spawnEnemy(nextEnemy, dimensions.width, state.enemySpeedMultiplier));
          }
          state.spawnTimer = state.spawnInterval;
        }
      }

      // Update bullets
      if (state.phase === "playing") {
        state.bullets = state.bullets.filter((bullet) => {
          bullet.x += bullet.vx;
          bullet.y += bullet.vy;
          if (
            bullet.x < -50 ||
            bullet.x > dimensions.width + 50 ||
            bullet.y < -50 ||
            bullet.y > dimensions.height + 50
          ) {
            return false;
          }
          return true;
        });
      }

      // Update enemies
      if (state.phase === "playing") {
        state.enemies = state.enemies.filter((enemy) => {
          // Handle dying enemies (non-boss only)
          if (enemy.dying) {
            enemy.deathTimer -= deltaTime;
            if (enemy.deathTimer <= 0) return false;
            return true;
          }

          // Handle hit text display
          if (enemy.showingHitText) {
            enemy.hitTextTimer -= deltaTime;
            if (enemy.hitTextTimer <= 0) {
              enemy.showingHitText = false;
              // Boss doesn't die, just continues
              if (!enemy.isBoss) {
                enemy.dying = true;
                enemy.deathTimer = DEATH_ANIMATION_DURATION;
              }
            }
            // Boss keeps moving even while showing hit text
            if (enemy.isBoss) {
              enemy.y += enemy.speed;
            } else {
              return true;
            }
          }

          enemy.y += enemy.speed;

          // Check if reached wall
          if (enemy.y + enemy.height / 2 >= wallY) {
            // Boss reaching wall = instant defeat
            if (enemy.isBoss) {
              state.phase = "defeat";
              setShowDefeatOverlay(true);
              return false;
            }
            state.wallHealth -= 10;
            if (state.wallHealth <= 0) {
              state.wallHealth = 0;
              state.phase = "defeat";
              setShowDefeatOverlay(true);
            }
            return false;
          }

          // Check collision with bullets
          for (let i = state.bullets.length - 1; i >= 0; i--) {
            const bullet = state.bullets[i];
            const dx = bullet.x - enemy.x;
            const dy = bullet.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < enemy.width / 2 + bullet.radius) {
              state.bullets.splice(i, 1);
              
              if (enemy.isBoss) {
                // Boss: show hit text but don't reduce health
                enemy.showingHitText = true;
                enemy.hitTextTimer = HIT_TEXT_DURATION;
              } else {
                // Normal enemy: reduce health
                enemy.health -= 1;
                if (enemy.health <= 0) {
                  state.score += 10;
                  enemy.showingHitText = true;
                  enemy.hitTextTimer = HIT_TEXT_DURATION;
                }
              }
              break;
            }
          }

          return true;
        });
      }

      // Check wave completion
      if (
        state.phase === "playing" &&
        state.enemies.length === 0 &&
        state.enemiesToSpawn.length === 0
      ) {
        state.phase = "waveComplete";
        state.waveCompleteTimer = WAVE_COMPLETE_DELAY;
      }

      // Handle wave transition
      if (state.phase === "waveComplete") {
        state.waveCompleteTimer -= deltaTime;
        if (state.waveCompleteTimer <= 0) {
          state.wave += 1;
          if (state.wave < towerDefenseWaves.length) {
            const nextWave = towerDefenseWaves[state.wave];
            state.enemiesToSpawn = nextWave
              ? nextWave.enemyIds
                  .map((id) => towerDefenseEnemies.find((e) => e.id === id))
                  .filter((e): e is EnemyDef => e !== undefined)
              : [];
            state.spawnInterval = nextWave?.spawnInterval ?? 1200;
            state.enemySpeedMultiplier = nextWave?.enemySpeed ?? 1.0;
            state.spawnTimer = 500;
            state.phase = "playing";
          } else {
            state.phase = "defeat";
            setShowDefeatOverlay(true);
          }
        }
      }

      // =======================================================================
      // Render
      // =======================================================================
      
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw grid
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Draw path
      const pathWidth = 300;
      const pathX = (dimensions.width - pathWidth) / 2;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(pathX, 0, pathWidth, wallY);

      // Draw wall placement zone or wall
      if (state.phase === "placeWall" && !state.wallPlaced) {
        const pulseAlpha = 0.3 + Math.sin(state.placementPulse) * 0.2;
        ctx.fillStyle = `rgba(239, 68, 68, ${pulseAlpha})`;
        ctx.fillRect(
          wallX - 10,
          wallY - wallRenderHeight / 2 - 10,
          wallWidth + 20,
          wallRenderHeight + 20
        );
        
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(
          wallX - 10,
          wallY - wallRenderHeight / 2 - 10,
          wallWidth + 20,
          wallRenderHeight + 20
        );
        ctx.setLineDash([]);
      } else if (state.wallPlaced) {
        if (imagesRef.current.wall) {
          ctx.drawImage(
            imagesRef.current.wall,
            wallX,
            wallY - wallRenderHeight / 2,
            wallWidth,
            wallRenderHeight
          );
        } else {
          ctx.fillStyle = "#374151";
          ctx.fillRect(wallX, wallY - wallRenderHeight / 2, wallWidth, wallRenderHeight);
        }
        
        const healthPercent = state.wallHealth / state.maxWallHealth;
        const healthColor = healthPercent > 0.5 ? "#22c55e" : healthPercent > 0.25 ? "#eab308" : "#ef4444";
        ctx.fillStyle = healthColor;
        ctx.fillRect(
          wallX + 4,
          wallY - wallHeight / 2 + 4,
          (wallWidth - 8) * healthPercent,
          wallHeight - 8
        );
        
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          wallX + 2,
          wallY - wallHeight / 2 + 2,
          wallWidth - 4,
          wallHeight - 4
        );

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("20 YOE REQUIRED", dimensions.width / 2, wallY + 5);
      }

      // Draw gun placement zone or turret
      if (state.phase === "placeGun" && !state.gunPlaced) {
        const pulseAlpha = 0.3 + Math.sin(state.placementPulse) * 0.2;
        ctx.fillStyle = `rgba(96, 165, 250, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(turretX, turretY, 50, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = "#60a5fa";
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.arc(turretX, turretY, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (state.gunPlaced) {
        ctx.save();
        ctx.translate(turretX, turretY);
        ctx.rotate(state.turretAngle + Math.PI / 2);

        if (imagesRef.current.turret) {
          const turretSize = 100;
          ctx.drawImage(
            imagesRef.current.turret,
            -turretSize / 2,
            -turretSize / 2,
            turretSize,
            turretSize
          );
        } else {
          ctx.fillStyle = "#6b7280";
          ctx.fillRect(-10, -40, 20, 50);
          ctx.fillStyle = "#4b5563";
          ctx.beginPath();
          ctx.arc(0, 10, 20, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (state.phase === "placeGun" || state.phase === "missionBriefing") {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 12px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("CULTURE FIT GUN", turretX, turretY + 60);
        }
      }

      // Draw enemies
      for (const enemy of state.enemies) {
        ctx.save();
        
        if (enemy.dying) {
          const progress = 1 - enemy.deathTimer / DEATH_ANIMATION_DURATION;
          ctx.globalAlpha = 1 - progress;
          ctx.translate(enemy.x, enemy.y);
          ctx.scale(1 - progress * 0.5, 1 - progress * 0.5);
          ctx.translate(-enemy.x, -enemy.y);
        }

        // Boss has red glow
        if (enemy.isBoss) {
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 30;
        }

        if (imagesRef.current.enemy) {
          ctx.drawImage(
            imagesRef.current.enemy,
            enemy.x - enemy.width / 2,
            enemy.y - enemy.height / 2,
            enemy.width,
            enemy.height
          );
        } else {
          ctx.fillStyle = enemy.isBoss ? "#fecaca" : "#f3f4f6";
          ctx.fillRect(
            enemy.x - enemy.width / 2,
            enemy.y - enemy.height / 2,
            enemy.width,
            enemy.height
          );
        }

        ctx.shadowBlur = 0;

        // Boss label is bigger and red
        if (enemy.isBoss) {
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 16px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("⭐ BOSS ⭐", enemy.x, enemy.y - enemy.height / 2 - 30);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 14px system-ui, sans-serif";
          ctx.fillText(enemy.label, enemy.x, enemy.y - enemy.height / 2 - 10);
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(enemy.label, enemy.x, enemy.y - enemy.height / 2 - 8);
        }

        if (enemy.showingHitText) {
          ctx.fillStyle = enemy.isBoss ? "#fcd34d" : "#ef4444";
          ctx.font = enemy.isBoss ? "bold 18px system-ui, sans-serif" : "bold 14px system-ui, sans-serif";
          const yOffset = (1 - enemy.hitTextTimer / HIT_TEXT_DURATION) * 30;
          ctx.fillText(`"${enemy.hitText}"`, enemy.x, enemy.y - enemy.height / 2 - (enemy.isBoss ? 50 : 25) - yOffset);
        }

        ctx.restore();
      }

      // Draw bullets
      for (const bullet of state.bullets) {
        if (imagesRef.current.bullet) {
          const size = bullet.radius * 4;
          ctx.drawImage(
            imagesRef.current.bullet,
            bullet.x - size / 2,
            bullet.y - size / 2,
            size,
            size
          );
        } else {
          ctx.fillStyle = "#fcd34d";
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = "rgba(252, 211, 77, 0.3)";
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fcd34d";
        }
      }

      // Draw crosshair
      if (state.phase === "playing") {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        const crosshairSize = 20;
        ctx.beginPath();
        ctx.arc(state.mouseX, state.mouseY, crosshairSize / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(state.mouseX - crosshairSize, state.mouseY);
        ctx.lineTo(state.mouseX - crosshairSize / 3, state.mouseY);
        ctx.moveTo(state.mouseX + crosshairSize / 3, state.mouseY);
        ctx.lineTo(state.mouseX + crosshairSize, state.mouseY);
        ctx.moveTo(state.mouseX, state.mouseY - crosshairSize);
        ctx.lineTo(state.mouseX, state.mouseY - crosshairSize / 3);
        ctx.moveTo(state.mouseX, state.mouseY + crosshairSize / 3);
        ctx.lineTo(state.mouseX, state.mouseY + crosshairSize);
        ctx.stroke();
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(state.mouseX, state.mouseY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw HUD
      const currentWave = towerDefenseWaves[state.wave];

      if (state.phase === "playing" || state.phase === "waveComplete") {
        // Wave info (top right)
        ctx.textAlign = "right";
        ctx.fillStyle = "#9ca3af";
        ctx.font = "bold 14px system-ui, sans-serif";
        ctx.fillText(currentWave?.name ?? `WAVE ${state.wave + 1}`, dimensions.width - 20, 25);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText(currentWave?.theme ?? "", dimensions.width - 20, 50);

        // Score (top left)
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText(`Score: ${state.score}`, 20, 30);

        // Ammo counter (bottom right)
        ctx.textAlign = "right";
        ctx.fillStyle = state.ammo > 5 ? "#ffffff" : "#ef4444";
        ctx.font = "bold 16px system-ui, sans-serif";
        ctx.fillText(`INTERVIEW QUESTIONS: ${state.ammo}`, dimensions.width - 20, dimensions.height - 60);
        
        // Ammo warning when low
        if (state.ammo <= 5 && state.ammo > 0) {
          ctx.fillStyle = "#ef4444";
          ctx.font = "12px system-ui, sans-serif";
          ctx.fillText("LOW AMMO!", dimensions.width - 20, dimensions.height - 40);
        } else if (state.ammo === 0) {
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 14px system-ui, sans-serif";
          ctx.fillText("OUT OF QUESTIONS!", dimensions.width - 20, dimensions.height - 40);
        }

        // Wall health label
        if (state.wallPlaced) {
          const healthPercent = state.wallHealth / state.maxWallHealth;
          const healthColor = healthPercent > 0.5 ? "#22c55e" : healthPercent > 0.25 ? "#eab308" : "#ef4444";
          ctx.textAlign = "center";
          ctx.fillStyle = "#9ca3af";
          ctx.font = "12px system-ui, sans-serif";
          ctx.fillStyle = healthColor;
          ctx.font = "bold 16px system-ui, sans-serif";
          ctx.fillText(`${state.wallHealth}%`, dimensions.width / 2, wallY - wallHeight);
        }
      }

      // Wave complete message
      if (state.phase === "waveComplete") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, dimensions.height / 2 - 50, dimensions.width, 100);
        ctx.fillStyle = "#22c55e";
        ctx.font = "bold 32px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("WAVE COMPLETE!", dimensions.width / 2, dimensions.height / 2);

        if (state.wave < towerDefenseWaves.length - 1) {
          const nextWave = towerDefenseWaves[state.wave + 1];
          ctx.fillStyle = nextWave?.theme === "THE CANDIDATE" ? "#ef4444" : "#9ca3af";
          ctx.font = "16px system-ui, sans-serif";
          ctx.fillText(`Next: ${nextWave?.theme ?? ""}`, dimensions.width / 2, dimensions.height / 2 + 30);
        }
      }

      // Placement tutorial instructions
      if (state.phase === "placeWall") {
        const bubbleWidth = 360;
        const bubbleHeight = 60;
        const bubbleX = dimensions.width / 2 - bubbleWidth / 2;
        const bubbleY = 60;

        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.beginPath();
        ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
        ctx.fill();

        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(towerDefensePlacement.wall.instruction, dimensions.width / 2, bubbleY + 38);
      }

      if (state.phase === "placeGun") {
        const bubbleWidth = 360;
        const bubbleHeight = 80;
        const bubbleX = dimensions.width / 2 - bubbleWidth / 2;
        const bubbleY = 60;

        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.beginPath();
        ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
        ctx.fill();

        ctx.strokeStyle = "#60a5fa";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(towerDefensePlacement.gun.instruction, dimensions.width / 2, bubbleY + 35);
        
        ctx.fillStyle = "#9ca3af";
        ctx.font = "14px system-ui, sans-serif";
        ctx.fillText("(Fires interview questions)", dimensions.width / 2, bubbleY + 58);
      }

      // Wave 3 warning
      if (state.phase === "playing" && state.wave === 2 && state.enemies.length < 5 && state.enemiesToSpawn.length > 5) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 24px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("⚠ INCOMING! ⚠", dimensions.width / 2, 100);
      }

      // Boss wave warning
      if (state.phase === "playing" && state.wave === 3) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [imagesLoaded, dimensions, spawnEnemy]);

  const handleDefeatCta = (href: string) => {
    router.push(href);
  };

  const cursorStyle = gameStateRef.current?.phase === "playing" ? "none" : "default";

  return (
    <div
      ref={containerRef}
      className="td-game-container"
      style={{ cursor: cursorStyle }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="td-game-canvas"
      />

      {/* Mission Briefing overlay */}
      {showBriefing && (
        <div className="td-briefing-overlay">
          <div className="td-briefing-content">
            <p className="td-briefing-title">{towerDefenseMission.title}</p>
            <h2 className="td-briefing-mission">{towerDefenseMission.mission}</h2>
            <p className="td-briefing-subtitle">{towerDefenseMission.subtitle}</p>
            <p className="mt-4 text-sm text-yellow-500">{towerDefenseMission.warning}</p>
            <button
              className="td-briefing-button"
              onClick={startGame}
            >
              {towerDefenseMission.startButton}
            </button>
          </div>
        </div>
      )}

      {/* Defeat overlay */}
      {showDefeatOverlay && (
        <div className="td-defeat-overlay">
          <div className="td-defeat-content">
            <h1 className="td-defeat-title">{towerDefenseDefeat.title}</h1>
            <p className="td-defeat-subtitle">{towerDefenseDefeat.subtitle}</p>
            <div className="td-defeat-ctas">
              {towerDefenseDefeat.ctas.map((cta) => (
                <button
                  key={cta.id}
                  className={cta.id === "hire" ? "btn-primary" : "btn-secondary"}
                  onClick={() => handleDefeatCta(cta.href)}
                >
                  {cta.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exit button */}
      <button
        className="td-exit-button"
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      >
        ← Exit
      </button>
    </div>
  );
};

export default TowerDefenseGame;
