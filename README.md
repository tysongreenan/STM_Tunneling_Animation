# STM Tunneling Simulator

An interactive web-based learning tool for understanding Scanning Tunneling Microscopy (STM) and quantum tunneling effects.

## Features

- **Interactive Visualization**: Real-time STM tip movement with quantum tunneling effects
- **Mathematical Models**: Multiple equation types including proper quantum tunneling (T(E) = 4e^(-2Kd)), exponential, power law, Gaussian, custom
- **Parameter Adjustment**: Real-time tuning of equation parameters with live curve updates
- **Educational Content**: Comprehensive information about STM principles and mathematical models
- **Customizable Controls**: Adjust tip distance, voltage, and observe tunneling current
- **Mathematical Visualization**: Live plotting of current vs distance curves with derivatives
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

### Quick Deploy to Vercel

1. **Create GitHub Repository:**
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/stm-tunneling-simulator.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

### Alternative: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Manual Build

```bash
npm run build
npm start
```

📖 **Detailed deployment guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

## How to Use

1. **Adjust Tip Distance**: Use the slider to move the STM tip closer or farther from the surface
2. **Control Voltage**: Modify the applied voltage to see its effect on tunneling
3. **Watch Tunneling**: Observe electron particles tunneling when the tip is close enough (< 3nm)
4. **Mathematical Models**: Select different equation types including proper quantum tunneling (T(E) = 4e^(-2Kd)), exponential, power law, Gaussian, custom)
5. **Parameter Tuning**: Adjust equation parameters to see their effect on the tunneling curve
6. **Mathematical Visualization**: View live plots of current vs distance with mathematical properties
7. **Learn**: Click "Show Info" to access educational content about STM and mathematical models

## Key Concepts

- **Quantum Tunneling**: Electrons can pass through energy barriers at the quantum level
- **STM Principle**: Uses tunneling current to image surfaces at atomic resolution
- **Distance Dependence**: Tunneling current decreases exponentially with tip-sample distance
- **Voltage Effect**: Higher voltage increases the tunneling current

## Quantum Tunneling Physics

The simulator includes the proper quantum mechanical transmission probability:

**T(E) = 4e^(-2Kd)**

Where:
- **K = √(2m(V-E))/ℏ** (decay constant)
- **m**: Electron mass (9.109 × 10⁻³¹ kg)
- **V**: Work function (typically 4-5 eV for metals)
- **E**: Applied bias voltage
- **ℏ**: Reduced Planck constant (1.055 × 10⁻³⁴ J⋅s)
- **d**: Tip-sample distance

This equation accurately describes how electrons tunnel through the potential barrier between the STM tip and sample surface.

## Educational Value

This tool helps students and researchers understand:
- The physics behind STM operation
- Quantum tunneling phenomena
- Mathematical modeling of physical systems
- Different equation types and their parameters
- The relationship between distance, voltage, and current in STM
- Real-time visualization of mathematical functions
- Derivatives and mathematical properties of curves
- Real-world applications of scanning probe microscopy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Vercel for the Geist font family
- The scientific community for STM research and development
- Framer Motion for smooth animations
