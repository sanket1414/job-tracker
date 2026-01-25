export type JobStatus = 'applied' | 'interviewing' | 'offers' | 'rejected'

export interface JobApplication {
  id: string
  job_title: string
  company_name: string
  location: string
  application_date: string
  salary_min: number | null
  salary_max: number | null
  status: JobStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface JobApplicationInput {
  job_title: string
  company_name: string
  location: string
  application_date: string
  salary_min?: number | null
  salary_max?: number | null
  status: JobStatus
  notes?: string | null
}
