'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import { useUserStore } from '@/app/store/UserStore'
import { useRouter } from 'next/navigation'

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser, setUserResponse, user, userResponse } = useUserStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      setUserResponse({
        id: data._id,
        name: data.nombre,
        email: data.email,
        password: data.password
      })

      setUser({
        name: data.nombre,
        email: data.email,
        password: data.password
      })
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const resetError = useCallback(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [])

  useEffect(() => {
    resetError()
  }, [error, resetError])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-md p-6 shadow-2xl w-96'>
        <FaRegUserCircle className='text-6xl my-3' color='orange' />
        <h1 className='text-3xl font-bold'>Inicio de sesión</h1>
        <form className='flex flex-col gap-4 w-full my-8' onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className='p-2 rounded-md border-1 border-gray-300' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className='p-2 rounded-md border-1 border-gray-300' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className='bg-orange-500 text-white p-2 rounded-md'>Iniciar sesión</button>
        </form>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='text-sm text-gray-500'>No tienes una cuenta?</p>
          <Link href='/auth/register' className='text-sm text-orange-500'>Registrate</Link>
        </div>
      </div>
    </div>
  )
}

export default page