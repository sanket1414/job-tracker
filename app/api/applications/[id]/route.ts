import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { JobApplicationInput } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      if (error.message.includes('does not exist') || error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Database table not found. Please run the migration SQL in your Supabase dashboard.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Failed to fetch application' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: JobApplicationInput = await request.json()

    const { data, error } = await supabase
      .from('job_applications')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Supabase configuration is missing. Please check your environment variables.' },
        { status: 500 }
      )
    }

    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Supabase error:', error)
      if (error.message.includes('does not exist') || error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Database table not found. Please run the migration SQL in your Supabase dashboard.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Failed to delete application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete application' },
      { status: 500 }
    )
  }
}
