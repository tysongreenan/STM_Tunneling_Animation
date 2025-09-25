'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface STMVisualizationProps {
  distance: number
  voltage: number
  tunnelingActive: boolean
  current: number
}

interface Electron {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  progress: number
  trail: Array<{ x: number; y: number }>
}

export default function STMVisualization({ 
  distance, 
  voltage, 
  tunnelingActive, 
  current 
}: STMVisualizationProps) {
  const [electrons, setElectrons] = useState<Electron[]>([])
  const [particleId, setParticleId] = useState(0)
  const [measurements, setMeasurements] = useState<Array<{ time: number; distance: number; current: number }>>([])
  const animationRef = useRef<number>()

  const atomPositions = [2, 4, 6, 8]
  const tipY = 0.5 + distance

  // Generate electron particles when tunneling is active
  useEffect(() => {
    if (tunnelingActive) {
      const interval = setInterval(() => {
        const newElectron: Electron = {
          id: particleId,
          startX: 5, // Start from tip center
          startY: tipY - 0.5, // Start from tip
          endX: atomPositions[Math.floor(Math.random() * atomPositions.length)], // Random target atom
          endY: 0.5, // Surface level
          progress: 0,
          trail: []
        }
        setElectrons(prev => [...prev.slice(-8), newElectron]) // Keep only last 8
        setParticleId(prev => prev + 1)
      }, 300)

      return () => clearInterval(interval)
    } else {
      setElectrons([])
    }
  }, [tunnelingActive, tipY, particleId])

  // Animate electron movement
  useEffect(() => {
    const animateElectrons = () => {
      setElectrons(prev => 
        prev.map(electron => {
          const newProgress = electron.progress + 0.02
          if (newProgress >= 1) {
            return null // Remove completed electrons
          }
          
          // Calculate current position using bezier curve
          const t = newProgress
          const controlX = (electron.startX + electron.endX) / 2 + (Math.random() - 0.5) * 2
          const controlY = (electron.startY + electron.endY) / 2 + (Math.random() - 0.5) * 1
          
          const x = (1-t)**2 * electron.startX + 2*(1-t)*t * controlX + t**2 * electron.endX
          const y = (1-t)**2 * electron.startY + 2*(1-t)*t * controlY + t**2 * electron.endY
          
          // Add to trail
          const newTrail = [...electron.trail, { x, y }].slice(-10) // Keep last 10 trail points
          
          return {
            ...electron,
            progress: newProgress,
            trail: newTrail
          }
        }).filter(Boolean) as Electron[]
      )
      
      animationRef.current = requestAnimationFrame(animateElectrons)
    }

    if (tunnelingActive && electrons.length > 0) {
      animationRef.current = requestAnimationFrame(animateElectrons)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [tunnelingActive, electrons.length])

  // Record measurements
  useEffect(() => {
    if (tunnelingActive) {
      const newMeasurement = {
        time: Date.now(),
        distance: distance,
        current: current
      }
      setMeasurements(prev => [...prev.slice(-20), newMeasurement]) // Keep last 20 measurements
    }
  }, [tunnelingActive, distance, current])

  return (
    <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-glow/5 via-transparent to-cyan-glow/5" />
      
      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h2 className="text-2xl font-light text-white-glow mb-2">STM Scanning Process</h2>
        <p className="text-purple-glow/70">Watch quantum tunneling in real-time</p>
      </div>

      {/* Visualization Container */}
      <div className="relative h-96 bg-black/20 rounded-xl border border-gray-700/30 overflow-hidden">
        {/* Sample Surface */}
        <div className="absolute bottom-8 left-0 right-0 h-1 bg-white-glow/60" />
        
        {/* Surface Atoms */}
        {atomPositions.map((x, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-purple-glow rounded-full glow-effect"
            style={{
              left: `${(x / 10) * 100}%`,
              bottom: '2rem',
              transform: 'translateX(-50%)'
            }}
            animate={{
              scale: tunnelingActive ? [1, 1.2, 1] : 1,
              opacity: tunnelingActive ? [0.8, 1, 0.8] : 0.8
            }}
            transition={{ duration: 1, repeat: tunnelingActive ? Infinity : 0 }}
          >
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white-glow/70">
              Atom {i + 1}
            </div>
          </motion.div>
        ))}

        {/* STM Tip */}
        <motion.div
          className="absolute w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-pink-glow glow-effect"
          style={{
            left: '50%',
            bottom: `${(tipY / 8) * 100}%`,
            transform: 'translateX(-50%)'
          }}
          animate={{
            scale: tunnelingActive ? [1, 1.1, 1] : 1,
            filter: tunnelingActive 
              ? ['drop-shadow(0 0 10px #ec4899)', 'drop-shadow(0 0 20px #ec4899)', 'drop-shadow(0 0 10px #ec4899)']
              : 'drop-shadow(0 0 10px #ec4899)'
          }}
          transition={{ duration: 0.5, repeat: tunnelingActive ? Infinity : 0 }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-pink-glow/80 whitespace-nowrap">
            STM Tip
          </div>
        </motion.div>

        {/* Tunneling Barrier */}
        {tunnelingActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-purple-glow/10 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Electron Particles with Trails */}
        <AnimatePresence>
          {electrons.map((electron) => (
            <div key={electron.id}>
              {/* Electron Trail */}
              {electron.trail.map((point, index) => (
                <motion.div
                  key={`${electron.id}-trail-${index}`}
                  className="absolute w-1 h-1 bg-cyan-glow/60 rounded-full"
                  style={{
                    left: `${(point.x / 10) * 100}%`,
                    bottom: `${(point.y / 8) * 100}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.5 }}
                />
              ))}
              
              {/* Main Electron */}
              <motion.div
                className="absolute w-3 h-3 bg-cyan-glow rounded-full glow-effect"
                style={{
                  left: `${(electron.trail[electron.trail.length - 1]?.x / 10) * 100}%`,
                  bottom: `${(electron.trail[electron.trail.length - 1]?.y / 8) * 100}%`,
                  transform: 'translate(-50%, 50%)'
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 1]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </AnimatePresence>

        {/* Distance Indicator */}
        <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-xs text-gray-300">Distance</div>
          <div className="text-lg font-mono text-white-glow">{distance.toFixed(2)} nm</div>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            tunnelingActive 
              ? 'bg-green-glow/20 text-green-glow border border-green-glow/30' 
              : 'bg-gray-700/50 text-gray-300 border border-gray-600/30'
          }`}>
            {tunnelingActive ? 'TUNNELING ACTIVE' : 'TUNNELING INACTIVE'}
          </div>
        </div>

        {/* Measurement Scale */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-400">
          <span>0 nm</span>
          <span>5 nm</span>
          <span>10 nm</span>
        </div>
      </div>

      {/* Real-time Data */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="info-card">
          <div className="text-sm text-gray-400 mb-1">Applied Voltage</div>
          <div className="text-xl font-mono text-yellow-glow">{voltage.toFixed(2)} V</div>
        </div>
        <div className="info-card">
          <div className="text-sm text-gray-400 mb-1">Tunneling Current</div>
          <div className="text-xl font-mono text-green-glow">{current.toFixed(3)} nA</div>
        </div>
      </div>

      {/* Measurement History */}
      {measurements.length > 0 && (
        <div className="mt-4 info-card">
          <div className="text-sm text-gray-400 mb-2">Recent Measurements</div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {measurements.slice(-5).map((measurement, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-gray-300">
                  {new Date(measurement.time).toLocaleTimeString()}
                </span>
                <span className="text-cyan-glow">
                  {measurement.distance.toFixed(2)}nm → {measurement.current.toFixed(3)}nA
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}