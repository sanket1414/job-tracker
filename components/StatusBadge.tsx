import { JobStatus } from '@/types'

interface StatusBadgeProps {
  status: JobStatus
}

const statusConfig: Record<JobStatus, { label: string; bgColor: string; textColor: string }> = {
  applied: {
    label: 'Applied',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  interviewing: {
    label: 'Interviewing',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
  },
  offers: {
    label: 'Offers',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  rejected: {
    label: 'Rejected',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  )
}
