import mongoose from 'mongoose'

const pagoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  fechaPago: {
    type: Date,
    required: true
  },
  metodoPago: {
    type: String,
    required: true,
    enum: ['efectivo', 'tarjeta', 'transferencia']
  },
  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  observaciones: {
    type: String
  }
}, {
  timestamps: true
})

export const Pago = mongoose.models.Pago || mongoose.model('Pago', pagoSchema)
