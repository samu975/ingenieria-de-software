'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'

interface Registro {
  _id: string
  placa: string
  fechaEntrada: string
  horaEntrada: string
  estado: string
}

export default function EditarRegistro({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [registro, setRegistro] = useState<Registro | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    placa: '',
    fechaEntrada: '',
    horaEntrada: '',
    estado: ''
  })

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const response = await fetch(`/api/parqueo/registros/${id}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar el registro')
        }
        
        setRegistro(data.registro)
        setFormData({
          placa: data.registro.placa,
          fechaEntrada: data.registro.fechaEntrada,
          horaEntrada: data.registro.horaEntrada,
          estado: data.registro.estado
        })
      } catch (error: any) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRegistro()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/parqueo/registros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el registro')
      }

      router.push('/main/parqueo/entrada-salidas')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Cargando...</div>
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-bold mb-6'>Editar Registro</h1>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Placa
            </label>
            <input
              type='text'
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Fecha de Entrada
            </label>
            <input
              type='date'
              value={formData.fechaEntrada.split('T')[0]}
              onChange={(e) => setFormData({ ...formData, fechaEntrada: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Hora de Entrada
            </label>
            <input
              type='time'
              value={formData.horaEntrada}
              onChange={(e) => setFormData({ ...formData, horaEntrada: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            >
              <option value='activo'>Activo</option>
              <option value='completado'>Completado</option>
            </select>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 