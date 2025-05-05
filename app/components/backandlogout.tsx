'use client'
import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../store/UserStore'
import { FaHouse } from 'react-icons/fa6'

const backandlogout = () => {
  const router = useRouter()
  const { setUser } = useUserStore()

  const handleBack = () => {
    router.back()
  }

  const handleHome = () => {
    router.push('/main')
  }

  const handleLogout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <div className='w-full flex justify-between items-center my-8'>
      <div className='flex items-center gap-2'>
        <FaArrowAltCircleLeft color='green' className='text-2xl font-bold cursor-pointer' onClick={handleBack} />
        <h2 className='text-2xl font-bold'>Atrás</h2>
      </div>
      <div className='flex items-center gap-2'>
        <FaHouse color='green' className='text-2xl font-bold cursor-pointer' onClick={handleHome} />
      </div>
      <div className='flex items-center gap-2'>
        <button className='bg-red-500 text-white p-2 rounded-md' onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  )
}

export default backandlogout