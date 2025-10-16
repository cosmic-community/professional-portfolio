import { NextRequest, NextResponse } from 'next/server'
import { subscribeNewsletter } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    await subscribeNewsletter(name, email)
    
    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}