"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  jrpgIntro,
  jrpgIntroScreen,
  jrpgConversations,
  jrpgFinalBlow,
  jrpgVictory,
  type JrpgConversation,
} from "@/constants/games";

// =============================================================================
// Types
// =============================================================================

type GamePhase =
  | "intro"           // Explanation screen
  | "selectAttack"    // Player picks 1 of 5 questions
  | "conversation1"   // Recruiter asks question
  | "conversation2"   // Candidate responds
  | "conversation3"   // Recruiter counters + damage
  | "finalOption"     // Final button appears
  | "finalBlow1"      // Recruiter's final line
  | "finalBlow2"      // Candidate's counter
  | "victory";        // Win screen

type Fighter = {
  x: number;
  y: number;
  baseX: number;
  hp: number;
  maxHp: number;
  isAttacking: boolean;
  isHurt: boolean;
  hurtTimer: number;
  shake: number;
};

type FloatingText = {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  vy: number;
  color: string;
  size: number;
};

type GameState = {
  phase: GamePhase;
  recruiter: Fighter;
  candidate: Fighter;
  usedConversations: string[];
  currentConversation: JrpgConversation | null;
  speechBubble: { text: string; speaker: "recruiter" | "candidate"; timer: number } | null;
  floatingTexts: FloatingText[];
  phaseTimer: number;
  screenShake: number;
  showCritical: boolean;
  criticalTimer: number;
};

// =============================================================================
// Constants
// =============================================================================

const SPEECH_DURATION = 2000;
const HURT_DURATION = 400;
const CRITICAL_DURATION = 600;

// =============================================================================
// Component
// =============================================================================

const JrpgBossFightGame = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState | null>(null);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const imagesRef = useRef<{
    recruiter: HTMLImageElement | null;
    candidate: HTMLImageElement | null;
    arena: HTMLImageElement | null;
    criticalEffect: HTMLImageElement | null;
  }>({
    recruiter: null,
    candidate: null,
    arena: null,
    criticalEffect: null,
  });

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const [uiState, setUiState] = useState<{
    phase: GamePhase;
    usedConversations: string[];
  }>({
    phase: "intro",
    usedConversations: [],
  });
  const uiStateRef = useRef(uiState);

  const syncUiState = useCallback((phase: GamePhase, usedConversations: string[]) => {
    const current = uiStateRef.current;
    if (
      current.phase !== phase
      || current.usedConversations.length !== usedConversations.length
    ) {
      const next = { phase, usedConversations: [...usedConversations] };
      uiStateRef.current = next;
      setUiState(next);
    }
  }, []);

  // Initialize game state
  const initGameState = useCallback((): GameState => {
    const recruiterX = dimensions.width * 0.25;
    const candidateX = dimensions.width * 0.75;
    const fighterY = dimensions.height * 0.55;

    return {
      phase: "intro",
      recruiter: {
        x: recruiterX,
        y: fighterY,
        baseX: recruiterX,
        hp: jrpgIntro.recruiter.hp,
        maxHp: jrpgIntro.recruiter.hp,
        isAttacking: false,
        isHurt: false,
        hurtTimer: 0,
        shake: 0,
      },
      candidate: {
        x: candidateX,
        y: fighterY,
        baseX: candidateX,
        hp: jrpgIntro.candidate.hp,
        maxHp: jrpgIntro.candidate.hp,
        isAttacking: false,
        isHurt: false,
        hurtTimer: 0,
        shake: 0,
      },
      usedConversations: [],
      currentConversation: null,
      speechBubble: null,
      floatingTexts: [],
      phaseTimer: 0,
      screenShake: 0,
      showCritical: false,
      criticalTimer: 0,
    };
  }, [dimensions]);

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
      loadImage("/assets/game/recruiter.svg"),
      loadImage("/assets/game/candidate.svg"),
      loadImage("/assets/game/arena-bg.svg"),
      loadImage("/assets/game/critical-effect.svg"),
    ]).then(([recruiter, candidate, arena, criticalEffect]) => {
      imagesRef.current = { recruiter, candidate, arena, criticalEffect };
      setImagesLoaded(true);
    }).catch((err) => {
      console.error("Failed to load game images:", err);
      setImagesLoaded(true);
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

  // Start the game
  const handleStartGame = useCallback(() => {
    setShowIntro(false);
    if (gameStateRef.current) {
      gameStateRef.current.phase = "selectAttack";
      syncUiState(gameStateRef.current.phase, gameStateRef.current.usedConversations);
    }
  }, [syncUiState]);

  // Handle conversation selection
  const handleSelectConversation = useCallback((conversation: JrpgConversation) => {
    const state = gameStateRef.current;
    if (!state || state.phase !== "selectAttack") return;

    state.currentConversation = conversation;
    state.usedConversations.push(conversation.id);
    state.phase = "conversation1";
    state.phaseTimer = 0;

    // Show recruiter's question
    state.speechBubble = {
      text: conversation.recruiterLine,
      speaker: "recruiter",
      timer: SPEECH_DURATION,
    };
    state.recruiter.isAttacking = true;
    syncUiState(state.phase, state.usedConversations);
  }, [syncUiState]);

  // Handle final blow button
  const handleFinalBlow = useCallback(() => {
    const state = gameStateRef.current;
    if (!state || state.phase !== "finalOption") return;

    state.phase = "finalBlow1";
    state.phaseTimer = 0;
    state.speechBubble = {
      text: jrpgFinalBlow.recruiterLine,
      speaker: "recruiter",
      timer: SPEECH_DURATION,
    };
    state.recruiter.isAttacking = true;
    syncUiState(state.phase, state.usedConversations);
  }, [syncUiState]);

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

      // Update phase timer
      state.phaseTimer += deltaTime;

      // Update speech bubble
      if (state.speechBubble) {
        state.speechBubble.timer -= deltaTime;
        if (state.speechBubble.timer <= 0) {
          state.speechBubble = null;
          state.recruiter.isAttacking = false;
          state.candidate.isAttacking = false;

          // Progress through conversation phases
          if (state.phase === "conversation1") {
            // Move to candidate response
            state.phase = "conversation2";
            state.phaseTimer = 0;
            if (state.currentConversation) {
              state.speechBubble = {
                text: state.currentConversation.candidateResponse,
                speaker: "candidate",
                timer: SPEECH_DURATION,
              };
              state.candidate.isAttacking = true;

              // Candidate response hits recruiter for 10
              const responseDamage = 10;
              state.recruiter.hp = Math.max(0, state.recruiter.hp - responseDamage);
              state.recruiter.isHurt = true;
              state.recruiter.hurtTimer = HURT_DURATION;

              state.floatingTexts.push({
                id: `resp-${Date.now()}`,
                text: `-${responseDamage}`,
                x: state.recruiter.x,
                y: state.recruiter.y - 100,
                opacity: 1,
                vy: -2,
                color: "#f97316",
                size: 24,
              });
            }
          } else if (state.phase === "conversation2") {
            // Move to recruiter counter
            state.phase = "conversation3";
            state.phaseTimer = 0;
            if (state.currentConversation) {
              state.speechBubble = {
                text: state.currentConversation.recruiterCounter,
                speaker: "recruiter",
                timer: SPEECH_DURATION,
              };
              state.recruiter.isAttacking = true;

              // Apply damage to candidate
              const damage = state.currentConversation.damageToCandidate;
              state.candidate.hp = Math.max(1, state.candidate.hp - damage);
              state.candidate.isHurt = true;
              state.candidate.hurtTimer = HURT_DURATION;

              // Floating damage text
              state.floatingTexts.push({
                id: `dmg-${Date.now()}`,
                text: `-${damage}`,
                x: state.candidate.x,
                y: state.candidate.y - 100,
                opacity: 1,
                vy: -2,
                color: "#ef4444",
                size: 28,
              });
            }
          } else if (state.phase === "conversation3") {
            state.currentConversation = null;
            // Check if all conversations used
            if (state.usedConversations.length >= jrpgConversations.length) {
              state.phase = "finalOption";
            } else {
              state.phase = "selectAttack";
            }
          } else if (state.phase === "finalBlow1") {
            // Move to candidate's final response
            state.phase = "finalBlow2";
            state.phaseTimer = 0;
            state.speechBubble = {
              text: jrpgFinalBlow.candidateResponse,
              speaker: "candidate",
              timer: SPEECH_DURATION + 500,
            };
            state.candidate.isAttacking = true;

            // Critical hit effect
            state.showCritical = true;
            state.criticalTimer = CRITICAL_DURATION;
            state.screenShake = 20;

            // Apply damage to recruiter
            state.recruiter.hp = 0;
            state.recruiter.isHurt = true;
            state.recruiter.hurtTimer = HURT_DURATION * 3;

            // Floating damage text
            state.floatingTexts.push({
              id: `crit-${Date.now()}`,
              text: `-${jrpgFinalBlow.damageToRecruiter}`,
              x: state.recruiter.x,
              y: state.recruiter.y - 100,
              opacity: 1,
              vy: -2,
              color: "#22c55e",
              size: 36,
            });
            state.floatingTexts.push({
              id: `crit-text-${Date.now()}`,
              text: "CRITICAL HIT!",
              x: state.recruiter.x,
              y: state.recruiter.y - 140,
              opacity: 1,
              vy: -1.5,
              color: "#fbbf24",
              size: 32,
            });
          } else if (state.phase === "finalBlow2") {
            // Victory!
            state.phase = "victory";
            setShowVictory(true);
          }
        }
      }

      // Update hurt animations
      if (state.recruiter.isHurt) {
        state.recruiter.hurtTimer -= deltaTime;
        state.recruiter.shake = Math.sin(timestamp * 0.05) * 8;
        if (state.recruiter.hurtTimer <= 0) {
          state.recruiter.isHurt = false;
          state.recruiter.shake = 0;
        }
      }

      if (state.candidate.isHurt) {
        state.candidate.hurtTimer -= deltaTime;
        state.candidate.shake = Math.sin(timestamp * 0.05) * 8;
        if (state.candidate.hurtTimer <= 0) {
          state.candidate.isHurt = false;
          state.candidate.shake = 0;
        }
      }

      // Update floating texts
      state.floatingTexts = state.floatingTexts.filter((ft) => {
        ft.y += ft.vy;
        ft.opacity -= 0.012;
        return ft.opacity > 0;
      });

      // Update screen shake
      if (state.screenShake > 0) {
        state.screenShake *= 0.92;
        if (state.screenShake < 0.5) state.screenShake = 0;
      }

      // Update critical effect
      if (state.criticalTimer > 0) {
        state.criticalTimer -= deltaTime;
        if (state.criticalTimer <= 0) {
          state.showCritical = false;
        }
      }

      syncUiState(state.phase, state.usedConversations);

      // =======================================================================
      // Render
      // =======================================================================

      ctx.save();

      // Apply screen shake
      if (state.screenShake > 0) {
        ctx.translate(
          (Math.random() - 0.5) * state.screenShake,
          (Math.random() - 0.5) * state.screenShake
        );
      }

      // Draw background
      if (imagesRef.current.arena) {
        ctx.drawImage(imagesRef.current.arena, 0, 0, dimensions.width, dimensions.height);
      } else {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      // Draw fighters
      const spriteSize = Math.min(dimensions.width * 0.2, 200);

      // Recruiter
      ctx.save();
      const recruiterDrawX = state.recruiter.x + state.recruiter.shake;
      if (state.recruiter.isHurt) {
        ctx.globalAlpha = 0.4 + Math.sin(timestamp * 0.04) * 0.3;
      }
      if (state.recruiter.isAttacking) {
        ctx.translate(recruiterDrawX + 15, state.recruiter.y);
      } else {
        ctx.translate(recruiterDrawX, state.recruiter.y);
      }

      if (imagesRef.current.recruiter) {
        ctx.drawImage(
          imagesRef.current.recruiter,
          -spriteSize / 2,
          -spriteSize,
          spriteSize,
          spriteSize * 1.5
        );
      } else {
        ctx.fillStyle = "#374151";
        ctx.fillRect(-spriteSize / 4, -spriteSize, spriteSize / 2, spriteSize);
      }
      ctx.restore();

      // Candidate
      ctx.save();
      const candidateDrawX = state.candidate.x + state.candidate.shake;
      if (state.candidate.isHurt) {
        ctx.globalAlpha = 0.4 + Math.sin(timestamp * 0.04) * 0.3;
      }
      if (state.candidate.isAttacking) {
        ctx.translate(candidateDrawX - 15, state.candidate.y);
      } else {
        ctx.translate(candidateDrawX, state.candidate.y);
      }

      ctx.scale(-1, 1);

      if (imagesRef.current.candidate) {
        ctx.drawImage(
          imagesRef.current.candidate,
          -spriteSize / 2,
          -spriteSize,
          spriteSize,
          spriteSize * 1.5
        );
      } else {
        ctx.fillStyle = "#6366f1";
        ctx.fillRect(-spriteSize / 4, -spriteSize, spriteSize / 2, spriteSize);
      }
      ctx.restore();

      // Draw health bars
      const barWidth = 300;
      const barHeight = 30;
      const barY = 40;

      // Recruiter HP bar (left)
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(40, barY, barWidth, barHeight);
      const recruiterHpPercent = state.recruiter.hp / state.recruiter.maxHp;
      ctx.fillStyle = recruiterHpPercent > 0.3 ? "#ef4444" : "#dc2626";
      ctx.fillRect(40, barY, barWidth * recruiterHpPercent, barHeight);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.strokeRect(40, barY, barWidth, barHeight);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(jrpgIntro.recruiter.name, 40, barY - 8);
      ctx.font = "14px system-ui, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`${state.recruiter.hp}/${state.recruiter.maxHp}`, 40 + barWidth - 60, barY + 20);

      // Candidate HP bar (right)
      const candidateBarX = dimensions.width - 40 - barWidth;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(candidateBarX, barY, barWidth, barHeight);
      const candidateHpPercent = state.candidate.hp / state.candidate.maxHp;
      const candidateBarColor = state.candidate.hp <= 1 ? "#dc2626" : candidateHpPercent > 0.3 ? "#22c55e" : "#eab308";
      ctx.fillStyle = candidateBarColor;
      ctx.fillRect(candidateBarX + barWidth * (1 - candidateHpPercent), barY, barWidth * candidateHpPercent, barHeight);
      ctx.strokeStyle = "#64748b";
      ctx.strokeRect(candidateBarX, barY, barWidth, barHeight);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(jrpgIntro.candidate.name, dimensions.width - 40, barY - 8);
      ctx.font = "14px system-ui, sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`${state.candidate.hp}/${state.candidate.maxHp}`, candidateBarX + 60, barY + 20);

      // Draw speech bubble
      if (state.speechBubble) {
        const bubbleX = state.speechBubble.speaker === "recruiter"
          ? state.recruiter.x + 100
          : state.candidate.x - 100;
        const bubbleY = state.speechBubble.speaker === "recruiter"
          ? state.recruiter.y - spriteSize - 60
          : state.candidate.y - spriteSize - 60;

        const text = `"${state.speechBubble.text}"`;
        ctx.font = "bold 20px system-ui, sans-serif";
        const textWidth = ctx.measureText(text).width;
        const padding = 24;
        const bubbleWidth = Math.min(textWidth + padding * 2, dimensions.width * 0.4);
        const bubbleHeight = 60;

        ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
        ctx.beginPath();
        ctx.roundRect(bubbleX - bubbleWidth / 2, bubbleY - bubbleHeight / 2, bubbleWidth, bubbleHeight, 12);
        ctx.fill();

        ctx.strokeStyle = state.speechBubble.speaker === "recruiter" ? "#ef4444" : "#22c55e";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(text, bubbleX, bubbleY + 7);
      }

      // Draw critical effect
      if (state.showCritical && imagesRef.current.criticalEffect) {
        const effectSize = 200;
        const effectAlpha = state.criticalTimer / CRITICAL_DURATION;
        ctx.globalAlpha = effectAlpha;
        ctx.drawImage(
          imagesRef.current.criticalEffect,
          state.recruiter.x - effectSize / 2,
          state.recruiter.y - effectSize,
          effectSize,
          effectSize
        );
        ctx.globalAlpha = 1;
      }

      // Draw floating texts
      for (const ft of state.floatingTexts) {
        ctx.globalAlpha = ft.opacity;
        ctx.fillStyle = ft.color;
        ctx.font = `bold ${ft.size}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.globalAlpha = 1;

      // Draw round indicator
      if (state.phase === "selectAttack" || state.phase.startsWith("conversation")) {
        ctx.fillStyle = "#64748b";
        ctx.font = "16px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          `Round ${state.usedConversations.length + 1} of ${jrpgConversations.length}`,
          dimensions.width / 2,
          90
        );
      }

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [imagesLoaded, dimensions, syncUiState]);

  const handleCtaClick = (href: string) => {
    router.push(href);
  };

  const state = gameStateRef.current;
  const usedConversations = uiState.usedConversations;
  const availableConversations = jrpgConversations.filter(
    (c) => !usedConversations.includes(c.id)
  );

  return (
    <div className="jrpg-game-container">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="jrpg-game-canvas"
      />

      {/* Intro screen */}
      {showIntro && (
        <div className="jrpg-intro-overlay">
          <div className="jrpg-intro-content">
            <h1 className="jrpg-intro-title">{jrpgIntroScreen.title}</h1>
            <div className="jrpg-intro-description">
              {jrpgIntroScreen.description.map((line, i) => (
                <p key={i}>{line || <br />}</p>
              ))}
            </div>
            <button className="jrpg-intro-button" onClick={handleStartGame}>
              {jrpgIntroScreen.startButton}
            </button>
          </div>
        </div>
      )}

      {/* Attack selection */}
      {(uiState.phase === "selectAttack"
        || uiState.phase === "conversation1"
        || uiState.phase === "conversation2"
        || uiState.phase === "conversation3")
        && !showIntro
        && availableConversations.length > 0 && (
        <div className="jrpg-attack-bar">
          <p className="jrpg-attack-label">Choose your interview question:</p>
          <div className="jrpg-attack-buttons">
            {availableConversations.map((conv) => (
              <button
                key={conv.id}
                className="jrpg-attack-button"
                onClick={() => handleSelectConversation(conv)}
                disabled={uiState.phase !== "selectAttack"}
              >
                <span className="jrpg-attack-name">{`"${conv.recruiterLine}"`}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Final option */}
      {uiState.phase === "finalOption" && availableConversations.length === 0 && (
        <div className="jrpg-final-option">
          <p className="jrpg-final-label">The candidate is on their last legs...</p>
          <button className="jrpg-final-button" onClick={handleFinalBlow}>
            {jrpgFinalBlow.buttonText}
          </button>
        </div>
      )}

      {/* Victory screen */}
      {showVictory && (
        <div className="jrpg-defeat-overlay">
          <div className="jrpg-defeat-content">
            <h1 className="jrpg-defeat-title">{jrpgVictory.title}</h1>
            <p className="jrpg-defeat-subtitle">{jrpgVictory.subtitle}</p>
            <p className="jrpg-defeat-reason">{jrpgVictory.reason}</p>
            <div className="jrpg-defeat-ctas">
              {jrpgVictory.ctas.map((cta) => (
                <button
                  key={cta.id}
                  className={cta.id === "hire" ? "btn-primary" : "btn-secondary"}
                  onClick={() => handleCtaClick(cta.href)}
                >
                  {cta.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exit button */}
      <button className="jrpg-exit-button" onClick={() => router.push("/")}>
        ← Exit
      </button>
    </div>
  );
};

export default JrpgBossFightGame;
