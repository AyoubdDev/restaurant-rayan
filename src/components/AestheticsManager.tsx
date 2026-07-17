import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { soundManager } from "../utils/sound";
import { Sparkles, Volume2, VolumeX, Eye } from "lucide-react";

export default function AestheticsManager() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "magnetic" | "discover" | "book">("default");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Loading timer animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // End loading with a slight organic delay
            setTimeout(() => {
              setLoading(false);
            }, 600);
            return 100;
          }
          // Custom speed curves for luxury feeling
          const step = Math.max(1, Math.floor(Math.random() * 8));
          return Math.min(100, prev + step);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // 2. Custom cursor tracking and event listening
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Determine cursor type based on hovered elements
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverDiscover = target.closest('[data-cursor="discover"]') || target.closest('#menu') || target.closest('[id*="dish"]');
      const hoverBook = target.closest('[data-cursor="book"]') || target.closest('#celebrations') || target.closest('form') || target.closest('input') || target.closest('select') || target.closest('textarea') || target.closest('button[type="submit"]');
      const hoverMagnetic = target.closest('button') || target.closest('a') || target.closest('[role="button"]') || target.closest('.cursor-pointer');

      if (hoverDiscover) {
        setCursorType("discover");
      } else if (hoverBook) {
        setCursorType("book");
      } else if (hoverMagnetic) {
        setCursorType("magnetic");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseClick = () => {
      soundManager.playClick();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  // 3. Ambient particles system on Canvas for lightweight 60fps performance
  useEffect(() => {
    if (loading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      decay: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = -Math.random() * 0.35 - 0.05; // float upwards
        this.alpha = Math.random() * 0.5 + 0.2;
        this.decay = Math.random() * 0.001 + 0.0003;
        // luxury gold/sparks colors
        this.color = Math.random() > 0.3 ? "#D4AF37" : "#F8E7A0";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;

        // Wrap around margins
        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
          this.alpha = Math.random() * 0.5 + 0.2;
        }
        if (this.x < -10 || this.x > width + 10) {
          this.x = Math.random() * width;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowBlur = 6;
        context.shadowColor = "#D4AF37";
        context.fill();
        context.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);



  return (
    <>
      {/* 1. Cinematic Luxury Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#090909] z-[9999] flex flex-col justify-between p-12 overflow-hidden"
          >
            {/* Elegant luxury sound trigger on loader page */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37]/60 uppercase">
                Est. 2024
              </span>
            </div>

            {/* Glowing gold backlights inside loader */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

            {/* Logo Center Screen */}
            <div className="my-auto flex flex-col items-center relative z-10 text-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="mb-8"
              >
                <span className="text-5xl sm:text-7xl font-serif font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-[#F8E7A0] via-[#D4AF37] to-[#71541A]">
                  RAYAN
                </span>
                <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#A7A7A7] mt-3">
                  Pâtisserie & Gastronomie
                </p>
              </motion.div>

              {/* Dynamic Luxury Ambient Loader bar */}
              <div className="w-48 sm:w-64 h-[1px] bg-white/5 relative overflow-hidden rounded-full mb-3">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-[#F8E7A0]"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Floating sparks counting up */}
              <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-mono font-light">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>{percent}%</span>
              </div>
            </div>

            {/* Editorial Footer details */}
            <div className="flex justify-between items-center text-[9px] text-[#A7A7A7]/50 font-mono relative z-10 border-t border-white/5 pt-4">
              <span>MICHELIN CANDIDATE ATMOSPHERE</span>
              <span>© {new Date().getFullYear()} RAYAN INTERNATIONAL</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Custom Interactive Gold Cursor (Hides automatically on mobile touchscreen) */}
      <div 
        className="hidden md:block fixed pointer-events-none z-[10000] mix-blend-screen -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <motion.div
          animate={{
            scale: cursorType === "magnetic" ? 1.5 : cursorType === "discover" || cursorType === "book" ? 4.5 : 1,
            backgroundColor: cursorType === "discover" ? "rgba(212, 175, 55, 0.15)" : cursorType === "book" ? "rgba(248, 231, 160, 0.15)" : "transparent",
            borderColor: cursorType === "default" ? "#D4AF37" : cursorType === "magnetic" ? "#F8E7A0" : "rgba(212, 175, 55, 0.4)"
          }}
          transition={{ type: "spring", stiffness: 280, damping: 25 }}
          className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center relative shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        >
          {/* Internal central dot */}
          {cursorType === "default" && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
          )}

          {/* Interactive display helper texts inside cursor */}
          <AnimatePresence>
            {cursorType === "discover" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[5px] font-bold uppercase tracking-wider text-[#F8E7A0] font-mono"
              >
                Discover
              </motion.span>
            )}
            {cursorType === "book" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[5px] font-bold uppercase tracking-wider text-[#F8E7A0] font-mono"
              >
                Book
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>



      {/* 4. Canvas-based lightweight sparks particle overlay (FullScreen backlighting) */}
      {!loading && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-0 pointer-events-none mix-blend-color-dodge opacity-60"
        />
      )}

      {/* 5. Pure CSS ultra-subtle luxury noise overlay to provide real photo-film texture */}
      <div className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.015] bg-repeat bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100')]"></div>
    </>
  );
}
