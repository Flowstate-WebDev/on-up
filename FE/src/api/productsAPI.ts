export async function fetchProduct(productId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 1000)) // DELAY W MILISEKUNDACH
  const res = await fetch(`http://localhost:3001/api/books/${productId}`)
  if (!res.ok) throw new Error('Could not fetch product from /api/books/:productId')
  return res.json()
}