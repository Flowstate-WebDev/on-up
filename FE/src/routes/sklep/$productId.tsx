import ProductDetailsBlock from '@/components/Product/ProductDetailsBlock'
import ProductImageGalery from '@/components/Product/ProductImageGalery'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import type { Product } from '@/data/products'
import ProductDescriptionBlock from '@/components/Product/ProductDescriptionBlock'

async function fetchProduct(productId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)) // DELAY W MILISEKUNDACH
  const res = await fetch(`http://localhost:3001/api/books/${productId}`)
  if (!res.ok) throw new Error('Could not fetch product from /api/books/:productId')
  return res.json()
}

export const Route = createFileRoute('/sklep/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = Route.useParams()

  const { isPending, error, data: product } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  })

  if (isPending) {
    return (
      <div className="text-center py-10 text-gray-500">
        Ładowanie produktu...
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-10 text-gray-500">
        Ups... nie udało się pobrać produktu.
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col items-center gap-y-10 md:flex-row md:justify-center-safe md:gap-x-42'>
        <ProductImageGalery imageUrl={product.imageUrl} />
        <ProductDetailsBlock
          professions={product.professions}
          title={product.title}
          qualifications={product.qualifications}
          price={product.price}
          stock={product.stock}
        />
      </div>
      <ProductDescriptionBlock description={product.description} />
    </div>
  )
}
