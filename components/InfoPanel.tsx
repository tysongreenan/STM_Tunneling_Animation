'use client'

import { motion } from 'framer-motion'
import { Atom, Zap, Target, BookOpen } from 'lucide-react'

export default function InfoPanel() {
  const sections = [
    {
      icon: Atom,
      title: "What is STM?",
      content: "Scanning Tunneling Microscopy (STM) is a powerful technique that uses quantum tunneling to image surfaces at the atomic level. By bringing an extremely sharp tip very close to a surface and applying a small voltage, electrons can 'tunnel' through the vacuum gap, creating a measurable current."
    },
    {
      icon: Zap,
      title: "Quantum Tunneling",
      content: "Quantum tunneling is a quantum mechanical phenomenon where particles can pass through energy barriers that would be impossible to cross according to classical physics. In STM, electrons tunnel from the tip to the sample (or vice versa) when the tip is close enough."
    },
    {
      icon: Target,
      title: "How STM Works",
      content: "The STM tip is positioned within nanometers of the sample surface. A small voltage is applied between the tip and sample. When the tip is close enough (typically 0.3-3 nm), electrons tunnel through the vacuum gap, creating a current that depends exponentially on the tip-sample distance."
    },
    {
      icon: BookOpen,
      title: "Applications",
      content: "STM is used to study surface structures, atomic arrangements, electronic properties, and even manipulate individual atoms. It's essential in nanotechnology, materials science, and fundamental physics research."
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="info-card"
    >
      <h2 className="text-2xl font-light text-white-glow mb-6 text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        Learn About Scanning Tunneling Microscopy
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-glow/20 rounded-lg">
                <section.icon className="w-6 h-6 text-purple-glow" />
              </div>
              <h3 className="text-lg font-medium text-white-glow" style={{ fontFamily: 'var(--font-geist-sans)' }}>{section.title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Key Parameters */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-glow/10 to-cyan-glow/10 rounded-xl border border-purple-glow/20">
        <h3 className="text-xl font-medium text-white-glow mb-4 text-center" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Key STM Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-mono text-purple-glow mb-1">0.3-3 nm</div>
            <div className="text-sm text-gray-300">Tip-Sample Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono text-yellow-glow mb-1">0.1-2 V</div>
            <div className="text-sm text-gray-300">Applied Voltage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono text-green-glow mb-1">pA-nA</div>
            <div className="text-sm text-gray-300">Tunneling Current</div>
          </div>
        </div>
      </div>

      {/* Interactive Guide */}
      <div className="mt-6 p-4 bg-cyan-glow/10 rounded-xl border border-cyan-glow/20">
        <h4 className="text-lg font-medium text-white-glow mb-3" style={{ fontFamily: 'var(--font-geist-sans)' }}>Interactive Guide</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <p><span className="text-cyan-glow">•</span> Adjust the tip distance slider to see how tunneling current changes</p>
          <p><span className="text-cyan-glow">•</span> Watch the electron particles tunnel from tip to surface atoms</p>
          <p><span className="text-cyan-glow">•</span> Notice how current increases exponentially as distance decreases</p>
          <p><span className="text-cyan-glow">•</span> Use the voltage control to see its effect on tunneling</p>
        </div>
      </div>
    </motion.div>
  )
}
