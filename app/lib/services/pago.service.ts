import { Pago } from '../models/pago.model'

export async function registrarPago(data: {
  usuario: string,
  vehiculo: string,
  monto: number,
  concepto?: string
}) {
  const pago = new Pago(data)
  return await pago.save()
}

export async function obtenerPagosDeUsuario(usuarioId: string) {
  return await Pago.find({ usuario: usuarioId }).populate('vehiculo')
}
