import { createFileRoute } from '@tanstack/react-router'

import { useProduct } from '@/hooks/queries/product/useProduct'

import { ProductImageGalery } from '@/routes/sklep/components/ProductImageGalery'
import { ProductDetailsSection } from '@/routes/sklep/components/ProductDetailsSection'
import { ProductDescriptionSection } from '@/routes/sklep/components/ProductDescriptionSection'
import { QueryState } from '@/components/ui/QueryState'

export const Route = createFileRoute('/sklep/$productId')({
  component: ProductPage,
})

function ProductPage() {
  const { productId } = Route.useParams()
  const { isPending, error, data: product } = useProduct(productId)

  if (isPending) {
    return <QueryState>Ładowanie produktu...</QueryState>
  }

  if (error || !product) {
    return <QueryState>Ups... nie udało się pobrać produktu.</QueryState>
  }

  return (
    <div>
      <div className='flex flex-col items-center gap-y-10 md:flex-row md:justify-center-safe md:gap-x-42'>
        <ProductImageGalery imageUrl={product.imageUrl} />
        <ProductDetailsSection product={product} />
      </div>
      <ProductDescriptionSection description={product.description} />
    </div>
  )
}
