import type { Product } from '@/data/products'

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