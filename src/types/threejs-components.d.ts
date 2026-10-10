declare module "threejs-components/build/cursors/tubes1.min.js" {
  export type TubesCursorInstance = {
    tubes: {
      setColors(colors: string[]): void
      setLightsColors(colors: string[]): void
    }
    dispose?: () => void
  }

  export default function createTubesCursor(
    canvas: HTMLCanvasElement,
    options: {
      tubes: {
        colors: string[]
        lights: {
          intensity: number
          colors: string[]
        }
      }
    }
  ): TubesCursorInstance
}