import mongoose from 'mongoose'

const registroSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    trim: true
  },
  fechaEntrada: {
    type: Date,
    required: true
  },
  horaEntrada: {
    type: String,
    required: true
  },
  fechaSalida: {
    type: Date
  },
  horaSalida: {
    type: String
  },
  estado: {
    type: String,
    enum: ['activo', 'completado'],
    default: 'activo'
  },
  total: {
    type: Number
  }
}, {
  timestamps: true
})

export const Registro = mongoose.models.Registro || mongoose.model('Registro', registroSchema)
