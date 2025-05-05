'use client'
import Backandlogout from '@/app/components/backandlogout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

interface Incidente {
  _id: string
  placa: string
  tipo: string
  descripcion: string
  fechaIncidente: string
  estado: string
  observaciones?: string
}

const GestionarIncidentes = () => {
  const router = useRouter()
  const [incidentes, setIncidentes] = useState<Incidente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchIncidentes = async () => {
    try {
      const response = await fetch('/api/parqueo/incidentes')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar los incidentes')
      }
      
      setIncidentes(data.incidentes)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este incidente?')) return

    try {
      const response = await fetch(`/api/parqueo/incidentes/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el incidente')
      }

      fetchIncidentes()
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchIncidentes()
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'resuelto':
        return 'bg-green-100 text-green-800'
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'accidente':
        return 'bg-red-100 text-red-800'
      case 'averia':
        return 'bg-orange-100 text-orange-800'
      case 'robo':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-auto px-10 py-20'>
      <Backandlogout />
      
      <div className='w-full max-w-4xl'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Gestión de Incidentes</h1>
          <button 
            onClick={() => router.push('/main/parqueo/gestionar-incidentes/registrar')}
            className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2'
          >
            <FaPlus /> Registrar Incidente
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Placa</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tipo</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Descripción</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Estado</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='px-6 py-4 text-center'>Cargando...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className='px-6 py-4 text-center text-red-500'>{error}</td>
                </tr>
              ) : incidentes.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-6 py-4 text-center'>No hay incidentes registrados</td>
                </tr>
              ) : (
                incidentes.map((incidente) => (
                  <tr key={incidente._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>{incidente.placa}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTipoColor(incidente.tipo)}`}>
                        {incidente.tipo}
                      </span>
                    </td>
                    <td className='px-6 py-4'>{incidente.descripcion}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{formatDate(incidente.fechaIncidente)}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(incidente.estado)}`}>
                        {incidente.estado}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center space-x-3'>
                        <button 
                          onClick={() => router.push(`/main/parqueo/gestionar-incidentes/editar/${incidente._id}`)}
                          className='text-blue-600 hover:text-blue-800'
                        >
                          <FaEdit className='w-5 h-5' />
                        </button>
                        <button 
                          onClick={() => handleDelete(incidente._id)}
                          className='text-red-600 hover:text-red-800'
                        >
                          <FaTrash className='w-5 h-5' />
                        </button>
                      </div>
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

export default GestionarIncidentes 