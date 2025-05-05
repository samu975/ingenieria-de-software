import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Registro } from '@/app/lib/models/registro.model'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { placa, fechaHora } = await req.json()
    
    const registro = await Registro.findOne({ placa, estado: 'activo' })
    if (!registro) {
      throw new Error('No se encontró un registro activo para esta placa')
    }

    const fechaSalida = new Date(fechaHora)
    const horaSalida = fechaSalida.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    
    registro.fechaSalida = fechaSalida
    registro.horaSalida = horaSalida
    registro.estado = 'completado'
    
    const tiempoEstacionado = registro.fechaSalida.getTime() - registro.fechaEntrada.getTime()
    const horas = Math.ceil(tiempoEstacionado / (1000 * 60 * 60))
    const tarifaPorHora = 5 // Esto debería venir de una configuración
    registro.total = horas * tarifaPorHora

    const updatedRegistro = await registro.save()
    return NextResponse.json({ success: true, registro: updatedRegistro })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
