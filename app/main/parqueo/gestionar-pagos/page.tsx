'use client'
import Backandlogout from '@/app/components/backandlogout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

interface Pago {
  _id: string
  placa: string
  monto: number
  fechaPago: string
  metodoPago: string
  estado: string
  observaciones?: string
}

const GestionarPagos = () => {
  const router = useRouter()
  const [pagos, setPagos] = useState<Pago[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPagos = async () => {
    try {
      const response = await fetch('/api/parqueo/pagos')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar los pagos')
      }
      
      setPagos(data.pagos)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este pago?')) return

    try {
      const response = await fetch(`/api/parqueo/pagos/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar el pago')
      }

      fetchPagos()
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchPagos()
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount)
  }

  return (
    <div className='flex flex-col items-center justify-center h-auto px-10 py-20'>
      <Backandlogout />
      
      <div className='w-full max-w-4xl'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Gestión de Pagos</h1>
          <button 
            onClick={() => router.push('/main/parqueo/gestionar-pagos/registrar')}
            className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2'
          >
            <FaPlus /> Registrar Pago
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Placa</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Monto</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Método</th>
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
              ) : pagos.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-6 py-4 text-center'>No hay pagos registrados</td>
                </tr>
              ) : (
                pagos.map((pago) => (
                  <tr key={pago._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>{pago.placa}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{formatCurrency(pago.monto)}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{formatDate(pago.fechaPago)}</td>
                    <td className='px-6 py-4 whitespace-nowrap capitalize'>{pago.metodoPago}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pago.estado === 'completado' 
                          ? 'bg-green-100 text-green-800' 
                          : pago.estado === 'pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {pago.estado}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center space-x-3'>
                        <button 
                          onClick={() => router.push(`/main/parqueo/gestionar-pagos/editar/${pago._id}`)}
                          className='text-blue-600 hover:text-blue-800'
                        >
                          <FaEdit className='w-5 h-5' />
                        </button>
                        <button 
                          onClick={() => handleDelete(pago._id)}
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

export default GestionarPagos 