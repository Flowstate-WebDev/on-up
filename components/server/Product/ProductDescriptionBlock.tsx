import React from 'react'

type Props = {
  children: string
}

export default function ProductDescriptionBlock({ children }: Props) {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Opis</h1>
      <p>{ children }</p>
    </div>
  )
}