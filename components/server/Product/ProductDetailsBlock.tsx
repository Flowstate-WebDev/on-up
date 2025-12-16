import { Product } from '@/data/products'
import React from 'react'
import Heading from '../Reusables/Heading'
import ProductQualifsList from './ProductQualifsList'
import ProductPrice from './ProductPrice'
import AddToCartForm from './AddToCartForm'
import { categories } from '@/data/categories'

type Props = Pick<Product, 'category' | 'title' | 'qualifications' | 'price'>

export default function ProductDetailsBlock({ category, title, qualifications, price }: Props) {
  return (
    <div className='content-center'>
      <h2 className='font-semibold text-neutral-500'>{ categories.find(c => c.name === category)?.text }</h2>
      <Heading>{ title }</Heading>
      <ProductQualifsList qualifications={ qualifications } />
      <ProductPrice>{ price }</ProductPrice>
      <AddToCartForm />
    </div>
  )
}