import Backandlogout from '@/app/components/backandlogout'
import React from 'react'
import Entradas from '../Entradas'
import Salidas from '../Salidas'
const Registrar = () => {
  return (
    <div className='flex flex-col items-center justify-center h-auto px-10 py-20'>
      <Backandlogout />
      <Entradas />
      <Salidas />
    </div>
  )
}

export default Registrar