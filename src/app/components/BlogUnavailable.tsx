import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Gamepad2, Volume2, VolumeX, Trophy, RotateCcw, AlertTriangle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  type: "bug" | "tall" | "flying";
  passed: boolean;
  angle: number;
}

export function BlogUnavailable() {
  const { theme, toggleTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("blog_game_highscore") || "0", 10);
    }
    return 0;
  });
  const [muted, setMuted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // Game state refs (for use inside the anim loop without re-triggering effect)
  const gameState = useRef({
    playerY: 0,
    playerVy: 0,
    isJumping: false,
    isDoubleJumping: false,
    score: 0,
    speedMultiplier: 1,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    lastObstacleSpawn: 0,
    groundY: 160,
    playerX: 60,
    playerSize: 30,
    gravity: 0.6,
    jumpForce: -10,
    doubleJumpForce: -8,
    frameCount: 0,
  });

  // Sound effects generator
  const playSound = (type: "jump" | "score" | "crash") => {
    if (muted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "jump") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "score") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(698.46, ctx.currentTime + 0.08); // F5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === "crash") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("AudioContext error: ", e);
    }
  };

  // Setup/Reset game
  const resetGame = () => {
    const groundY = 160;
    gameState.current = {
      playerY: groundY - 30,
      playerVy: 0,
      isJumping: false,
      isDoubleJumping: false,
      score: 0,
      speedMultiplier: 1,
      obstacles: [],
      particles: [],
      lastObstacleSpawn: 0,
      groundY,
      playerX: 60,
      playerSize: 30,
      gravity: 0.6,
      jumpForce: -10,
      doubleJumpForce: -8,
      frameCount: 0,
    };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const jump = () => {
    if (!isPlaying) {
      resetGame();
      return;
    }
    if (gameOver) {
      resetGame();
      return;
    }

    const state = gameState.current;
    if (!state.isJumping) {
      // First jump
      state.playerVy = state.jumpForce;
      state.isJumping = true;
      playSound("jump");
      // Add jump particles
      for (let i = 0; i < 8; i++) {
        state.particles.push({
          x: state.playerX + state.playerSize / 2,
          y: state.playerY + state.playerSize,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 3 + 1,
          color: theme === "dark" ? "#10B981" : "#2563EB",
          alpha: 0.8,
          life: 20 + Math.random() * 20,
        });
      }
    } else if (!state.isDoubleJumping) {
      // Double jump
      state.playerVy = state.doubleJumpForce;
      state.isDoubleJumping = true;
      playSound("jump");
      // Colorful ring of dust for double jump
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        state.particles.push({
          x: state.playerX + state.playerSize / 2,
          y: state.playerY + state.playerSize / 2,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          size: Math.random() * 4 + 1.5,
          color: "#3B82F6",
          alpha: 0.9,
          life: 25 + Math.random() * 15,
        });
      }
    }
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver, muted]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localHighScore = highScore;

    const render = () => {
      // Clear canvas with adaptive background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      
      // Ground lines color
      const lineColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
      const bugColor = "#EF4444"; // Red for bug obstacles
      const warningColor = "#F59E0B"; // Amber for floating warn
      const primaryColor = isDark ? "#10B981" : "#2563EB"; // Green in dark, Blue in light
      const secondaryColor = isDark ? "#3B82F6" : "#10B981";

      const state = gameState.current;
      state.frameCount++;

      // 1. Draw Grid / Ground Background Line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, state.groundY);
      ctx.lineTo(canvas.width, state.groundY);
      ctx.stroke();

      // Moving terrain lines (creates speed illusion)
      const offset = (state.frameCount * 5 * state.speedMultiplier) % 40;
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      for (let x = -offset; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, state.groundY);
        ctx.lineTo(x - 20, canvas.height);
        ctx.stroke();
      }

      // Draw standard ground horizontal lines
      for (let y = state.groundY + 10; y < canvas.height; y += 15) {
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (isPlaying && !gameOver) {
        // Physics update
        state.playerVy += state.gravity;
        state.playerY += state.playerVy;

        // Ground constraint
        if (state.playerY >= state.groundY - state.playerSize) {
          state.playerY = state.groundY - state.playerSize;
          state.playerVy = 0;
          state.isJumping = false;
          state.isDoubleJumping = false;
        }

        // Spawn obstacles
        const spawnDelay = 120 / state.speedMultiplier + Math.random() * (90 / state.speedMultiplier);
        if (state.frameCount - state.lastObstacleSpawn > spawnDelay) {
          const rand = Math.random();
          let type: "bug" | "tall" | "flying" = "bug";
          let obstacleH = 20;
          let obstacleW = 16;
          let obstacleY = state.groundY - obstacleH;

          if (rand > 0.75) {
            type = "tall";
            obstacleH = 34;
            obstacleW = 18;
            obstacleY = state.groundY - obstacleH;
          } else if (rand > 0.5) {
            type = "flying";
            obstacleH = 16;
            obstacleW = 20;
            // Float above ground
            obstacleY = state.groundY - 50 - Math.random() * 20;
          }

          state.obstacles.push({
            x: canvas.width + 10,
            y: obstacleY,
            w: obstacleW,
            h: obstacleH,
            speed: 4.5 * state.speedMultiplier,
            type,
            passed: false,
            angle: 0,
          });
          state.lastObstacleSpawn = state.frameCount;
        }

        // Running dust particles
        if (!state.isJumping && state.frameCount % 5 === 0) {
          state.particles.push({
            x: state.playerX,
            y: state.groundY - 2,
            vx: -Math.random() * 2 - 1,
            vy: -Math.random() * 0.8,
            size: Math.random() * 2.5 + 0.5,
            color: primaryColor,
            alpha: 0.5,
            life: 15 + Math.random() * 15,
          });
        }
      }

      // Update & Draw particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = Math.max(0, p.life / 40);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.life <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // Update & Draw obstacles
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        if (isPlaying && !gameOver) {
          obs.x -= obs.speed;
          obs.angle += 0.08;
        }

        // Draw obstacle
        ctx.save();
        if (obs.type === "flying") {
          // Hover effect animation on canvas
          const hoverY = obs.y + Math.sin(obs.angle) * 3;
          ctx.fillStyle = warningColor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = warningColor;
          
          // Draw a small floating drone/warning symbol
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.w / 2, hoverY);
          ctx.lineTo(obs.x + obs.w, hoverY + obs.h);
          ctx.lineTo(obs.x, hoverY + obs.h);
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === "tall") {
          // Draw a vertical column resembling a "Syntax Error" or warning tower
          const gradient = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.w, obs.y + obs.h);
          gradient.addColorStop(0, bugColor);
          gradient.addColorStop(1, "#B91C1C");
          ctx.fillStyle = gradient;
          ctx.shadowBlur = 12;
          ctx.shadowColor = bugColor;
          
          // Rounded rect
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 4) : ctx.rect(obs.x, obs.y, obs.w, obs.h);
          ctx.fill();

          // Error exclamations symbol
          ctx.fillStyle = "#FFF";
          ctx.font = "bold 9px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("!", obs.x + obs.w / 2, obs.y + 12);
        } else {
          // Standard bug/beetle crawling
          const bugOffset = Math.sin(obs.angle * 2) * 2;
          ctx.fillStyle = bugColor;
          ctx.shadowBlur = 8;
          ctx.shadowColor = bugColor;

          // Round body
          ctx.beginPath();
          ctx.arc(obs.x + obs.w / 2, obs.y + obs.h / 2 + bugOffset, obs.w / 2, 0, Math.PI * 2);
          ctx.fill();

          // Small legs
          ctx.strokeStyle = bugColor;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          // Leg Left
          ctx.moveTo(obs.x, obs.y + obs.h / 2 + bugOffset);
          ctx.lineTo(obs.x - 3, obs.y + obs.h / 2 + 3 + bugOffset);
          // Leg Right
          ctx.moveTo(obs.x + obs.w, obs.y + obs.h / 2 + bugOffset);
          ctx.lineTo(obs.x + obs.w + 3, obs.y + obs.h / 2 + 3 + bugOffset);
          ctx.stroke();
        }
        ctx.restore();

        // Check score/bounds
        if (!obs.passed && obs.x < state.playerX) {
          obs.passed = true;
          state.score += 10;
          setScore(state.score);
          playSound("score");

          // Speed up slightly every 50 points
          if (state.score > 0 && state.score % 50 === 0) {
            state.speedMultiplier += 0.15;
          }

          // Trigger screen/highScore save
          if (state.score > localHighScore) {
            localHighScore = state.score;
            setHighScore(localHighScore);
            localStorage.setItem("blog_game_highscore", localHighScore.toString());
          }
        }

        // Collision Check
        const actualPlayerY = state.playerY;
        const actualObsY = obs.type === "flying" ? obs.y + Math.sin(obs.angle) * 3 : obs.y;
        
        const padX = 4; // Horizontal safety offset
        const padY = 2; // Vertical safety offset

        if (
          state.playerX + state.playerSize - padX > obs.x &&
          state.playerX + padX < obs.x + obs.w &&
          actualPlayerY + state.playerSize - padY > actualObsY &&
          actualPlayerY + padY < actualObsY + obs.h
        ) {
          // Collision detected! Game Over
          setGameOver(true);
          playSound("crash");
          
          // Exploding particles
          for (let pIdx = 0; pIdx < 25; pIdx++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 6 + 2;
            state.particles.push({
              x: state.playerX + state.playerSize / 2,
              y: state.playerY + state.playerSize / 2,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity - 2,
              size: Math.random() * 5 + 1.5,
              color: pIdx % 2 === 0 ? primaryColor : "#EF4444",
              alpha: 1.0,
              life: 30 + Math.random() * 30,
            });
          }
        }

        // Remove out-of-screen obstacles
        if (obs.x < -40) {
          state.obstacles.splice(i, 1);
        }
      }

      // Draw Player: Rounded Neon Code Cube (labeled with E or [ ] )
      ctx.save();
      const pGradient = ctx.createLinearGradient(
        state.playerX,
        state.playerY,
        state.playerX + state.playerSize,
        state.playerY + state.playerSize
      );
      pGradient.addColorStop(0, primaryColor);
      pGradient.addColorStop(1, secondaryColor);

      ctx.fillStyle = pGradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = primaryColor;

      // Draw body
      ctx.beginPath();
      const radius = 6;
      if (ctx.roundRect) {
        ctx.roundRect(state.playerX, state.playerY, state.playerSize, state.playerSize, radius);
      } else {
        ctx.rect(state.playerX, state.playerY, state.playerSize, state.playerSize);
      }
      ctx.fill();

      // Draw simple glowing face / content
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowBlur = 0;

      if (gameOver) {
        // Dead face
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("x_x", state.playerX + state.playerSize / 2, state.playerY + state.playerSize / 2 + 4);
      } else if (state.isJumping) {
        // Happy jump face
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("^o^", state.playerX + state.playerSize / 2, state.playerY + state.playerSize / 2 + 4);
      } else {
        // Standard "E" branding logo
        ctx.font = "bold 14px font-heading, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("E", state.playerX + state.playerSize / 2, state.playerY + state.playerSize / 2 + 5);
      }
      ctx.restore();

      // Continuous loop if not paused
      if (isPlaying && !gameOver) {
        requestRef.current = requestAnimationFrame(render);
      } else {
        // Redraw static state when game is stopped or over
        if (gameOver) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 20px font-heading, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 15);
          
          ctx.fillStyle = "rgba(255,255,255,0.8)";
          ctx.font = "11px sans-serif";
          ctx.fillText("TAP OR PRESS SPACEBAR TO RESTART", canvas.width / 2, canvas.height / 2 + 10);
        }
      }
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(render);
    } else {
      // Initial state render
      render();
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameOver, theme, muted]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden font-body select-none">
      {/* Dynamic decorative backdrop gradients */}
      <div className="absolute top-10 left-1/4 w-[350px] h-[350px] bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-3xl" />

      {/* Navigation Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </a>

        <div className="flex items-center gap-2">
          {/* Audio Indicator */}
          <button
            onClick={() => setMuted(!muted)}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>

      {/* Main card panel */}
      <div className="w-full max-w-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col items-center text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5 border border-amber-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          Blog Temporarily{" "}
          <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Unavailable
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-sm mb-6 leading-relaxed">
          I'm still gathering and preparing high-quality assets for the blog! In the meantime, try to jump over the bugs.
        </p>

        {/* Scores indicators */}
        <div className="w-full flex items-center justify-between mb-4 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-900 text-sm font-medium">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Gamepad2 className="w-4 h-4 text-blue-500" />
            Score: <span className="font-bold text-slate-900 dark:text-white">{score}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Trophy className="w-4 h-4 text-amber-500" />
            High Score: <span className="font-bold text-slate-900 dark:text-white">{highScore}</span>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div 
          onClick={jump}
          className="relative w-full h-[180px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden cursor-pointer"
        >
          <canvas
            ref={canvasRef}
            width={480}
            height={180}
            className="w-full h-full block"
          />

          {/* Pre-start overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetGame();
                }}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white shadow-lg hover:shadow-xl transition-all scale-100 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
              >
                <Gamepad2 className="w-4 h-4" />
                Start Bug Runner
              </button>
              <p className="text-[10px] text-white/70 mt-2 font-medium">
                Tap or Spacebar to Jump. Double tap to Double Jump!
              </p>
            </div>
          )}
        </div>

        {/* Tips / Instructions */}
        <p className="text-[10.5px] sm:text-xs text-slate-400 dark:text-slate-500 mt-4 leading-normal flex items-center gap-1.5">
          <span>💡</span> Press **SPACEBAR** or **TAP** the screen to hop. Double-tap to double jump!
        </p>

        {/* Game Over Reset Action outside canvas for convenience */}
        {gameOver && (
          <button
            onClick={resetGame}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 rounded-lg shadow-sm transition-all scale-100 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
