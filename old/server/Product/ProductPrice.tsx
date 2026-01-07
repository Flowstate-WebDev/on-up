import { Product } from '@/data/products'
import React from 'react'

type Props = {
  children: number
}

export default function ProductPrice({ children }: Props) {
  return (
    <p className='text-2xl'>
      <span className='font-semibold'>{ children.toFixed(2) }</span>{'PLN'}
    </p>
  )
}