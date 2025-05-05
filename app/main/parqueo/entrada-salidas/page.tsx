'use client'
import Backandlogout from '@/app/components/backandlogout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Registro {
  _id: string
  placa: string
  fechaEntrada: string
  horaEntrada: string
  estado: string
  createdAt: string
  updatedAt: string
}

const EntradaSalidas = () => {
  const router = useRouter()
  const [registros, setRegistros] = useState<Registro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleRecirectToRegistrar = () => {
    router.push('/main/parqueo/entrada-salidas/registrar')
  }

  const fetchRegistros = async () => {
    try {
      const response = await fetch('/api/parqueo/registros')
      const data = await response.json()
      
      console.log(data)
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar los registros')
      }
      
      setRegistros(data.registros)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistros()
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-auto px-10 py-20'>
      <Backandlogout />
      
      <div className='w-full max-w-4xl mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Registros de Entradas y Salidas</h1>
          <button 
            onClick={handleRecirectToRegistrar}
            className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors'
          >
            Registrar Entrada/Salida
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Placa</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha y Hora</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tipo</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {loading ? (
                <tr>
                  <td colSpan={3} className='px-6 py-4 text-center'>Cargando...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className='px-6 py-4 text-center text-red-500'>{error}</td>
                </tr>
              ) : registros.length === 0 ? (
                <tr>
                  <td colSpan={3} className='px-6 py-4 text-center'>No hay registros</td>
                </tr>
              ) : (
                registros.map((registro) => (
                  <tr key={registro._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>{registro.placa}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {formatDate(registro.fechaEntrada)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        registro.estado === 'activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {registro.estado === 'activo' ? 'Entrada' : 'Salida'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EntradaSalidas