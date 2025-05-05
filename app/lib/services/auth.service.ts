import { Usuario } from '../models/usuario.model'
import bcrypt from 'bcryptjs'

export async function registerUser(data: { nombre: string, email: string, password: string }) {
  const hashed = await bcrypt.hash(data.password, 10)
  if (data.password.length < 3) throw new Error('La contraseña debe tener al menos 3 caracteres')
  if (data.nombre.length < 3) throw new Error('El nombre debe tener al menos 3 caracteres')
  if (!data.email.includes('@')) throw new Error('El email debe ser válido')
  const user = new Usuario({ nombre: data.nombre, email: data.email, password: hashed })
  
  const userExists = await Usuario.findOne({ email: data.email })
  if (userExists) throw new Error('El usuario ya existe')
  const savedUser = await user.save()
  return savedUser
}

export async function loginUser(email: string, password: string) {
  const user = await Usuario.findOne({ email })
  console.log(user, "El usuario desde el servicio es: ", user)
  if(!user) throw new Error('Usuario no encontrado')
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Contraseña inválida')
  return user
}
