import mongoose from 'mongoose'

const incidenteSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['accidente', 'averia', 'robo', 'otro']
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaIncidente: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'resuelto', 'cancelado'],
    default: 'pendiente'
  },
  observaciones: {
    type: String
  }
}, {
  timestamps: true
})

export const Incidente = mongoose.models.Incidente || mongoose.model('Incidente', incidenteSchema) 