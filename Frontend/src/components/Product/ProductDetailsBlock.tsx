import type { Product } from '@/data/products'
import ProductQualifsList from './ProductQualifsList'
import ProductPrice from './ProductPrice'
import AddToCartForm from './AddToCartForm'
import { categories } from '@/data/categories'
import Heading from '../UI/Reusable/Heading'

type Props = Pick<Product, 'category' | 'title' | 'qualifications' | 'price'>

export default function ProductDetailsBlock({ category, title, qualifications, price }: Props) {
  return (
    <div>
      <h2 className='font-semibold text-text-secondary'>{categories.find(c => c.name === category)?.text}</h2>
      <Heading>{title}</Heading>
      <ProductQualifsList qualifications={qualifications} />
      <ProductPrice>{price}</ProductPrice>
      <AddToCartForm />
    </div>
  )
}