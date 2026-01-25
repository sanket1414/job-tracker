'use client'

import { Plus } from 'lucide-react'

interface AddApplicationButtonProps {
  onClick: () => void
}

export default function AddApplicationButton({ onClick }: AddApplicationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors mb-6"
    >
      <Plus className="w-5 h-5" />
      <span>Add Application</span>
    </button>
  )
}
