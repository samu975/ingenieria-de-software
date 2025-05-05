import { connectDB } from '@/app/lib/db'
import { loginUser } from '@/app/lib/services/auth.service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    const user = await loginUser(email, password)
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
