import { JobApplication } from '@/types'
import JobCard from './JobCard'

interface JobListProps {
  applications: JobApplication[]
  onEdit: (application: JobApplication) => void
  onDelete: (id: string) => void
}

export default function JobList({ applications, onEdit, onDelete }: JobListProps) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-500">No job applications yet. Add your first application to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <JobCard
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
