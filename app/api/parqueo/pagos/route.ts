import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Pago } from '@/app/lib/models/pago.model'

export async function GET() {
  try {
    await connectDB()
    const pagos = await Pago.find().sort({ fechaPago: -1 })
    return NextResponse.json({ success: true, pagos })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const data = await req.json()
    
    const pago = new Pago({
      ...data,
      fechaPago: new Date(data.fechaPago)
    })

    await pago.save()
    return NextResponse.json({ success: true, pago })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 