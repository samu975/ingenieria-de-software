import mongoose, { Schema, models, model } from 'mongoose'

const pagoSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  vehiculo: { type: Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
  monto: { type: Number, required: true },
  fechaPago: { type: Date, default: Date.now },
  concepto: { type: String }
}, { timestamps: true })

export const Pago = models.Pago || model('Pago', pagoSchema)
