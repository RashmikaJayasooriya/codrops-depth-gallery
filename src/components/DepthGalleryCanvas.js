'use client'

import { useEffect, useRef } from 'react'
import { Engine } from '@/Experience/Engine'

export default function DepthGalleryCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!(canvas instanceof HTMLCanvasElement)) return undefined

    const engine = new Engine(canvas)

    engine.init().catch((error) => {
      console.error('Engine initialization failed', error)
    })

    return () => {
      engine.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="webgl" />
}
