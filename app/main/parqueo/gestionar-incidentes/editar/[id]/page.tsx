'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Backandlogout from '@/app/components/backandlogout'
import { use } from 'react'

export default function EditarIncidente({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [formData, setFormData] = useState({
    placa: '',
    tipo: 'accidente',
    descripcion: '',
    fechaIncidente: '',
    estado: 'pendiente',
    observaciones: ''
  })

  useEffect(() => {
    const fetchIncidente = async () => {
      try {
        const response = await fetch(`/api/parqueo/incidentes/${id}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar el incidente')
        }

        const incidente = data.incidente
        setFormData({
          placa: incidente.placa,
          tipo: incidente.tipo,
          descripcion: incidente.descripcion,
          fechaIncidente: new Date(incidente.fechaIncidente).toISOString().split('T')[0],
          estado: incidente.estado,
          observaciones: incidente.observaciones || ''
        })
      } catch (error: any) {
        alert(error.message)
        router.push('/main/parqueo/gestionar-incidentes')
      }
    }

    fetchIncidente()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/parqueo/incidentes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el incidente')
      }

      router.push('/main/parqueo/gestionar-incidentes')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <Backandlogout />
      
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold mb-6'>Editar Incidente</h1>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Placa del Vehículo
            </label>
            <input
              type='text'
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Tipo de Incidente
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              <option value='accidente'>Accidente</option>
              <option value='averia'>Avería</option>
              <option value='robo'>Robo</option>
              <option value='otro'>Otro</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={3}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Fecha del Incidente
            </label>
            <input
              type='date'
              value={formData.fechaIncidente}
              onChange={(e) => setFormData({ ...formData, fechaIncidente: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Estado
            </label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              <option value='pendiente'>Pendiente</option>
              <option value='resuelto'>Resuelto</option>
              <option value='cancelado'>Cancelado</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={3}
            />
          </div>

          <div className='flex justify-end space-x-3'>
            <button
              type='button'
              onClick={() => router.back()}
              className='px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 