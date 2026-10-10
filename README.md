# Bharat Vision AI

An immersive 3D AI-powered platform for generating and exploring Indian cultural heritage art. Transform your imagination into stunning visuals of Indian temples, classical paintings, traditional sarees, and royal attire.

![Bharat Vision AI](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.186-FFFFFF?style=flat-square&logo=three.js)

## Features

### AI-Powered Art Generation
- Generate hyper-realistic 8K AI renderings of Indian cultural elements
- Custom prompts for temples, paintings, and traditional clothing
- Interactive AI chat interface with morphing orb visualization

### Indian Cultural Heritage Gallery
- **Temples**: Akshardham Temple Delhi, Sri Venkateswara Temple Tirupati
- **Paintings**: Kalamkari, Madhubani, Patua Art, Pichchavi
- **Clothing**: Banarasi Saree, Sherwani
- Category filtering and detailed AI generation prompts

### Interactive 3D Experience
- **Orbital Hero Section**: Immersive 3D orbital background with dynamic focus
- **Works Wheel**: Interactive 3D wheel gallery with smooth navigation
- **Tubes Cursor**: Dynamic cursor trail effects
- **Hyperdrive Hero**: Cinematic landing page with space effects
- **Neon Glow**: Ambient lighting effects throughout the application

### Authentication System
- User login and signup with email/password
- Session management with user profile
- Protected routes for AI generation features

### Advanced UI Components
- Liquid glass buttons with hover effects
- AI thinking orb with morphing animations
- Responsive sidebar with recent items
- Lightbox modal for image details
- Download high-resolution images

## Tech Stack

- **Framework**: Next.js 16.3 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js 0.186
- **Animations**: GSAP 3.15, Framer Motion 13.5
- **Data Visualization**: D3.js 7.9
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React

## Installation

```bash
# Clone the repository
git clone https://github.com/bhavya0510/bharatvision-3d.git
cd bharatvision-3d

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
bharatvision-3d/
├── src/
│   ├── app/
│   │   ├── generate/          # AI generation page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page with auth
│   ├── components/
│   │   ├── neon-glow.tsx      # Ambient glow effect
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   └── ui/
│   │       ├── ai-thiking-orb-and-input.tsx  # AI chat orb
│   │       ├── hyperdrive-hero.tsx           # Cinematic hero
│   │       ├── liquid-glass-button.tsx       # Glass buttons
│   │       ├── orbital-hero-section.tsx      # 3D orbital hero
│   │       ├── tubes-cursor.tsx              # Cursor trails
│   │       └── works-wheel.tsx               # 3D gallery wheel
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── types/
│       └── threejs-components.d.ts  # TypeScript definitions
├── public/
│   └── photos/               # Indian cultural heritage images
└── package.json
```

## Featured Cultural Content

### Temples
- **Akshardham Temple Delhi**: Magnificent sandstone carvings and central dome
- **Sri Venkateswara Temple Tirupati**: Majestic architecture with golden vimanam

### Paintings
- **Kalamkari**: Hand-painted mythological tales with organic vegetable dyes
- **Madhubani**: Vibrant geometric patterns with divine peacock motifs
- **Patua Art**: Bengal scroll paintings with folklore narratives
- **Pichchavi**: Sacred temple paintings depicting Lord Shrinathji

### Clothing
- **Banarasi Saree**: Traditional silk with rich gold zari embroidery
- **Sherwani**: Regal royal groom coat with zardozi gold embroidery

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Vercel
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- 3D components powered by [Three.js](https://threejs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

Made with love for Indian cultural heritage
