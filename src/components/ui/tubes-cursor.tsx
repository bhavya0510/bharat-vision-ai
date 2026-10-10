"use client"

import { useEffect, useRef } from "react"
import createTubesCursor, { type TubesCursorInstance } from "threejs-components/build/cursors/tubes1.min.js"

function randomColors(count: number) {
  return Array.from({ length: count }, () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`
  )
}

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<TubesCursorInstance | null>(null)

  useEffect(() => {
    let disposed = false

    const initialize = async () => {
      const canvas = canvasRef.current
      if (!canvas) return

      try {
        const app = createTubesCursor(canvas, {
          tubes: {
            colors: ["#5e72e4", "#8965e0", "#f5365c"],
            lights: {
              intensity: 200,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
            },
          },
        })

        if (disposed) {
          app.dispose?.()
          return
        }
        appRef.current = app
      } catch (error) {
        console.error("Failed to initialize TubesCursor:", error)
      }
    }

    const changeColors = () => {
      const tubes = appRef.current?.tubes
      if (!tubes) return

      tubes.setColors(randomColors(3))
      tubes.setLightsColors(randomColors(4))
    }

    void initialize()
    document.addEventListener("click", changeColors)

    return () => {
      disposed = true
      document.removeEventListener("click", changeColors)
      appRef.current?.dispose?.()
      appRef.current = null
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}