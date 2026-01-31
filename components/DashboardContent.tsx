'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { JobApplication, JobApplicationInput } from '@/types'
import StatsGrid from './StatsGrid'
import AddApplicationButton from './AddApplicationButton'
import JobList from './JobList'
import ApplicationModal from './ApplicationModal'

export default function DashboardContent() {
  const router = useRouter()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications')
      if (response.status === 401) {
        router.push('/login')
        router.refresh()
        return
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch applications')
      }
      const data = await response.json()
      setApplications(data)
      setErrorMessage(null)
    } catch (error) {
      console.error('Error fetching applications:', error)
      const message = error instanceof Error ? error.message : 'Failed to fetch applications'
      setErrorMessage(message)
      // Set empty array on error so UI doesn't break
      setApplications([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingApplication(null)
    setIsModalOpen(true)
  }

  const handleEdit = (application: JobApplication) => {
    setEditingApplication(application)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: JobApplicationInput): Promise<void> => {
    try {
      if (editingApplication) {
        // Update existing
        const response = await fetch(`/api/applications/${editingApplication.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (response.status === 401) {
          router.push('/login')
          router.refresh()
          return
        }
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to update application')
        }
        const updated = await response.json()
        setApplications((prev) =>
          prev.map((app) => (app.id === updated.id ? updated : app))
        )
        setSuccessMessage('Application updated successfully!')
      } else {
        // Create new
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (response.status === 401) {
          router.push('/login')
          router.refresh()
          return
        }
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to create application')
        }
        const newApp = await response.json()
        setApplications((prev) => [newApp, ...prev])
        setSuccessMessage('Application added successfully!')
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.error('Error saving application:', error)
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return
    }

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      })
      if (response.status === 401) {
        router.push('/login')
        router.refresh()
        return
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to delete application')
      }
      setApplications((prev) => prev.filter((app) => app.id !== id))
      setSuccessMessage('Application deleted successfully!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.error('Error deleting application:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete application. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-500">Loading applications...</p>
      </div>
    )
  }

  return (
    <>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-green-700 hover:text-green-900"
          >
            ×
          </button>
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-between">
          <div className="flex-1">
            <p className="font-semibold mb-1">Error loading applications</p>
            <p className="text-sm">{errorMessage}</p>
            {errorMessage.includes('table not found') && (
              <p className="text-sm mt-2">
                Please run the SQL migration from <code className="bg-red-200 px-1 rounded">supabase/migrations/001_create_job_applications.sql</code> in your Supabase dashboard.
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setErrorMessage(null)
              setIsLoading(true)
              fetchApplications()
            }}
            className="ml-4 text-red-700 hover:text-red-900 underline text-sm"
          >
            Retry
          </button>
        </div>
      )}
      <StatsGrid applications={applications} />
      <AddApplicationButton onClick={handleAdd} />
      <JobList
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingApplication(null)
        }}
        onSubmit={handleSubmit}
        application={editingApplication}
      />
    </>
  )
}
