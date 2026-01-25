import { Briefcase } from 'lucide-react'
import StatsCard from './StatsCard'
import { JobApplication } from '@/types'

interface StatsGridProps {
  applications: JobApplication[]
}

export default function StatsGrid({ applications }: StatsGridProps) {
  const total = applications.length
  const applied = applications.filter((app) => app.status === 'applied').length
  const interviewing = applications.filter((app) => app.status === 'interviewing').length
  const offers = applications.filter((app) => app.status === 'offers').length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
        label="Total"
        value={total}
        icon={<Briefcase className="w-6 h-6" />}
      />
      <StatsCard
        label="Applied"
        value={applied}
        indicatorColor="#93c5fd"
      />
      <StatsCard
        label="Interviewing"
        value={interviewing}
        indicatorColor="#fb923c"
      />
      <StatsCard
        label="Offers"
        value={offers}
        indicatorColor="#86efac"
      />
    </div>
  )
}
