export const bookKeys = {
  all: ['books'] as const
}
export const productKeys = {
  all: (productId: string) => ['product', productId] as const,
}