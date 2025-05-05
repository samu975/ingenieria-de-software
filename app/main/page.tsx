'use client'
import React from 'react'
import { useUserStore } from '../store/UserStore'
import { FaArrowAltCircleLeft, FaCar } from 'react-icons/fa'
import { LuCircleDollarSign, LuCircleAlert } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import Backandlogout from '@/app/components/backandlogout'
const page = () => {
  const { user, setUser } = useUserStore()

  const router = useRouter()


  const handleRegistrarVehiculo = () => {
    router.push('/main/parqueo/registrar-vehiculo')
  }

  const handleGestionarEntradasSalidas = () => {
    router.push('/main/parqueo/entrada-salidas')
  }

  const handleGestionarPagos = () => {
    router.push('/main/parqueo/pagos')
  }

  const handleVerIncidentes = () => {
    router.push('/main/parqueo/incidentes')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen px-10'>
      <Backandlogout />
        <h2 className='text-4xl font-bold my-2'>Bienvenido {user?.name} A</h2>
        <h2 className='text-4xl font-bold flex items-center gap-2'> <FaCar />Autos Colombia</h2>
        <h3 className='my-6 text-2xl font-bold'>¿Que deseas hacer hoy ?</h3>
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='bg-orange-500 text-white p-2 rounded-md w-64 text-center cursor-pointer' onClick={handleRegistrarVehiculo}>Registrar Vehiculo</div>
          <div className='flex items-center justify-left gap-2 w-64 cursor-pointer' onClick={handleGestionarEntradasSalidas}><div><FaArrowAltCircleLeft color='green' className='text-2xl font-bold' /></div><div className='font-semibold text-gray-600 text-xl'>Gestionar Entradas/Salidas</div></div>
          <div className='flex items-center justify-left gap-2 w-64 cursor-pointer' onClick={handleGestionarPagos}><div><LuCircleDollarSign className='text-2xl font-bold text-blue-500' /></div><div className='font-semibold text-gray-600 text-xl'>Gestionar Pagos</div></div>
          <div className='flex items-center justify-left gap-2 w-64 cursor-pointer' onClick={handleVerIncidentes}><div><LuCircleAlert  className='text-2xl font-bold text-amber-400' /></div><div className='font-semibold text-gray-600 text-xl'>Ver incidentes</div></div>
        </div>

    </div>
  )
}

export default page