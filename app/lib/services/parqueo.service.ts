import { connectDB } from '../db'
import { Vehiculo } from '../models/vehiculo.model'
import { Pago } from '../models/pago.model'
import { Celda } from '../models/celda.model'
import { Registro } from '../models/registro.model'

export async function registrarEntrada(placa: string) {
  await connectDB()

  const vehiculo = await Vehiculo.findOne({ placa })
  if (!vehiculo) throw new Error('Vehículo no registrado')

  const pagosPendientes = await Pago.find({ vehiculo: vehiculo._id, concepto: 'pendiente' })
  if (pagosPendientes.length > 0) throw new Error('Vehículo con pagos pendientes')

  const celda = await Celda.findOne({ tipo: vehiculo.tipo, disponible: true })
  if (!celda) throw new Error('No hay celdas disponibles')

  // Marcar celda como ocupada
  celda.disponible = false
  celda.vehiculo = vehiculo._id
  await celda.save()

  // Registrar ingreso
  const registro = new Registro({
    vehiculo: vehiculo._id,
    celda: celda._id,
    horaEntrada: new Date()
  })

  return await registro.save()
}

export async function registrarSalida(placa: string) {
  await connectDB()

  const vehiculo = await Vehiculo.findOne({ placa })
  if (!vehiculo) throw new Error('Vehículo no encontrado')

  const registro = await Registro.findOne({ vehiculo: vehiculo._id, finalizado: false }).populate('celda')
  if (!registro) throw new Error('No hay registro de entrada activo')

  const horaSalida = new Date()
  const tiempo = Math.ceil((horaSalida.getTime() - registro.horaEntrada.getTime()) / (1000 * 60)) // en minutos

  // Liberar celda
  const celda = await Celda.findById(registro.celda._id)
  celda.disponible = true
  celda.vehiculo = null
  await celda.save()

  // Finalizar registro
  registro.horaSalida = horaSalida
  registro.tiempoPermanenciaMin = tiempo
  registro.finalizado = true
  await registro.save()

  return {
    placa,
    tiempo,
    celda: celda.codigo
  }
}
