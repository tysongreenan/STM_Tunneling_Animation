'use client'

import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Zap, Gauge } from 'lucide-react'

interface ControlPanelProps {
  distance: number
  minDistance: number
  maxDistance: number
  voltage: number
  current: number
  tunnelingActive: boolean
  isPlaying: boolean
  onDistanceChange: (distance: number) => void
  onVoltageChange: (voltage: number) => void
  onPlay: () => void
  onReset: () => void
}

export default function ControlPanel({
  distance,
  minDistance,
  maxDistance,
  voltage,
  current,
  tunnelingActive,
  isPlaying,
  onDistanceChange,
  onVoltageChange,
  onPlay,
  onReset
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white-glow mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <Gauge className="w-5 h-5 text-purple-glow" />
          Controls
        </h3>
        
        {/* Play/Pause/Reset */}
        <div className="flex gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlay}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
              isPlaying
                ? 'bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30'
                : 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Distance Control */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Tip Distance: {distance.toFixed(2)} nm
          </label>
          <input
            type="range"
            min={minDistance}
            max={maxDistance}
            step="0.1"
            value={distance}
            onChange={(e) => onDistanceChange(parseFloat(e.target.value))}
            className="control-slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{minDistance} nm</span>
            <span className="text-purple-glow">Tunneling Threshold: 3.0 nm</span>
            <span>{maxDistance} nm</span>
          </div>
        </div>
      </div>

      {/* Voltage Control */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white-glow mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <Zap className="w-5 h-5 text-yellow-glow" />
          Voltage Control
        </h3>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Applied Voltage: {voltage.toFixed(2)} V
          </label>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={voltage}
            onChange={(e) => onVoltageChange(parseFloat(e.target.value))}
            className="control-slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.1 V</span>
            <span>2.0 V</span>
          </div>
        </div>
      </div>

      {/* Status Display */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white-glow mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>Status</h3>
        
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
            <span className="text-green-glow font-mono">{current.toFixed(3)} nA</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Distance</span>
            <span className="text-cyan-glow font-mono">{distance.toFixed(2)} nm</span>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="info-card">
        <h3 className="text-lg font-medium text-white-glow mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>Quick Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-purple-glow">•</span>
            <span>Move tip closer to see tunneling effects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-glow">•</span>
            <span>Tunneling occurs below 3.0 nm distance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-glow">•</span>
            <span>Higher voltage increases tunneling current</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-glow">•</span>
            <span>Use Play button for automatic scanning</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
