'use client'

import { MapPin, Calendar, DollarSign, MoreVertical, FileText } from 'lucide-react'
import { JobApplication } from '@/types'
import StatusBadge from './StatusBadge'
import { useState, useEffect, useRef } from 'react'

interface JobCardProps {
  application: JobApplication
  onEdit: (application: JobApplication) => void
  onDelete: (id: string) => void
}

export default function JobCard({ application, onEdit, onDelete }: JobCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const formatCurrency = (amount: number | null) => {
    if (!amount) return null
    return `¥${amount.toLocaleString('ja-JP')}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const salaryRange =
    application.salary_min && application.salary_max
      ? `${formatCurrency(application.salary_min)} - ${formatCurrency(application.salary_max)}`
      : application.salary_min
        ? `${formatCurrency(application.salary_min)}+`
        : null

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 relative">
      <div className="flex items-start gap-4">
        <div className="bg-gray-100 rounded-lg p-2">
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {application.job_title}
              </h3>
              <p className="text-sm text-gray-600">{application.company_name}</p>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <button
                    onClick={() => {
                      onEdit(application)
                      setShowMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      onDelete(application.id)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{application.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(application.application_date)}</span>
            </div>
            {salaryRange && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>{salaryRange}</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <StatusBadge status={application.status} />
          </div>

          {application.notes && (
            <p className="text-sm text-gray-500 mt-2">{application.notes}</p>
          )}
        </div>
      </div>
    </div>
  )
}
