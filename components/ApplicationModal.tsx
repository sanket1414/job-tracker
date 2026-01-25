'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { JobApplication, JobApplicationInput, JobStatus } from '@/types'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: JobApplicationInput) => Promise<void>
  application?: JobApplication | null
}

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  application,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<JobApplicationInput>({
    job_title: '',
    company_name: '',
    location: '',
    application_date: new Date().toISOString().split('T')[0],
    salary_min: null,
    salary_max: null,
    status: 'applied',
    notes: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (application) {
      setFormData({
        job_title: application.job_title,
        company_name: application.company_name,
        location: application.location,
        application_date: application.application_date,
        salary_min: application.salary_min,
        salary_max: application.salary_max,
        status: application.status,
        notes: application.notes,
      })
    } else {
      setFormData({
        job_title: '',
        company_name: '',
        location: '',
        application_date: new Date().toISOString().split('T')[0],
        salary_min: null,
        salary_max: null,
        status: 'applied',
        notes: null,
      })
    }
  }, [application, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Only close modal on successful submission
      onClose()
      // Reset form after successful submission
      if (!application) {
        setFormData({
          job_title: '',
          company_name: '',
          location: '',
          application_date: new Date().toISOString().split('T')[0],
          salary_min: null,
          salary_max: null,
          status: 'applied',
          notes: null,
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error instanceof Error ? error.message : 'Failed to save application. Please try again.')
      // Don't close modal on error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {application ? 'Edit Application' : 'Add Application'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              value={formData.job_title}
              onChange={(e) =>
                setFormData({ ...formData, job_title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Tokyo, Setagaya-ku"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Date *
              </label>
              <input
                type="date"
                required
                value={formData.application_date}
                onChange={(e) =>
                  setFormData({ ...formData, application_date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as JobStatus,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offers">Offers</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Min (¥)
              </label>
              <input
                type="number"
                value={formData.salary_min || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary_min: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                placeholder="6000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Max (¥)
              </label>
              <input
                type="number"
                value={formData.salary_max || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary_max: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                placeholder="8000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value || null })
              }
              rows={3}
              placeholder="First interview scheduled for next week"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : application ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
