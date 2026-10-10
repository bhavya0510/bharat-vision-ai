"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function NeonGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Purple glow orb */}
      <div
        className="fixed pointer-events-none rounded-full bg-purple-500/20 blur-[100px] z-0 transition-all duration-500 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
        }}
      />

      {/* Pink glow orb */}
      <div
        className="fixed pointer-events-none rounded-full bg-pink-500/20 blur-[100px] z-0 transition-all duration-700 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%) translate(100px, 100px)",
          width: "300px",
          height: "300px",
        }}
      />

      {/* Blue glow orb */}
      <div
        className="fixed pointer-events-none rounded-full bg-blue-500/15 blur-[120px] z-0 transition-all duration-600 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%) translate(-100px, -100px)",
          width: "350px",
          height: "350px",
        }}
      />

      {/* Ambient corner glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-500/10 blur-[150px] z-0" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-500/10 blur-[150px] z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-[200px] z-0" />
    </>
  )
}
