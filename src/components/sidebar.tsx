"use client"

import { useState } from "react"
import { Home, Images, MessageSquare, Settings, User, Sparkles, Plus, LogOut, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

export interface RecentItem {
  id: string
  title: string
  category: "Temples" | "Paintings" | "Clothing" | "Heritage"
  image: string
  prompt: string
}

interface SidebarProps {
  currentView: "home" | "gallery" | "chat"
  onViewChange: (view: "home" | "gallery" | "chat") => void
  userName?: string
  userEmail?: string
  onLogout?: () => void
  recentItems?: RecentItem[]
  onSelectRecentItem?: (item: RecentItem) => void
}

export default function Sidebar({
  currentView,
  onViewChange,
  userName,
  userEmail,
  onLogout,
  recentItems = [],
  onSelectRecentItem
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "gallery" as const, icon: Images, label: "Gallery" },
    { id: "chat" as const, icon: MessageSquare, label: "Generate" },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg text-sidebar-foreground">Bharat Vision AI</span>
          )}
        </div>
      </div>

      {/* New Generation Button */}
      <div className="p-3">
        <LiquidButton
          onClick={() => onViewChange("chat")}
          size="default"
          className={cn(
            "w-full",
            isCollapsed && "justify-center"
          )}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">New Generation</span>}
        </LiquidButton>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors cursor-pointer",
                currentView === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Recent Generations */}
      {!isCollapsed && (
        <div className="px-3 py-2 mt-4 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60 mb-3 px-3">
            Recent Generations
          </p>
          <div className="space-y-1">
            {recentItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectRecentItem && onSelectRecentItem(item)}
                title={item.title}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/70 transition-all cursor-pointer group"
              >
                <div className="relative w-7 h-7 rounded-md overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10 group-hover:border-indigo-400 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-sidebar-foreground truncate group-hover:text-indigo-300">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-sidebar-foreground/50 truncate">
                    {item.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User Profile Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{userEmail}</p>
            </div>
          )}
          {!isCollapsed && (
            <div className="flex gap-1">
              <button
                onClick={onLogout}
                title="Log out"
                className="p-1.5 rounded hover:bg-sidebar-accent/50 hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-sidebar-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-sidebar border border-sidebar-border rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors z-10 cursor-pointer"
      >
        <span className="text-xs text-sidebar-foreground">
          {isCollapsed ? "→" : "←"}
        </span>
      </button>
    </aside>
  )
}
