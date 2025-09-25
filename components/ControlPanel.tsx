'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Zap, Gauge } from 'lucide-react'

interface ControlPanelProps {
  distance: number
  minDistance: number
  maxDistance: number
  voltage: number
  current: number
  tunnelingActive: boolean
  onDistanceChange: (distance: number) => void
  onVoltageChange: (voltage: number) => void
  onReset: () => void
}

export default function ControlPanel({
  distance,
  minDistance,
  maxDistance,
  voltage,
  current,
  tunnelingActive,
  onDistanceChange,
  onVoltageChange,
  onReset
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <Gauge className="w-5 h-5 text-purple-400" />
          Controls
        </h3>
        
        {/* Reset Button */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="btn-icon accessibility-focus"
            aria-label="Reset tip to maximum distance"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Distance Control */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300" htmlFor="distance-slider">
            Tip Distance: {distance.toFixed(2)} nm
          </label>
          <div className="relative">
            <input
              id="distance-slider"
              type="range"
              min={minDistance}
              max={maxDistance}
              step="0.1"
              value={distance}
              onChange={(e) => onDistanceChange(parseFloat(e.target.value))}
              className="control-slider accessibility-focus"
              aria-label={`Adjust tip distance from ${minDistance} to ${maxDistance} nanometers. Current value: ${distance.toFixed(2)} nm`}
              aria-valuemin={minDistance}
              aria-valuemax={maxDistance}
              aria-valuenow={distance}
            />
            {/* Gentle pulse animation to guide users */}
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{minDistance} nm</span>
            <span className="text-purple-400">Tunneling Threshold: 3.0 nm</span>
            <span>{maxDistance} nm</span>
          </div>
          <motion.div
            className="text-xs text-purple-400/70 text-center mt-2"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💡 Move the slider to see tunneling effects
          </motion.div>
        </div>
      </div>

      {/* Voltage Control */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <Zap className="w-5 h-5 text-yellow-400" />
          Voltage Control
        </h3>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300" htmlFor="voltage-slider">
            Applied Voltage: {voltage.toFixed(2)} V
          </label>
          <div className="relative">
            <input
              id="voltage-slider"
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={voltage}
              onChange={(e) => onVoltageChange(parseFloat(e.target.value))}
              className="control-slider accessibility-focus"
              aria-label={`Adjust applied voltage from 0.1 to 2.0 volts. Current value: ${voltage.toFixed(2)} V`}
              aria-valuemin={0.1}
              aria-valuemax={2.0}
              aria-valuenow={voltage}
            />
            {/* Gentle pulse animation to guide users */}
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.1 V</span>
            <span>2.0 V</span>
          </div>
        </div>
      </div>

      {/* Status Display */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>Status</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Tunneling Status</span>
            <div className={`status-indicator ${
              tunnelingActive ? 'status-active' : 'status-inactive'
            }`}>
              {tunnelingActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Current</span>
            <span className="text-green-400 font-mono">{current.toFixed(3)} nA</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Distance</span>
            <span className="text-cyan-400 font-mono">{distance.toFixed(2)} nm</span>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Move tip closer to see tunneling effects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Tunneling occurs below 3.0 nm distance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Higher voltage increases tunneling current</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Use Play button for automatic scanning</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
