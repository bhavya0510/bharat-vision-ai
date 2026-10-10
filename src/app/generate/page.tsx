"use client"

import { useEffect, useState } from "react"
import Sidebar, { type RecentItem } from "@/components/sidebar"
import WorksWheel, { type WorksWheelItem } from "@/components/ui/works-wheel"
import TubesCursor from "@/components/ui/tubes-cursor"
import NeonGlow from "@/components/neon-glow"
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section"
import MorphOrb from "@/components/ui/ai-thiking-orb-and-input"
import { Sparkles, Images, Zap, X, Download, Wand2 } from "lucide-react"

/** True while the viewport is narrow. Drives the layout swap below. */
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(query)
    const sync = () => setNarrow(m.matches)
    sync()
    m.addEventListener("change", sync)
    return () => m.removeEventListener("change", sync)
  }, [query])
  return narrow
}

interface GeneratePageProps {
  userName?: string
  userEmail?: string
  onLogout?: () => void
}

const indianArtworks: RecentItem[] = [
  {
    id: "akshardham-temple",
    title: "Akshardham Temple Delhi",
    category: "Temples",
    image: "/photos/Akshardham-Temple-Delhi.png",
    prompt: "Hyper-realistic 8K AI rendering of Swaminarayan Akshardham Temple in New Delhi featuring magnificent sandstone carvings, central dome, and sunset lighting.",
  },
  {
    id: "banarasi-saree",
    title: "Banarasi Saree",
    category: "Clothing",
    image: "/photos/Banarasi-Saree.jpg",
    prompt: "Traditional Indian silk Banarasi Saree with rich gold zari embroidery, intricate floral borders, and royal heritage craftsmanship.",
  },
  {
    id: "kalamkari-paintings",
    title: "Kalamkari Paintings",
    category: "Paintings",
    image: "/photos/Kalamkari-Paintings.jpeg",
    prompt: "Authentic hand-painted Kalamkari folk painting depicting Indian mythological tales using organic vegetable dyes on cotton canvas.",
  },
  {
    id: "madhubani-paintings",
    title: "Madhubani Paintings",
    category: "Paintings",
    image: "/photos/Madhubani-Paintings.jpeg",
    prompt: "Traditional Mithila Madhubani art featuring vibrant geometric patterns, divine peacock motifs, and bold natural pigment lines.",
  },
  {
    id: "patua-art-paintings",
    title: "Patua Art Paintings",
    category: "Paintings",
    image: "/photos/Patua-Art-Paintings.jpeg",
    prompt: "Heritage Bengal Patua scroll painting illustrating folklore narratives with distinctive bold strokes and rich crimson hues.",
  },
  {
    id: "pichchavi-paintings",
    title: "Pichchavi Paintings",
    category: "Paintings",
    image: "/photos/Pichchavi-Paintings.webp",
    prompt: "Sacred Pichhwai temple painting artwork depicting Lord Shrinathji surrounded by lotus flowers and golden motifs.",
  },
  {
    id: "sherwani",
    title: "Sherwani",
    category: "Clothing",
    image: "/photos/Sherwani.jpg",
    prompt: "Regal Indian royal groom Sherwani coat with detailed zardozi gold embroidery, velvet collar, and pearl accents.",
  },
  {
    id: "sri-venkateswara-temple",
    title: "Sri Venkateswara Temple Tirupati",
    category: "Temples",
    image: "/photos/Sri-Venkateswara-Temple-Tirupati.jpg",
    prompt: "Majestic architectural view of Sri Venkateswara Temple at Tirumala Tirupati with Ananda Nilayam golden vimanam dome.",
  },
]

export default function GeneratePage({ userName, userEmail, onLogout }: GeneratePageProps) {
  const [currentView, setCurrentView] = useState<"home" | "gallery" | "chat">("home")
  const [selectedImage, setSelectedImage] = useState<RecentItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const narrow = useNarrow()

  const categories = ["All", "Temples", "Paintings", "Clothing"]

  const filteredArtworks = selectedCategory === "All"
    ? indianArtworks
    : indianArtworks.filter(item => item.category === selectedCategory)

  const galleryWheelItems: WorksWheelItem[] = filteredArtworks.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image,
    prompt: item.prompt,
    href: `#${item.id}`,
  }))

  const handleAsk = async (text: string) => {
    await new Promise((r) => setTimeout(r, 3400))
    return `Here's what I imagine for "${text}" — a vivid AI generation blending Indian heritage, temple architecture, fine paintings & royal attire.`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeonGlow />
      <TubesCursor />
      
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        userName={userName}
        userEmail={userEmail}
        onLogout={onLogout}
        recentItems={indianArtworks}
        onSelectRecentItem={(item) => setSelectedImage(item)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 ml-16 min-h-screen md:ml-64">
        {currentView === "home" && (
          <div>
            {/* Hero Section */}
            <OrbitalHeroSection
              focus={narrow ? [0.5, 0.86] : [0.74, 0.42]}
              scrim={narrow ? "top" : "left"}
              scrimStrength={narrow ? 0.94 : 0.92}
              viewRadius={narrow ? 2.1 : 3.1}
              lead={narrow ? 0.05 : 0.12}
              glow={narrow ? 0.5 : 1}
            >
              <div className="flex h-full min-h-[92svh] items-start px-6 pt-14 sm:px-10 md:items-center md:pt-0 lg:px-20">
                <div className="max-w-[36rem]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Indian AI Art & Cultural Synthesis
                  </div>

                  <h1 className="text-[2.5rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.25rem]">
                    Bharat
                    <br />
                    Vision AI
                  </h1>

                  <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/60 md:mt-7">
                    Transform your imagination into Indian temples, classical paintings, Banarasi sarees & Sherwanis powered by AI.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
                    <button
                      onClick={() => setCurrentView("chat")}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate AI Vision
                    </button>
                    <button
                      onClick={() => setCurrentView("gallery")}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white/40 hover:text-white cursor-pointer"
                    >
                      <Images className="h-4 w-4" />
                      Browse Indian Gallery
                    </button>
                  </div>
                </div>
              </div>
            </OrbitalHeroSection>

            {/* Indian Specific Showcase Section */}
            <div className="px-6 pb-24 pt-16 sm:px-10 lg:px-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-light tracking-tight text-white">
                    Indian Heritage & AI Creations
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explore Akshardham & Tirupati temples, Madhubani & Kalamkari paintings, Banarasi sarees & Sherwanis
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of User Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredArtworks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                        {item.category}
                      </div>
                      <h3 className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                        {item.prompt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery View */}
        {currentView === "gallery" && (
          <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold">Indian AI Gallery</h1>
                  <p className="text-muted-foreground mt-1">
                    Interactive 3D wheel showcasing Akshardham, Tirupati, Madhubani, Kalamkari, Pichchavi, Patua, Banarasi Saree & Sherwani
                  </p>
                </div>
                {/* Category Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[calc(100vh-10rem)]">
              <WorksWheel
                items={galleryWheelItems}
                label="Bharat Vision AI"
                action="Inspect"
                onItemClick={(item) => {
                  const match = indianArtworks.find(a => a.id === item.id || a.title === item.title)
                  if (match) setSelectedImage(match)
                }}
              />
            </div>
          </div>
        )}

        {/* Chat / AI Generator View */}
        {currentView === "chat" && (
          <div className="relative h-[calc(100svh)] w-full overflow-hidden">
            <MorphOrb onSubmit={handleAsk} />
          </div>
        )}
      </main>

      {/* Image Detail Lightbox Modal (For Sidebar / Gallery Clicks) */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black text-white rounded-full transition-all border border-white/10 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Image View */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            {/* Right Information Panel */}
            <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                  {selectedImage.category}
                </span>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedImage.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      AI Generation Prompt
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/50 italic">
                      &quot;{selectedImage.prompt}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-zinc-800/40 rounded-lg border border-zinc-800">
                      <span className="text-zinc-500 block">Resolution</span>
                      <span className="text-zinc-200 font-semibold">3840 × 2160 (4K UHD)</span>
                    </div>
                    <div className="p-2.5 bg-zinc-800/40 rounded-lg border border-zinc-800">
                      <span className="text-zinc-500 block">AI Engine</span>
                      <span className="text-zinc-200 font-semibold">BharatVision-v3.2</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
                <a
                  href={selectedImage.image}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Download High-Res Image
                </a>
                <button
                  onClick={() => {
                    setSelectedImage(null)
                    setCurrentView("chat")
                  }}
                  className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer border border-zinc-700"
                >
                  <Wand2 className="h-4 w-4 text-indigo-400" />
                  Generate Similar Variation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
