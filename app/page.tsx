'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Info, Settings } from 'lucide-react'
import STMVisualization from '@/components/STMVisualization'
import ControlPanel from '@/components/ControlPanel'
import InfoPanel from '@/components/InfoPanel'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [distance, setDistance] = useState(8.0)
  const [voltage, setVoltage] = useState(0.5)
  const [showInfo, setShowInfo] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [tunnelingActive, setTunnelingActive] = useState(false)
  const [current, setCurrent] = useState(0.0)

  const minDistance = 0.3
  const maxDistance = 8.0
  const tunnelingThreshold = 3.0

  // Auto-play animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDistance(prev => {
          const newDistance = prev - 0.1
          if (newDistance <= minDistance) {
            setIsPlaying(false)
            return minDistance
          }
          return newDistance
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, minDistance])

  // Update tunneling status and current
  useEffect(() => {
    const isTunneling = distance < tunnelingThreshold
    setTunnelingActive(isTunneling)
    
    if (isTunneling) {
      const tunnelingCurrent = (tunnelingThreshold - distance) / tunnelingThreshold * 0.2
      setCurrent(tunnelingCurrent)
    } else {
      setCurrent(0.0)
    }
  }, [distance, tunnelingThreshold])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setDistance(maxDistance)
  }

  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white-glow mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              STM Tunneling Simulator
            </h1>
            <p className="text-lg md:text-xl text-purple-glow/80 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Interactive Quantum Tunneling Visualization
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Visualization */}
            <div className="lg:col-span-3">
              <STMVisualization
                distance={distance}
                voltage={voltage}
                tunnelingActive={tunnelingActive}
                current={current}
              />
            </div>

            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
              <ControlPanel
                distance={distance}
                minDistance={minDistance}
                maxDistance={maxDistance}
                voltage={voltage}
                current={current}
                tunnelingActive={tunnelingActive}
                isPlaying={isPlaying}
                onDistanceChange={handleDistanceChange}
                onVoltageChange={setVoltage}
                onPlay={handlePlay}
                onReset={handleReset}
              />

              {/* Info Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInfo(!showInfo)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl transition-colors"
              >
                <Info className="w-5 h-5" />
                {showInfo ? 'Hide Info' : 'Show Info'}
              </motion.button>
            </div>
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <InfoPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 p-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="text-sm">
            Educational tool for understanding Scanning Tunneling Microscopy and Quantum Tunneling effects
          </p>
        </div>
      </footer>
    </div>
  )
}
