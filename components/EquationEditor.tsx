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
    quantum: {
      name: 'Quantum Tunneling',
      formula: 'T(E) = 4e^(-2Kd), K = √(2m(V-E))/ℏ',
      description: 'Proper quantum mechanical tunneling equation',
      params: {
        I0: { label: 'I₀ (Base Current)', value: 1.0, min: 0.1, max: 10.0, step: 0.1 },
        workFunction: { label: 'Work Function (eV)', value: 4.5, min: 3.0, max: 6.0, step: 0.1 },
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
        <h3 className="text-lg font-medium text-white flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          <span className="text-purple-400">📊</span>
          Mathematical Models
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="btn-icon accessibility-focus"
          aria-label={isOpen ? 'Close mathematical model parameters' : 'Open mathematical model parameters'}
          aria-expanded={isOpen}
        >
          <span className="text-white">⚙️</span>
        </motion.button>
      </div>

      {/* Current Equation Display */}
      <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-purple-400/20">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-400">📈</span>
          <span className="text-sm font-medium text-white">{currentEquation.name}</span>
        </div>
        <div className="text-lg font-mono text-cyan-400 mb-1">{currentEquation.formula}</div>
        <div className="text-xs text-gray-400">{currentEquation.description}</div>
      </div>

      {/* Equation Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Equation Type</label>
        <select
          value={selectedEquation}
          onChange={(e) => setSelectedEquation(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none accessibility-focus"
          aria-label="Select mathematical equation type"
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
            <span className="text-yellow-400">⚡</span>
            Adjust Parameters
          </h4>
          
          {Object.entries(currentEquation.params).map(([param, config]) => (
            <div key={param} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-300">{config.label}</label>
                <span className="text-sm font-mono text-purple-400">
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
                className="control-slider accessibility-focus"
                aria-label={`Adjust ${config.label} from ${config.min} to ${config.max}`}
                aria-valuemin={config.min}
                aria-valuemax={config.max}
                aria-valuenow={customParams[param] || config.value}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{config.min}</span>
                <span>{config.max}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mathematical Explanation */}
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-lg border border-purple-400/20">
          <h5 className="text-sm font-medium text-white mb-2">Mathematical Explanation</h5>
          <div className="text-xs text-gray-300 space-y-1">
            {selectedEquation === 'exponential' && (
              <>
                <p>• <strong>Exponential decay:</strong> Current decreases exponentially with distance</p>
                <p>• <strong>α (alpha):</strong> Controls how quickly current drops off</p>
                <p>• <strong>I₀:</strong> Maximum current at zero distance</p>
              </>
            )}
            {selectedEquation === 'quantum' && (
              <>
                <p>• <strong>Quantum tunneling:</strong> T(E) = 4e^(-2Kd) where K = √(2m(V-E))/ℏ</p>
                <p>• <strong>Work Function:</strong> Energy barrier height (typically 4-5 eV for metals)</p>
                <p>• <strong>K:</strong> Decay constant depends on barrier height and electron energy</p>
                <p>• <strong>Transmission:</strong> Probability of electron tunneling through barrier</p>
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