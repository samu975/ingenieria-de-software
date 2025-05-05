'use client'
import Backandlogout from '@/app/components/backandlogout'
import React, { useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Salidas = () => {
  const router = useRouter()
  const [placa, setPlaca] = useState('')
  const [fechaHora, setFechaHora] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/parqueo/salida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placa, fechaHora })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar la salida')
      }

      setSuccess('Salida registrada correctamente')
      setPlaca('')
      setFechaHora('')
      setTimeout(() => {
        setSuccess('')
      }, 5000)
      router.push('/')
    } catch (error: any) {
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 my-14'>
      <div className='flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-md p-4 shadow-xl'>
        <div className='flex flex-col items-center justify-center gap-2 my-6'>
          <FaArrowAltCircleLeft className='text-6xl font-bold text-red-500' />
          <h2 className='text-4xl font-bold'>Registrar Salida</h2>
        </div>
        <div className='flex flex-col items-center justify-center gap-4'>
          <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>
            <div className='flex flex-col items-center justify-center gap-2'>
              <label htmlFor="placa" className='text-gray-500 self-start'>Placa</label>
              <input 
                type="text" 
                name="placa" 
                id="placa" 
                className='border-2 border-gray-300 rounded-md p-2 w-64' 
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                required
              />
              <label htmlFor="fechaHora" className='text-gray-500 self-start'>Fecha y Hora de Salida</label>
              <input 
                type="datetime-local" 
                name="fechaHora" 
                id="fechaHora" 
                className='border-2 border-gray-300 rounded-md p-2 w-64' 
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='bg-red-500 text-white p-2 rounded-md my-6'>Registrar Salida</button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
          
        </div>
      </div>
    </div>
  )
}

export default Salidas
