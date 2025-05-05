import mongoose, { Schema, models, model } from 'mongoose'

const usuarioSchema = new Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true })

export const Usuario = models.Usuario || model('Usuario', usuarioSchema)
