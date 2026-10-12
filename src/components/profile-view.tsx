"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Edit3, LogOut, X, Check, Save } from "lucide-react"

interface ProfileProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userEmail?: string
  onUpdateUser: (newName: string, newEmail: string) => void
  onLogout?: () => void
}

export default function ProfileView({
  isOpen,
  onClose,
  userName,
  userEmail = "",
  onUpdateUser,
  onLogout,
}: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [nameInput, setNameInput] = useState(userName || "Sourabh Kumar")
  const [isSaved, setIsSaved] = useState(false)

  const displayName = userName || nameInput || "Sourabh Kumar"
  const initial = (displayName.trim().charAt(0) || "S").toUpperCase()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (trimmed) {
      onUpdateUser(trimmed, userEmail)
      localStorage.setItem("userName", trimmed)
      if (userEmail) {
        localStorage.setItem(`userName_${userEmail}`, trimmed)
      }
      setIsEditing(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const handleCancel = () => {
    setNameInput(userName || "Sourabh Kumar")
    setIsEditing(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close profile"
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Profile Content */}
          <div className="flex flex-col items-center text-center pt-2 pb-2">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-indigo-500/20 mb-4">
              {initial}
            </div>

            {!isEditing ? (
              <>
                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-6">
                  {displayName}
                </h3>

                {isSaved && (
                  <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5" /> Name updated successfully
                  </div>
                )}

                {/* Actions: Edit Profile & Logout */}
                <div className="w-full space-y-2.5">
                  <button
                    onClick={() => {
                      setNameInput(displayName)
                      setIsEditing(true)
                    }}
                    className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl border border-zinc-700 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Edit3 className="h-4 w-4 text-indigo-400" />
                    Edit Profile
                  </button>

                  {onLogout && (
                    <button
                      onClick={() => {
                        onClose()
                        onLogout()
                      }}
                      className="w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-xl border border-red-500/20 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Edit Profile Form (Only Name) */
              <form onSubmit={handleSave} className="w-full text-left space-y-4 mt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                    autoFocus
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium rounded-xl border border-zinc-700 transition-colors text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
