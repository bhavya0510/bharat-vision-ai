"use client";

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";

// Starfield Canvas Component
const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const numStars = 800;
    let speed = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;

      constructor() {
        this.x = Math.random() * canvas!.width - canvas!.width / 2;
        this.y = Math.random() * canvas!.height - canvas!.height / 2;
        this.z = Math.random() * canvas!.width;
        this.pz = this.z;
      }

      update() {
        if (!canvas) return;
        this.z = this.z - speed;
        if (this.z < 1) {
          this.z = canvas.width;
          this.x = Math.random() * canvas.width - canvas.width / 2;
          this.y = Math.random() * canvas.height - canvas.height / 2;
          this.pz = this.z;
        }
      }

      draw() {
        if (!ctx || !canvas) return;
        const sx = (this.x / this.z) * (canvas.width / 2) + canvas.width / 2;
        const sy = (this.y / this.z) * (canvas.height / 2) + canvas.height / 2;

        const r = Math.max(0.1, (1 - this.z / canvas.width) * 2.5);

        const px = (this.x / this.pz) * (canvas.width / 2) + canvas.width / 2;
        const py = (this.y / this.pz) * (canvas.height / 2) + canvas.height / 2;

        this.pz = this.z;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.lineWidth = r * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.z / canvas.width})`;
        ctx.stroke();
      }
    }

    const init = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const dist = Math.abs(event.clientX - centerX);
      const maxDist = window.innerWidth / 2;
      speed = 2 + (1 - dist / maxDist) * 20;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

interface HyperdriveHeroProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

// The main hero component
const HyperdriveHero = ({ onLogin, onSignUp }: HyperdriveHeroProps) => {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.2,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <StarfieldCanvas />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none"></div>

      {/* Hero Central Content */}
      <div className="relative z-20 text-center p-6 max-w-4xl my-auto flex flex-col items-center justify-center">
        <motion.h1
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-500 drop-shadow-2xl"
        >
          Bharat Vision AI
        </motion.h1>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black font-semibold rounded-xl shadow-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3 text-lg cursor-pointer hover:scale-105"
          >
            <LogIn className="h-5 w-5" />
            Log In
          </button>
          <button
            onClick={onSignUp}
            className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-3 text-lg cursor-pointer hover:scale-105"
          >
            <UserPlus className="h-5 w-5" />
            Sign Up
          </button>
        </motion.div>
      </div>

      {/* Bottom Footer bar */}
      <footer className="relative z-30 w-full px-6 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Bharat Vision AI. All rights reserved.
      </footer>
    </div>
  );
};

export default HyperdriveHero;
