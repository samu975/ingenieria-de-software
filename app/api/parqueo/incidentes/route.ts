import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Incidente } from '@/app/lib/models/incidente.model'

export async function GET() {
  try {
    await connectDB()
    const incidentes = await Incidente.find().sort({ fechaIncidente: -1 })
    return NextResponse.json({ success: true, incidentes })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const data = await req.json()
    
    const incidente = new Incidente({
      ...data,
      fechaIncidente: new Date(data.fechaIncidente)
    })

    await incidente.save()
    return NextResponse.json({ success: true, incidente })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 