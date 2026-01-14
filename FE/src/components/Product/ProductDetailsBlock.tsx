import type { Product } from '@/data/products'
import ProductQualifsList from './ProductQualifsList'
import ProductPrice from './ProductPrice'
import AddToCartForm from './AddToCartForm'
import Heading from '../UI/Reusable/Heading'

type Props = Pick<Product, 'professions' | 'title' | 'qualifications' | 'price' | 'stock'>

export default function ProductDetailsBlock({ professions, title, qualifications, price, stock }: Props) {
  return (
    <div className='content-center'>
      <h2 className='font-semibold text-text-secondary'>{professions.map(p => p.profession.name).join(', ')}</h2>
      <Heading>{title}</Heading>
      <ProductQualifsList qualifications={qualifications} />
      <ProductPrice price={price} />
      {stock > 0 ? (
        <>
          <AddToCartForm MaxStock={stock} />
          <p className="text-text-tertiary opacity-70 mt-2 font-semibold">Dostępnych sztuk: {stock}</p>
        </>
      ) : (
        <p className="text-red-500 font-semibold">Produkt niedostępny</p>
      )}
    </div>
  )
}