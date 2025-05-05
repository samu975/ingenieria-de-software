import { Celda } from '../models/celda.model'

export async function crearCelda(codigo: string, tipo: 'carro' | 'moto') {
  const celda = new Celda({ codigo, tipo })
  return await celda.save()
}

export async function asignarVehiculoACelda(celdaId: string, vehiculoId: string) {
  return await Celda.findByIdAndUpdate(celdaId, {
    vehiculo: vehiculoId,
    disponible: false
  }, { new: true })
}

export async function liberarCelda(celdaId: string) {
  return await Celda.findByIdAndUpdate(celdaId, {
    vehiculo: null,
    disponible: true
  }, { new: true })
}
