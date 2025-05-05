import { Novedad } from '../models/novedad.model'

export async function registrarNovedad(vehiculoId: string, descripcion: string) {
  const novedad = new Novedad({ vehiculo: vehiculoId, descripcion })
  return await novedad.save()
}

export async function listarNovedadesPorVehiculo(vehiculoId: string) {
  return await Novedad.find({ vehiculo: vehiculoId }).sort({ fecha: -1 })
}
