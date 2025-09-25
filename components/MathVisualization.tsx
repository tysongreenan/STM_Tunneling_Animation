'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Calculator } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MathVisualizationProps {
  equation: string
  params: Record<string, number>
  currentDistance: number
  currentCurrent: number
}

export default function MathVisualization({ 
  equation, 
  params, 
  currentDistance, 
  currentCurrent 
}: MathVisualizationProps) {
  const [plotData, setPlotData] = useState<Array<{ x: number; y: number }>>([])

  // Calculate equation values
  const calculateEquation = (distance: number, equationType: string, params: Record<string, number>): number => {
    switch (equationType) {
      case 'exponential':
        return params.I0 * Math.exp(-params.alpha * distance)
      case 'power':
        return params.A * Math.pow(distance, -params.n)
      case 'gaussian':
        return params.I0 * Math.exp(-Math.pow(distance - params.mu, 2) / (2 * Math.pow(params.sigma, 2)))
      case 'custom':
        // Custom equation: I = A * e^(-B*d) + C * d^(-2)
        return params.a * Math.exp(-params.b * distance) + params.c * Math.pow(distance, -2)
      default:
        return Math.exp(-2 * distance)
    }
  }

  // Generate plot data
  useEffect(() => {
    const data = []
    for (let d = 0.1; d <= 5.0; d += 0.1) {
      const current = calculateEquation(d, equation, params)
      data.push({ x: d, y: current })
    }
    setPlotData(data)
  }, [equation, params])

  const maxCurrent = Math.max(...plotData.map(p => p.y))
  const maxDistance = 5.0

  // Find current point on curve
  const currentPoint = {
    x: currentDistance,
    y: calculateEquation(currentDistance, equation, params)
  }

  return (
    <div className="info-card">
      <h3 className="text-lg font-medium text-white-glow mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        <TrendingUp className="w-5 h-5 text-cyan-glow" />
        Mathematical Curve
      </h3>

      {/* Plot Area */}
      <div className="relative h-48 bg-gray-900/50 rounded-lg border border-gray-700/50 p-4 mb-4">
        {/* Grid Lines */}
        <div className="absolute inset-4">
          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <div
              key={ratio}
              className="absolute w-full h-px bg-gray-700/30"
              style={{ top: `${ratio * 100}%` }}
            />
          ))}
          {/* Vertical grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <div
              key={ratio}
              className="absolute h-full w-px bg-gray-700/30"
              style={{ left: `${ratio * 100}%` }}
            />
          ))}
        </div>

        {/* Plot Curve */}
        <svg className="absolute inset-4 w-full h-full">
          {/* Curve Path */}
          <motion.path
            d={`M ${plotData.map((point, i) => 
              `${(point.x / maxDistance) * 100} ${100 - (point.y / maxCurrent) * 100}`
            ).join(' L ')}`}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Current Point */}
          <motion.circle
            cx={(currentPoint.x / maxDistance) * 100}
            cy={100 - (currentPoint.y / maxCurrent) * 100}
            r="4"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </svg>

        {/* Axis Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>1.25</span>
          <span>2.5</span>
          <span>3.75</span>
          <span>5.0 nm</span>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400">
          <span>{maxCurrent.toFixed(2)}</span>
          <span>{(maxCurrent * 0.75).toFixed(2)}</span>
          <span>{(maxCurrent * 0.5).toFixed(2)}</span>
          <span>{(maxCurrent * 0.25).toFixed(2)}</span>
          <span>0 nA</span>
        </div>
      </div>

      {/* Current Values */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-400">Current Distance</div>
          <div className="text-lg font-mono text-cyan-glow">{currentDistance.toFixed(2)} nm</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">Predicted Current</div>
          <div className="text-lg font-mono text-green-glow">{currentPoint.y.toFixed(3)} nA</div>
        </div>
      </div>

      {/* Equation Display */}
      <div className="p-3 bg-gray-800/50 rounded-lg border border-purple-glow/20">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-4 h-4 text-purple-glow" />
          <span className="text-sm font-medium text-white-glow">Current Equation</span>
        </div>
        <div className="text-sm font-mono text-cyan-glow mb-2">
          {equation === 'exponential' && 'I = I₀ × e^(-αd)'}
          {equation === 'power' && 'I = A × d^(-n)'}
          {equation === 'gaussian' && 'I = I₀ × e^(-(d-μ)²/2σ²)'}
          {equation === 'custom' && 'I = A × e^(-B×d) + C × d^(-2)'}
        </div>
        <div className="text-xs text-gray-400">
          Current values: I = {currentPoint.y.toFixed(3)} nA at d = {currentDistance.toFixed(2)} nm
        </div>
      </div>

      {/* Mathematical Properties */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-glow/10 to-cyan-glow/10 rounded-lg border border-purple-glow/20">
        <h5 className="text-sm font-medium text-white-glow mb-2">Mathematical Properties</h5>
        <div className="text-xs text-gray-300 space-y-1">
          {equation === 'exponential' && (
            <>
              <p>• <strong>Exponential decay:</strong> Rate of change = -α × I</p>
              <p>• <strong>Half-life:</strong> d₁/₂ = ln(2)/α = {(Math.log(2) / params.alpha).toFixed(2)} nm</p>
              <p>• <strong>Slope at current point:</strong> {(-params.alpha * currentPoint.y).toFixed(3)} nA/nm</p>
            </>
          )}
          {equation === 'power' && (
            <>
              <p>• <strong>Power law:</strong> Rate of change = -n × A × d^(-n-1)</p>
              <p>• <strong>Exponent:</strong> n = {params.n.toFixed(1)}</p>
              <p>• <strong>Slope at current point:</strong> {(-params.n * params.A * Math.pow(currentDistance, -params.n - 1)).toFixed(3)} nA/nm</p>
            </>
          )}
          {equation === 'gaussian' && (
            <>
              <p>• <strong>Peak at:</strong> μ = {params.mu.toFixed(2)} nm</p>
              <p>• <strong>Standard deviation:</strong> σ = {params.sigma.toFixed(2)} nm</p>
              <p>• <strong>Full width at half max:</strong> {2.355 * params.sigma} nm</p>
            </>
          )}
          {equation === 'custom' && (
            <>
              <p>• <strong>Exponential term:</strong> A × e^(-B×d) = {params.a * Math.exp(-params.b * currentDistance).toFixed(3)}</p>
              <p>• <strong>Power term:</strong> C × d^(-2) = {params.c * Math.pow(currentDistance, -2).toFixed(3)}</p>
              <p>• <strong>Combined:</strong> {currentPoint.y.toFixed(3)} nA</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
