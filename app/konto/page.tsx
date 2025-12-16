import prisma from '@/lib/database'
import React from 'react'
import { tv } from 'tailwind-variants'

export default async function KontoPage() {

  // const user = await prisma.users.create({
  //   data: {
  //     name: '33jarek',
  //     email: '33jarek@gmail.com',
  //     password: '12345',
  //   },
  // })

  return (
    <div className='flex justify-center items-center'>
      <form className='flex flex-col gap-4 border border-border-primary p-4 rounded-lg'>
        <h3 className='text-2xl font-bold text-center'>Rejestracja</h3>
        <input className={inputStyle()} type="text" placeholder='nazwa uzytkownika' />
        <input className={inputStyle()} type="password" placeholder='Hasło' />
        <input className={inputStyle()} type="email" placeholder='Email' />
        <input className={inputStyle()} type="tel" placeholder='numer telefonu' />
        <button type="submit" className='bg-primary text-text-button p-2 rounded-lg'>Zarejestruj</button>
      </form>
    </div>
  )
}

const inputStyle = tv({
  base: "border border-border-primary p-2 rounded-lg focus:border-primary text-text-primary",
})