import { Suspense } from 'react'
import Header from '@/components/Header'
import DashboardContent from '@/components/DashboardContent'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-500">Loading applications...</p>
          </div>
        }>
          <DashboardContent />
        </Suspense>
      </div>
    </main>
  )
}
