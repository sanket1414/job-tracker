import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { JobApplicationInput } from '@/types'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const body: JobApplicationInput = await request.json()

    const { data, error } = await supabase
      .from('job_applications')
      .insert([{ ...body, user_id: user.id }])
      .select()
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
