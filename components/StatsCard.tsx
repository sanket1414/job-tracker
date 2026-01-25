import { ReactNode } from 'react'

interface StatsCardProps {
  label: string
  value: number
  icon?: ReactNode
  indicatorColor?: string
}

export default function StatsCard({ label, value, icon, indicatorColor }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {icon && <div className="text-gray-400">{icon}</div>}
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      {indicatorColor && (
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: indicatorColor }}
        />
      )}
    </div>
  )
}
