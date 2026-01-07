import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sklep/$productId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = Route.useParams()
  return <div>Hello "/sklep/{productId}/"!</div>
}