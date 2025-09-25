# STM Tunneling Simulator

An interactive web-based learning tool for understanding Scanning Tunneling Microscopy (STM) and quantum tunneling effects.

## Features

- **Interactive Visualization**: Real-time STM tip movement with quantum tunneling effects
- **Educational Content**: Comprehensive information about STM principles and applications
- **Customizable Controls**: Adjust tip distance, voltage, and observe tunneling current
- **Modern UI**: Built with Next.js 14, Tailwind CSS, and Framer Motion
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Fonts**: Vercel Geist Sans & Mono
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd STM_Tunneling_Animation
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Manual Build

```bash
npm run build
npm start
```

## How to Use

1. **Adjust Tip Distance**: Use the slider to move the STM tip closer or farther from the surface
2. **Control Voltage**: Modify the applied voltage to see its effect on tunneling
3. **Watch Tunneling**: Observe electron particles tunneling when the tip is close enough (< 3nm)
4. **Learn**: Click "Show Info" to access educational content about STM

## Key Concepts

- **Quantum Tunneling**: Electrons can pass through energy barriers at the quantum level
- **STM Principle**: Uses tunneling current to image surfaces at atomic resolution
- **Distance Dependence**: Tunneling current decreases exponentially with tip-sample distance
- **Voltage Effect**: Higher voltage increases the tunneling current

## Educational Value

This tool helps students and researchers understand:
- The physics behind STM operation
- Quantum tunneling phenomena
- The relationship between distance, voltage, and current in STM
- Real-world applications of scanning probe microscopy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Vercel for the Geist font family
- The scientific community for STM research and development
- Framer Motion for smooth animations
