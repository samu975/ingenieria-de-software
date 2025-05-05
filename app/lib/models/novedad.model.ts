import mongoose, { Schema, models, model } from 'mongoose'

const novedadSchema = new Schema({
  vehiculo: { type: Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true })

export const Novedad = models.Novedad || model('Novedad', novedadSchema)
