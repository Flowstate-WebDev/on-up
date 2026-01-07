import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sklep/$productId/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3001/products/${params.productId}`)
    if (!res.ok) throw new Error('Product not found')
    return res.json()
  },
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return (
    <div>
      Hello "/sklep/{product.name || product.id || JSON.stringify(product)}"!
    </div>
  )
}