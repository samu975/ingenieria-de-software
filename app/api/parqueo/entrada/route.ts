import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Registro } from '@/app/lib/models/registro.model'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { placa, fechaHora } = await req.json()
    
    const fechaEntrada = new Date(fechaHora)
    const horaEntrada = fechaEntrada.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    
    const registro = new Registro({
      placa,
      fechaEntrada,
      horaEntrada,
      estado: 'activo'
    })

    const savedRegistro = await registro.save()
    return NextResponse.json({ success: true, registro: savedRegistro })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
