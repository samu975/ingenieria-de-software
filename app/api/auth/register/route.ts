import { connectDB } from "@/app/lib/db"
import { registerUser } from "@/app/lib/services/auth.service"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectDB()
    const data = await req.json()
    const user = await registerUser(data)
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
