import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Incidente } from '@/app/lib/models/incidente.model'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const incidente = await Incidente.findById(params.id)
    
    if (!incidente) {
      return NextResponse.json({ success: false, error: 'Incidente no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true, incidente })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await req.json()
    
    const incidente = await Incidente.findById(params.id)
    if (!incidente) {
      return NextResponse.json({ success: false, error: 'Incidente no encontrado' }, { status: 404 })
    }

    Object.assign(incidente, {
      ...data,
      fechaIncidente: new Date(data.fechaIncidente)
    })

    await incidente.save()
    return NextResponse.json({ success: true, incidente })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const incidente = await Incidente.findByIdAndDelete(params.id)
    
    if (!incidente) {
      return NextResponse.json({ success: false, error: 'Incidente no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 