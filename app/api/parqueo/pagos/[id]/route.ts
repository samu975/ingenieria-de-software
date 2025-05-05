import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Pago } from '@/app/lib/models/pago.model'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const pago = await Pago.findById(params.id)
    
    if (!pago) {
      return NextResponse.json({ success: false, error: 'Pago no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true, pago })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await req.json()
    
    const pago = await Pago.findById(params.id)
    if (!pago) {
      return NextResponse.json({ success: false, error: 'Pago no encontrado' }, { status: 404 })
    }

    Object.assign(pago, {
      ...data,
      fechaPago: new Date(data.fechaPago)
    })

    await pago.save()
    return NextResponse.json({ success: true, pago })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const pago = await Pago.findByIdAndDelete(params.id)
    
    if (!pago) {
      return NextResponse.json({ success: false, error: 'Pago no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 