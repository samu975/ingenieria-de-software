import mongoose, { Schema, models, model } from 'mongoose'

const vehiculoSchema = new Schema({
  placa: { type: String, unique: true },
  tipo: { type: String, enum: ['carro', 'moto', 'sub', 'bus'] },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { timestamps: true })

export const Vehiculo = models.Vehiculo || model('Vehiculo', vehiculoSchema)
