'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Info, Settings } from 'lucide-react'
import STMVisualization from '@/components/STMVisualization'
import ControlPanel from '@/components/ControlPanel'
import InfoPanel from '@/components/InfoPanel'
import EquationEditor from '@/components/EquationEditor'
import MathVisualization from '@/components/MathVisualization'

export default function Home() {
  const [distance, setDistance] = useState(2.4)
  const [voltage, setVoltage] = useState(0.5)
  const [showInfo, setShowInfo] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [tunnelingActive, setTunnelingActive] = useState(false)
  const [current, setCurrent] = useState(0.0)
  const [equation, setEquation] = useState('exponential')
  const [equationParams, setEquationParams] = useState({
    I0: 1.0,
    alpha: 2.0,
    workFunction: 4.5, // eV - typical work function for metals
    A: 1.0,
    n: 2.0,
    mu: 2.0,
    sigma: 0.5,
    a: 1.0,
    b: 1.0,
    c: 1.0
  })

  const minDistance = 0.3
  const maxDistance = 8.0
  const tunnelingThreshold = 3.0


  // Calculate current based on selected equation
  const calculateCurrent = (distance: number, equationType: string, params: Record<string, number>): number => {
    if (distance >= tunnelingThreshold) return 0.0
    
    // Convert distance from nm to meters
    const d = distance * 1e-9
    
    switch (equationType) {
      case 'exponential':
        // Standard exponential approximation: I = I₀ * e^(-αd)
        return params.I0 * Math.exp(-params.alpha * distance)
      case 'quantum':
        // Proper quantum tunneling: T(E) = 4e^(-2Kd) where K = √(2m(V-E))/ℏ
        // For STM: V is work function (~4-5 eV), E is bias voltage, m is electron mass
        const hbar = 1.054571817e-34 // J⋅s
        const m = 9.10938356e-31 // kg (electron mass)
        const V = params.workFunction * 1.602176634e-19 // Convert eV to J
        const E = voltage * 1.602176634e-19 // Convert V to J
        const K = Math.sqrt(2 * m * (V - E)) / hbar // m⁻¹
        const transmission = 4 * Math.exp(-2 * K * d)
        return params.I0 * transmission * 1e9 // Convert to nA
      case 'power':
        return params.A * Math.pow(distance, -params.n)
      case 'gaussian':
        return params.I0 * Math.exp(-Math.pow(distance - params.mu, 2) / (2 * Math.pow(params.sigma, 2)))
      case 'custom':
        return params.a * Math.exp(-params.b * distance) + params.c * Math.pow(distance, -2)
      default:
        return Math.exp(-2 * distance)
    }
  }

  // Update tunneling status and current
  useEffect(() => {
    const isTunneling = distance < tunnelingThreshold
    setTunnelingActive(isTunneling)
    
    if (isTunneling) {
      const calculatedCurrent = calculateCurrent(distance, equation, equationParams)
      setCurrent(calculatedCurrent)
    } else {
      setCurrent(0.0)
    }
  }, [distance, tunnelingThreshold, equation, equationParams])


  const handleReset = () => {
    setDistance(maxDistance)
  }

  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance)
  }

  const handleEquationChange = (newEquation: string, newParams: Record<string, number>) => {
    setEquation(newEquation)
    setEquationParams(prev => ({ ...prev, ...newParams }))
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
            <h1 className="text-4xl md:text-6xl font-light text-white mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              STM Tunneling Simulator
            </h1>
            <p className="text-lg md:text-xl text-blue-400/90 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Interactive Quantum Tunneling with Mathematical Models
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Main Visualization */}
            <div className="lg:col-span-4">
              <STMVisualization
                distance={distance}
                voltage={voltage}
                tunnelingActive={tunnelingActive}
                current={current}
                equation={equation}
              />
              
              {/* Mathematical Components - moved closer to visualization */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EquationEditor
                  onEquationChange={handleEquationChange}
                  currentParams={equationParams}
                  currentEquation={equation}
                />
                
                <MathVisualization
                  equation={equation}
                  params={equationParams}
                  currentDistance={distance}
                  currentCurrent={current}
                />
              </div>
            </div>

            {/* Control Panels */}
            <div className="lg:col-span-2 space-y-6">
              <ControlPanel
                distance={distance}
                minDistance={minDistance}
                maxDistance={maxDistance}
                voltage={voltage}
                current={current}
                tunnelingActive={tunnelingActive}
                onDistanceChange={handleDistanceChange}
                onVoltageChange={setVoltage}
                onReset={handleReset}
              />

              {/* Info Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInfo(!showInfo)}
                className="btn-secondary w-full flex items-center justify-center gap-2 accessibility-focus"
                aria-label={showInfo ? 'Hide educational information panel' : 'Show educational information panel'}
                aria-expanded={showInfo}
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
