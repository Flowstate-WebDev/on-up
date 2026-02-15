import { fetchProduct } from '@/api/productsAPI'
import type { Product } from '@/data/mocks/products'
import { useQuery } from '@tanstack/react-query'
import { productKeys } from '../queryKeys'

export const useProduct = (productId: string) => {
  return useQuery<Product>({
    queryKey: productKeys.all(productId),
    queryFn: () => fetchProduct(productId),
  })
}