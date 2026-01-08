import ProductDetailsBlock from '@/components/Product/ProductDetailsBlock'
import ProductImageGalery from '@/components/Product/ProductImageGalery'
import { createFileRoute } from '@tanstack/react-router'

import type { Product } from '@/data/products'
import ProductDescriptionBlock from '@/components/Product/ProductDescriptionBlock'

export const Route = createFileRoute('/sklep/$productId/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3001/api/books/${params.productId}`)
    if (!res.ok) throw new Error('Product not found')
    return res.json()
  },
})

function RouteComponent() {
  const product: Product = Route.useLoaderData()

  return (
    <div>
      <div className='grid grid-cols-2 flex-1'>
        <ProductImageGalery imageUrl={product.imageUrl} />
        <ProductDetailsBlock professions={product.professions} title={product.title} qualifications={product.qualifications} price={product.price} />
      </div>
      <ProductDescriptionBlock description={product.description} />
    </div>
  )
}