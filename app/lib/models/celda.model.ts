import mongoose, { Schema, models, model } from 'mongoose'

const celdaSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ['carro', 'moto'], required: true },
  disponible: { type: Boolean, default: true },
  vehiculo: { type: Schema.Types.ObjectId, ref: 'Vehiculo', default: null }
}, { timestamps: true })

export const Celda = models.Celda || model('Celda', celdaSchema)
