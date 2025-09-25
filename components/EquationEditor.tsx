'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface EquationEditorProps {
  onEquationChange: (equation: string, params: Record<string, number>) => void
  currentParams: Record<string, number>
}

export default function EquationEditor({ onEquationChange, currentParams }: EquationEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEquation, setSelectedEquation] = useState('exponential')
  const [customParams, setCustomParams] = useState(currentParams)

  const equations = {
    exponential: {
      name: 'Exponential Tunneling',
      formula: 'I = I₀ × e^(-αd)',
      description: 'Standard STM tunneling current equation',
      params: {
        I0: { label: 'I₀ (Base Current)', value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        alpha: { label: 'α (Decay Constant)', value: 2.0, min: 0.5, max: 5.0, step: 0.1 },
        d: { label: 'd (Distance)', value: 1.0, min: 0.1, max: 5.0, step: 0.1 }
      }
    },
    power: {
      name: 'Power Law',
      formula: 'I = A × d^(-n)',
      description: 'Power law relationship for current vs distance',
      params: {
        A: { label: 'A (Amplitude)', value: 1.0, min: 0.1, max: 5.0, step: 0.1 },
        n: { label: 'n (Power)', value: 2.0, min: 1.0, max: 4.0, step: 0.1 },
        d: { label: 'd (Distance)', value: 1.0, min: 0.1, max: 5.0, step: 0.1 }
      }
    },
    gaussian: {
      name: 'Gaussian Tunneling',
      formula: 'I = I₀ × e^(-(d-μ)²/2σ²)',
      description: 'Gaussian distribution for tunneling probability',
      params: {
        I0: { label: 'I₀ (Peak Current)', value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        mu: { label: 'μ (Mean Distance)', value: 2.0, min: 0.5, max: 4.0, step: 0.1 },
        sigma: { label: 'σ (Standard Deviation)', value: 0.5, min: 0.1, max: 2.0, step: 0.1 },
        d: { label: 'd (Distance)', value: 1.0, min: 0.1, max: 5.0, step: 0.1 }
      }
    },
    custom: {
      name: 'Custom Equation',
      formula: 'I = f(d, V, T)',
      description: 'Define your own mathematical relationship',
      params: {
        a: { label: 'Parameter A', value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        b: { label: 'Parameter B', value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        c: { label: 'Parameter C', value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        d: { label: 'd (Distance)', value: 1.0, min: 0.1, max: 5.0, step: 0.1 }
      }
    }
  }

  const handleParamChange = (param: string, value: number) => {
    const newParams = { ...customParams, [param]: value }
    setCustomParams(newParams)
    onEquationChange(selectedEquation, newParams)
  }

  const currentEquation = equations[selectedEquation as keyof typeof equations]

  return (
    <div className="info-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white-glow flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <span className="text-purple-glow">📊</span>
          Mathematical Models
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
        >
          <span className="text-white-glow">⚙️</span>
        </motion.button>
      </div>

      {/* Current Equation Display */}
      <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-purple-glow/20">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-glow">📈</span>
          <span className="text-sm font-medium text-white-glow">{currentEquation.name}</span>
        </div>
        <div className="text-lg font-mono text-cyan-glow mb-1">{currentEquation.formula}</div>
        <div className="text-xs text-gray-400">{currentEquation.description}</div>
      </div>

      {/* Equation Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Equation Type</label>
        <select
          value={selectedEquation}
          onChange={(e) => setSelectedEquation(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white-glow focus:border-purple-glow focus:outline-none"
        >
          {Object.entries(equations).map(([key, equation]) => (
            <option key={key} value={key}>{equation.name}</option>
          ))}
        </select>
      </div>

      {/* Parameter Controls */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-yellow-glow">⚡</span>
            Adjust Parameters
          </h4>
          
          {Object.entries(currentEquation.params).map(([param, config]) => (
            <div key={param} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-300">{config.label}</label>
                <span className="text-sm font-mono text-purple-glow">
                  {customParams[param]?.toFixed(2) || config.value.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={config.min}
                max={config.max}
                step={config.step}
                value={customParams[param] || config.value}
                onChange={(e) => handleParamChange(param, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer control-slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{config.min}</span>
                <span>{config.max}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mathematical Explanation */}
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-glow/10 to-cyan-glow/10 rounded-lg border border-purple-glow/20">
          <h5 className="text-sm font-medium text-white-glow mb-2">Mathematical Explanation</h5>
          <div className="text-xs text-gray-300 space-y-1">
            {selectedEquation === 'exponential' && (
              <>
                <p>• <strong>Exponential decay:</strong> Current decreases exponentially with distance</p>
                <p>• <strong>α (alpha):</strong> Controls how quickly current drops off</p>
                <p>• <strong>I₀:</strong> Maximum current at zero distance</p>
              </>
            )}
            {selectedEquation === 'power' && (
              <>
                <p>• <strong>Power law:</strong> Current follows d^(-n) relationship</p>
                <p>• <strong>n:</strong> Power exponent (higher = steeper decay)</p>
                <p>• <strong>A:</strong> Amplitude scaling factor</p>
              </>
            )}
            {selectedEquation === 'gaussian' && (
              <>
                <p>• <strong>Gaussian:</strong> Bell curve distribution around optimal distance</p>
                <p>• <strong>μ (mu):</strong> Distance of maximum tunneling</p>
                <p>• <strong>σ (sigma):</strong> Width of the tunneling region</p>
              </>
            )}
            {selectedEquation === 'custom' && (
              <>
                <p>• <strong>Custom:</strong> Define your own mathematical relationship</p>
                <p>• <strong>Parameters A, B, C:</strong> Adjustable coefficients</p>
                <p>• <strong>Experiment:</strong> See how different values affect the curve</p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}