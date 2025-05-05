'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useUserStore } from '@/app/store/UserStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const page = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, setUserResponse } = useUserStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, email, password })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el usuario')
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
    } catch (err: any) {
      setError(err.message)
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
        <h1 className='text-3xl font-bold'>Registro</h1>
        <form className='flex flex-col gap-4 w-full my-8' onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" className='p-2 rounded-md border-1 border-gray-300' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" className='p-2 rounded-md border-1 border-gray-300' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className='p-2 rounded-md border-1 border-gray-300' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className='bg-orange-500 text-white p-2 rounded-md'>Registrarse</button>
        </form>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col items-center justify-center gap-2'>
          <p className='text-sm text-gray-500'>Ya tienes una cuenta?</p>
          <Link href='/auth/login' className='text-sm text-orange-500'>Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}

export default page