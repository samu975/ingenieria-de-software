import { connectDB } from '@/app/lib/db'
import { NextResponse } from 'next/server'
import { Registro } from '@/app/lib/models/registro.model'

export async function GET() {
  try {
    await connectDB()
    
    const registros = await Registro.find()
      .sort({ fechaEntrada: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      registros
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
} 