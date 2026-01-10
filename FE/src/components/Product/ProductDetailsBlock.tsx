import type { Product } from '@/data/products'
import ProductQualifsList from './ProductQualifsList'
import ProductPrice from './ProductPrice'
import AddToCartForm from './AddToCartForm'
import Heading from '../UI/Reusable/Heading'

type Props = Product

export default function ProductDetailsBlock(product: Props) {
  const { professions, title, qualifications, price } = product
  return (
    <div className='content-center'>
      <h2 className='font-semibold text-text-secondary'>{professions.map(p => p.profession.name).join(', ')}</h2>
      <Heading>{title}</Heading>
      <ProductQualifsList qualifications={qualifications} />
      <ProductPrice price={price} />
      <AddToCartForm product={product} />
    </div>
  )
}