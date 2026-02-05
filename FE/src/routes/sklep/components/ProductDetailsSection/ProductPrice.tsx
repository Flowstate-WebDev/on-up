type Props = {
  price: string | number
}

export function ProductPrice({ price }: Props) {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return (
    <p className='text-2xl'>
      <span className='font-semibold'>{numericPrice.toFixed(2)}</span>{' PLN'}
    </p>
  )
}