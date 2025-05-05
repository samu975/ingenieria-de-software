import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Registro } from '@/app/lib/models/registro.model'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const registro = await Registro.findById(params.id)
    
    if (!registro) {
      return NextResponse.json({ 
        success: false, 
        error: 'Registro no encontrado' 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      registro 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await req.json()
    
    const registro = await Registro.findById(params.id)
    if (!registro) {
      return NextResponse.json({ 
        success: false, 
        error: 'Registro no encontrado' 
      }, { status: 404 })
    }

    // Actualizar los campos
    registro.placa = data.placa
    registro.fechaEntrada = data.fechaEntrada
    registro.horaEntrada = data.horaEntrada
    registro.estado = data.estado

    await registro.save()

    return NextResponse.json({ 
      success: true, 
      registro 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const registro = await Registro.findByIdAndDelete(params.id)
    
    if (!registro) {
      return NextResponse.json({ 
        success: false, 
        error: 'Registro no encontrado' 
      }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
} 