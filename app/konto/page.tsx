import prisma from '@/lib/database'
import React from 'react'
import { tv } from 'tailwind-variants'
import { inputStyle } from '@/public/styles'
import Button from '@/components/client/Button'
import Input from '@/components/client/Input'

export default async function KontoPage() {

  // const user = await prisma.users.create({
  //   data: {
  //     name: '33jarek',
  //     email: '33jarek@gmail.com',
  //     password: '12345',
  //   },
  // })

  return (
    <div className='flex justify-center items-center h-full'>
      <form className='flex flex-col gap-4 border border-border-primary p-4 rounded-lg'>
        <h3 className='text-2xl font-bold text-center'>Rejestracja</h3>
        <Input type="text" style="default" placeholder="nazwa uzytkownika" />
        <Input type="password" style="default" placeholder="Hasło" />
        <Input type="email" style="default" placeholder="Email" />
        <Input type="tel" style="default" placeholder="numer telefonu" />
        <Button type={'button'} style={'outline'}>Zaloguj się</Button>
        <Button type={'submit'} style={'default'}>Zarejestruj</Button>
      </form>
    </div>
  )
}