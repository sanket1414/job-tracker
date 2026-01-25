import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { JobApplicationInput } from '@/types'

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Supabase configuration is missing. Please check your environment variables.' },
        { status: 500 }
      )
    }

    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // Check if table doesn't exist
      if (error.message.includes('does not exist') || error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Database table not found. Please run the migration SQL in your Supabase dashboard.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Supabase configuration is missing. Please check your environment variables.' },
        { status: 500 }
      )
    }

    const body: JobApplicationInput = await request.json()

    const { data, error } = await supabase
      .from('job_applications')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      // Check if table doesn't exist
      if (error.message.includes('does not exist') || error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Database table not found. Please run the migration SQL in your Supabase dashboard.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Failed to create application' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create application' },
      { status: 500 }
    )
  }
}
