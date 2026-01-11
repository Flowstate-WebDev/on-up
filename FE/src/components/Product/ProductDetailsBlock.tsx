import type { Product } from '@/data/products'
import ProductQualifsList from './ProductQualifsList'
import ProductPrice from './ProductPrice'
import AddToCartForm from './AddToCartForm'
import Heading from '../UI/Reusable/Heading'

type Props = Pick<Product, 'professions' | 'title' | 'qualifications' | 'price'>

export default function ProductDetailsBlock({ professions, title, qualifications, price }: Props) {
  return (
    <div className='content-center'>
      <h2 className='font-semibold text-text-secondary'>{professions.map(p => p.profession.name).join(', ')}</h2>
      <Heading>{title}</Heading>
      <ProductQualifsList qualifications={qualifications} />
      <ProductPrice price={price} />
      <AddToCartForm />
    </div>
  )
}